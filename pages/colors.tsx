import { Box, Container, Typography } from "@mui/material";
import ChucksAppBar from "../src/app/components/ChucksAppBar";
import { ColorTable } from "../src/randomColor/components/ColorTable";
import { RandomColorGenerator } from "../src/randomColor/components/RandomColorGenerator";

export default function Colors() {
  return (
    <>
      <ChucksAppBar />
      <Box
        sx={{
          background: "linear-gradient(to right, #3f51b5, #2196f3)", // Background gradient for the page
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        <Container maxWidth="lg">
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
            Colors
          </Typography>
          
          {/* Random Color Generator Section */}
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
                transform: "scale(1.02)", // Slight scale on hover
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Increased shadow on hover
              },
            }}
          >
            <RandomColorGenerator />
          </Box>
          
          {/* Color Table Section */}
          <Box
            sx={{
              mt: 4,
              p: 4,
              bgcolor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              animation: "fadeIn 0.7s ease-in-out",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.02)", // Slight scale on hover
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Increased shadow on hover
              },
            }}
          >
            <ColorTable />
          </Box>
        </Container>
      </Box>
    </>
  );
}
