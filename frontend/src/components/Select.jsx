
// eslint-disable-next-line react/prop-types
export const Select = ({ onChange, value, children }) => {
    return (
        <select
            onChange={onChange}
            value={value}
            className="bg-nightblue-700 px-5 py-1 rounded-lg cursor-pointer outline-none"
        >
            {children}
        </select>
    );
};
