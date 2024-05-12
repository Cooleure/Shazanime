import React, { useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import axios from 'axios';

const DropZoneContainer = styled(Paper)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999,
  cursor: 'pointer',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
});

const ContentContainer = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Content = styled('div')({
  textAlign: 'center',
  border: '2px dashed #aaa',
  borderRadius: '20px',
  padding: '30px',
});

const Title = styled(Typography)({
  position: 'absolute',
  top: '100px',
  width: '100%',
  textAlign: 'center',
  fontSize: '96px',
  fontWeight: 'bold',
  color: '#fff',
});

function Home() {
  // const location = useLocation();
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);

  const sendImageToServer = (imageFile) => {
    // Crée un objet FormData
    const formData = new FormData();
    formData.append('image', imageFile);

    // Envoie l'image au serveur Flask
    axios.post('http://127.0.0.1:5000/predict', formData)
      .then(response => {
        const prediction = response.data;
        console.log(prediction)
        navigate("/processing", { state: { file: imageFile, pred: prediction } });
      })
      .catch(error => {
        console.error('Erreur lors de l\'envoi de l\'image au serveur :', error);
      });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      sendImageToServer(file);
      setDragging(false);
    }
  };

  const handleClick = (e) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      sendImageToServer(file);
    };
    input.click();
  };

  return (
    <div
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <DropZoneContainer>
        <ContentContainer style={{ opacity: dragging ? 0.5 : 1 }}>
          <Title variant="h4">Shazanime</Title>
          <Content>
            <ImageIcon fontSize="large" style={{ color: 'white', fontSize: 80 }} />
            <Typography variant="h6" align="center" color="#fff">Déposer une image n'importe où</Typography>
          </Content>
        </ContentContainer>
      </DropZoneContainer>
    </div>
  );
}

export default Home;