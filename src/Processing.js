import React, { useState } from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function ImageProcessing() {
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  // Récupérer le fichier depuis l'emplacement de la route
  const { file: locationFile } = location.state;

  // Mettre à jour le fichier lorsqu'il est disponible dans la location
  if (locationFile && !file) {
    setFile(locationFile);
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h3" align="center" style={{ marginTop: '32px' }}>Traitement de l'image...</Typography>
      {file ? (
        <Card sx={{ maxWidth: '80vw', margin: 'auto', marginTop: 4 }}>
          <CardContent>
            <img
              src={URL.createObjectURL(file)}
              alt="Image"
              style={{ width: '100%', height: 'auto' }}
            />
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1" align="center">
          Aucune image sélectionnée. Veuillez sélectionner une image à traiter.
        </Typography>
      )}
      <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginTop: '16px' }} />
      <br />
      <button onClick={navigateToHome} style={{ marginTop: '16px' }}>Retour à la page d'accueil</button>
    </Container>
  );
}

export default ImageProcessing;
