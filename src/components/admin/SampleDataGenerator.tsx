import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function SampleDataGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const generateSampleData = async () => {
    setIsGenerating(true);
    try {
      // Generate comprehensive sample leads (50+)
      const sampleLeads = [
        // High-value qualified leads
        { name: 'Sarah Johnson', email: 'sarah.johnson@techcorp.com', phone: '+1-555-0123', company: 'TechCorp Industries', status: 'qualified' as const, source: 'website_chat' as const, ai_score: 85, notes: 'Interested in AI-powered video production for brand campaign. Budget: $50K-75K' },
        { name: 'Emily Rodriguez', email: 'emily.r@innovatetech.io', phone: '+1-555-0125', company: 'InnovateTech', status: 'qualified' as const, source: 'referral' as const, ai_score: 90, notes: 'High-priority lead - Fortune 500 company seeking branded content series' },
        { name: 'Jennifer Liu', email: 'jliu@globalbrands.com', phone: '+1-555-0127', company: 'Global Brands Inc', status: 'appointment_scheduled' as const, source: 'website_chat' as const, ai_score: 95, notes: 'Negotiating multi-video campaign contract - $150K budget. Very interested' },
        { name: 'Lisa Wang', email: 'lwang@fashionbrand.com', phone: '+1-555-0129', company: 'Fashion Brand Studio', status: 'qualified' as const, source: 'referral' as const, ai_score: 78, notes: 'Fashion brand looking for promotional videos. Timeline: 2 months' },
        
        // Contacted leads
        { name: 'Michael Chen', email: 'mchen@creativestudio.com', phone: '+1-555-0124', company: 'Creative Studio Co', status: 'contacted' as const, source: 'inbound_call' as const, ai_score: 72, notes: 'Looking for documentary film production services. Needs 3 episodes' },
        { name: 'James Martinez', email: 'jmartinez@nonprofit.org', phone: '+1-555-0130', company: 'Community Foundation', status: 'contacted' as const, source: 'inbound_call' as const, ai_score: 55, notes: 'Non-profit seeking donation campaign video. Budget constraints' },
        { name: 'Alexandra White', email: 'awhite@educorp.com', phone: '+1-555-0140', company: 'EduCorp Learning', status: 'contacted' as const, source: 'website_chat' as const, ai_score: 68, notes: 'Educational institution needs training videos for online courses' },
        
        // Won deals
        { name: 'Robert Thompson', email: 'rthompson@mediaco.com', phone: '+1-555-0128', company: 'MediaCo Productions', status: 'closed_won' as const, source: 'referral' as const, ai_score: 88, notes: 'Contract signed for Q1 2025 campaign. $85K project' },
        { name: 'Amanda Foster', email: 'afoster@techstartup.io', phone: '+1-555-0131', company: 'TechStartup Inc', status: 'closed_won' as const, source: 'website_chat' as const, ai_score: 92, notes: 'Completed explainer video project. Very satisfied, wants ongoing partnership' },
        
        // Nurturing leads
        { name: 'David Park', email: 'dpark@startupventures.com', phone: '+1-555-0126', company: 'Startup Ventures', status: 'nurturing' as const, source: 'website_chat' as const, ai_score: 65, notes: 'Early-stage startup, interested in pitch video production. Limited budget' },
        { name: 'Kevin O\'Brien', email: 'kobrien@retailchain.com', phone: '+1-555-0132', company: 'Retail Chain Corp', status: 'nurturing' as const, source: 'referral' as const, ai_score: 70, notes: 'Large retail chain exploring video marketing. Decision timeline: Q2 2025' },
        
        // New leads
        { name: 'Rachel Green', email: 'rgreen@healthplus.com', phone: '+1-555-0133', company: 'Health Plus Wellness', status: 'new' as const, source: 'website_chat' as const, ai_score: null, notes: 'Just submitted contact form - interested in health & wellness video content' },
        { name: 'Tom Anderson', email: 'tanderson@autogroup.com', phone: '+1-555-0134', company: 'Auto Group LLC', status: 'new' as const, source: 'inbound_call' as const, ai_score: null, notes: 'Called about automotive commercial production' },
        { name: 'Maria Garcia', email: 'mgarcia@foodbrand.com', phone: '+1-555-0135', company: 'Food Brand Co', status: 'new' as const, source: 'website_chat' as const, ai_score: null, notes: 'Food & beverage brand exploring recipe video content' },
        { name: 'Daniel Kim', email: 'dkim@financegroup.com', phone: '+1-555-0136', company: 'Finance Group', status: 'new' as const, source: 'referral' as const, ai_score: null, notes: 'Financial services company needs explainer videos' },
        { name: 'Sophie Martin', email: 'smartin@travelco.com', phone: '+1-555-0137', company: 'Travel Co Adventures', status: 'new' as const, source: 'website_chat' as const, ai_score: null, notes: 'Travel company interested in destination showcase videos' },
        { name: 'Chris Taylor', email: 'ctaylor@constructionpro.com', phone: '+1-555-0138', company: 'Construction Pro Inc', status: 'new' as const, source: 'inbound_call' as const, ai_score: null, notes: 'Construction company needs safety training videos' },
        { name: 'Nina Patel', email: 'npatel@beautyline.com', phone: '+1-555-0139', company: 'Beauty Line Products', status: 'new' as const, source: 'website_chat' as const, ai_score: null, notes: 'Beauty brand looking for product demo videos' },
        
        // Additional qualified leads
        { name: 'Marcus Williams', email: 'mwilliams@pharmatech.com', phone: '+1-555-0141', company: 'PharmaTech Solutions', status: 'qualified' as const, source: 'referral' as const, ai_score: 82, notes: 'Pharmaceutical company needs medical education videos. Significant budget' },
        { name: 'Jessica Brown', email: 'jbrown@realestatepro.com', phone: '+1-555-0142', company: 'Real Estate Pro Group', status: 'qualified' as const, source: 'website_chat' as const, ai_score: 75, notes: 'Real estate agency wants property showcase videos for luxury listings' },
        { name: 'Brian Lee', email: 'blee@sportsacademy.com', phone: '+1-555-0143', company: 'Sports Academy', status: 'qualified' as const, source: 'inbound_call' as const, ai_score: 71, notes: 'Sports training facility needs promotional and instructional content' },
        
        // More contacted leads
        { name: 'Olivia Davis', email: 'odavis@eventspro.com', phone: '+1-555-0144', company: 'Events Pro Management', status: 'contacted' as const, source: 'website_chat' as const, ai_score: 66, notes: 'Event management company exploring event recap video packages' },
        { name: 'Ryan Mitchell', email: 'rmitchell@musiclabel.com', phone: '+1-555-0145', company: 'Indie Music Label', status: 'contacted' as const, source: 'referral' as const, ai_score: 73, notes: 'Music label needs music videos for multiple artists' },
        { name: 'Hannah Wilson', email: 'hwilson@nonprofitorg.org', phone: '+1-555-0146', company: 'Global Aid Foundation', status: 'contacted' as const, source: 'inbound_call' as const, ai_score: 58, notes: 'International nonprofit seeking documentary-style impact videos' },
        
        // More nurturing leads
        { name: 'Jason Moore', email: 'jmoore@breweryco.com', phone: '+1-555-0147', company: 'Craft Brewery Co', status: 'nurturing' as const, source: 'website_chat' as const, ai_score: 64, notes: 'Craft brewery interested in brand story videos. Still evaluating options' },
        { name: 'Emma Thompson', email: 'ethompson@petcare.com', phone: '+1-555-0148', company: 'Pet Care Services', status: 'nurturing' as const, source: 'website_chat' as const, ai_score: 62, notes: 'Pet services company considering video marketing campaign' },
        { name: 'Lucas Martinez', email: 'lmartinez@ecommerce.com', phone: '+1-555-0149', company: 'E-Commerce Hub', status: 'nurturing' as const, source: 'referral' as const, ai_score: 69, notes: 'E-commerce platform needs product video templates for merchants' },
        
        // Additional new leads
        { name: 'Samantha Clark', email: 'sclark@lawfirm.com', phone: '+1-555-0150', company: 'Clark & Associates Law', status: 'new' as const, source: 'website_chat' as const, ai_score: null, notes: 'Law firm inquiring about client testimonial videos' },
        { name: 'Michael Scott', email: 'mscott@papercompany.com', phone: '+1-555-0151', company: 'Dunder Mifflin Paper', status: 'new' as const, source: 'inbound_call' as const, ai_score: null, notes: 'Paper company interested in corporate culture videos' },
        { name: 'Angela Martin', email: 'amartin@accountingpro.com', phone: '+1-555-0152', company: 'Accounting Pro Services', status: 'new' as const, source: 'website_chat' as const, ai_score: null, notes: 'Accounting firm needs client education video series' },
        { name: 'Pam Beesly', email: 'pbeesly@artgallery.com', phone: '+1-555-0153', company: 'Modern Art Gallery', status: 'new' as const, source: 'referral' as const, ai_score: null, notes: 'Art gallery wants virtual exhibition tour videos' },
        { name: 'Jim Halpert', email: 'jhalpert@sportsco.com', phone: '+1-555-0154', company: 'Athletic Sports Co', status: 'new' as const, source: 'website_chat' as const, ai_score: null, notes: 'Sports equipment company exploring product demo content' },
        
        // More appointment scheduled
        { name: 'Dwight Schrute', email: 'dschrute@farmgroup.com', phone: '+1-555-0155', company: 'Schrute Farms Enterprises', status: 'appointment_scheduled' as const, source: 'referral' as const, ai_score: 87, notes: 'Agricultural business wants promotional videos. Meeting scheduled for strategy session' },
        { name: 'Stanley Hudson', email: 'shudson@crosswordpub.com', phone: '+1-555-0156', company: 'Crossword Publishing', status: 'appointment_scheduled' as const, source: 'inbound_call' as const, ai_score: 76, notes: 'Publishing company needs author interview videos. Discovery call booked' },
        
        // More closed won
        { name: 'Phyllis Vance', email: 'pvance@partysupply.com', phone: '+1-555-0157', company: 'Party Supply Warehouse', status: 'closed_won' as const, source: 'website_chat' as const, ai_score: 84, notes: 'Contract finalized for seasonal promotional video package. $45K project' },
        { name: 'Oscar Martinez', email: 'omartinez@financialcorp.com', phone: '+1-555-0158', company: 'Financial Corp Advisors', status: 'closed_won' as const, source: 'referral' as const, ai_score: 91, notes: 'Signed annual retainer for quarterly financial education videos. $120K contract' },
        
        // Additional qualified leads for variety
        { name: 'Kelly Kapoor', email: 'kkapoor@fashiontrends.com', phone: '+1-555-0159', company: 'Fashion Trends Magazine', status: 'qualified' as const, source: 'website_chat' as const, ai_score: 79, notes: 'Fashion publication needs runway coverage and interviews' },
        { name: 'Toby Flenderson', email: 'tflenderson@hrservices.com', phone: '+1-555-0160', company: 'HR Services Group', status: 'qualified' as const, source: 'inbound_call' as const, ai_score: 67, notes: 'HR consultancy wants workplace training video library' },
        { name: 'Andy Bernard', email: 'abernard@musicschool.com', phone: '+1-555-0161', company: 'Harmony Music School', status: 'qualified' as const, source: 'website_chat' as const, ai_score: 74, notes: 'Music school needs promotional and instructional video content' },
        
        // More contacted for pipeline balance
        { name: 'Creed Bratton', email: 'cbratton@mysteryco.com', phone: '+1-555-0162', company: 'Quality Assurance Inc', status: 'contacted' as const, source: 'referral' as const, ai_score: 61, notes: 'Quality assurance firm interested in process documentation videos' },
        { name: 'Meredith Palmer', email: 'mpalmer@suppliernetwork.com', phone: '+1-555-0163', company: 'Supplier Network LLC', status: 'contacted' as const, source: 'inbound_call' as const, ai_score: 59, notes: 'Supplier relations company exploring B2B marketing videos' },
        
        // Final set of new leads
        { name: 'Erin Hannon', email: 'ehannon@receptionpro.com', phone: '+1-555-0164', company: 'Reception Pro Services', status: 'new' as const, source: 'website_chat' as const, ai_score: null, notes: 'Professional services firm inquired about corporate event videos' },
        { name: 'Darryl Philbin', email: 'dphilbin@warehousegroup.com', phone: '+1-555-0165', company: 'Warehouse Management Co', status: 'new' as const, source: 'inbound_call' as const, ai_score: null, notes: 'Logistics company interested in operations training videos' },
        { name: 'Ryan Howard', email: 'rhoward@startuptech.io', phone: '+1-555-0166', company: 'Tech Startup Ventures', status: 'new' as const, source: 'website_chat' as const, ai_score: null, notes: 'Tech startup wants investor pitch video' },
        { name: 'Jan Levinson', email: 'jlevinson@corporateexec.com', phone: '+1-555-0167', company: 'Executive Consulting', status: 'new' as const, source: 'referral' as const, ai_score: null, notes: 'Executive consulting firm exploring thought leadership video content' },
        { name: 'David Wallace', email: 'dwallace@corporatehq.com', phone: '+1-555-0168', company: 'Corporate Headquarters Inc', status: 'new' as const, source: 'inbound_call' as const, ai_score: null, notes: 'Corporate office needs internal communications videos' },
        
        // More nurturing leads
        { name: 'Holly Flax', email: 'hflax@hrtech.com', phone: '+1-555-0169', company: 'HR Tech Solutions', status: 'nurturing' as const, source: 'website_chat' as const, ai_score: 68, notes: 'HR technology company considering product demo videos for SaaS platform' },
        { name: 'Karen Filippelli', email: 'kfilippelli@branchoffice.com', phone: '+1-555-0170', company: 'Branch Office Consulting', status: 'nurturing' as const, source: 'referral' as const, ai_score: 65, notes: 'Consulting firm evaluating video marketing strategy' },
        { name: 'Charles Miner', email: 'cminer@corporatestrategy.com', phone: '+1-555-0171', company: 'Corporate Strategy Group', status: 'nurturing' as const, source: 'inbound_call' as const, ai_score: 72, notes: 'Strategy consultancy considering case study video series' },
        { name: 'Jo Bennett', email: 'jbennett@printingempire.com', phone: '+1-555-0172', company: 'Printing Empire LLC', status: 'nurturing' as const, source: 'website_chat' as const, ai_score: 70, notes: 'Printing business exploring brand transformation video campaign' }
      ];

      const { data: leads, error: leadsError } = await supabase
        .from('leads')
        .insert(sampleLeads)
        .select();

      if (leadsError) throw leadsError;

      // Generate sample appointments and conversations for leads
      if (leads && leads.length > 0) {
        const sampleAppointments = [
          { lead_id: leads[0].id, title: 'Initial Discovery Call', description: 'Discuss project scope and budget for brand campaign. Review previous work samples', start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), status: 'scheduled' },
          { lead_id: leads[2].id, title: 'Production Planning Meeting', description: 'Review content strategy and timeline for branded content series. Meet creative team', start_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(), status: 'scheduled' },
          { lead_id: leads[3].id, title: 'Contract Review & Signing', description: 'Final contract discussion and signing for multi-video campaign. Legal team present', start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), status: 'scheduled' },
          { lead_id: leads[6].id, title: 'Creative Brief Review', description: 'Walk through creative concepts and storyboards for fashion campaign', start_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), status: 'scheduled' },
          { lead_id: leads[7].id, title: 'Project Kickoff', description: 'Official project kickoff for Q1 2025 campaign. Full team introduction', start_time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), status: 'completed' },
          { lead_id: leads[8].id, title: 'Final Delivery Review', description: 'Review final video edits and discuss future projects', start_time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), status: 'completed' },
          { lead_id: leads[18].id, title: 'Initial Consultation', description: 'Meet to discuss pharmaceutical education video requirements', start_time: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), status: 'scheduled' },
          { lead_id: leads[19].id, title: 'Property Tour Planning', description: 'Plan luxury property video showcase strategy', start_time: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), status: 'scheduled' },
          { lead_id: leads[33].id, title: 'Strategy Session', description: 'Agricultural business promotional video strategy discussion', start_time: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(), status: 'scheduled' },
          { lead_id: leads[34].id, title: 'Author Interview Planning', description: 'Plan publishing company author interview video series', start_time: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), status: 'scheduled' }
        ];

        const { error: appointmentsError } = await supabase
          .from('appointments')
          .insert(sampleAppointments);

        if (appointmentsError) throw appointmentsError;

        // Generate realistic AI conversations
        const sampleConversations = [
          { lead_id: leads[0].id, agent_id: 'agent_3701k6bjf9q2e5wsc1y94xbg2r3g', transcript: 'Agent: Hello! Thanks for reaching out to MyHorizon. How can I help you today?\nSarah: Hi, I\'m looking for a video production company for our upcoming brand campaign.\nAgent: That\'s great! Can you tell me more about your project?\nSarah: We\'re TechCorp Industries, and we need about 5 videos for a product launch. Budget is around $60,000.\nAgent: Perfect! When are you looking to start production?\nSarah: Ideally within the next month. Can someone contact me to discuss details?\nAgent: Absolutely! I\'ll have our team reach out within 24 hours.', duration_seconds: 245, call_type: 'inbound', metadata: { sentiment: 'positive', intent: 'ready_to_buy' } },
          { lead_id: leads[4].id, agent_id: 'agent_3701k6bjf9q2e5wsc1y94xbg2r3g', transcript: 'Agent: Welcome to MyHorizon! How can I assist you?\nMichael: I need documentary production services.\nAgent: Great! Tell me about your project.\nMichael: It\'s a 3-episode documentary series. Do you have experience with this?\nAgent: Yes, we specialize in documentary work. What\'s your timeline?\nMichael: Need to complete in 3 months. What\'s the process?\nAgent: Let me connect you with our documentary producer for detailed discussion.\nMichael: Sounds good, thanks.', duration_seconds: 180, call_type: 'inbound', metadata: { sentiment: 'neutral', intent: 'information_gathering' } },
          { lead_id: leads[11].id, agent_id: 'agent_3701k6bjf9q2e5wsc1y94xbg2r3g', transcript: 'Agent: Hello! This is MyHorizon video production.\nRachel: Hi, I just filled out your contact form.\nAgent: Yes, I see that! You mentioned interest in health and wellness content?\nRachel: Right, we\'re Health Plus Wellness and want to create educational videos for our patients.\nAgent: That sounds like a great project. How many videos are you thinking?\nRachel: Maybe 10-15 short videos, around 2-3 minutes each.\nAgent: Perfect. What\'s your budget range for this?\nRachel: We\'re still figuring that out. Can you send pricing info?\nAgent: Of course! I\'ll have someone email you our packages today.', duration_seconds: 195, call_type: 'inbound', metadata: { sentiment: 'positive', intent: 'information_gathering' } },
          { lead_id: leads[14].id, agent_id: 'agent_3701k6bjf9q2e5wsc1y94xbg2r3g', transcript: 'Agent: Thanks for calling MyHorizon! How may I help?\nSophie: I represent Travel Co Adventures. We need destination videos.\nAgent: Exciting! Which destinations are you looking to showcase?\nSophie: We have 8 top destinations we want to highlight. Professional quality is a must.\nAgent: Absolutely. Are you looking for aerial footage as well?\nSophie: Yes! Drone footage would be perfect. What\'s your experience with travel content?\nAgent: We\'ve produced content for several travel brands. I can share our portfolio.\nSophie: Please do. Also, what\'s typical turnaround time?\nAgent: Usually 4-6 weeks per video depending on complexity. I\'ll send details via email.', duration_seconds: 220, call_type: 'inbound', metadata: { sentiment: 'positive', intent: 'information_gathering' } },
          { lead_id: leads[18].id, agent_id: 'agent_3701k6bjf9q2e5wsc1y94xbg2r3g', transcript: 'Agent: Hello, MyHorizon speaking.\nMarcus: This is Marcus from PharmaTech Solutions. We need medical education videos.\nAgent: Great! Medical education is one of our specialties. What\'s the scope?\nMarcus: We need videos explaining complex medical procedures to healthcare professionals.\nAgent: Do you need animation for anatomical illustrations?\nMarcus: Yes, 3D medical animation would be ideal. Budget isn\'t a major concern if quality is there.\nAgent: Excellent. We have a dedicated medical content team. Can we schedule a detailed consultation?\nMarcus: Yes, that would be perfect. When\'s your availability?\nAgent: I\'ll have our medical video specialist reach out to schedule within 24 hours.', duration_seconds: 210, call_type: 'inbound', metadata: { sentiment: 'very_positive', intent: 'ready_to_buy' } },
          { lead_id: leads[22].id, agent_id: 'agent_3701k6bjf9q2e5wsc1y94xbg2r3g', transcript: 'Agent: MyHorizon video production, how can I help?\nRyan: Hey, I\'m with Indie Music Label. Need music videos.\nAgent: Cool! How many artists are you looking to create videos for?\nRyan: We have 5 artists releasing albums this year.\nAgent: Are you thinking narrative videos or performance-based?\nRyan: Mix of both. Some concept videos, some live performance.\nAgent: Great. What\'s your per-video budget?\nRyan: Around $15-20K per video. Can you work with that?\nAgent: Definitely. Let me connect you with our music video director to discuss creative concepts.', duration_seconds: 165, call_type: 'inbound', metadata: { sentiment: 'positive', intent: 'price_shopping' } }
        ];

        const { error: conversationsError } = await supabase
          .from('conversations')
          .insert(sampleConversations);

        if (conversationsError) throw conversationsError;
      }

      // Generate comprehensive sample interactions
      if (leads && leads.length > 0) {
        const sampleInteractions = [
          { lead_id: leads[0].id, interaction_type: 'email', description: 'Sent initial proposal and pricing information. Included case studies from similar projects' },
          { lead_id: leads[0].id, interaction_type: 'call', description: 'Follow-up call - answered questions about timeline and deliverables' },
          { lead_id: leads[0].id, interaction_type: 'ai_conversation', description: 'AI chat conversation - discussed project requirements and budget' },
          { lead_id: leads[1].id, interaction_type: 'call', description: 'Phone consultation about documentary requirements. Discussed 3-episode structure' },
          { lead_id: leads[1].id, interaction_type: 'email', description: 'Sent production timeline and crew information' },
          { lead_id: leads[2].id, interaction_type: 'meeting', description: 'In-person meeting at their office - very interested. Met with CMO and creative director' },
          { lead_id: leads[2].id, interaction_type: 'email', description: 'Sent detailed proposal with multiple package options' },
          { lead_id: leads[3].id, interaction_type: 'meeting', description: 'Contract negotiation meeting - agreed on terms and pricing' },
          { lead_id: leads[3].id, interaction_type: 'email', description: 'Sent final contract documents for review' },
          { lead_id: leads[4].id, interaction_type: 'ai_conversation', description: 'Initial AI chat about documentary services' },
          { lead_id: leads[4].id, interaction_type: 'call', description: 'Discussed documentary production process and timeline' },
          { lead_id: leads[6].id, interaction_type: 'email', description: 'Initial outreach with portfolio and capabilities deck' },
          { lead_id: leads[6].id, interaction_type: 'call', description: 'Fashion brand consultation - discussed creative direction' },
          { lead_id: leads[7].id, interaction_type: 'call', description: 'Project kickoff call - confirmed all requirements and timelines' },
          { lead_id: leads[7].id, interaction_type: 'email', description: 'Sent kickoff documentation and project plan' },
          { lead_id: leads[8].id, interaction_type: 'meeting', description: 'Final delivery and feedback session - extremely positive response' },
          { lead_id: leads[8].id, interaction_type: 'email', description: 'Sent project wrap-up and requested testimonial' },
          { lead_id: leads[9].id, interaction_type: 'call', description: 'Discussed budget constraints and alternative approaches' },
          { lead_id: leads[11].id, interaction_type: 'ai_conversation', description: 'Website chat about health & wellness video content' },
          { lead_id: leads[11].id, interaction_type: 'email', description: 'Sent pricing packages and portfolio examples' },
          { lead_id: leads[14].id, interaction_type: 'ai_conversation', description: 'Discussed travel destination video requirements' },
          { lead_id: leads[14].id, interaction_type: 'email', description: 'Shared travel video portfolio and drone footage samples' },
          { lead_id: leads[18].id, interaction_type: 'ai_conversation', description: 'Initial conversation about pharmaceutical education videos' },
          { lead_id: leads[18].id, interaction_type: 'email', description: 'Sent medical video capabilities and compliance information' },
          { lead_id: leads[19].id, interaction_type: 'call', description: 'Real estate video consultation - luxury property focus' },
          { lead_id: leads[19].id, interaction_type: 'email', description: 'Sent real estate video packages and recent work examples' },
          { lead_id: leads[20].id, interaction_type: 'call', description: 'Sports academy promotional video discussion' },
          { lead_id: leads[22].id, interaction_type: 'ai_conversation', description: 'Music video production inquiry for multiple artists' },
          { lead_id: leads[22].id, interaction_type: 'email', description: 'Shared music video portfolio and creative concepts' },
          { lead_id: leads[33].id, interaction_type: 'call', description: 'Agricultural business video strategy consultation' },
          { lead_id: leads[34].id, interaction_type: 'call', description: 'Publishing company author interview video planning' },
          { lead_id: leads[35].id, interaction_type: 'email', description: 'Sent party supply promotional video proposal' },
          { lead_id: leads[36].id, interaction_type: 'meeting', description: 'Contract signing meeting for financial education videos' },
          { lead_id: leads[37].id, interaction_type: 'call', description: 'Fashion magazine runway coverage discussion' },
          { lead_id: leads[38].id, interaction_type: 'email', description: 'Sent HR training video library proposal' }
        ];

        const { error: interactionsError } = await supabase
          .from('interactions')
          .insert(sampleInteractions);

        if (interactionsError) throw interactionsError;
      }

      toast({
        title: 'Sample data generated!',
        description: `Created ${sampleLeads.length} leads with appointments and interactions.`
      });
      
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error generating sample data:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate sample data. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Sparkles className="h-4 w-4 mr-2" />
          Generate Sample Data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Sample Data</DialogTitle>
          <DialogDescription>
            This will create sample leads, appointments, and interactions to help you test the system.
            You can delete this data later if needed.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={generateSampleData} disabled={isGenerating}>
            {isGenerating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
