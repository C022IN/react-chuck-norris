import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

const CatapultGame = () => {
    const [stonePosition, setStonePosition] = useState({ x: 0, y: 0 });
    const [monsterPosition, setMonsterPosition] = useState(80);
    const [isFired, setIsFired] = useState(false);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(3);
    const [resultMessage, setResultMessage] = useState("");
    const [isHit, setIsHit] = useState(false);
    const [isMiss, setIsMiss] = useState(false);

    const router = useRouter();

    const handleLaunch = () => {
        if (!isFired && attempts > 0) {
            setIsFired(true);
            let x = 10;
            let y = 0;

            const interval = setInterval(() => {
                x += 3;
                y = 0.05 * Math.pow(x - 10, 2);

                setStonePosition({ x, y });

                if (x >= monsterPosition - 5 && x <= monsterPosition + 5 && y > 30) {
                    clearInterval(interval);
                    setIsFired(false);
                    setScore(score + 1);
                    setResultMessage("🎉 You hit the monster! 🎉");
                    setStonePosition({ x: 0, y: 0 });
                    setIsHit(true);
                    setIsMiss(false);
                    setTimeout(() => setIsHit(false), 2000);
                }

                if (x > 100 || y > 40) {
                    clearInterval(interval);
                    setIsFired(false);
                    setStonePosition({ x: 0, y: 0 });
                    setAttempts(attempts - 1);
                    setResultMessage(attempts - 1 > 0 ? `You threw ${Math.round(x)}m. Try again!` : `Game over! The monster was ${monsterPosition}m away.`);
                    setIsMiss(true);
                    setIsHit(false);
                    setTimeout(() => setIsMiss(false), 2000);
                }
            }, 50);
        }
    };

    useEffect(() => {
        const moveMonster = setInterval(() => {
            setMonsterPosition(prev => (prev < 80 ? prev + 10 : 20));
        }, 1000);
        return () => clearInterval(moveMonster);
    }, []);

    const handleGoToChuckNorris = () => {
        router.push('/'); // Replace with the actual route to the Chuck Norris page
    };

    return (
        <Box
            sx={{
                background: "linear-gradient(to right, #3f51b5, #2196f3)",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
                textAlign: "center",
                color: "#fff",
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    }}
                >
                    404 - Page Not Found
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 2,
                        fontSize: "1.2rem",
                    }}
                >
                    Oops! You’ve wandered off the beaten path. But there’s a monster nearby!
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mb: 4,
                        fontStyle: "italic",
                    }}
                >
                    Can you hit it with your throw? You have {attempts} attempts left.
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        bgcolor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: 2,
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                        p: 4,
                        mt: 2,
                    }}
                >
                    <Typography variant="h5">Score: {score}</Typography>

                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: '200px',
                            mt: 3,
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                            border: '1px solid #ccc',
                            backgroundColor: '#fff',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                height: '10px',
                                background: 'linear-gradient(45deg, #8B4513, #A0522D)',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '10px',
                                left: '5%',
                                width: '40px',
                                height: '20px',
                                background: 'linear-gradient(45deg, #654321, #8B4513)',
                                transform: 'rotateX(15deg)',
                                boxShadow: '2px 4px 6px rgba(0, 0, 0, 0.5)',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: `${stonePosition.y + 10}px`,
                                left: `${stonePosition.x}%`,
                                width: '12px',
                                height: '12px',
                                background: 'radial-gradient(circle, #808080, #333)',
                                borderRadius: '50%',
                                boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.5)',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '10px',
                                left: `${monsterPosition}%`,
                                width: '30px',
                                height: '30px',
                                background: 'radial-gradient(circle, #32CD32, #228B22)',
                                borderRadius: '50%',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
                            }}
                        />
                    </Box>

                    <Button
                        onClick={handleLaunch}
                        disabled={isFired || attempts <= 0}
                        sx={{
                            mt: 3,
                            padding: '10px 20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                            color: '#333',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                            transition: 'transform 0.2s ease',
                            "&:hover": {
                                background: "linear-gradient(45deg, #FFA500, #FF8C00)",
                                transform: "scale(1.05)"
                            }
                        }}
                    >
                        Launch Stone
                    </Button>

                    <Typography
                        sx={{
                            mt: 2,
                            fontSize: "18px",
                            color: "#333"
                        }}
                    >
                        {resultMessage}
                    </Typography>

                    {isHit && (
                        <Box sx={{ mt: 2 }}>
                            <iframe
                                src="https://giphy.com/embed/JOXE34On2LDWPrwmu2"
                                width="100%"
                                height="200px"
                                frameBorder="0"
                                style={{ borderRadius: '8px' }}
                                allowFullScreen
                            ></iframe>
                        </Box>
                    )}
                    {isMiss && (
                        <Box sx={{ mt: 2 }}>
                            <iframe
                                src="https://giphy.com/embed/dCWuTWLoye9LmEbIYn"
                                width="100%"
                                height="200px"
                                frameBorder="0"
                                style={{ borderRadius: '8px' }}
                                allowFullScreen
                            ></iframe>
                        </Box>
                    )}
                </Box>

                <Button
                    onClick={handleGoToChuckNorris}
                    sx={{
                        mt: 4,
                        padding: '10px 20px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#fff',
                        background: 'linear-gradient(45deg, #3f51b5, #2196f3)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                        transition: 'transform 0.2s ease',
                        "&:hover": {
                            background: "linear-gradient(45deg, #303f9f, #1976d2)",
                            transform: "scale(1.05)"
                        }
                    }}
                >
                    Take Me to back to Chuck Norris
                </Button>
            </Container>
        </Box>
    );
};

export default CatapultGame;
