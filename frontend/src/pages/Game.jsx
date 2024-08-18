import { useState } from "react";
import Navbar from "../components/Navbar";
import { Square } from "../components/Square";

const Game = () => {
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(30);
    const [squares, setSquares] = useState(
        Array(9)
            .fill({hasImage: false})
        );
    const [file, setFile] = useState(null);
    const [gameActive, setGameActive] = useState(false);
    const [difficulty, setDifficulty] = useState("easy");
    const [speed, setSpeed] = useState(600);

    const startGame = () => {
        // to avoid bugs when user spams the start button
        if (gameActive) return;
        setTime(30);
        setScore(0);
        setGameActive(true);

        switch (difficulty) {
            case "easy":
                setSpeed(600);
                break;
            case "medium":
                setSpeed(400);
                break;
            case "hard":
                setSpeed(200);
                break;
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
    }

    const handleClick = index => {
        if (gameActive && squares[index].hasImage) {
            setScore(prev => prev + 1);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center mt-10">
                <section className="flex flex-col md:flex-row justify-between gap-2 md:w-[450px] border rounded p-2">
                    <h2>Time Left: {time}</h2>
                    <h2>Score: {score}</h2>
                </section>
                <ul className="grid grid-cols-3 w-full md:w-[450px] aspect-square border">
                    {squares.map((square, i) => {
                        return (
                            <Square
                                key={i}
                                hasImage={square.hasImage}
                                file={file}
                                onClick={() => handleClick(i)}
                            />
                        );
                    })}
                </ul>
                <button onClick={startGame} className="btn">
                    Start
                </button>
            </div>
        </div>
    );
};

export default Game;
