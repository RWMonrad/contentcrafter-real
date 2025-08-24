import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Search, 
  Filter, 
  Copy, 
  Trash2, 
  Edit,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Hash,
  BarChart3,
  Calendar
} from 'lucide-react';
import { apiClient } from '../../lib/api.jsx';

const ContentLibrary = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-500' },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: 'text-gray-900' }
  ];

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    filterContent();
  }, [content, searchTerm, platformFilter, typeFilter]);

  const loadContent = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getContent();
      setContent(response.content);
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterContent = () => {
    let filtered = content;

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (platformFilter !== 'all') {
      filtered = filtered.filter(item => item.platform === platformFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.content_type === typeFilter);
    }

    setFilteredContent(filtered);
  };

  const deleteContent = async (contentId) => {
    try {
      await apiClient.deleteContent(contentId);
      setContent(prev => prev.filter(item => item.id !== contentId));
    } catch (error) {
      console.error('Failed to delete content:', error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FileText className="w-8 h-8 animate-pulse mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Loading your content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" />
            <span>{t('dashboard.tabs.content')}</span>
          </CardTitle>
          <CardDescription>
            {t('contentLibrary.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All platforms</SelectItem>
                {platforms.map((platform) => (
                  <SelectItem key={platform.id} value={platform.id}>
                    {platform.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
                <SelectItem value="inspirational">Inspirational</SelectItem>
                <SelectItem value="conversational">Conversational</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredContent.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No content found</h3>
              <p className="text-muted-foreground">
                {content.length === 0 
                  ? "Start generating content to see it here"
                  : "Try adjusting your search or filters"
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredContent.map((item) => {
                const platform = platforms.find(p => p.id === item.platform);
                const PlatformIcon = platform?.icon || FileText;
                const hashtags = formatHashtags(item.hashtags);

                return (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <PlatformIcon className={`w-4 h-4 ${platform?.color}`} />
                          <CardTitle className="text-base line-clamp-2">
                            {item.title}
                          </CardTitle>
                        </div>
                        <div className="flex items-center space-x-1">
                          {item.engagement_score && (
                            <div className="flex items-center space-x-1">
                              <BarChart3 className="w-3 h-3 text-green-500" />
                              <span className="text-xs">{item.engagement_score}/10</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {item.content_type && (
                          <Badge variant="secondary" className="text-xs">
                            {item.content_type}
                          </Badge>
                        )}
                        {item.ai_generated && (
                          <Badge variant="outline" className="text-xs">
                            AI Generated
                          </Badge>
                        )}
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(item.created_at)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <div className="bg-muted/50 rounded p-3">
                        <p className="text-sm line-clamp-4 whitespace-pre-wrap">
                          {item.content}
                        </p>
                      </div>

                      {hashtags.length > 0 && (
                        <div>
                          <div className="flex items-center space-x-1 mb-2">
                            <Hash className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {hashtags.length} hashtags
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {hashtags.slice(0, 6).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag.startsWith('#') ? tag : `#${tag}`}
                              </Badge>
                            ))}
                            {hashtags.length > 6 && (
                              <Badge variant="outline" className="text-xs">
                                +{hashtags.length - 6} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-2">
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => copyToClipboard(item.content)}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteContent(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentLibrary;

