import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Image, 
  Upload, 
  Search, 
  Download, 
  Trash2,
  FileText,
  File,
  Plus
} from 'lucide-react';
import { apiClient } from '../../lib/api.jsx';

const MediaLibrary = ({ onStatsUpdate }) => {
  const { t } = useTranslation();
  const [mediaFiles, setMediaFiles] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [uploadData, setUploadData] = useState({
    file: null,
    description: ''
  });

  useEffect(() => {
    loadMedia();
  }, []);

  useEffect(() => {
    filterMedia();
  }, [mediaFiles, searchTerm]);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getMedia();
      setMediaFiles(response.media);
    } catch (error) {
      console.error('Failed to load media:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMedia = () => {
    let filtered = mediaFiles;

    if (searchTerm) {
      filtered = filtered.filter(file => 
        file.original_filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (file.description && file.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredMedia(filtered);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadData(prev => ({ ...prev, file }));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!uploadData.file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', uploadData.file);
      formData.append('description', uploadData.description);

      await apiClient.uploadMedia(formData);
      
      setIsUploadDialogOpen(false);
      setUploadData({ file: null, description: '' });
      loadMedia();
      onStatsUpdate?.();
    } catch (error) {
      console.error('Failed to upload file:', error);
    } finally {
      setUploading(false);
    }
  };

  const deleteMedia = async (mediaId) => {
    try {
      await apiClient.deleteMedia(mediaId);
      setMediaFiles(prev => prev.filter(file => file.id !== mediaId));
      onStatsUpdate?.();
    } catch (error) {
      console.error('Failed to delete media:', error);
    }
  };

  const downloadMedia = async (mediaId, filename) => {
    try {
      const response = await fetch(`http://localhost:5000/api/workspace/media/${mediaId}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Failed to download media:', error);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFileIcon = (mimeType) => {
    if (mimeType?.startsWith('image/')) {
      return Image;
    } else if (mimeType?.includes('pdf')) {
      return FileText;
    } else {
      return File;
    }
  };

  const isImage = (mimeType) => {
    return mimeType?.startsWith('image/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Image className="w-8 h-8 animate-pulse mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Loading your media...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Image className="w-5 h-5 text-primary" />
                <span>{t('dashboard.tabs.media')}</span>
              </CardTitle>
              <CardDescription>
                {t('mediaLibrary.description')}
              </CardDescription>
            </div>
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Upload File
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Media File</DialogTitle>
                  <DialogDescription>
                    Upload images, documents, or other media files to your library
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div>
                    <Label htmlFor="file">File *</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileSelect}
                      accept="image/*,.pdf,.doc,.docx"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Supported formats: Images (PNG, JPG, GIF), PDF, Word documents
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Input
                      id="description"
                      placeholder="Brief description of this file"
                      value={uploadData.description}
                      onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={uploading || !uploadData.file}>
                      {uploading ? (
                        <>
                          <Upload className="w-4 h-4 mr-2 animate-pulse" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload File
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search media files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {filteredMedia.length === 0 ? (
            <div className="text-center py-12">
              <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No media files found</h3>
              <p className="text-muted-foreground mb-4">
                {mediaFiles.length === 0 
                  ? "Upload your first media file to get started"
                  : "Try adjusting your search"
                }
              </p>
              {mediaFiles.length === 0 && (
                <Button onClick={() => setIsUploadDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Your First File
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredMedia.map((file) => {
                const FileIcon = getFileIcon(file.mime_type);

                return (
                  <Card key={file.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                      <div className="aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                        {isImage(file.mime_type) ? (
                          <img 
                            src={`/api/workspace/media/${file.id}/download`}
                            alt={file.original_filename}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className={`w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center ${isImage(file.mime_type) ? 'hidden' : ''}`}>
                          <FileIcon className="w-8 h-8 text-muted-foreground" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium text-sm line-clamp-2">
                          {file.original_filename}
                        </h3>
                        
                        {file.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {file.description}
                          </p>
                        )}

                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{formatFileSize(file.file_size)}</span>
                          <span>{formatDate(file.created_at)}</span>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => downloadMedia(file.id, file.original_filename)}
                            className="flex-1"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteMedia(file.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
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

export default MediaLibrary;

