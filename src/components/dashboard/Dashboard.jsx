import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  FileText, 
  Image, 
  Settings, 
  LogOut, 
  User,
  BarChart3,
  Zap,
  Palette
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.jsx';
import { apiClient } from '../../lib/api.jsx';
import ContentGenerator from './ContentGenerator';
import ContentLibrary from './ContentLibrary';
import Templates from './Templates';
import MediaLibrary from './MediaLibrary';
import BrandKit from './BrandKit';
import LanguageSelector from '../ui/LanguageSelector';
import logo from '../../assets/logo.png';

const Dashboard = () => {
  const { t } = useTranslation('common');
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    templates: 0,
    content_items: 0,
    media_files: 0,
    ai_credits: 0,
    subscription_plan: 'free'
  });
  const [activeTab, setActiveTab] = useState('generate');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await apiClient.getStats();
      setStats(response.stats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    // Reload stats when switching tabs to ensure fresh data
    loadStats();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img src={logo} alt="ContentCrafter" className="h-8 w-8" />
              <h1 className="text-xl font-bold">
                <span className="font-inter">Content</span>
                <span className="font-serif">Crafter</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{stats.ai_credits} credits</span>
                <Badge variant={stats.subscription_plan === 'free' ? 'secondary' : 'default'}>
                  {stats.subscription_plan}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{user?.name}</span>
              </div>
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('dashboard.welcomeBack')} 👋
          </h2>
          <p className="text-gray-600">
            {t('dashboard.readyToCreate')}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('dashboard.aiCredits')}</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.ai_credits}</div>
              <p className="text-xs text-muted-foreground">
                {t('dashboard.availableForGeneration')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('dashboard.contentItems')}</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.content_items}</div>
              <p className="text-xs text-muted-foreground">
                {t('dashboard.generatedPosts')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('dashboard.templates')}</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.templates}</div>
              <p className="text-xs text-muted-foreground">
                {t('dashboard.savedTemplates')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('dashboard.mediaFiles')}</CardTitle>
              <Image className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.media_files}</div>
              <p className="text-xs text-muted-foreground">
                {t('dashboard.uploadedAssets')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="generate" className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>{t('navigation.generate')}</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>{t('navigation.content')}</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>{t('navigation.templates')}</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center space-x-2">
              <Image className="w-4 h-4" />
              <span>{t('navigation.media')}</span>
            </TabsTrigger>
            <TabsTrigger value="brand" className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span>{t('navigation.brandKit')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <ContentGenerator onStatsUpdate={loadStats} />
          </TabsContent>

          <TabsContent value="content">
            <ContentLibrary />
          </TabsContent>

          <TabsContent value="templates">
            <Templates onStatsUpdate={loadStats} />
          </TabsContent>

          <TabsContent value="media">
            <MediaLibrary onStatsUpdate={loadStats} />
          </TabsContent>

          <TabsContent value="brand">
            <BrandKit onStatsUpdate={loadStats} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;

