import React, { useState } from 'react';
import { Paper, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';

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
  cursor: 'pointer', // Curseur en forme de main
  backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fond sombre
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
  border: '2px dashed #aaa', // Ajout de la bordure pointillée
  borderRadius: '20px', // Coins arrondis
  padding: '30px', // Réduction de l'espacement intérieur
});

const Title = styled(Typography)({
  position: 'absolute',
  top: '100px', // Ajuster la marge supérieure
  width: '100%',
  textAlign: 'center',
  // Plus grand
  fontSize: '96px',
  fontWeight: 'bold',
  color: '#fff', // Couleur de texte blanche
});

function Home() {
  const [dragging, setDragging] = useState(false);
  const navigate = useNavigate();

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
      navigate("/processing",  { state: { file } });
      setDragging(false);
    }
  };

  const handleClick = (e) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      navigate("/processing",  { state: { file } });
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
