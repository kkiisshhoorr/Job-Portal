import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ onFilesSelected }) {
  return (
    <Button component="label" variant="contained" size="small"   startIcon={<CloudUploadIcon />}  sx={{
    padding: '2px 6px',      
    minHeight: '24px',        
    fontSize: '0.65rem',     
    lineHeight: 1.2,         
    textTransform: 'none',    
  }}
>
      Upload Profile Photo
      <VisuallyHiddenInput
        type="file"
        accept="image/*"
        onChange={(event) => {
          const selectedFile = event.target.files[0];
          console.log('Selected image:', selectedFile); 
          if (selectedFile && onFilesSelected) {
            onFilesSelected(selectedFile); 
          }
        }}
      />
    </Button>
  );
}