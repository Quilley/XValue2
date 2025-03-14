import React from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import { Upload } from 'lucide-react';

interface FileUploadCardProps {
  title: string;
  description: string;
  fileType: string;
  accentColor: string;
  onUpload: (files: FileList) => void;
}

const FileUploadCard: React.FC<FileUploadCardProps> = ({ 
  title, 
  description, 
  fileType, 
  accentColor,
  onUpload 
}) => {
  // Create a hidden file input ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '12px',
        border: '1px dashed #bdbdbd',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        height: '100%',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: `linear-gradient(145deg, ${accentColor}05 0%, ${accentColor}02 100%)`,
        '&:hover': {
          borderColor: accentColor,
          boxShadow: `0 4px 12px ${accentColor}20`,
          transform: 'translateY(-3px)'
        }
      }}
      onClick={handleUploadClick}
    >
      <IconButton 
        sx={{ 
          backgroundColor: `${accentColor}15`,
          mb: 2,
          width: '56px',
          height: '56px',
          '&:hover': {
            backgroundColor: `${accentColor}25`,
          }
        }}
      >
        <Upload size={24} color={accentColor} />
      </IconButton>

      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, textAlign: 'center' }}>
        {title}
      </Typography>

      <Typography variant="body2" sx={{ color: '#6B7280', textAlign: 'center', mb: 2 }}>
        {description}
      </Typography>

      <Typography variant="caption" sx={{ color: '#9CA3AF', fontWeight: 500 }}>
        {fileType}
      </Typography>

      <input 
        type="file" 
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept={fileType}
      />
    </Paper>
  );
};

export default FileUploadCard;