import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DescriptionIcon from '@mui/icons-material/Description';

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

export default function UploadResumeButton({ onResumeSelected }) {
  return (
    <Button
      component="label"
      variant="contained"
      size="small"
      startIcon={<DescriptionIcon />}
      sx={{
        padding: '2px 6px',
        minHeight: '24px',
        fontSize: '0.65rem',
        lineHeight: 1.2,
        textTransform: 'none',
        backgroundColor: '#1976d2',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#115293',
        },
      }}
    >
      Upload Resume
      <VisuallyHiddenInput
        type="file"
        accept="application/pdf"
        onChange={(event) => {
          const selectedFile = event.target.files[0];
          console.log('Selected resume file:', selectedFile);
          if (selectedFile && onResumeSelected) {
            onResumeSelected(selectedFile);
          }
        }}
      />
    </Button>
  );
}