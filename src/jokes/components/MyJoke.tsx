import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRecoilState } from "recoil";
import { favoritesState, FavoriteJoke } from "../../favorites/state/FavoriteState";
import { toast } from "sonner"; // Import toast

export const MyJoke: React.FC = () => {
  const [myJoke, setMyJoke] = useState("");
  const [favorites, setFavorites] = useRecoilState(favoritesState);

  const addMyJokeToFavorites = () => {
    if (myJoke.trim() === "") return;

    // Check if joke already exists in favorites
    const jokeExists = favorites.some(
      (favorite) =>
        (typeof favorite === "string" && favorite === myJoke) ||
        (typeof favorite === "object" && favorite.text === myJoke && favorite.isCustom)
    );

    if (jokeExists) {
      toast.error("Joke already in favorites!"); // Show error toast if duplicate
    } else {
      const newJoke: FavoriteJoke = { text: myJoke, isCustom: true }; // Mark joke as custom
      setFavorites([...favorites, newJoke]);
      setMyJoke(""); // Clear input field after adding joke
      toast.success("Joke added to favorites!"); // Show success toast
    }
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
