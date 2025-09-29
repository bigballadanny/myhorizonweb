'use client'

import { ImageWithFallback } from './figma/ImageWithFallback'
import teamMember1 from '../assets/team-member-1.png'
import teamMember2 from '../assets/team-member-2.png'
import teamMember3 from '../assets/team-member-3.png'
import teamMember4 from '../assets/team-member-4.png'
import teamMember5 from '../assets/team-member-5.png'
import teamMember6 from '../assets/team-member-6.png'
import teamMember7 from '../assets/team-member-7.png'

export function Team() {
  const industries = [
    {
      name: "E-Commerce & Retail",
      capability: "CART-TO-CHECKOUT AUTOMATION",
      impact: "24/7 SALES SUPPORT",
      description: "Notorious for automating entire customer journeys from product discovery to post-purchase. Armed with AI chatbots that understand product catalogs, inventory APIs that prevent overselling, and checkout flows that never sleep.",
      image: teamMember1,
      rotation: 'rotate-3',
    },
    {
      name: "Real Estate",
      capability: "LEAD-TO-CLOSE INTELLIGENCE",
      impact: "INSTANT PROPERTY MATCHING",
      description: "Wanted for transforming property searches into instant matches. Master of CRM automation, appointment scheduling, and AI assistants that qualify leads while agents sleep. Warning: Can nurture 1000 leads simultaneously.",
      image: teamMember2,
      rotation: 'rotate-2',
    },
    {
      name: "Professional Services",
      capability: "CONSULTATION-TO-INVOICE FLOW",
      impact: "AUTOMATED EXPERTISE DELIVERY",
      description: "Mastermind of scheduling automation, document generation, and client communication systems. Wanted for making consultants look like they have 48-hour days. Expert in calendar sync, proposal automation, and follow-up sequences.",
      image: teamMember3,
      rotation: 'rotate-2',
    },
    {
      name: "Healthcare & Wellness",
      capability: "PATIENT JOURNEY OPTIMIZATION",
      impact: "ALWAYS-ON CARE COORDINATION",
      description: "Notorious for automating appointment reminders, prescription refills, and patient education. Wanted for making healthcare providers accessible 24/7. Master of HIPAA-compliant systems and telehealth integration. Side effects: happier patients.",
      image: teamMember4,
      rotation: '-rotate-2',
    },
    {
      name: "Financial Services",
      capability: "DATA-TO-DECISION ACCELERATION",
      impact: "INTELLIGENT FINANCIAL ANALYSIS",
      description: "Wanted for transforming spreadsheets into insights, reports into predictions, and data chaos into strategic advantage. Armed with custom dashboards, automated compliance checks, and AI-powered anomaly detection that never misses a red flag.",
      image: teamMember5,
      rotation: 'rotate-1',
    },
    {
      name: "Manufacturing",
      capability: "PRODUCTION-TO-DELIVERY TRACKING",
      impact: "SUPPLY CHAIN INTELLIGENCE",
      description: "Wanted for connecting legacy systems, IoT sensors, and ERP platforms into unified automation. Master of inventory forecasting, quality control alerts, and predictive maintenance systems. Known for eliminating stockouts and downtime.",
      image: teamMember6,
      rotation: '-rotate-1',
    },
    {
      name: "Hospitality & Tourism",
      capability: "GUEST EXPERIENCE ORCHESTRATION",
      impact: "SEAMLESS SERVICE DELIVERY",
      description: "Notorious for automating reservations, check-ins, concierge services, and guest communications. Wanted for making every interaction feel personalized at scale. Can handle 1000 simultaneous guest requests without breaking a sweat.",
      image: teamMember7,
      rotation: 'rotate-3',
    }
  ]

  return (
    <div className="relative py-32 bg-background w-full" style={{ 
      overflow: 'visible', 
      height: 'auto', 
      minHeight: '0', 
      maxHeight: 'none' 
    }}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12" style={{ 
        overflow: 'visible', 
        height: 'auto', 
        minHeight: '0', 
        maxHeight: 'none' 
      }}>
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              Industries We Transform
            </span>
            <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-8 text-foreground">
            <span className="block mb-2">These Sectors Are</span>
            <span className="block text-primary">AUTOMATED</span>
          </h2>
          
          <p className="text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Highly optimized and intelligently powered
          </p>
        </div>

        {/* Framed Industry Board */}
        <div className="max-w-7xl mx-auto" style={{ 
          overflow: 'visible', 
          height: 'auto', 
          minHeight: '0', 
          maxHeight: 'none' 
        }}>
          <div className="relative" style={{ 
            overflow: 'visible', 
            height: 'auto', 
            minHeight: '0', 
            maxHeight: 'none' 
          }}>
            
            {/* Modern Frame */}
            <div className="bg-gradient-to-br from-card via-card/95 to-card p-8 rounded-2xl shadow-2xl relative border border-primary/20" style={{ 
              overflow: 'visible', 
              height: 'auto', 
              minHeight: '0', 
              maxHeight: 'none' 
            }}>
              
              {/* Frame texture */}
              <div className="absolute inset-0 opacity-15"
                   style={{
                     backgroundImage: `
                       linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, transparent 50%, hsl(var(--foreground) / 0.05) 100%),
                       radial-gradient(circle at 25% 25%, hsl(var(--background) / 0.03) 0%, transparent 50%),
                       radial-gradient(circle at 75% 75%, hsl(var(--foreground) / 0.05) 0%, transparent 50%)
                     `,
                     backgroundSize: '60px 60px, 100px 100px, 80px 80px'
                   }} />
              
              {/* Modern Board Background */}
              <div className="bg-gradient-to-br from-background via-background/95 to-background rounded-xl p-8 relative border border-border/50" style={{ 
                overflow: 'visible', 
                height: 'auto', 
                minHeight: '0', 
                maxHeight: 'none' 
              }}>
                
                {/* Subtle texture */}
                <div className="absolute inset-0 opacity-30"
                     style={{
                       backgroundImage: `
                         radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.03) 1px, transparent 1px),
                         radial-gradient(circle at 70% 70%, hsl(var(--accent) / 0.02) 1px, transparent 1px),
                         linear-gradient(135deg, hsl(var(--muted) / 0.1) 0%, transparent 50%, hsl(var(--muted) / 0.1) 100%)
                       `,
                       backgroundSize: '30px 30px, 45px 45px, 100% 100%'
                     }} />

                {/* Industry Cards Grid */}
                <div className="relative z-10" style={{ 
                  overflow: 'visible', 
                  height: 'auto', 
                  minHeight: '0', 
                  maxHeight: 'none' 
                }}>
                  {/* First row - 4 cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-8" style={{ 
                    overflow: 'visible', 
                    height: 'auto', 
                    minHeight: '0', 
                    maxHeight: 'none' 
                  }}>
                    {industries.slice(0, 4).map((industry, index) => (
                      <div
                        key={industry.name}
                        className={`group transform ${industry.rotation} hover:rotate-0 transition-all duration-500 hover:scale-105 hover:z-20`}
                        style={{
                          filter: `drop-shadow(4px 4px 8px hsl(var(--foreground) / 0.2))`,
                          overflow: 'visible',
                          height: 'auto',
                          minHeight: '0',
                          maxHeight: 'none'
                        }}
                      >
                        
                        {/* Industry Card */}
                        <div className="bg-gradient-to-b from-card to-muted border-4 border-primary/30 relative shadow-lg" style={{ 
                          overflow: 'visible', 
                          height: 'auto', 
                          minHeight: '0', 
                          maxHeight: 'none' 
                        }}>
                          
                          {/* Modern pins */}
                          <div className="absolute -top-2 left-4 w-4 h-4 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-lg border border-primary/70" />
                          <div className="absolute -top-2 right-4 w-4 h-4 bg-gradient-to-br from-accent to-accent/80 rounded-full shadow-lg border border-accent/70" />
                          
                          {/* Subtle effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                          <div className="absolute top-4 right-4 w-6 h-6 bg-primary/10 rounded-full" />
                          <div className="absolute bottom-6 left-4 w-4 h-4 bg-accent/10 rounded-full" />

                          <div className="p-6 text-center relative z-10">
                            
                            {/* AUTOMATED Header */}
                            <div className="mb-4">
                              <h3 className="text-3xl font-black text-primary mb-2"
                                  style={{ 
                                    fontFamily: 'serif',
                                    letterSpacing: '0.1em'
                                  }}>
                                AUTOMATED
                              </h3>
                              <div className="w-full h-0.5 bg-primary mb-2" />
                            </div>

                            {/* Image */}
                            <div className="relative mb-4 mx-auto w-32 h-32 border-2 border-primary bg-muted rounded-sm" style={{ 
                              overflow: 'visible' 
                            }}>
                              <ImageWithFallback
                                src={industry.image}
                                alt={industry.name}
                                className="w-full h-full object-cover rounded-sm opacity-90 group-hover:opacity-100 transition-opacity"
                                style={{
                                  filter: 'contrast(105%) brightness(100%) saturate(95%)'
                                }}
                              />
                              
                              {/* Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                              
                              {/* Tech Icon */}
                              <div className="absolute bottom-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                AI
                              </div>
                            </div>

                            {/* Details */}
                            <div className="text-left space-y-2" style={{ fontFamily: 'serif' }}>
                              <div className="font-black text-lg text-foreground">{industry.name}</div>
                              <div className="font-bold text-primary text-base">CAPABILITY: {industry.capability}</div>
                              <div className="font-bold text-accent text-sm">IMPACT: {industry.impact}</div>
                              <div className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-3 border-l-2 border-primary">
                                {industry.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Second row - 3 cards centered */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-5xl mx-auto" style={{ 
                    overflow: 'visible', 
                    height: 'auto', 
                    minHeight: '0', 
                    maxHeight: 'none' 
                  }}>
                    {industries.slice(4, 7).map((industry, index) => (
                      <div
                        key={industry.name}
                        className={`group transform ${industry.rotation} hover:rotate-0 transition-all duration-500 hover:scale-105 hover:z-20`}
                        style={{
                          filter: `drop-shadow(4px 4px 8px hsl(var(--foreground) / 0.2))`,
                          overflow: 'visible',
                          height: 'auto',
                          minHeight: '0',
                          maxHeight: 'none'
                        }}
                      >
                        
                        {/* Industry Card */}
                        <div className="bg-gradient-to-b from-card to-muted border-4 border-primary/30 relative shadow-lg" style={{ 
                          overflow: 'visible', 
                          height: 'auto', 
                          minHeight: '0', 
                          maxHeight: 'none' 
                        }}>
                          
                          {/* Modern pins */}
                          <div className="absolute -top-2 left-4 w-4 h-4 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-lg border border-primary/70" />
                          <div className="absolute -top-2 right-4 w-4 h-4 bg-gradient-to-br from-accent to-accent/80 rounded-full shadow-lg border border-accent/70" />
                          
                          {/* Subtle effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                          <div className="absolute top-4 right-4 w-6 h-6 bg-primary/10 rounded-full" />
                          <div className="absolute bottom-6 left-4 w-4 h-4 bg-accent/10 rounded-full" />

                          <div className="p-6 text-center relative z-10">
                            
                            {/* AUTOMATED Header */}
                            <div className="mb-4">
                              <h3 className="text-3xl font-black text-primary mb-2"
                                  style={{ 
                                    fontFamily: 'serif',
                                    letterSpacing: '0.1em'
                                  }}>
                                AUTOMATED
                              </h3>
                              <div className="w-full h-0.5 bg-primary mb-2" />
                            </div>

                            {/* Image */}
                            <div className="relative mb-4 mx-auto w-32 h-32 border-2 border-primary bg-muted rounded-sm" style={{ 
                              overflow: 'visible' 
                            }}>
                              <ImageWithFallback
                                src={industry.image}
                                alt={industry.name}
                                className="w-full h-full object-cover rounded-sm opacity-90 group-hover:opacity-100 transition-opacity"
                                style={{
                                  filter: 'contrast(105%) brightness(100%) saturate(95%)'
                                }}
                              />
                              
                              {/* Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                              
                              {/* Tech Icon */}
                              <div className="absolute bottom-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                AI
                              </div>
                            </div>

                            {/* Details */}
                            <div className="text-left space-y-2" style={{ fontFamily: 'serif' }}>
                              <div className="font-black text-lg text-foreground">{industry.name}</div>
                              <div className="font-bold text-primary text-base">CAPABILITY: {industry.capability}</div>
                              <div className="font-bold text-accent text-sm">IMPACT: {industry.impact}</div>
                              <div className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-3 border-l-2 border-primary">
                                {industry.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
