/**
 * Stripe Webhook Handler for myhorizon.ai
 *
 * Handles checkout.session.completed events:
 * - Sends welcome email to customer
 * - Sends order notification to Daniel
 */

import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const resend = new Resend(process.env.RESEND_API_KEY);

function getWelcomeEmailHtml(customerName: string, orderId: string, amount: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0f0f23; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f0f23; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a3e; border-radius: 16px; overflow: hidden;">
                    <tr>
                        <td style="background: linear-gradient(135deg, #00d4aa, #00b894); padding: 30px; text-align: center;">
                            <h1 style="color: #fff; font-size: 28px; margin: 0;">🎉 You're In!</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px; color: #a8a8cc; font-size: 16px; line-height: 1.7;">
                            <p style="color: #fff; font-size: 20px; margin: 0 0 20px;">Hey ${customerName},</p>
                            
                            <p>Your order is confirmed. Welcome to MyHorizon AI.</p>
                            
                            <div style="background: rgba(0, 212, 170, 0.1); border: 1px solid rgba(0, 212, 170, 0.3); border-radius: 12px; padding: 25px; margin: 25px 0;">
                                <p style="margin: 0 0 15px; color: #00d4aa; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">What Happens Next</p>
                                
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="padding: 10px 0; color: #fff;">
                                            <strong style="color: #00d4aa;">Today</strong><br>
                                            <span style="color: #a8a8cc;">I'll reach out personally to schedule your onboarding call</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; color: #fff;">
                                            <strong style="color: #00d4aa;">This Week</strong><br>
                                            <span style="color: #a8a8cc;">We configure your AI with your email, calendar, and preferences</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; color: #fff;">
                                            <strong style="color: #00d4aa;">Day 1</strong><br>
                                            <span style="color: #a8a8cc;">Quick verification call, then you're live</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <p>Questions before then? Just reply to this email.</p>
                            
                            <p style="margin-top: 30px;">
                                — Daniel<br>
                                <span style="color: #666;">Founder, MyHorizon AI</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px 40px;">
                            <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px;">
                                <p style="margin: 0 0 15px; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Order Summary</p>
                                <table width="100%" cellpadding="0" cellspacing="0" style="color: #a8a8cc; font-size: 14px;">
                                    <tr>
                                        <td style="padding: 8px 0;">MyHorizon AI</td>
                                        <td style="padding: 8px 0; text-align: right; color: #fff;">${amount}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;">
                                            <span style="color: #666;">Order ID:</span>
                                            <span style="color: #fff;"> ${orderId}</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px 40px; background-color: rgba(0,0,0,0.2); text-align: center; color: #666; font-size: 12px;">
                            <p style="margin: 0;">MyHorizon AI</p>
                            <p style="margin: 5px 0 0;"><a href="mailto:support@myhorizon.ai" style="color: #00d4aa; text-decoration: none;">support@myhorizon.ai</a></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: any) {
  const chunks: Buffer[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || 'there';
    const orderId = session.id.slice(-8).toUpperCase();
    const amount = `$${((session.amount_total || 0) / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    if (customerEmail) {
      try {
        await resend.emails.send({
          from: 'Daniel <daniel@myhorizon.ai>',
          to: customerEmail,
          subject: '🎉 Your MyHorizon AI order is confirmed',
          html: getWelcomeEmailHtml(customerName, orderId, amount),
          reply_to: 'support@myhorizon.ai',
        });

        console.log(`Welcome email sent to ${customerEmail}`);

        await resend.emails.send({
          from: 'SYNTHIOS <notifications@myhorizon.ai>',
          to: 'daniel@myhorizon.ai',
          subject: `🚀 New Order: ${customerName} — ${amount}`,
          html: `
            <h2>New Order on myhorizon.ai</h2>
            <p><strong>Customer:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Amount:</strong> ${amount}</p>
            <p>Time to reach out and schedule their onboarding call!</p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }
    }
  }

  res.json({ received: true });
}
