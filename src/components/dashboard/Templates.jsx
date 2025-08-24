import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Rocket, Calendar, Star, Lightbulb, Users, Tag, 
  MessageCircle, Trophy, FileText, TrendingUp, 
  Lock, Crown, Zap, ChevronRight, Copy, Check,
  Instagram, Linkedin, Facebook, Twitter, BarChart3
} from 'lucide-react';

const Templates = ({ onStatsUpdate }) => {
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState([]);
  const [message, setMessage] = useState('');

  // Form states
  const [inputData, setInputData] = useState({});
  const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram']);
  const [selectedContentTypes, setSelectedContentTypes] = useState(['educational']);

  useEffect(() => {
    fetchTemplates();
    fetchCategories();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/workspace/templates', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setTemplates(data.templates);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/workspace/templates/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      product_launch: Rocket,
      event_promotion: Calendar,
      testimonial: Star,
      educational: Lightbulb,
      behind_scenes: Users,
      promotional: Tag,
      engagement: MessageCircle,
      milestone: Trophy,
      content_promotion: FileText,
      thought_leadership: TrendingUp
    };
    return icons[category] || FileText;
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      instagram: Instagram,
      linkedin: Linkedin,
      facebook: Facebook,
      twitter: Twitter
    };
    return icons[platform] || Instagram;
  };

  const getTierBadge = (tier, hasAccess) => {
    const tiers = {
      free: { label: 'Free', color: 'bg-green-100 text-green-800', icon: null },
      starter: { label: 'Starter', color: 'bg-blue-100 text-blue-800', icon: Zap },
      pro: { label: 'Pro', color: 'bg-purple-100 text-purple-800', icon: Crown },
      agency: { label: 'Agency', color: 'bg-orange-100 text-orange-800', icon: Crown }
    };
    
    const tierInfo = tiers[tier] || tiers.free;
    const Icon = tierInfo.icon;
    
    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tierInfo.color} ${!hasAccess ? 'opacity-50' : ''}`}>
        {Icon && <Icon size={12} className="mr-1" />}
        {tierInfo.label}
        {!hasAccess && <Lock size={12} className="ml-1" />}
      </div>
    );
  };

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const handleTemplateSelect = (template) => {
    if (!template.has_access) {
      setMessage(t('templates.subscriptionRequired', { tier: template.required_tier }));
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    setSelectedTemplate(template);
    setShowGenerator(true);
    
    // Initialize input data
    const fields = JSON.parse(template.placeholder_fields || '[]');
    const initialData = {};
    fields.forEach(field => {
      initialData[field.name] = '';
    });
    setInputData(initialData);
  };

  const handleGenerate = async () => {
    if (!selectedTemplate) return;
    
    setGenerating(true);
    setGeneratedContent([]);
    
    try {
      const response = await fetch(`/api/workspace/templates/${selectedTemplate.id}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          input_data: inputData,
          platforms: selectedPlatforms,
          content_types: selectedContentTypes
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setGeneratedContent(data.generated_contents);
        setMessage(`Generated ${data.generated_contents.length} content variants!`);
        
        // Update stats
        if (onStatsUpdate) {
          onStatsUpdate();
        }
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage('Error generating content');
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = async (text, type = 'content') => {
    try {
      await navigator.clipboard.writeText(text);
      setMessage(`${type} copied to clipboard!`);
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage('Failed to copy to clipboard');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (showGenerator && selectedTemplate) {
    const fields = JSON.parse(selectedTemplate.placeholder_fields || '[]');
    
    return (
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <button
              onClick={() => setShowGenerator(false)}
              className="text-blue-600 hover:text-blue-700 mb-2 flex items-center gap-1"
            >
              ← Back to Templates
            </button>
            <h2 className="text-2xl font-bold text-gray-900">{selectedTemplate.name}</h2>
            <p className="text-gray-600">{selectedTemplate.description}</p>
          </div>
          {getTierBadge(selectedTemplate.tier, selectedTemplate.has_access)}
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('Error') 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('templates.form.title')}</h3>
            
            {/* Template Fields */}
            <div className="space-y-4 mb-6">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={inputData[field.name] || ''}
                      onChange={(e) => setInputData(prev => ({ ...prev, [field.name]: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                      rows={3}
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                    />
                  ) : (
                    <input
                      type="text"
                      value={inputData[field.name] || ''}
                      onChange={(e) => setInputData(prev => ({ ...prev, [field.name]: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Platform Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Platforms
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['instagram', 'linkedin', 'facebook', 'twitter'].map((platform) => {
                  const Icon = getPlatformIcon(platform);
                  return (
                    <label key={platform} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={selectedPlatforms.includes(platform)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPlatforms(prev => [...prev, platform]);
                          } else {
                            setSelectedPlatforms(prev => prev.filter(p => p !== platform));
                          }
                        }}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <Icon size={20} className="text-gray-600" />
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {platform}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Content Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Content Types
              </label>
              <div className="space-y-2">
                {[
                  { value: 'educational', label: 'Educational', emoji: '📚' },
                  { value: 'inspirational', label: 'Inspirational', emoji: '✨' },
                  { value: 'conversational', label: 'Conversational', emoji: '💬' }
                ].map((type) => (
                  <label key={type.value} className="flex items-center space-x-3 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedContentTypes.includes(type.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedContentTypes(prev => [...prev, type.value]);
                        } else {
                          setSelectedContentTypes(prev => prev.filter(t => t !== type.value));
                        }
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="text-lg">{type.emoji}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={generating || selectedPlatforms.length === 0 || selectedContentTypes.length === 0}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Zap size={16} />
                  Generate Content
                </>
              )}
            </button>
          </div>

          {/* Generated Content */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Generated Content</h3>
            
            {generatedContent.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Generated content will appear here</p>
              </div>
            ) : (
              <div className="space-y-6">
                {selectedPlatforms.map((platform) => {
                  const platformContent = generatedContent.filter(c => c.platform === platform);
                  if (platformContent.length === 0) return null;
                  
                  const Icon = getPlatformIcon(platform);
                  
                  return (
                    <div key={platform} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Icon size={20} className="text-gray-600" />
                        <h4 className="font-semibold text-gray-900 capitalize">{platform}</h4>
                      </div>
                      
                      <div className="space-y-4">
                        {platformContent.map((content, index) => {
                          const hashtags = JSON.parse(content.hashtags || '[]');
                          
                          return (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-600 capitalize">
                                  {content.content_type}
                                </span>
                                <span className="text-sm text-gray-500">
                                  Score: {content.engagement_score}
                                </span>
                              </div>
                              
                              {content.title && (
                                <h5 className="font-semibold text-gray-900 mb-2">
                                  {content.title}
                                </h5>
                              )}
                              
                              <p className="text-gray-700 mb-3 whitespace-pre-wrap break-words">
                                {content.content}
                              </p>
                              
                              {hashtags.length > 0 && (
                                <div className="mb-3">
                                  <div className="flex flex-wrap gap-1">
                                    {hashtags.map((tag, tagIndex) => (
                                      <span key={tagIndex} className="text-blue-600 text-sm break-all">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex gap-2">
                                <button
                                  onClick={() => copyToClipboard(content.content, 'Content')}
                                  className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                                >
                                  <Copy size={14} />
                                  Copy Content
                                </button>
                                {hashtags.length > 0 && (
                                  <button
                                    onClick={() => copyToClipboard(hashtags.join(' '), 'Hashtags')}
                                    className="flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                                  >
                                    <Copy size={14} />
                                    Copy Hashtags
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <span>{t('templates.title')}</span>
          </CardTitle>
          <CardDescription>
            {t('templates.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.includes('Error') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('templates.allTemplates')}
              </button>
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedCategory === category.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t(`templates.categories.${category.value}`, { defaultValue: category.label })}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const Icon = getCategoryIcon(template.category);
          const supportedPlatforms = JSON.parse(template.supported_platforms || '[]');
          
          return (
            <div
              key={template.id}
              className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer ${
                !template.has_access ? 'opacity-75' : ''
              }`}
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    {getTierBadge(template.tier, template.has_access)}
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {template.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {supportedPlatforms.slice(0, 4).map((platform) => {
                    const PlatformIcon = getPlatformIcon(platform);
                    return (
                      <PlatformIcon key={platform} size={16} className="text-gray-400" />
                    );
                  })}
                  {supportedPlatforms.length > 4 && (
                    <span className="text-xs text-gray-500 ml-1">
                      +{supportedPlatforms.length - 4}
                    </span>
                  )}
                </div>
                
                {!template.has_access && (
                  <Lock size={16} className="text-gray-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">
            {selectedCategory === 'all' 
              ? 'No templates are available at the moment.'
              : 'No templates found in this category. Try selecting a different category.'
            }
          </p>
        </div>
      )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Templates;

