export interface UseCase {
  title: string
  scenario: string
}

export interface Metric {
  value: string
  label: string
}

export interface IndustryData {
  slug: string
  name: string
  iconName: string
  tagline: string
  hook: string
  accentColor: string        // hex for inline styles
  accentColorLight: string   // light tint hex for hero bg
  ctaImage: string           // Unsplash or other premium image for CTA section
  demoUrl?: string           // live demo URL (optional)
  painPoints: { title: string; description: string }[]
  solutions: { title: string; description: string }[]
  useCases: UseCase[]
  metrics: Metric[]
}

export const industryData: Record<string, IndustryData> = {
  'med-spas': {
    slug: 'med-spas',
    name: 'Med Spas & Aesthetics',
    iconName: 'Droplets',
    tagline: 'Automated booking, follow-ups, and patient retention that keeps your chairs full.',
    hook:
      'Your treatment rooms should never sit empty. AI agents that handle booking, reminders, and re-engagement free your staff to focus on what they do best — delivering exceptional results that keep clients coming back.',
    accentColor: '#f472b6',
    accentColorLight: '#fdf2f8',
    ctaImage: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028136?q=80&w=2940&auto=format&fit=crop',
    painPoints: [
      {
        title: 'After-Hours Booking Goes Unanswered',
        description:
          'Clients browse and decide to book late in the evening — but no one is there to confirm. They move on to a competitor by morning.',
      },
      {
        title: 'No-Shows Drain Revenue',
        description:
          'Manual reminder calls take staff time and still miss people. A 20% no-show rate on a full schedule can cost thousands every month.',
      },
      {
        title: 'Lapsed Clients Aren\'t Followed Up',
        description:
          'A client who came in six months ago is likely overdue for a treatment — but without automated outreach, they quietly drift to someone else.',
      },
      {
        title: 'Intake Forms and Pre-Care Instructions Are Manual',
        description:
          'Staff spend time emailing PDFs, chasing unsigned forms, and answering the same pre-care questions over and over.',
      },
    ],
    solutions: [
      {
        title: '24/7 AI Booking Agent',
        description:
          'A conversational AI handles new appointment requests around the clock — confirming availability, collecting intake details, and sending calendar invites without any human involvement.',
      },
      {
        title: 'Smart Reminder & Confirmation Sequences',
        description:
          'Multi-touch automated sequences via SMS and email reduce no-shows dramatically. If a client doesn\'t confirm, the system follows up — and notifies staff only if human intervention is needed.',
      },
      {
        title: 'Reactivation Campaigns That Run Themselves',
        description:
          'AI identifies clients who haven\'t booked in 60, 90, or 120 days and sends personalized win-back messages at the right moment — without staff lifting a finger.',
      },
      {
        title: 'Automated Pre- and Post-Care Workflows',
        description:
          'From digital intake forms to pre-care instructions and post-treatment follow-ups, every touchpoint is automated and consistent — improving both compliance and client experience.',
      },
    ],
    useCases: [
      {
        title: 'The Late-Night Booking',
        scenario:
          'A prospective client visits your site at 11:15 PM and fills out a booking request. The AI agent confirms their appointment, sends personalized prep instructions for their filler treatment, and adds the appointment to your calendar — all before they wake up.',
      },
      {
        title: 'The Silent No-Show Prevention',
        scenario:
          'A client hasn\'t confirmed their appointment 48 hours out. The system sends an SMS, then an email, then a final reminder day-of. Confirmation rate increases — and staff only get notified when a slot truly needs to be filled.',
      },
      {
        title: 'The 90-Day Win-Back',
        scenario:
          'Your AI identifies clients who last visited over 90 days ago. It sends a personalized message referencing their last treatment and suggesting a natural next step — turning dormant contacts into booked appointments without a single staff outreach.',
      },
    ],
    metrics: [
      { value: '60%', label: 'Reduction in missed appointments' },
      { value: '3×', label: 'More after-hours bookings captured' },
      { value: '40%', label: 'Increase in client reactivation rate' },
      { value: '8 hrs', label: 'Staff time saved per week on admin' },
    ],
  },

  'trades': {
    slug: 'trades',
    name: 'Trades & Home Services',
    iconName: 'Wrench',
    tagline: 'Lead gen that books jobs while you\'re on the job — no missed calls, no lost estimates.',
    hook:
      'Every unanswered call is revenue walking out the door. AI systems built for trades businesses capture, qualify, and schedule leads automatically — so you close more jobs without hiring a dispatcher.',
    accentColor: '#fb923c',
    accentColorLight: '#fff7ed',
    ctaImage: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2938&auto=format&fit=crop',
    painPoints: [
      {
        title: 'Missed Calls Mean Missed Revenue',
        description:
          'When you\'re on a job site, you can\'t answer the phone. But homeowners move fast — they\'ll call the next contractor on the list if no one picks up.',
      },
      {
        title: 'Estimates Pile Up Without Follow-Through',
        description:
          'You send quotes and hear nothing. Without a systematic follow-up process, warm leads go cold and competitors win the job.',
      },
      {
        title: 'Scheduling Is a Constant Coordination Headache',
        description:
          'Managing technician availability, customer windows, and job changes via text and phone is chaotic, error-prone, and eats hours every week.',
      },
      {
        title: 'Reviews Are an Afterthought',
        description:
          'Happy customers rarely leave reviews without being asked. Your online reputation — and local search ranking — suffers as a result.',
      },
    ],
    solutions: [
      {
        title: 'AI Lead Capture & Triage',
        description:
          'Every inbound call, text, or form submission gets an immediate response. The AI qualifies the lead, captures job details, and schedules an estimate — automatically.',
      },
      {
        title: 'Automated Estimate Follow-Up',
        description:
          'After you send a quote, a multi-touch follow-up sequence runs on autopilot — nudging the homeowner at the right intervals without you having to remember to call.',
      },
      {
        title: 'Smart Scheduling Workflows',
        description:
          'AI syncs with your calendar, sends confirmation and reminder texts to customers, and handles rescheduling requests — reducing no-shows and back-and-forth.',
      },
      {
        title: 'Post-Job Review Automation',
        description:
          'After a job is marked complete, the system sends a personalized thank-you and review request. You capture the feedback you\'ve earned without having to ask manually.',
      },
    ],
    useCases: [
      {
        title: 'The Job Site Call',
        scenario:
          'A homeowner calls while you\'re on a roof. Instead of voicemail, they reach an AI that asks what they need, captures their address and problem description, and schedules a same-week estimate — texting them a confirmation before you even climb down.',
      },
      {
        title: 'The Cold Estimate',
        scenario:
          'You quoted a bathroom remodel on Monday. By Thursday, the AI has already sent two follow-ups, answered a question about timeline, and nudged the homeowner to schedule. You get a "let\'s move forward" text while you\'re eating lunch.',
      },
      {
        title: 'The 5-Star Sequence',
        scenario:
          'Two hours after your crew wraps a HVAC install, the homeowner gets a personalized text thanking them and asking for a Google review. Your rating climbs — and so does your local search rank.',
      },
    ],
    metrics: [
      { value: '45%', label: 'More leads captured after hours' },
      { value: '30%', label: 'Higher estimate close rate with follow-up' },
      { value: '2×', label: 'Increase in 5-star reviews per month' },
      { value: '10 hrs', label: 'Saved weekly on scheduling coordination' },
    ],
  },

  'construction': {
    slug: 'construction',
    name: 'Construction',
    iconName: 'HardHat',
    tagline: 'Bid tracking, subcontractor coordination, and client updates running on autopilot.',
    hook:
      'Construction projects move fast and involve dozens of moving parts. AI workflows keep bids organized, subs coordinated, and clients informed — without adding headcount to your back office.',
    accentColor: '#fbbf24',
    accentColorLight: '#fffbeb',
    ctaImage: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2940&auto=format&fit=crop',
    painPoints: [
      {
        title: 'Bid Tracking Lives in Spreadsheets (or Nowhere)',
        description:
          'Proposals go out and then fall into a black hole. Without systematic follow-up, deals stall and you don\'t know why until it\'s too late.',
      },
      {
        title: 'Sub Coordination Is Constant Back-and-Forth',
        description:
          'Confirming schedules, collecting insurance certs, and chasing invoices from subcontractors consumes hours of project manager time every week.',
      },
      {
        title: 'Clients Feel Left in the Dark',
        description:
          'Homeowners and commercial clients want progress updates — but generating them manually is time-consuming, so it usually doesn\'t happen consistently.',
      },
      {
        title: 'Change Orders Are a Documentation Mess',
        description:
          'Verbal scope changes don\'t get documented. This leads to disputes, unpaid work, and strained relationships at project close.',
      },
    ],
    solutions: [
      {
        title: 'Automated Bid Pipeline Management',
        description:
          'Track every proposal from submission to decision. Automated follow-up sequences keep you top of mind without manual effort — and give you clear visibility into win/loss patterns.',
      },
      {
        title: 'Subcontractor Coordination Workflows',
        description:
          'AI-driven workflows collect insurance docs, send schedule confirmations, and flag missing information before it becomes a project delay.',
      },
      {
        title: 'Client Progress Update Automation',
        description:
          'Weekly or milestone-based updates go out automatically — keeping clients informed, managing expectations, and reducing inbound "how\'s it going?" calls.',
      },
      {
        title: 'Digital Change Order System',
        description:
          'Scope changes are captured, documented, and sent for approval instantly. Every change order is logged and traceable — protecting your margin and your relationships.',
      },
    ],
    useCases: [
      {
        title: 'The Bid That Didn\'t Fall Through the Cracks',
        scenario:
          'You submit a commercial build proposal on a Tuesday. The AI sends a follow-up on day 5, another on day 10, and flags the bid for personal outreach when there\'s still no decision by day 14. You close the contract while a competitor\'s proposal sits forgotten.',
      },
      {
        title: 'The Sub Who Almost Missed Start Day',
        scenario:
          'Your framing crew hasn\'t confirmed their start date three days out. The system pings them automatically, escalates to your PM when there\'s no response, and has the issue resolved before it becomes a delay.',
      },
      {
        title: 'The Client Who Stayed Calm',
        scenario:
          'A homeowner renovation takes 10 weeks. Every Friday, they get an automated progress update with photos, next week\'s plan, and a note from you. Zero "what\'s going on?" calls — and a referral at project end.',
      },
    ],
    metrics: [
      { value: '35%', label: 'Improvement in bid close rate' },
      { value: '50%', label: 'Reduction in sub coordination time' },
      { value: '80%', label: 'Fewer "status update" client calls' },
      { value: '12 hrs', label: 'PM hours saved per project' },
    ],
  },

  'professional-services': {
    slug: 'professional-services',
    name: 'Professional Services',
    iconName: 'Briefcase',
    tagline: 'Client intake, document automation, and follow-up sequences built around how you work.',
    hook:
      'Every hour you spend on intake, proposals, and follow-ups is an hour you\'re not billing. AI systems built for law firms, CPAs, consultants, and agencies turn your back office into a machine — while keeping the client experience genuinely personal.',
    accentColor: '#64748b',
    accentColorLight: '#f8fafc',
    ctaImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop',
    painPoints: [
      {
        title: 'Intake Is Repetitive and Time-Consuming',
        description:
          'New client onboarding involves collecting the same information every time — via email, phone, and PDF. The process is slow, inconsistent, and drains staff capacity.',
      },
      {
        title: 'Proposals Don\'t Get Followed Up Systematically',
        description:
          'After a discovery call, the proposal goes out and nothing happens until the prospect gets back to you — if they do. Most deals are lost in the silence.',
      },
      {
        title: 'Document Collection Is a Chase',
        description:
          'Getting signed agreements, financial statements, and supporting docs from clients means repeated emails and calls. Delays cascade into project timelines.',
      },
      {
        title: 'Client Communication Falls Through the Cracks',
        description:
          'When you\'re heads-down on billable work, check-ins and status updates get deprioritized — leading to clients who feel neglected even when the work is excellent.',
      },
    ],
    solutions: [
      {
        title: 'Automated Intake & Onboarding Flows',
        description:
          'A structured intake process collects every piece of information you need — automatically. Clients complete forms on their own time, and your team starts engaged rather than chasing paperwork.',
      },
      {
        title: 'Proposal Follow-Up Sequences',
        description:
          'AI-driven follow-up keeps you top of mind after every proposal — personalizing messages based on the prospect\'s profile and timing follow-ups intelligently.',
      },
      {
        title: 'Document Request Automation',
        description:
          'Automated reminders go out when documents are due or overdue. Clients get friendly nudges, and your team gets a live dashboard of what\'s collected and what\'s missing.',
      },
      {
        title: 'Relationship Touchpoint Cadences',
        description:
          'Scheduled check-ins, milestone updates, and seasonal value-adds go out automatically — keeping client relationships warm without adding to your calendar.',
      },
    ],
    useCases: [
      {
        title: 'The Frictionless First Week',
        scenario:
          'A new consulting client signs their agreement Monday morning. By afternoon, they\'ve received an automated welcome sequence, a link to complete their intake form, and a calendar invite for their kickoff call. Your team starts the engagement with everything they need.',
      },
      {
        title: 'The Proposal That Closed Itself',
        scenario:
          'A law firm sends an engagement letter after a discovery call. Three days later, the prospect gets a personalized follow-up. Day 7, another. On day 9, they sign — without anyone at the firm making a single call.',
      },
      {
        title: 'The Client Who Felt Cared For',
        scenario:
          'A CPA firm uses quarterly automated check-ins to touch base with every client — not about tax season, just to ask how things are going. Referrals increase because clients feel like they matter, not just at filing time.',
      },
    ],
    metrics: [
      { value: '70%', label: 'Reduction in intake processing time' },
      { value: '25%', label: 'Higher proposal acceptance rate' },
      { value: '90%', label: 'On-time document collection rate' },
      { value: '6 hrs', label: 'Saved weekly per senior team member' },
    ],
  },

  'real-estate': {
    slug: 'real-estate',
    name: 'Real Estate',
    iconName: 'Home',
    tagline: 'AI agents that qualify leads and schedule showings 24/7 — even when you\'re showing another property.',
    hook:
      'The best real estate agents win on speed and follow-up. AI systems that instantly respond to inquiries, qualify buyers and sellers, and schedule showings let you compete at a level that used to require a full team.',
    accentColor: '#10b981',
    accentColorLight: '#f0fdf4',
    ctaImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2873&auto=format&fit=crop',
    painPoints: [
      {
        title: 'Leads Go Cold Before You Call Back',
        description:
          'A Zillow or website inquiry that doesn\'t get a response within 5 minutes has a dramatically lower chance of converting. But agents can\'t always respond instantly.',
      },
      {
        title: 'Lead Qualification Wastes Showing Time',
        description:
          'Unqualified buyers take up showing slots that should go to serious prospects. Without an automated screening process, you end up showing homes to people who aren\'t ready to buy.',
      },
      {
        title: 'Past Client Follow-Up Doesn\'t Happen',
        description:
          'Your past clients are your best source of referrals — but staying in touch consistently without a system is nearly impossible when you\'re working active deals.',
      },
      {
        title: 'Open House Follow-Up Falls Off',
        description:
          'You collect sign-in sheets at open houses and then life gets in the way. Those warm contacts rarely get the systematic follow-up they need to convert.',
      },
    ],
    solutions: [
      {
        title: 'Instant AI Lead Response',
        description:
          'Every inbound inquiry gets an immediate, personalized response — within seconds — even at 2 AM. The AI gathers key information and keeps the conversation going until the lead is ready to talk to you.',
      },
      {
        title: 'Automated Buyer & Seller Qualification',
        description:
          'AI asks the right questions to determine timeline, financing status, motivation, and needs — surfacing truly qualified leads and routing them appropriately.',
      },
      {
        title: 'Showing Scheduling & Confirmation',
        description:
          'Qualified buyers can self-schedule showings directly into your calendar. Automated confirmations and reminders reduce no-shows and keep logistics clean.',
      },
      {
        title: 'Long-Term Drip Nurture',
        description:
          'Leads who aren\'t ready to move now stay in an intelligent nurture sequence — receiving market updates, relevant listings, and helpful content until they\'re ready to act.',
      },
    ],
    useCases: [
      {
        title: 'The 11 PM Zillow Lead',
        scenario:
          'A prospective buyer submits an inquiry on Zillow at 11:07 PM. Within 30 seconds, they get a personalized response asking about their timeline and financing. By 11:15, they\'ve been qualified and offered three showing times. You wake up to a confirmed appointment.',
      },
      {
        title: 'The Open House Conversion',
        scenario:
          'Fourteen people sign in at your open house Saturday. By Sunday morning, all fourteen have received a personalized follow-up. Over the next two weeks, the three serious buyers book showings automatically — without you making a single call.',
      },
      {
        title: 'The 18-Month Referral',
        scenario:
          'A buyer who wasn\'t ready to purchase 18 months ago has been receiving monthly market updates. When they\'re finally ready, they think of you first — because your name has been consistently in their inbox.',
      },
    ],
    metrics: [
      { value: '5×', label: 'Faster initial lead response time' },
      { value: '55%', label: 'More showings booked from online leads' },
      { value: '3×', label: 'Increase in past client referrals' },
      { value: '15 hrs', label: 'Saved weekly on lead management' },
    ],
  },

  'small-business': {
    slug: 'small-business',
    name: 'General Small Business',
    iconName: 'Store',
    tagline: 'Custom AI systems built around your exact operation, whatever that looks like.',
    hook:
      'You don\'t need to be a tech company to run like one. AI systems built around your specific workflows automate the repetitive work, surface the right information at the right time, and help you scale without burning out.',
    accentColor: '#3b82f6',
    accentColorLight: '#eff6ff',
    ctaImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2940&auto=format&fit=crop',
    painPoints: [
      {
        title: 'You\'re Doing the Work of Three People',
        description:
          'As a small business owner, you wear every hat. The admin, follow-up, and communication work that should be handled by a team falls on you — limiting what you can actually grow.',
      },
      {
        title: 'Customer Inquiries Don\'t Get Fast Enough Responses',
        description:
          'When a potential customer doesn\'t hear back quickly, they find someone who responds faster. Every delayed reply is a potential lost sale.',
      },
      {
        title: 'There\'s No System for Repeat Business',
        description:
          'Past customers are your highest-value audience — but without an automated follow-up and re-engagement strategy, you\'re leaving revenue on the table.',
      },
      {
        title: 'Operations Run on Tribal Knowledge',
        description:
          'Processes live in your head or on sticky notes. When something goes wrong — or someone new joins — there\'s no system to fall back on.',
      },
    ],
    solutions: [
      {
        title: 'Custom AI Customer Communication Layer',
        description:
          'Whether it\'s a website chat, inbound text, or email, AI handles first contact — answering questions, capturing lead info, and routing people appropriately.',
      },
      {
        title: 'Automated Follow-Up for Every Lead',
        description:
          'Every inquiry that comes in gets a systematic follow-up sequence — no leads fall through the cracks, regardless of how busy you are.',
      },
      {
        title: 'Repeat Business & Loyalty Automation',
        description:
          'Automated re-engagement campaigns reach past customers at the right intervals — bringing them back without you having to remember who to call.',
      },
      {
        title: 'Operations Documentation & Process Automation',
        description:
          'We help you turn your institutional knowledge into documented, automated workflows — so your business can operate consistently, even when you\'re not there.',
      },
    ],
    useCases: [
      {
        title: 'The Owner Who Slept In',
        scenario:
          'A retail shop owner usually answers customer emails first thing in the morning. Their AI handles overnight inquiries automatically — so they wake up to organized, responded-to threads instead of a backlog.',
      },
      {
        title: 'The 60-Day Reminder',
        scenario:
          'A pet grooming shop uses AI to automatically follow up with every client 6 weeks after their last visit. Re-booking rates increase significantly without anyone having to maintain a call list.',
      },
      {
        title: 'The Consistent Onboarding Experience',
        scenario:
          'A small marketing agency uses automated workflows to onboard every new client identically — collecting assets, setting expectations, and scheduling calls — regardless of which team member is point.',
      },
    ],
    metrics: [
      { value: '50%', label: 'Reduction in time spent on admin tasks' },
      { value: '35%', label: 'Increase in repeat customer revenue' },
      { value: '2×', label: 'Faster response time to new inquiries' },
      { value: '20 hrs', label: 'Owner hours saved per month' },
    ],
  },

  'underwriters': {
    slug: 'underwriters',
    name: 'Underwriters',
    iconName: 'ShieldCheck',
    tagline: 'AI-powered risk assessment, automated document analysis, and faster approvals with fewer errors.',
    hook:
      'Modern underwriting is a race between speed and precision. AI systems that analyze submissions, surface risk signals, and automate decision support let your team process more volume without compromising accuracy.',
    accentColor: '#a855f7',
    accentColorLight: '#faf5ff',
    ctaImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66cb85?q=80&w=2940&auto=format&fit=crop',
    painPoints: [
      {
        title: 'Submission Review Is Manual and Slow',
        description:
          'Reviewing each submission for completeness, risk factors, and eligibility is time-intensive. High volumes create backlogs that slow decisions and frustrate brokers.',
      },
      {
        title: 'Inconsistency Across Underwriters',
        description:
          'Different underwriters apply guidelines differently, creating inconsistent decisions and compliance risk — especially as teams grow or turn over.',
      },
      {
        title: 'Document Extraction Is a Bottleneck',
        description:
          'Pulling key data from loss runs, financial statements, and applications manually is slow, error-prone, and delays quoting.',
      },
      {
        title: 'Brokers Don\'t Get Fast Enough Feedback',
        description:
          'When submissions sit in a queue, brokers go elsewhere. Turnaround time is a competitive differentiator — and delays cost market share.',
      },
    ],
    solutions: [
      {
        title: 'Automated Submission Triage',
        description:
          'AI pre-screens submissions for completeness and flags missing information before it reaches an underwriter — keeping workflows moving and reducing back-and-forth.',
      },
      {
        title: 'Intelligent Document Extraction',
        description:
          'AI extracts structured data from loss runs, financial statements, and application forms — feeding it directly into your systems and surfacing the signals that matter most.',
      },
      {
        title: 'Decision Support & Risk Scoring',
        description:
          'AI surfaces relevant risk factors, benchmarks submissions against historical data, and provides underwriters with a structured risk summary — so they can make better decisions faster.',
      },
      {
        title: 'Broker Communication Automation',
        description:
          'Automated status updates, missing information requests, and quote delivery notifications keep brokers informed and engaged — without adding to underwriter workload.',
      },
    ],
    useCases: [
      {
        title: 'The 2-Hour Quote',
        scenario:
          'A commercial lines submission comes in at 9 AM. AI pre-screens it for completeness, extracts loss run data, flags two items for clarification, and delivers a risk summary to the underwriter by 9:30. Quote goes out by 11 AM. Broker is impressed.',
      },
      {
        title: 'The Consistent Decision',
        scenario:
          'A mid-size carrier uses AI to ensure every submission runs through the same screening criteria — regardless of which underwriter handles it. Consistency improves, and audit trails become automatic.',
      },
      {
        title: 'The Broker Who Stayed',
        scenario:
          'Automated acknowledgment and status updates ensure brokers hear something within hours of submission — even when the full review takes days. Broker retention increases because the experience feels faster and more professional.',
      },
    ],
    metrics: [
      { value: '65%', label: 'Faster submission turnaround time' },
      { value: '40%', label: 'Reduction in manual data entry' },
      { value: '30%', label: 'Improvement in underwriting consistency' },
      { value: '3×', label: 'More submissions processed per underwriter' },
    ],
  },

  'ma-due-diligence': {
    slug: 'ma-due-diligence',
    name: 'M&A & Due Diligence',
    iconName: 'FileSearch',
    tagline: 'Deal analysis, financial modeling, and automated quality of earnings reports in a fraction of the time.',
    hook:
      'The best deals go to the buyers who move fastest without sacrificing rigor. AI systems that automate financial extraction, normalize EBITDA, and surface risk signals let your team evaluate more opportunities — and close with confidence.',
    accentColor: '#eab308',
    accentColorLight: '#fefce8',
    ctaImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2940&auto=format&fit=crop',
    demoUrl: 'https://dealflow-lite-143312280982.us-central1.run.app',
    painPoints: [
      {
        title: 'CIM Analysis Takes Days',
        description:
          'Reading, extracting, and synthesizing data from Confidential Information Memorandums is time-consuming. Your team can only look at so many deals at once.',
      },
      {
        title: 'Financial Normalization Is Manual and Error-Prone',
        description:
          'Owner compensation, one-time expenses, and related-party transactions must be identified and adjusted manually — a slow process with real risk of missing something.',
      },
      {
        title: 'Due Diligence Is a Documentation Marathon',
        description:
          'Tracking what\'s been reviewed, what\'s outstanding, and where the risks are across hundreds of documents requires a system most teams don\'t have.',
      },
      {
        title: 'Deal Flow Outpaces Capacity',
        description:
          'The market moves fast. When your team is buried in one deal, other opportunities pass. Scaling deal volume without scaling headcount requires automation.',
      },
    ],
    solutions: [
      {
        title: 'Automated CIM Extraction & Summarization',
        description:
          'AI extracts financial data, business model details, and key metrics from CIMs in minutes — delivering a structured summary that lets your team evaluate fit quickly.',
      },
      {
        title: 'EBITDA Normalization Engine',
        description:
          'AI identifies and categorizes add-backs, adjusts for owner comp and one-time items, and produces a normalized EBITDA analysis — consistent, traceable, and fast.',
      },
      {
        title: 'AI-Assisted Quality of Earnings',
        description:
          'Automated QoE workflows analyze revenue quality, customer concentration, and working capital trends — surfacing the risk factors that matter before you go under LOI.',
      },
      {
        title: 'Due Diligence Tracking & Risk Flagging',
        description:
          'Structured checklists, automated document requests, and AI-powered risk flagging keep deals moving and ensure nothing important is missed.',
      },
    ],
    useCases: [
      {
        title: 'The 15-Minute Deal Screen',
        scenario:
          'A CIM lands in your inbox. AI extracts the financials, summarizes the business model, calculates a preliminary valuation range, and flags three due diligence questions — all before your first coffee.',
      },
      {
        title: 'The Clean Add-Back Report',
        scenario:
          'Your team is evaluating a $3M EBITDA business. AI ingests three years of financial statements, identifies $340K in owner add-backs, and produces a normalized analysis with full line-item justification. QoE that used to take a week takes a day.',
      },
      {
        title: 'The Deal That Almost Got Missed',
        scenario:
          'Your firm is tracking 40 active opportunities. AI surfaces a deal that matches your acquisition criteria exactly — one that would have been lost in the noise without systematic screening.',
      },
    ],
    metrics: [
      { value: '75%', label: 'Reduction in initial deal screening time' },
      { value: '5×', label: 'More deals evaluated per analyst' },
      { value: '2 days', label: 'Average QoE production time (down from 2 weeks)' },
      { value: '95%', label: 'Add-back capture accuracy vs. manual review' },
    ],
  },

  'financial-services': {
    slug: 'financial-services',
    name: 'Financial Services',
    iconName: 'TrendingUp',
    tagline: 'Portfolio analytics, compliance automation, and client reporting that runs itself.',
    hook:
      'In financial services, trust is built through transparency and consistency. AI systems that automate reporting, surface portfolio insights, and manage compliance workflows let your advisors spend more time on what clients actually pay for — strategic guidance.',
    accentColor: '#14b8a6',
    accentColorLight: '#f0fdfa',
    ctaImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
    painPoints: [
      {
        title: 'Client Reporting Is a Monthly Grind',
        description:
          'Generating performance reports, pulling account data, and formatting client-ready documents takes days of staff time every month — at the expense of higher-value work.',
      },
      {
        title: 'Compliance Documentation Is a Constant Burden',
        description:
          'Meeting notes, disclosure requirements, and audit trails must be documented consistently — but the manual process is time-consuming and inconsistently applied.',
      },
      {
        title: 'Advisors Are Reactive, Not Proactive',
        description:
          'Without automated portfolio monitoring, advisors only spot issues when clients call. Proactive outreach — the kind that builds loyalty — rarely happens systematically.',
      },
      {
        title: 'Client Onboarding Is Slow and Manual',
        description:
          'New account opening involves collecting the same documentation repeatedly, with follow-ups happening via email and phone rather than automated workflows.',
      },
    ],
    solutions: [
      {
        title: 'Automated Client Reporting',
        description:
          'AI pulls portfolio data, calculates performance metrics, and generates client-ready reports on a scheduled basis — freeing staff from the monthly reporting grind.',
      },
      {
        title: 'Compliance Workflow Automation',
        description:
          'Meeting notes get structured automatically, disclosure workflows are triggered at the right moments, and audit trails are maintained without manual intervention.',
      },
      {
        title: 'Portfolio Monitoring & Proactive Alerts',
        description:
          'AI monitors portfolios against defined thresholds and automatically notifies advisors when action may be warranted — enabling proactive client communication.',
      },
      {
        title: 'Digital Client Onboarding',
        description:
          'Structured intake workflows collect documentation, verify completeness, and guide new clients through onboarding — reducing time-to-account and improving first impressions.',
      },
    ],
    useCases: [
      {
        title: 'The Report That Wrote Itself',
        scenario:
          'At the start of every month, 200 client reports are generated automatically — pulling live data, applying the firm\'s formatting, and delivering to clients via secure portal. Your team reviews the exceptions, not the reports.',
      },
      {
        title: 'The Proactive Call',
        scenario:
          'A client\'s portfolio drifts outside its target allocation during a volatile week. The AI flags it, generates a rebalancing recommendation summary, and drafts an outreach message. The advisor makes one call — and the client is grateful they heard from you first.',
      },
      {
        title: 'The New Client Who Felt Like a Priority',
        scenario:
          'A new client signs an advisory agreement Friday afternoon. By Monday, they\'ve completed their onboarding digitally, their accounts are linked, and they\'ve received a welcome communication. No waiting, no chasing — just a smooth start.',
      },
    ],
    metrics: [
      { value: '80%', label: 'Reduction in reporting preparation time' },
      { value: '40%', label: 'Improvement in compliance documentation completeness' },
      { value: '3×', label: 'More proactive client touchpoints per month' },
      { value: '50%', label: 'Faster client onboarding time' },
    ],
  },
}
