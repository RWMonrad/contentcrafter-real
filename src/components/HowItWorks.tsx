import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Intelligent Onboarding",
      description: "Our AI learns your unique business DNA in just 2 minutes through our smart onboarding wizard. No generic templates—every piece of content will be authentically yours, speaking directly to your target audience with your brand's unique voice and personality.",
      icon: "🧠",
      details: [
        "Industry-specific content strategies tailored to your niche",
        "Target audience psychographics and behavioral analysis",
        "Brand voice DNA analysis and personality mapping",
        "Competitor differentiation and positioning strategy",
        "Content goal optimization for maximum ROI",
        "Business objectives alignment and KPI tracking"
      ],
      highlight: "Your AI learns what makes your brand unique"
    },
    {
      step: "02", 
      title: "AI Content Mastery",
      description: "Watch our AI craft content that sounds like you wrote it—but better. Each post is optimized for maximum engagement and conversions using advanced emotional intelligence algorithms and platform-specific best practices that drive real results.",
      icon: "✨",
      details: [
        "Emotional intelligence algorithms for human connection",
        "Platform-specific optimization for each social network",
        "Viral potential scoring and trend analysis",
        "Engagement prediction with 0-10 accuracy scale",
        "Strategic hashtag research and competitive analysis",
        "Content timing optimization for maximum reach"
      ],
      highlight: "3 unique variants every time, each with 8+ engagement score"
    },
    {
      step: "03",
      title: "Instant Publishing Power",
      description: "From idea to published post in under 30 seconds. Get three distinct content variants instantly—educational, inspirational, and conversational—each optimized for different goals. One-click copy, paste, and watch your engagement soar.",
      icon: "🚀",
      details: [
        "Educational variant: Teach, build authority and establish expertise",
        "Inspirational variant: Motivate, inspire action and drive engagement", 
        "Conversational variant: Engage, build community and foster relationships",
        "One-click clipboard copy with perfect formatting",
        "Cross-platform formatting for seamless publishing",
        "Performance tracking and optimization suggestions"
      ],
      highlight: "Ready-to-publish content in 3 different styles"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl mb-6 font-playfair">
            From Blank Screen to Brilliant Content in 3 Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stop struggling with content creation. Our AI doesn't just generate content—it learns your brand, understands your audience, and creates posts that convert like crazy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {steps.map((step, index) => (
            <Card key={index} className="relative border-2 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group min-h-[750px] flex flex-col bg-white">
              <CardHeader className="text-center pb-8 pt-8">
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-300">{step.icon}</div>
                <div className="text-sm text-primary font-bold mb-6 tracking-wider">STEP {step.step}</div>
                <CardTitle className="text-2xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col px-8 pb-8">
                <p className="text-muted-foreground leading-relaxed mb-8 text-base text-center">
                  {step.description}
                </p>
                <div className="text-left flex-1">
                  <br />
                  <h4 className="font-semibold mb-6 text-sm uppercase tracking-wide">What You Get:</h4>
                  <ul className="text-sm text-muted-foreground space-y-4">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Value Proposition Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 md:p-16 mb-32 border border-gray-100 mt-16">
          <div className="text-center mb-16 mt-8">
            <h3 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Why Our AI Changes Everything
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Most AI tools give you generic content. We give you content that sounds like you, speaks to your audience, and drives real business results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Platform Mastery */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Platform Mastery
                </h4>
              </div>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Each platform has its own language. Our AI speaks them all fluently, optimizing every post for maximum impact.
              </p>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Instagram</span>
                    <div className="text-sm text-muted-foreground">Visual storytelling + 15-25 hashtags</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">LinkedIn</span>
                    <div className="text-sm text-muted-foreground">Professional authority + 3-5 strategic hashtags</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Facebook</span>
                    <div className="text-sm text-muted-foreground">Community building + emotional hooks</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-gray-800 to-black rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Twitter/X</span>
                    <div className="text-sm text-muted-foreground">Viral potential + trending topics</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emotional Intelligence */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Emotional Intelligence
                </h4>
              </div>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our AI doesn't just write—it understands human psychology and creates content that resonates on an emotional level.
              </p>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Educational</span>
                    <div className="text-sm text-muted-foreground">Build authority & trust</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Inspirational</span>
                    <div className="text-sm text-muted-foreground">Motivate & drive action</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Conversational</span>
                    <div className="text-sm text-muted-foreground">Engage & build community</div>
                  </div>
                </div>
                <div className="text-center mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="font-bold text-indigo-600 text-lg">8.5+ Average Engagement Score</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Consistently high-performing content</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}