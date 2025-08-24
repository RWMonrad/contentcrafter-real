import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage, getSupportedLanguages } from '../../i18n/index.js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Sparkles, 
  Loader2, 
  Copy, 
  Download, 
  Instagram, 
  Linkedin, 
  Facebook, 
  Twitter,
  Hash,
  BarChart3,
  Heart,
  CheckCircle,
  Bookmark
} from 'lucide-react';
import { apiClient } from '../../lib/api.jsx';

const ContentGenerator = ({ onStatsUpdate }) => {
  const { t } = useTranslation(['common', 'templates']);
  const currentLanguage = getCurrentLanguage();
  const supportedLanguages = getSupportedLanguages();
  const currentLangInfo = supportedLanguages.find(lang => lang.code === currentLanguage) || supportedLanguages[0];
  
  const [formData, setFormData] = useState({
    topic: '',
    platforms: ['instagram'], // Changed to array for multi-platform
    content_type: 'educational',
    additional_context: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [variants, setVariants] = useState([]);
  const [error, setError] = useState('');
  const [copiedStates, setCopiedStates] = useState({});
  const [savedContent, setSavedContent] = useState(new Set());

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600', maxChars: 2200 },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700', maxChars: 3000 },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600', maxChars: 63206 },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: 'text-slate-800', maxChars: 280 }
  ];

  const contentTypes = [
    { id: 'educational', name: t('generator.contentTypes.educational'), description: t('generator.contentTypes.educationalDesc'), emoji: '📚' },
    { id: 'inspirational', name: t('generator.contentTypes.inspirational'), description: t('generator.contentTypes.inspirationalDesc'), emoji: '✨' },
    { id: 'conversational', name: t('generator.contentTypes.conversational'), description: t('generator.contentTypes.conversationalDesc'), emoji: '💬' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlatformToggle = (platformId) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  const generateVariants = async () => {
    if (!formData.topic.trim()) {
      setError(t('errors.validation.topicRequired'));
      return;
    }

    if (formData.platforms.length === 0) {
      setError(t('errors.validation.platformRequired'));
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedContent(null);
    setVariants([]);

    try {
      // Generate variants for each selected platform
      const allVariants = [];
      
      for (const platform of formData.platforms) {
        const response = await apiClient.generateVariants({
          topic: formData.topic,
          platform: platform,
          additional_context: formData.additional_context
        });
        
        // Add platform info to each variant
        const platformVariants = response.variants.map(variant => ({
          ...variant,
          platform: platform,
          id: `${platform}-${variant.content_type}-${Date.now()}`
        }));
        
        allVariants.push(...platformVariants);
      }
      
      setVariants(allVariants);
      onStatsUpdate?.();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const saveContent = async (content) => {
    try {
      // Here you would typically save to backend
      setSavedContent(prev => new Set([...prev, content.id]));
      // Show success feedback
    } catch (error) {
      console.error('Failed to save content:', error);
    }
  };

  const formatHashtags = (hashtags) => {
    if (typeof hashtags === 'string') {
      try {
        return JSON.parse(hashtags);
      } catch {
        return hashtags.split(' ').filter(tag => tag.startsWith('#'));
      }
    }
    return hashtags || [];
  };

  const getEngagementColor = (score) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPlatformSpecificPreview = (content, platformId) => {
    const platform = platforms.find(p => p.id === platformId);
    const contentLength = content.content.length;
    const isOverLimit = contentLength > platform.maxChars;
    
    return {
      platform,
      contentLength,
      isOverLimit,
      charLimit: platform.maxChars
    };
  };

  const renderContentCard = (content, index) => {
    const hashtags = formatHashtags(content.hashtags);
    const platformInfo = getPlatformSpecificPreview(content, content.platform);
    const PlatformIcon = platformInfo.platform?.icon || Sparkles;
    const contentType = contentTypes.find(t => t.id === content.content_type);
    const isSaved = savedContent.has(content.id);
    const isCopied = copiedStates[content.id];

    return (
      <Card key={content.id || index} className="w-full hover:shadow-lg transition-shadow overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <PlatformIcon className={`w-5 h-5 ${platformInfo.platform?.color}`} />
              <span>{platformInfo.platform?.name}</span>
              <Badge variant="secondary" className="text-xs">
                {contentType?.emoji} {contentType?.name}
              </Badge>
            </CardTitle>
            <div className="flex items-center space-x-2">
              {content.engagement_score && (
                <div className="flex items-center space-x-1">
                  <BarChart3 className={`w-4 h-4 ${getEngagementColor(content.engagement_score)}`} />
                  <span className={`text-sm font-bold ${getEngagementColor(content.engagement_score)}`}>
                    {parseFloat(content.engagement_score).toFixed(1)}/10
                  </span>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => saveContent(content)}
                className={isSaved ? 'text-yellow-600' : ''}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {platformInfo.contentLength}/{platformInfo.charLimit} characters
            </span>
            {platformInfo.isOverLimit && (
              <Badge variant="destructive" className="text-xs">
                Over limit
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary overflow-hidden">
              <p className="whitespace-pre-wrap text-sm leading-relaxed break-words overflow-hidden">{content.content}</p>
            </div>
          </div>

          {hashtags.length > 0 && (
            <div>
              <Label className="text-sm font-medium flex items-center space-x-1 mb-2">
                <Hash className="w-4 h-4" />
                <span>Hashtags ({hashtags.length})</span>
              </Label>
              <div className="flex flex-wrap gap-1 max-w-full">
                {hashtags.map((tag, tagIndex) => (
                  <Badge 
                    key={tagIndex} 
                    variant="outline" 
                    className="text-xs hover:bg-primary/10 break-all max-w-full"
                    style={{ wordBreak: 'break-all', overflowWrap: 'break-word' }}
                  >
                    {tag.startsWith('#') ? tag : `#${tag}`}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {content.approach_explanation && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <Label className="text-sm font-medium text-blue-800">AI Strategy</Label>
              <p className="text-sm text-blue-700 mt-1 break-words overflow-hidden">
                {content.approach_explanation}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => copyToClipboard(content.content, content.id)}
              className="flex-1 min-w-[120px] hover:bg-blue-50 hover:border-blue-300"
            >
              {isCopied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy Content
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => copyToClipboard(hashtags.join(' '), `${content.id}-hashtags`)}
              className="flex-1 min-w-[120px] hover:bg-purple-50 hover:border-purple-300"
            >
              {copiedStates[`${content.id}-hashtags`] ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Hash className="w-4 h-4 mr-1" />
                  Copy Hashtags
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>{t('generator.title')}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span className="text-xs">Content language:</span>
              <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 rounded-md">
                <span className="text-lg">{currentLangInfo.flag}</span>
                <span className="font-medium text-primary">{currentLangInfo.name}</span>
              </div>
            </div>
          </CardTitle>
          <CardDescription>
            {t('generator.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="topic">{t('generator.form.topic')} *</Label>
                <Input
                  id="topic"
                  placeholder={t('generator.form.topicPlaceholder')}
                  value={formData.topic}
                  onChange={(e) => handleChange('topic', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">{t('generator.form.platforms')} *</Label>
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    const isSelected = formData.platforms.includes(platform.id);
                    return (
                      <div
                        key={platform.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-primary bg-primary/5' 
                            : 'border-muted hover:border-primary/50'
                        }`}
                        onClick={() => handlePlatformToggle(platform.id)}
                      >
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handlePlatformToggle(platform.id)}
                        />
                        <Icon className={`w-5 h-5 ${platform.color}`} />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{platform.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {platform.maxChars} chars max
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label htmlFor="content_type">{t('generator.form.contentStyle')}</Label>
                <Select value={formData.content_type} onValueChange={(value) => handleChange('content_type', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center space-x-2">
                          <span>{type.emoji}</span>
                          <div>
                            <div className="font-medium">{type.name}</div>
                            <div className="text-xs text-muted-foreground">{type.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="additional_context">{t('generator.form.additionalContext')}</Label>
              <Textarea
                id="additional_context"
                placeholder={t('generator.form.contextPlaceholder')}
                value={formData.additional_context}
                onChange={(e) => handleChange('additional_context', e.target.value)}
                rows={8}
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={generateVariants}
              disabled={isLoading}
              size="lg"
              className="px-8"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t('generator.generating')}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t('generator.generateButton')}
                </>
              )}
            </Button>
          </div>

          {formData.platforms.length > 0 && (
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">
                Will generate 3 variants (Educational, Inspirational, Conversational) for:
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.platforms.map(platformId => {
                  const platform = platforms.find(p => p.id === platformId);
                  const Icon = platform.icon;
                  return (
                    <Badge key={platformId} variant="secondary" className="flex items-center space-x-1">
                      <Icon className={`w-3 h-3 ${platform.color}`} />
                      <span>{platform.name}</span>
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content Variants */}
      {variants.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Generated Content</h3>
            <Badge variant="outline" className="text-sm">
              {variants.length} variants generated
            </Badge>
          </div>
          
          {/* Group by platform */}
          {formData.platforms.map(platformId => {
            const platformVariants = variants.filter(v => v.platform === platformId);
            const platform = platforms.find(p => p.id === platformId);
            const Icon = platform.icon;
            
            if (platformVariants.length === 0) return null;
            
            return (
              <div key={platformId} className="space-y-4">
                <div className="flex items-center space-x-2 border-b pb-2">
                  <Icon className={`w-5 h-5 ${platform.color}`} />
                  <h4 className="text-lg font-medium">{platform.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {platformVariants.length} variants
                  </Badge>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {platformVariants.map((variant, index) => 
                    renderContentCard(variant, index)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;

