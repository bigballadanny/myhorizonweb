'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Bot, Workflow, BarChart3, Megaphone, LineChart, Layers } from 'lucide-react'
import { Button } from './ui/button'
import { smoothScrollTo } from '../hooks/useSmoothScroll'
import serviceAgentsImg from '@/assets/service-agents-web.jpg'
import serviceWorkflowsImg from '@/assets/service-workflows-web.jpg'
import serviceCrmImg from '@/assets/service-crm-web.jpg'

const featuredServices = [
  {
    id: 'agents',
    icon: Bot,
    number: '01',
    title: 'AI Agents & Voice Systems',
    description:
      'Your phones and inboxes stop being the bottleneck. Calls get answered, leads get qualified, and appointments get booked around the clock, including the hours your team is off the clock.',
    detail: 'A lead who calls at 9 pm gets a real answer and a booked appointment. Your team walks in to clean notes, not a pile of missed calls.',
    image: serviceAgentsImg,
    imageAlt: 'AI Agents & Voice Systems',
    flip: false,
  },
  {
    id: 'workflow',
    icon: Workflow,
    number: '02',
    title: 'Intelligent Workflows',
    description:
      'Your tools stop working in silos. When one thing happens, the right things follow on their own, across your CRM, calendar, email, and the rest of your stack.',
    detail: 'A booked job updates the schedule. A finished job triggers the follow-up. Nobody has to remember the steps, because the system runs them.',
    image: serviceWorkflowsImg,
    imageAlt: 'Intelligent Workflows',
    flip: true,
  },
  {
    id: 'crm',
    icon: BarChart3,
    number: '03',
    title: 'CRM & Pipeline Automation',
    description:
      'No lead sits in a spreadsheet and gets forgotten. Every lead gets scored, followed up at the right moment, and pushed toward a decision, built around how your sales team actually works.',
    detail: 'You open a pipeline that is actually current, and you can see at a glance who is close to buying and who needs a nudge today.',
    image: serviceCrmImg,
    imageAlt: 'CRM & Pipeline Automation',
    flip: false,
  },
]

const additionalServices = [
  {
    id: 'content',
    icon: Megaphone,
    title: 'Content & Marketing AI',
    description: 'Your content goes out on schedule across every channel you use. The system drafts it, schedules it, and adjusts based on what actually performs.',
  },
  {
    id: 'analytics',
    icon: LineChart,
    title: 'AI Analytics & Insights',
    description: 'You get reporting that tells you what matters and what to do next, without paying an analyst to build it or waiting a week to read it.',
  },
  {
    id: 'custom',
    icon: Layers,
    title: 'Custom AI Systems',
    description: 'When the job does not fit a product, we design and build the system around your exact operation: the agents, automations, and workflows your business actually needs.',
  },
]

export function Services() {
  const scrollToContact = () => smoothScrollTo('contact')

  return (
    <section id="services" className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-5">What We Build</p>
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mb-5">
              AI Systems That Work for You
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This is the build side of MyHorizon. When the job is bigger than a subscription, we design and build the system for you, around the work your business already does.
            </p>
          </div>
        </motion.div>

        {/* Featured services — alternating editorial layout */}
        <div className="space-y-0 mb-16">
          {featuredServices.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: service.flip ? 40 : -40, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="border-t border-border py-12 lg:py-14"
              >
                <div className={`grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start ${service.flip ? 'lg:[direction:rtl]' : ''}`}>
                  {/* Text column */}
                  <div className={service.flip ? 'lg:[direction:ltr]' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="section-label">{service.number}</span>
                    </div>
                    <h3 className="font-serif text-3xl sm:text-4xl text-foreground mb-4 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed mb-5 max-w-md">
                      {service.description}
                    </p>
                    <p className="text-base text-foreground leading-relaxed mb-6 max-w-md">
                      <span className="section-label block mb-2">What changes</span>
                      {service.detail}
                    </p>
                    <button
                      onClick={scrollToContact}
                      className="inline-flex items-center gap-2 text-accent-blue text-sm font-medium hover:gap-3 transition-all duration-200"
                    >
                      Talk to us about this
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Image column */}
                  <div className={`${service.flip ? 'lg:[direction:ltr]' : ''} flex items-start`}>
                    <div className="rounded-2xl overflow-hidden bg-card aspect-[4/3] w-full">
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
          <div className="border-t border-border" />
        </div>

        {/* Additional services — compact horizontal list */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-8">More Capabilities</p>
          <div className="grid sm:grid-cols-3 gap-0">
            {additionalServices.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  onClick={scrollToContact}
                  className="cursor-pointer group border-t border-border py-8 pr-8"
                >
                  <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center mb-5">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h3 className="font-sans font-medium text-foreground mb-2 text-base group-hover:text-accent-blue transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
            <div className="col-span-full border-t border-border" />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-foreground font-medium mb-3">Not sure where to start?</p>
          <p className="text-muted-foreground mb-6 max-w-md">
            Book a free consultation and we'll map out your automation opportunities together.
          </p>
          <Button onClick={scrollToContact} size="lg" className="bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-6 rounded-xl">
            Book a Free Consultation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
