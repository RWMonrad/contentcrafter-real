import logoImage from "../assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-row justify-between items-start gap-8">
          {/* Logo and Description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logoImage} 
                alt="ContentCrafter Logo" 
                className="w-8 h-8 object-contain"
              />
              <div className="flex items-baseline">
                <span className="text-xl font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Content
                </span>
                <span className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Crafter
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed max-w-xs">
              AI-Powered Social Media Content Generation. Transform your content creation process from hours to minutes.
            </p>
            <p className="text-sm text-gray-500 mb-4">Follow us on social media</p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full overflow-hidden hover:scale-110 transition-transform">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="w-full h-full object-cover" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full overflow-hidden hover:scale-110 transition-transform">
                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png" alt="X/Twitter" className="w-full h-full object-cover" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full overflow-hidden hover:scale-110 transition-transform">
                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="w-full h-full object-cover" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full overflow-hidden hover:scale-110 transition-transform">
                <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" className="w-full h-full object-cover" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full overflow-hidden hover:scale-110 transition-transform">
                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968841.png" alt="Reddit" className="w-full h-full object-cover" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full overflow-hidden hover:scale-110 transition-transform">
                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="w-full h-full object-cover" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-4">Products</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">AI Content Generator</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Smart Hashtags</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Brand Voice Analysis</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Multi-Platform Publishing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Analytics Dashboard</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Team Collaboration</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Case Studies</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Content Marketing Guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">API Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Webinars & Events</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li><a href="mailto:support@contentcrafter.com" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">support@contentcrafter.com</a></li>
              <li><a href="mailto:sales@contentcrafter.com" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">sales@contentcrafter.com</a></li>
              <li><a href="mailto:research@contentcrafter.com" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">research@contentcrafter.com</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Security</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with extra padding */}
        <div className="border-t border-gray-200 mt-16 pt-12 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">© 2025 ContentCrafter. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                Made with ❤️ for creators
              </span>
              <span>GDPR Compliant</span>
              <span>SOC 2 Type II</span>
              <span>ISO 27001</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

