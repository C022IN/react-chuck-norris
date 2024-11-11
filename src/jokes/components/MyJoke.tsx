import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRecoilState } from "recoil";
import { favoritesState } from "../../favorites/state/FavoriteState";

export const MyJoke: React.FC = () => {
  const [myJoke, setMyJoke] = useState("");
  const [favorites, setFavorites] = useRecoilState(favoritesState);

  // Function to add custom joke to favorites list
  const addMyJokeToFavorites = () => {
    if (myJoke.trim() === "") return;

    const newJoke = { text: myJoke, isCustom: true }; // Mark joke as custom
    setFavorites([...favorites, newJoke]);
    setMyJoke(""); // Clear input field after adding joke
  };

  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h6">Add Your Own Joke</Typography>
      <TextField
        variant="outlined"
        placeholder="Enter your joke"
        value={myJoke}
        onChange={(e) => setMyJoke(e.target.value)}
        sx={{ mt: 2, width: "100%" }}
      />
      <Button
        onClick={addMyJokeToFavorites}
        variant="contained"
        color="primary"
        startIcon={<FavoriteIcon />}
        sx={{ mt: 2 }}
      >
        Add to Favorites
      </Button>
    </Box>
  );
};
