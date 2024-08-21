import { useState } from "react";
import Navbar from "../components/Navbar";
import Tbody from "../components/Tbody";
import useScores from "../hooks/useScores";
import Loader from "../components/Loader";

const Leaderboard = () => {
    const { data: scores, isLoading } = useScores();
    const [diff, setDiff] = useState("easy");
    const score = (s) => {
        if (diff === "easy") return s.easy;
        if (diff === "medium") return s.medium;
        if (diff === "hard") return s.hard;
    };

    if (isLoading) return <Loader />;
    return (
        <div>
            <Navbar />
            <div className="flex flex-col gap-10 m-10">
                <div className="flex flex-col gap-4 items-center">
                    <h1 className="text-3xl">Difficulties</h1>
                    <div className="flex gap-4 [&>span]:btn">
                        <span
                            onClick={() => setDiff("easy")}
                            className={
                                diff === "easy" ? "btn-primary" : undefined
                            }
                        >
                            Easy
                        </span>
                        <span
                            onClick={() => setDiff("medium")}
                            className={
                                diff === "medium" ? "btn-primary" : undefined
                            }
                        >
                            Medium
                        </span>
                        <span
                            onClick={() => setDiff("hard")}
                            className={
                                diff === "hard" ? "btn-primary" : undefined
                            }
                        >
                            Hard
                        </span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Username</th>
                                <th>Highest Score ({diff})</th>
                                <th>Longest Streak</th>
                                <th>Current Streak</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scores.sort((a,b) => score(b) - score(a)).map(s => {
                                return (
                                    <Tbody
                                        key={s._id}
                                        name={s.user.username}
                                        profile={s.user.profileImg}
                                        score={score(s)}
                                        lStreak={s.user.longestStreak}
                                        cStreak={s.user.currentStreak}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
