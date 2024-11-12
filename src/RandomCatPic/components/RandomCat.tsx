import React, { useState, useEffect } from "react";
import { fetchRandomCatPic } from "../api/CatApi";
import { Cat } from "../model/Cat";
import { useRecoilState } from "recoil";
import { favoriteCatsState } from "../state/FavoriteCatsState";
import { Button, Box, Typography } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "sonner";

interface RandomCatProps {
  showFavoritesButton?: boolean;
}

const RandomCat: React.FC<RandomCatProps> = ({ showFavoritesButton = false }) => {
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
      toast.success("Cat added to favorites!", { duration: 3000 });
      setTimeout(() => setAddedToFavorites(false), 2000);
    }
  };

  useEffect(() => {
    loadCatPic();
  }, []);

  return (
    <Box sx={{ textAlign: "center" }}>
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
          sx={{
            color: "#fff",
            bgcolor: "#3f51b5",
            "&:hover": {
              bgcolor: "#303f9f",
            },
          }}
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
            sx={{
              bgcolor: addedToFavorites ? "success.main" : "secondary.main",
              "&:hover": {
                bgcolor: addedToFavorites ? "success.dark" : "secondary.dark",
              },
            }}
          >
            {addedToFavorites ? "Added to Favorites" : "Add to Favorites"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default RandomCat;
