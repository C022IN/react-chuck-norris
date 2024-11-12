import { useState } from "react";
import { Container, Typography, Box, Tabs, Tab, Paper } from "@mui/material";
import { FavoritesList } from "../src/favorites/components/FavoritesList";
import { FavoriteCatsList } from "../src/favorites/components/FavoriteCatsList";
import ChucksAppBar from "../src/app/components/ChucksAppBar";
import { MyJoke } from '../src/jokes/components/MyJoke';
import { LoadingButton } from "../src/app/components/LoadingButton";

export default function Favorites() {
    const [tabIndex, setTabIndex] = useState(0);
    const [loadingTab, setLoadingTab] = useState(false);

    const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
        setLoadingTab(true);
        setTimeout(() => {
            setTabIndex(newIndex);
            setLoadingTab(false);
        }, 500); // Show loading for 0.5 seconds
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
                    paddingTop: 4,
                    paddingBottom: 4,
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        align="center"
                        gutterBottom
                        sx={{
                            color: "#fff",
                            fontWeight: 700,
                            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                            mb: 4,
                        }}
                    >
                        Favorites
                    </Typography>

                    {/* Favorites Section */}
                    <Box
                        sx={{
                            bgcolor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: 2,
                            boxShadow: 3,
                            p: 4,
                            mb: 4,
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.02)",
                            },
                        }}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                width: "100%",
                                borderRadius: 2,
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                mb: 4,
                            }}
                        >
                            {/* Tabs for switching between Favorite Jokes and Favorite Cats */}
                            <Tabs value={tabIndex} onChange={handleTabChange} centered sx={{ mb: 2 }}>
                                <Tab label="Favorite Jokes" />
                                <Tab label="Favorite Cats" />
                            </Tabs>

                            {/* LoadingButton for a smooth loading effect when switching tabs */}
                            {loadingTab ? (
                                <LoadingButton
                                    loading
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        my: 2,
                                        color: "#fff",
                                        backgroundColor: "#2196f3",
                                        "&:hover": {
                                            backgroundColor: "#1976d2",
                                        },
                                    }}
                                >
                                    {tabIndex === 0 ? "Loading Favorite Jokes..." : "Loading Favorite Cats..."}
                                </LoadingButton>
                            ) : null}

                            {/* Render Favorite Jokes or Favorite Cats based on selected tab */}
                            <Box sx={{ mt: 2, p: 2 }}>
                                {!loadingTab && (
                                    <>
                                        {tabIndex === 0 && <FavoritesList />}
                                        {tabIndex === 1 && <FavoriteCatsList />}
                                    </>
                                )}
                            </Box>
                        </Paper>
                    </Box>

                    {/* Custom joke input form */}
                    <Box
                        sx={{
                            bgcolor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: 2,
                            boxShadow: 3,
                            p: 4,
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.02)",
                            },
                        }}
                    >
                        <MyJoke />
                    </Box>
                </Container>
            </Box>
        </>
    );
}
