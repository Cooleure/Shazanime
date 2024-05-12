import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PredictionResult from './PredictionResult';

function Processing() {
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  // Récupérer le fichier depuis l'emplacement de la route
  const { file: locationFile, pred: pred } = location.state;

  // Mettre à jour le fichier lorsqu'il est disponible dans la location
  if (locationFile && !file) {
    setFile(locationFile);
    setPrediction(pred);
  }

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      {/* <Typography variant="h3" align="center" style={{ marginTop: '32px' }}>Traitement de l'image...</Typography> */}
      {file ? (
        <Card sx={{ maxWidth: '80vw', margin: 'auto', marginTop: 4 }}>
          <CardContent>
            <img
              src={URL.createObjectURL(file)}
              alt="Image"
              style={{ maxHeight: '300px', width: 'auto', height: 'auto' }}
            />
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1" align="center">
          Aucune image sélectionnée. Veuillez sélectionner une image à traiter.
        </Typography>
      )}
      <PredictionResult prediction={prediction} />
      <br />
      <Button variant="contained" onClick={navigateToHome} style={{ marginTop: '16px', marginBottom: '16px'}}>
        Retour à la page d'accueil
        </Button>
    </Container>
  );
}

export default Processing;
