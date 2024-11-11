import AutorenewIcon from "@mui/icons-material/Autorenew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Button, Paper, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { favoritesState } from "../../favorites/state/FavoriteState";
import { getRandomJoke } from "../api/jokesApi";

interface RandomJokeProps {}

export const RandomJoke: React.FC<RandomJokeProps> = ({}) => {
  const { isLoading, data, refetch } = useQuery({
    ...getRandomJoke(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const onNewJokeButton = () => {
    refetch();
  };

  const addJokeToFavorites = () => {
    const currentJoke = data?.data.value;
    if (typeof currentJoke === "string" && !favorites.includes(currentJoke)) {
      setFavorites([...favorites, currentJoke]);
      setAddedToFavorites(true);
      setTimeout(() => setAddedToFavorites(false), 2000);
    }
  };

  return (
    <Box
      sx={{
        padding: 3,
        bgcolor: "silver",
        border: "2px solid",
        borderColor: "primary.main",
        boxShadow: 13,
        borderRadius: 2,
      }}
    >
      <Paper
        sx={{
          padding: 2,
          width: 600,
          backgroundColor: "#fffacd",
          borderRadius: 2,
          boxShadow: 3,
          fontFamily: "'Comic Sans MS', cursive",
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "8px",
            backgroundColor: "#fffacd",
            borderBottom: "2px dashed #d4af37",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          },
        }}
      >
        {isLoading ? (
          <Skeleton sx={{ width: "100%" }} />
        ) : (
          <Typography>{data?.data.value}</Typography>
        )}
      </Paper>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 2,
          padding: 3,
          bgcolor: "primary",
          border: "1px solid #A9A9A9",
          borderColor: "silver",
          boxShadow: 13,
          borderRadius: 2,
        }}
      >
      <Box sx={{ textAlign: "center", mt: 2 }}>
        {addedToFavorites && (
          <Typography color="success.main">Added to Favorites!</Typography>
        )}
      </Box>
        <Button
            onClick={onNewJokeButton}
            variant="contained"
            color="primary"
            startIcon={<AutorenewIcon />}
        >
            Next Joke?
        </Button>

        <Button
            onClick={addJokeToFavorites}
            variant="contained"
            color="secondary"
            startIcon={<FavoriteIcon />}
            disabled={addedToFavorites}
          >
            {addedToFavorites ? "Added to Favorites" : "Add to Favorites"}
        </Button>
      </Box>
    </Box>
  );
};
