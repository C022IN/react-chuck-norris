import { Typography, Box, Container, Paper } from "@mui/material";
import ChucksAppBar from "../src/app/components/ChucksAppBar";
import { RandomJoke } from "../src/jokes/components/RandomJoke";
import { FavoritesList } from "../src/favorites/components/FavoritesList";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { LoadingButton } from "../src/app/components/LoadingButton"; 

export default function Home() {
    const [showFavorites, setShowFavorites] = useState(false);
    const [loadingFavorites, setLoadingFavorites] = useState(false);

    const handleToggleFavorites = () => {
        setLoadingFavorites(true);
        setTimeout(() => {
            setShowFavorites(!showFavorites);
            setLoadingFavorites(false);
        }, 500); 
    };

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
                    padding: 4,
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
                        }}
                    >
                        Chuckychuck
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        gutterBottom
                        sx={{ color: "#e0e0e0" }}
                    >
                        Did you know that Chuck Norris can make jokes in his dreams and they automatically load here? Check them out now! 😂
                    </Typography>

                    {/* Jokes Display Box */}
                    <Box
                        sx={{
                            my: 4,
                            p: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            bgcolor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: 2,
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.03)",
                            },
                        }}
                    >
                        <RandomJoke />
                    </Box>

                    {/* Show Favorites Button and List */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            bgcolor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: 2,
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                            p: 2,
                            mt: 4,
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.03)",
                            },
                        }}
                    >
                        <LoadingButton
                            onClick={handleToggleFavorites}
                            variant="outlined"
                            startIcon={<FavoriteIcon />}
                            loading={loadingFavorites}
                            sx={{
                                color: "#2196f3",
                                borderColor: "#2196f3",
                                "&:hover": {
                                    color: "#fff",
                                    backgroundColor: "#2196f3",
                                    borderColor: "#2196f3",
                                },
                            }}
                        >
                            {showFavorites ? "Hide Favorites" : "Show Favorites"}
                        </LoadingButton>

                        {/* FavoritesList */}
                        {showFavorites && (
                            <Box
                                sx={{
                                    mt: 3,
                                    p: 2,
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    bgcolor: "rgba(255, 255, 255, 0.8)",
                                    animation: "fadeIn 0.5s ease-in-out",
                                }}
                            >
                                <FavoritesList />
                            </Box>
                        )}
                    </Box>
                </Container>
            </Box>
        </>
    );
}
