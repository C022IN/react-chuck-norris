import { Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ChucksAppBar from "../src/app/components/ChucksAppBar";
import { RandomJoke } from "../src/jokes/components/RandomJoke";
import { FavoritesList } from "../src/favorites/components/FavoritesList";
import { useState } from 'react';

export default function Home() {
    const [showFavorites, setShowFavorites] = useState(false);
  return (
    <>
      <ChucksAppBar />
      <Container maxWidth="xl">
        <Typography variant="h1" color="primary">Chuckychuck</Typography>
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "primary.main",
            color: "Grey",
            borderRadius: 4,  //rounded corners
          }}
        >
          <RandomJoke />

          <Button onClick={() => setShowFavorites(!showFavorites)} variant="outlined">
            {showFavorites ? "Hide Favorites" : "Show Favorites"}
          </Button>
        {showFavorites && <FavoritesList />}
      </Box>
      </Container>
    </>
  );
}
