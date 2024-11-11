import React, { useState, useEffect } from 'react';

const CatapultGame = () => {
    const [stonePosition, setStonePosition] = useState({ x: 0, y: 0 });
    const [monsterPosition, setMonsterPosition] = useState(80);
    const [isFired, setIsFired] = useState(false);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(3); // Only 3 attempts allowed
    const [resultMessage, setResultMessage] = useState("");
    const [isHit, setIsHit] = useState(false); // Tracks if it's a hit
    const [isMiss, setIsMiss] = useState(false); // Tracks if it's a miss

    // Handle stone launch
    const handleLaunch = () => {
        if (!isFired && attempts > 0) {
            setIsFired(true);
            let x = 10;
            let y = 0;

            const interval = setInterval(() => {
                x += 3;
                y = 0.05 * Math.pow(x - 10, 2); // Parabolic trajectory

                setStonePosition({ x, y });

                // Check for hit
                if (x >= monsterPosition - 5 && x <= monsterPosition + 5 && y > 30) {
                    clearInterval(interval);
                    setIsFired(false);
                    setScore(score + 1);
                    setResultMessage("🎉🎉🎉🎉 You hit the monster! Great throw! 🎉🎉🎉🎉");
                    setStonePosition({ x: 0, y: 0 });
                    setIsHit(true);
                    setIsMiss(false);

                    // Reset hit state after 2 seconds
                    setTimeout(() => setIsHit(false), 2000);
                }

                // Check if stone missed
                if (x > 100 || y > 40) {
                    clearInterval(interval);
                    setIsFired(false);
                    setStonePosition({ x: 0, y: 0 });

                    // Decrease attempts if it was a miss
                    setAttempts((prev) => prev - 1);

                    // Provide feedback and show miss GIF
                    if (attempts - 1 > 0) {
                        setResultMessage(`You threw ${Math.round(x)}m. Try again!`);
                        setIsMiss(true);
                        setIsHit(false);
                    } else {
                        setResultMessage(`Game over! The monster was ${monsterPosition}m away.`);
                        setIsMiss(true);
                        setIsHit(false);
                    }

                    // Reset miss state after 2 seconds
                    setTimeout(() => setIsMiss(false), 2000);
                }
            }, 50);
        }
    };

    // Move the monster back and forth
    useEffect(() => {
        const moveMonster = setInterval(() => {
            setMonsterPosition((prev) => (prev < 80 ? prev + 10 : 20));
        }, 1000);
        return () => clearInterval(moveMonster);
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            backgroundColor: '#f4f4f4',
        }}>
            <div style={{ maxWidth: '600px', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                {/* 404 Message Section */}
                <div style={{ fontSize: '32px', color: '#e74c3c', marginBottom: '20px' }}>404 - Page Not Found</div>
                <div style={{ fontSize: '20px', color: '#555', marginBottom: '20px' }}>
                    Oops! It seems like you've wandered off the beaten path. But there’s a monster nearby!
                </div>
                <div style={{ fontSize: '18px', color: '#555', marginBottom: '30px' }}>
                    Can you hit it with your throw? You have {attempts} attempts left.
                </div>

                {/* Score and Attempts */}
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>Score: {score}</div>
                <div style={{ fontSize: '18px', marginBottom: '10px' }}>Attempts left: {attempts}</div>

                {/* Game Area */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '200px',
                    margin: '20px auto',
                    perspective: '800px',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                }}>
                    {/* Ground */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        height: '10px',
                        background: 'linear-gradient(45deg, #8B4513, #A0522D)',
                        boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.5)',
                    }} />

                    {/* Catapult */}
                    <div
                        style={{
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

                    {/* Stone */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: `${stonePosition.y + 10}px`,
                            left: `${stonePosition.x}%`,
                            width: '12px',
                            height: '12px',
                            background: 'radial-gradient(circle, #808080, #333)',
                            borderRadius: '50%',
                            boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.5)',
                            transform: 'rotateX(30deg)',
                        }}
                    />

                    {/* Monster */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '10px',
                            left: `${monsterPosition}%`,
                            width: '30px',
                            height: '30px',
                            background: 'radial-gradient(circle, #32CD32, #228B22)',
                            borderRadius: '50%',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
                            transform: 'rotateX(15deg)',
                        }}
                    />
                </div>

                {/* Launch Button */}
                <button
                    onClick={handleLaunch}
                    disabled={isFired || attempts <= 0}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                        color: '#333',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease',
                    }}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Launch Stone
                </button>

                {/* Result Message */}
                <div style={{ marginTop: '20px', fontSize: '18px', color: '#555' }}>
                    {resultMessage}
                </div>

                {/* Hit GIF */}
                {isHit && (
                    <div style={{
                        width: '100%',
                        maxWidth: '400px',
                        margin: '20px auto',
                        border: '1px solid #ddd',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
                    }}>
                        <iframe
                            src="https://giphy.com/embed/JOXE34On2LDWPrwmu2"
                            width="100%"
                            height="200px"
                            style={{ border: 'none' }}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}

                {/* Miss GIF */}
                {isMiss && (
                    <div style={{
                        width: '100%',
                        maxWidth: '400px',
                        margin: '20px auto',
                        border: '1px solid #ddd',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
                    }}>
                        <iframe
                            src="https://giphy.com/embed/dCWuTWLoye9LmEbIYn"
                            width="100%"
                            height="200px"
                            style={{ border: 'none' }}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CatapultGame;
