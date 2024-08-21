
// eslint-disable-next-line react/prop-types
const Tbody = ({name, profile, score, lStreak, cStreak}) => {
    return (
        <tr className="border-b">
            <td>1</td>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={profile}
                                alt="User profile img"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                    </div>
                </div>
            </td>
            <td>{score}</td>
            <td>{lStreak}</td>
            <td>{cStreak}</td>
        </tr>
    );
};

export default Tbody;
