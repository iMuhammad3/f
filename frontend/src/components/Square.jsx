
// eslint-disable-next-line react/prop-types
export const Square = ({ onClick, hasImage, image }) => {
    const style = {
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "50%",
    };
    return (
        <div
            style={hasImage ? style : {}}
            onClick={onClick}
            className="w-full md:w-[150px] aspect-square border cursor-pointer"
        ></div>
    );
};