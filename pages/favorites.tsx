import { useState } from "react";
import { Container, Typography, Box, Tabs, Tab } from "@mui/material";
import { FavoritesList } from "../src/favorites/components/FavoritesList";
import { FavoriteCatsList } from "../src/favorites/components/FavoriteCatsList"; // Import for favorite cats component
import ChucksAppBar from "../src/app/components/ChucksAppBar";
import { MyJoke } from '../src/jokes/components/MyJoke';

export default function Favorites() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <>
      <ChucksAppBar />
      <Box
        sx={{
          display: "flex",
          height: (theme) => `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
          flexDirection: "column",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h1" color="secondary">Favorites</Typography>

          {/* Tabs for switching between Jokes and Cats */}
          <Tabs value={tabIndex} onChange={handleTabChange} centered sx={{ mb: 4 }}>
            <Tab label="Favorite Jokes" />
            <Tab label="Favorite Cats" />
          </Tabs>

          {/* Content Area */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              width: "100%",
            }}
          >
            {/* Render Favorite Jokes or Favorite Cats based on selected tab */}
            {tabIndex === 0 && <FavoritesList />}
            {tabIndex === 1 && <FavoriteCatsList />}
          </Box>
        </Container>
        
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <MyJoke /> {/* Render MyJoke component for adding custom jokes */}
        </Container>

      </Box>
    </>
  );
}
