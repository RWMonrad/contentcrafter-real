// API utility functions for ContentCrafter backend
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://p9hwiqcnejnm.manus.space/api'
  : '/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      credentials: 'include', // Include cookies for session management
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    console.log('🔍 API Request:', {
      url,
      method: config.method || 'GET',
      credentials: config.credentials,
      headers: config.headers
    });

    try {
      const response = await fetch(url, config);
      
      console.log('📡 API Response:', {
        url,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ API Error:', data);
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      console.log('✅ API Success:', data);
      return data;
    } catch (error) {
      console.error('💥 API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async changePassword(passwordData) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }

  // AI content endpoints
  async generateContent(contentData) {
    // Add current language to the request
    const language = localStorage.getItem('contentcrafter-language') || 'en';
    const requestData = {
      ...contentData,
      language: language
    };
    
    return this.request('/ai/generate', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async generateVariants(contentData) {
    // Add current language to the request
    const language = localStorage.getItem('contentcrafter-language') || 'en';
    const requestData = {
      ...contentData,
      language: language
    };
    
    return this.request('/ai/generate-variants', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async saveOnboarding(onboardingData) {
    return this.request('/ai/onboarding', {
      method: 'POST',
      body: JSON.stringify(onboardingData),
    });
  }

  // Workspace endpoints
  async getTemplates() {
    return this.request('/workspace/templates');
  }

  async createTemplate(templateData) {
    return this.request('/workspace/templates', {
      method: 'POST',
      body: JSON.stringify(templateData),
    });
  }

  async updateTemplate(templateId, templateData) {
    return this.request(`/workspace/templates/${templateId}`, {
      method: 'PUT',
      body: JSON.stringify(templateData),
    });
  }

  async deleteTemplate(templateId) {
    return this.request(`/workspace/templates/${templateId}`, {
      method: 'DELETE',
    });
  }

  async getContent() {
    return this.request('/workspace/content');
  }

  async createContent(contentData) {
    return this.request('/workspace/content', {
      method: 'POST',
      body: JSON.stringify(contentData),
    });
  }

  async updateContent(contentId, contentData) {
    return this.request(`/workspace/content/${contentId}`, {
      method: 'PUT',
      body: JSON.stringify(contentData),
    });
  }

  async deleteContent(contentId) {
    return this.request(`/workspace/content/${contentId}`, {
      method: 'DELETE',
    });
  }

  async getMedia() {
    return this.request('/workspace/media');
  }

  async uploadMedia(formData) {
    return this.request('/workspace/media/upload', {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  }

  async deleteMedia(mediaId) {
    return this.request(`/workspace/media/${mediaId}`, {
      method: 'DELETE',
    });
  }

  async getStats() {
    return this.request('/workspace/stats');
  }
}

export const apiClient = new ApiClient();
export default apiClient;

