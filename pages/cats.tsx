import React from "react";
import RandomCat from "../src/RandomCatPic/components/RandomCat";
import ChucksAppBar from "../src/app/components/ChucksAppBar";
import { Box, Container, Typography } from "@mui/material";

const CatsPage: React.FC = () => {
  return (
    <>
      <ChucksAppBar />
      <Box
        sx={{
          background: "linear-gradient(to right, #3f51b5, #2196f3)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              color: "#fff",
              fontWeight: 700,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              mb: 4,
            }}
          >
            Cute Cats
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            gutterBottom
            sx={{ color: "#e0e0e0" }}
          >
            Enjoy random images of cats and add your favorites to the list!
          </Typography>

          {/* Cat Image Display Box */}
          <Box
            sx={{
              mb: 6,
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              animation: "fadeIn 0.5s ease-in-out",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <RandomCat showFavoritesButton={true} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CatsPage;
