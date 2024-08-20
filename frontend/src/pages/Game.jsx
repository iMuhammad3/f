import { useState } from "react";
import Navbar from "../components/Navbar";
import { Square } from "../components/Square";
import useUser from "../hooks/useUser";

const Game = () => {
    const { data: user } = useUser();
    const { difficulty, whacImg, currentStreak, longestStreak } = user;

    const [score, setScore] = useState(0);
    const [time, setTime] = useState(30);
    const [squares, setSquares] = useState(Array(9).fill({ hasImage: false }));
    const [gameActive, setGameActive] = useState(false);

    const startGame = () => {
        // to avoid bugs when user spams the start button
        if (gameActive) return;
        checkStreak();
        setTime(30);
        setScore(0);

        let speed;
        switch (difficulty) {
            case "easy":
                speed = 700;
                break;
            case "medium":
                speed = 400;
                break;
            case "hard":
                speed = 200;
                break;
            default:
                speed = 700;
        }

        const countDownId = setInterval(() => {
            setTime(prevTime => {
                // Ensure the countdown doesn't go below 0
                const newTime = prevTime > 0 ? prevTime - 1 : 0;
                if (newTime === 0) {
                    clearInterval(countDownId);
                    clearInterval(randomId);
                    setGameActive(false);
                }
                return newTime;
            });
        }, 1000);

        const randomId = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * 9);
            setSquares(prevSquares => {
                const newSquares = [...prevSquares];
                newSquares.forEach(square => (square.hasImage = false));
                newSquares[randomIndex] = { hasImage: true };
                return newSquares;
            });
        }, speed);
        setGameActive(true);
    };

    const handleClick = index => {
        if (gameActive && squares[index].hasImage) {
            setScore(prev => prev + 1);
        }
    };

    return (
        <div className="flex flex-col">
            <Navbar />
            <section className="flex m-4 justify-between gap-2 border rounded p-2">
                    <h2>Score: {score}</h2>
                    <h2>Time Left: {time}</h2>
                    <h2>Current streak: {currentStreak}</h2>
                    <h2>Longest streak: {longestStreak}</h2>
                </section>
            <div className="flex flex-col items-center gap-4 mt-10">
                <ul className="grid grid-cols-3 w-full md:w-[450px] aspect-square border">
                    {squares.map((square, i) => {
                        return (
                            <Square
                                key={i}
                                hasImage={square.hasImage}
                                image={whacImg}
                                onClick={() => handleClick(i)}
                            />
                        );
                    })}
                </ul>
                <button
                    disabled={gameActive}
                    onClick={startGame}
                    className="btn btn-primary "
                >
                    Start
                </button>
            </div>
        </div>
    );
};

const checkStreak = async () => {
    await fetch("api/user/streak", {
        method: "POST", 
    })
}

export default Game;