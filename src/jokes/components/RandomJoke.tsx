import AutorenewIcon from "@mui/icons-material/Autorenew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Button, Typography, Skeleton, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { favoritesState } from "../../favorites/state/FavoriteState";
import { getRandomJoke } from "../api/jokesApi";

interface RandomJokeProps {}

export const RandomJoke: React.FC<RandomJokeProps> = () => {
  const { isLoading, data, refetch } = useQuery({
    ...getRandomJoke(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const [addedToFavorites, setAddedToFavorites] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#fffacd");

  const onNewJokeButton = () => {
    refetch();
    // Alternate background color on each new joke
    setBackgroundColor((prev) => (prev === "#fffacd" ? "#e6e6fa" : "#fffacd"));
  };

  const addJokeToFavorites = () => {
    const currentJoke = data?.data.value;
    if (typeof currentJoke === "string" && !favorites.includes(currentJoke)) {
      setFavorites([...favorites, currentJoke]);
      setAddedToFavorites(true);
      toast.success("Joke added to favorites!");
      setTimeout(() => setAddedToFavorites(false), 3000);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        bgcolor: backgroundColor,
        borderRadius: 2,
        boxShadow: 3,
        transition: "background-color 0.3s ease",
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      {isLoading ? (
        <Skeleton sx={{ width: "100%" }} />
      ) : (
        <Typography sx={{ fontSize: "1.2rem", textAlign: "center" }}>
          {data?.data.value}
        </Typography>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          onClick={onNewJokeButton}
          variant="contained"
          color="primary"
          startIcon={<AutorenewIcon />}
          sx={{
            bgcolor: "#3f51b5",
            "&:hover": { bgcolor: "#303f9f" },
          }}
        >
          Next Joke
        </Button>

        <Button
          onClick={addJokeToFavorites}
          variant="contained"
          color="secondary"
          startIcon={<FavoriteIcon />}
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
      </Box>
    </Paper>
  );
};
