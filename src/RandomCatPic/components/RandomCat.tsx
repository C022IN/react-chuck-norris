// react-chuck-norris/src/RandomCatPic/components/RandomCat.tsx
import React, { useState, useEffect } from "react";
import { fetchRandomCatPic } from "../api/CatApi";
import { Cat } from "../model/Cat";
import { useRecoilState } from "recoil";
import { favoriteCatsState } from "../state/FavoriteCatsState";
import { Button, Box, Typography, Container } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChucksAppBar from "../../app/components/ChucksAppBar"; // Import ChucksAppBar

interface RandomCatProps {
  showAppBar?: boolean;
  showFavoritesButton?: boolean;
}

const RandomCat: React.FC<RandomCatProps> = ({
  showAppBar = false,
  showFavoritesButton = false,
}) => {
  const [catPic, setCatPic] = useState<Cat | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [favorites, setFavorites] = useRecoilState(favoriteCatsState);
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const loadCatPic = async () => {
    setIsLoading(true);
    setIsError(false);

    const data = await fetchRandomCatPic();
    if (data) {
      setCatPic(data);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const addCatToFavorites = () => {
    if (catPic && !favorites.some((favorite) => favorite.id === catPic.id)) {
      setFavorites([...favorites, catPic]);
      setAddedToFavorites(true);
      setTimeout(() => setAddedToFavorites(false), 2000);
    }
  };

  useEffect(() => {
    loadCatPic();
  }, []);

  return (
    <>
      {showAppBar && <ChucksAppBar />}
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Random Cat Image
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
            borderRadius: 2,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            bgcolor: "background.paper",
            maxWidth: "100%",
            margin: "auto",
          }}
        >
          {isLoading ? (
            <Typography variant="body1">Loading...</Typography>
          ) : isError ? (
            <Typography variant="body1" color="error">
              Error loading cat image.
            </Typography>
          ) : (
            catPic && (
              <img
                src={catPic.url}
                alt="Random Cat"
                style={{ maxWidth: "100%", borderRadius: "8px", marginBottom: "16px" }}
                onError={() => setIsError(true)}
              />
            )
          )}
          
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
            <Button 
                variant="contained" 
                onClick={loadCatPic} 
                startIcon={<AutorenewIcon />}
            >
              Load New Cat
            </Button>

            {showFavoritesButton && (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<FavoriteIcon />}
                onClick={addCatToFavorites}
                disabled={addedToFavorites}
              >
                {addedToFavorites ? "Added to Favorites" : "Add to Favorites"}
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RandomCat;
