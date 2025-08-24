import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface HeroProps {
  onGetStarted?: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <Badge variant="secondary" className="w-fit">
              AI-Powered Content Generation
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight font-playfair">
                Create brilliant social content 
                <span className="text-primary"> in just 5 minutes</span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                End the endless staring at blank screens. ContentCrafter transforms the painful struggle 
                of content creation into a delightfully simple process—delivering professional, 
                on-brand posts that actually engage your audience.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="px-8 py-3" onClick={onGetStarted}>
                Start Creating Content
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3" onClick={onGetStarted}>
                See Live Demo
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl mb-1">5 min</div>
                <div className="text-sm text-muted-foreground">Setup time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">7 days</div>
                <div className="text-sm text-muted-foreground">Of content</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">4 platforms</div>
                <div className="text-sm text-muted-foreground">Optimized</div>
              </div>
            </div>
          </div>
          
          {/* Right side - Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 lg:p-8">
              {/* Mock content cards */}
              <div className="space-y-3">
                {/* Facebook Post */}
                <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Facebook Post</div>
                      <div className="text-xs text-green-600 font-medium">✓ Generated</div>
                    </div>
                    <div className="text-xs text-gray-400">2 min ago</div>
                  </div>
                  <div className="text-xs leading-relaxed text-gray-700">
                    "🚀 Ready to transform your business efficiency? Our AI-powered solutions are helping small businesses save 10+ hours per week on content creation. What would you do with that extra time?"
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span>👍 24 reactions</span>
                    <span>💬 8 comments</span>
                    <span>↗️ 3 shares</span>
                  </div>
                </div>
                
                {/* Instagram Post */}
                <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 transform rotate-1 hover:shadow-xl transition-all duration-300 hover:rotate-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Instagram Post</div>
                      <div className="text-xs text-blue-600 font-medium">✓ Ready to publish</div>
                    </div>
                    <div className="text-xs text-gray-400">5 min ago</div>
                  </div>
                  <div className="text-xs leading-relaxed text-gray-700 mb-3">
                    "Behind the magic ✨ Here's how we're revolutionizing content creation for small businesses worldwide. From idea to post in minutes, not hours! 
                    
                    #ContentCreation #SmallBusiness #AI #Productivity #SocialMediaTips"
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>❤️ 156 likes</span>
                    <span>💬 23 comments</span>
                    <span>📤 12 shares</span>
                  </div>
                </div>
                
                {/* LinkedIn Post */}
                <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 transform -rotate-1 hover:shadow-xl transition-all duration-300 hover:rotate-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">LinkedIn Post</div>
                      <div className="text-xs text-purple-600 font-medium">✓ Professional tone applied</div>
                    </div>
                    <div className="text-xs text-gray-400">8 min ago</div>
                  </div>
                  <div className="text-xs leading-relaxed text-gray-700 mb-3">
                    "The future of business efficiency lies in intelligent automation. After analyzing 10,000+ small businesses, we discovered that content creation consumes 40% of marketing time. 
                    
                    Our AI solution addresses this directly—transforming weeks of work into minutes of setup. The result? 300% faster content production with measurably higher engagement rates."
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>👍 89 reactions</span>
                    <span>💬 31 comments</span>
                    <span>🔄 45 reposts</span>
                  </div>
                </div>

                {/* X (Twitter) Post */}
                <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 transform rotate-2 hover:shadow-xl transition-all duration-300 hover:rotate-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">X Post</div>
                      <div className="text-xs text-orange-600 font-medium">✓ Viral-optimized</div>
                    </div>
                    <div className="text-xs text-gray-400">3 min ago</div>
                  </div>
                  <div className="text-xs leading-relaxed text-gray-700 mb-3">
                    "POV: You just generated a week's worth of social content in 5 minutes while your competitors are still staring at blank screens 🤯
                    
                    AI isn't replacing creativity—it's unleashing it ⚡
                    
                    #AIContentCreation #ProductivityHack #SmallBizWin"
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>❤️ 2.1K likes</span>
                    <span>🔄 847 reposts</span>
                    <span>💬 156 replies</span>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-3 shadow-lg">
                <span className="text-lg">✨</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full p-3 shadow-lg">
                <span className="text-lg">🚀</span>
              </div>
              <div className="absolute top-1/2 -left-6 bg-green-500 text-white rounded-full p-2 shadow-lg">
                <span className="text-sm">💡</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}