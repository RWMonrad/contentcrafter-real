import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Palette, Type, Building, Mic, Save, Check, AlertCircle } from 'lucide-react';

const BrandKit = ({ onStatsUpdate }) => {
  const [brandKit, setBrandKit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('logo');
  
  // Form states
  const [logoFile, setLogoFile] = useState(null);
  const [colors, setColors] = useState({
    primary_color: '#3B82F6',
    secondary_color: '#6B7280',
    accent_color: '#10B981',
    text_color: '#1F2937',
    background_color: '#FFFFFF'
  });
  const [fonts, setFonts] = useState({
    heading_font: 'Inter',
    body_font: 'Inter',
    accent_font: 'Inter'
  });
  const [brandInfo, setBrandInfo] = useState({
    brand_voice: 'professional',
    industry: '',
    logo_placement: 'bottom_right',
    watermark_enabled: true
  });
  
  const [availableFonts, setAvailableFonts] = useState([]);
  const [availableIndustries, setAvailableIndustries] = useState([]);
  const [voiceOptions, setVoiceOptions] = useState([]);

  useEffect(() => {
    fetchBrandKit();
    fetchOptions();
  }, []);

  const fetchBrandKit = async () => {
    try {
      const response = await fetch('/api/workspace/brand-kit', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.brand_kit) {
          setBrandKit(data.brand_kit);
          setColors({
            primary_color: data.brand_kit.primary_color || '#3B82F6',
            secondary_color: data.brand_kit.secondary_color || '#6B7280',
            accent_color: data.brand_kit.accent_color || '#10B981',
            text_color: data.brand_kit.text_color || '#1F2937',
            background_color: data.brand_kit.background_color || '#FFFFFF'
          });
          setFonts({
            heading_font: data.brand_kit.heading_font || 'Inter',
            body_font: data.brand_kit.body_font || 'Inter',
            accent_font: data.brand_kit.accent_font || 'Inter'
          });
          setBrandInfo({
            brand_voice: data.brand_kit.brand_voice || 'professional',
            industry: data.brand_kit.industry || '',
            logo_placement: data.brand_kit.logo_placement || 'bottom_right',
            watermark_enabled: data.brand_kit.watermark_enabled !== false
          });
        }
      }
    } catch (error) {
      console.error('Error fetching brand kit:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOptions = async () => {
    // Set hardcoded options since API endpoints may not be available
    setAvailableFonts([
      { name: 'Inter', description: 'Modern & Clean' },
      { name: 'Roboto', description: 'Friendly & Readable' },
      { name: 'Open Sans', description: 'Neutral & Professional' },
      { name: 'Lato', description: 'Humanist & Warm' },
      { name: 'Montserrat', description: 'Geometric & Bold' },
      { name: 'Poppins', description: 'Rounded & Modern' },
      { name: 'Source Sans Pro', description: 'Clean & Technical' },
      { name: 'Nunito', description: 'Friendly & Rounded' }
    ]);
    
    setAvailableIndustries([
      'Technology',
      'Healthcare',
      'Finance',
      'Education',
      'Retail',
      'Real Estate',
      'Food & Beverage',
      'Fashion',
      'Travel & Tourism',
      'Fitness & Wellness',
      'Marketing & Advertising',
      'Consulting',
      'Manufacturing',
      'Non-profit',
      'Entertainment',
      'Automotive',
      'Beauty & Cosmetics',
      'Home & Garden',
      'Sports',
      'Other'
    ]);
    
    setVoiceOptions([
      { value: 'professional', label: 'Professional', description: 'Formal and authoritative' },
      { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
      { value: 'casual', label: 'Casual', description: 'Relaxed and conversational' },
      { value: 'expert', label: 'Expert', description: 'Knowledgeable and technical' },
      { value: 'inspiring', label: 'Inspiring', description: 'Motivational and uplifting' },
      { value: 'playful', label: 'Playful', description: 'Fun and energetic' },
      { value: 'luxury', label: 'Luxury', description: 'Premium and sophisticated' },
      { value: 'trustworthy', label: 'Trustworthy', description: 'Reliable and honest' }
    ]);

    try {
      const [fontsRes, industriesRes, voicesRes] = await Promise.all([
        fetch('/api/workspace/brand-kit/fonts'),
        fetch('/api/workspace/brand-kit/industries'),
        fetch('/api/workspace/brand-kit/voice-options')
      ]);
      
      if (fontsRes.ok) {
        const fontsData = await fontsRes.json();
        if (fontsData.fonts && fontsData.fonts.length > 0) {
          setAvailableFonts(fontsData.fonts);
        }
      }
      
      if (industriesRes.ok) {
        const industriesData = await industriesRes.json();
        if (industriesData.industries && industriesData.industries.length > 0) {
          setAvailableIndustries(industriesData.industries);
        }
      }
      
      if (voicesRes.ok) {
        const voicesData = await voicesRes.json();
        if (voicesData.voice_options && voicesData.voice_options.length > 0) {
          setVoiceOptions(voicesData.voice_options);
        }
      }
    } catch (error) {
      console.error('Error fetching options:', error);
      // Keep hardcoded options as fallback
    }
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLogoFile(file);
    setSaving(true);
    
    const formData = new FormData();
    formData.append('logo', file);

    try {
      const response = await fetch('/api/workspace/brand-kit/logo', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setBrandKit(data.brand_kit);
        
        // Auto-update colors if extracted
        if (data.extracted_colors && data.extracted_colors.length > 0) {
          setColors(prev => ({
            ...prev,
            primary_color: data.extracted_colors[0] || prev.primary_color,
            secondary_color: data.extracted_colors[1] || prev.secondary_color,
            accent_color: data.extracted_colors[2] || prev.accent_color
          }));
        }
        
        setMessage('Logo uploaded successfully! Colors extracted automatically.');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage('Error uploading logo');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      const response = await fetch('/api/workspace/brand-kit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          ...colors,
          ...fonts,
          ...brandInfo
        })
      });

      if (response.ok) {
        const data = await response.json();
        setBrandKit(data.brand_kit);
        setMessage('Brand kit saved successfully!');
        setTimeout(() => setMessage(''), 3000);
        
        // Update stats
        if (onStatsUpdate) {
          onStatsUpdate();
        }
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage('Error saving brand kit');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'logo', label: t('brandKit.tabs.logo'), icon: Upload },
    { id: 'colors', label: t('brandKit.tabs.colors'), icon: Palette },
    { id: 'fonts', label: t('brandKit.tabs.fonts'), icon: Type },
    { id: 'brand', label: t('brandKit.tabs.voice'), icon: Mic },
    { id: 'settings', label: t('brandKit.tabs.settings'), icon: Building }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-primary" />
            <span>{t('brandKit.title')}</span>
          </CardTitle>
          <CardDescription>
            {t('brandKit.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
              message.includes('Error') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message.includes('Error') ? <AlertCircle size={20} /> : <Check size={20} />}
              {message}
            </div>
          )}

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {activeTab === 'logo' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">{t('brandKit.logo.title')}</h3>
            
            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('brandKit.logo.companyLogo')}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                {brandKit?.logo_filename ? (
                  <div className="space-y-4">
                    <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                      <img 
                        src={`/uploads/brand_kits/${brandKit.user_id}/${brandKit.logo_filename}`}
                        alt="Logo"
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div style={{display: 'none'}} className="text-gray-400">
                        <Upload size={32} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{brandKit.logo_filename}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">{t('brandKit.logo.uploadText')}</p>
                      <p className="text-xs text-gray-500">{t('brandKit.logo.fileTypes')}</p>
                    </div>
                  </div>
                )}
                
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg,.gif"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  {brandKit?.logo_filename ? 'Change Logo' : 'Upload Logo'}
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Brand Colors</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(colors).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {key.replace('_', ' ')}
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => setColors(prev => ({ ...prev, [key]: e.target.value }))}
                      className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setColors(prev => ({ ...prev, [key]: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Color Preview */}
            <div className="mt-8 p-6 rounded-lg border border-gray-200" style={{ backgroundColor: colors.background_color }}>
              <h4 className="text-lg font-semibold mb-4" style={{ color: colors.primary_color }}>
                Brand Color Preview
              </h4>
              <p className="mb-4" style={{ color: colors.text_color }}>
                This is how your brand colors will look in content. The primary color is used for headings and key elements.
              </p>
              <div className="flex space-x-4">
                <button 
                  className="px-4 py-2 rounded-md text-white font-medium"
                  style={{ backgroundColor: colors.primary_color }}
                >
                  Primary Button
                </button>
                <button 
                  className="px-4 py-2 rounded-md text-white font-medium"
                  style={{ backgroundColor: colors.accent_color }}
                >
                  Accent Button
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fonts' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Typography</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(fonts).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {key.replace('_', ' ')}
                  </label>
                  <select
                    value={value}
                    onChange={(e) => setFonts(prev => ({ ...prev, [key]: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {availableFonts.map((font) => (
                      <option key={font.name} value={font.name}>
                        {font.name} - {font.description}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Font Preview */}
            <div className="mt-8 p-6 rounded-lg border border-gray-200 bg-white">
              <h4 className="text-2xl font-bold mb-2" style={{ fontFamily: fonts.heading_font }}>
                Heading Font Preview
              </h4>
              <h5 className="text-lg font-semibold mb-4" style={{ fontFamily: fonts.accent_font }}>
                Accent Font for Subheadings
              </h5>
              <p className="text-base" style={{ fontFamily: fonts.body_font }}>
                This is how your body text will appear in your content. The body font should be highly readable and complement your brand personality.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'brand' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Brand Voice & Industry</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Brand Voice
                </label>
                <select
                  value={brandInfo.brand_voice}
                  onChange={(e) => setBrandInfo(prev => ({ ...prev, brand_voice: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {voiceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} - {option.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Industry
                </label>
                <select
                  value={brandInfo.industry}
                  onChange={(e) => setBrandInfo(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Industry</option>
                  {availableIndustries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Brand Settings</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Logo Placement
                </label>
                <select
                  value={brandInfo.logo_placement}
                  onChange={(e) => setBrandInfo(prev => ({ ...prev, logo_placement: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="bottom_right">Bottom Right</option>
                  <option value="bottom_left">Bottom Left</option>
                  <option value="top_right">Top Right</option>
                  <option value="top_left">Top Left</option>
                  <option value="center">Center</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="watermark"
                  checked={brandInfo.watermark_enabled}
                  onChange={(e) => setBrandInfo(prev => ({ ...prev, watermark_enabled: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="watermark" className="text-sm font-medium text-gray-700">
                  Enable logo watermark on generated content
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Save Brand Kit
              </>
            )}
          </button>
        </div>
      </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandKit;

