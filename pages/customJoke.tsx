import React from "react";
import { Container, Box, Typography } from "@mui/material";
import ChucksAppBar from "../src/app/components/ChucksAppBar"; 
import { MyJoke } from "../src/jokes/components/MyJoke";

const CustomJokePage: React.FC = () => {
  return (
    <>
      <ChucksAppBar />
      <Box
        sx={{
          background: "linear-gradient(to right, #3f51b5, #2196f3)", // Gradient background
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
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
            Custom Joke
          </Typography>
          <Box
            sx={{
              p: 4,
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              bgcolor: "rgba(255, 255, 255, 0.9)", // Slightly transparent background
              animation: "fadeIn 0.5s ease-in-out", // Fade-in animation
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >

            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                color: "#555",
                mb: 3,
                fontStyle: "italic",
                fontSize: "1rem",
                maxWidth: "90%",
                margin: "auto",
              }}
            >
              Feeling funny? Share your own joke with the world!
            </Typography>
            <MyJoke />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomJokePage;
