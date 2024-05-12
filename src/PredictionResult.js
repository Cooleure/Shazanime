import React from 'react';
import { Typography } from '@mui/material';
import studioGhibliImage from './studio_images/studio_ghibli.png';
import studioToeiImage from './studio_images/studio_toei.png';
import studioWitImage from './studio_images/studio_wit.png';

function PredictionResult({ prediction }) {
  let imageSrc;
  let predictionText;
  switch (prediction) {
    case "GB":
      imageSrc = studioGhibliImage;
      predictionText = "Studio Ghibli";
      break;
    case "TOEI":
      imageSrc = studioToeiImage;
      predictionText = "TOEI Animation";
      break;
    case "WIT":
      imageSrc = studioWitImage;
      predictionText = "Wit Studio";
      break;
    default:
      imageSrc = null;
      predictionText = "Prédiction non reconnue";
  }

  return (
    <div style={{ marginTop: '16px', marginBottom: '16px', textAlign: 'center' }}>
      {imageSrc && <img src={imageSrc} alt="Studio" style={{ maxWidth: '200px', maxHeight: '200px', width: 'auto', height: 'auto' }} />}
      <Typography variant="body1">{predictionText}</Typography>
    </div>
  );
}

export default PredictionResult;
