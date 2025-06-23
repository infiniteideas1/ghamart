import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Container, Typography, Paper, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

// Styled components
const UploadBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  border: '2px dashed #ccc',
  '&:hover': {
    border: `2px dashed ${theme.palette.primary.main}`,
  },
}));

const ImagePreview = styled('img')({
  maxWidth: '100%',
  maxHeight: '300px',
  marginTop: '20px',
});

const PoultryHealth = () => {
  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Load the model on component mount
  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    const URL = "/tm-my-image-model/";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
      const loadedModel = await window.tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    } catch (error) {
      console.error("Error loading model:", error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
        analyzePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePicture = async (imageSource) => {
    if (!model) return;

    setLoading(true);
    setPredictions(null);

    try {
      const img = new Image();
      img.src = imageSource;
      await img.decode(); // Make sure image is loaded

      const prediction = await model.predict(img);
      setPredictions(prediction);
    } catch (error) {
      console.error("Error during prediction:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRecommendations = (predictions) => {
    if (!predictions) return null;

    const healthyPrediction = predictions.find(p => p.className.toLowerCase().includes('healthy'));
    const isHealthy = healthyPrediction?.probability > 0.5;

    if (isHealthy) {
      return [
        "Continue with current feeding and care practices",
        "Maintain clean and sanitized living conditions",
        "Regular health check-ups",
        "Ensure proper vaccination schedule is followed",
        "Provide balanced nutrition"
      ];
    } else {
      return [
        "Isolate the affected poultry immediately",
        "Consult a veterinarian for proper diagnosis",
        "Check and improve ventilation in the coop",
        "Review and adjust feeding practices",
        "Implement stricter biosecurity measures"
      ];
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Poultry Health Analysis
      </Typography>

      <Box sx={{ my: 4 }}>
        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
        
        <UploadBox onClick={() => fileInputRef.current.click()}>
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Click to Upload Poultry Image
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Supported formats: JPG, PNG
          </Typography>
        </UploadBox>

        {imageUrl && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <ImagePreview src={imageUrl} alt="Uploaded poultry" />
          </Box>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <CircularProgress />
          </Box>
        )}

        {predictions && (
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Analysis Results:
            </Typography>
            {predictions.map((prediction, index) => (
              <Typography key={index} variant="body1">
                {prediction.className}: {(prediction.probability * 100).toFixed(2)}%
              </Typography>
            ))}

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Recommendations:
            </Typography>
            <ul>
              {getRecommendations(predictions).map((recommendation, index) => (
                <li key={index}>
                  <Typography variant="body1">{recommendation}</Typography>
                </li>
              ))}
            </ul>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default PoultryHealth; 