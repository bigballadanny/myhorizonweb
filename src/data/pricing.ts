export const SIGNUP_URL = 'https://go.synthios.ai'

export interface Plan {
  name: string
  price: string
  cadence: string
  audience: string
  blurb: string
  features: string[]
  cta: string
  highlighted?: boolean
}

export const plans: Plan[] = [
  {
    name: 'Personal',
    price: '$100',
    cadence: '/mo',
    audience: 'For one owner',
    blurb: 'Your own AI agent team, working your inbox, your calendar, and your follow-ups.',
    features: [
      'Your own AI agent team',
      'Persistent memory across every conversation',
      '5-day free trial',
      'No setup fee',
    ],
    cta: 'Start your 5-day free trial',
  },
  {
    name: 'Business',
    price: '$197',
    cadence: '/mo',
    audience: 'For businesses that run on response time',
    blurb: 'The full agent team across your operation. Every lead answered, every follow-up done.',
    features: [
      'An AI agent team for your whole operation',
      'Persistent memory across every conversation',
      'Add team seats at $100 per seat/mo',
      '5-day free trial',
      'No setup fee',
    ],
    cta: 'Start your 5-day free trial',
    highlighted: true,
  },
]

export const includedInEveryPlan: string[] = [
  'Answers calls and messages so no lead waits',
  'Follows up until the job books or dies',
  'Email triage and response drafting',
  'Calendar management and scheduling',
  'Daily briefings and task prioritization',
  'Meeting prep and note-taking',
  'Remembers every customer, decision, and preference',
  'Connects inside the AI assistant app you already use',
]

export const seatsLine =
  'Add team seats at $100 per seat per month. One subscription covers every business you own.'
