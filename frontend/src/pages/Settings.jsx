import Navbar from "../components/Navbar";
import { Select } from "../components/Select";

const Settings = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="py-10 flex flex-col items-center grow">
                <h1 className="text-3xl">Preferences</h1>
                <div className="flex flex-col justify-center rounded shadow-sm p-8">
                    <Setting>
                        <p>Game Difficulty</p>
                        <Select>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </Select>
                    </Setting>
                    <Setting className="border-b py-2 px-1 flex items-center gap-10">
                        <p>Image to whac</p>
                        <ImageInput />
                    </Setting>
                    <Setting>
                        <p>Profile picture</p>
                        <ImageInput />
                    </Setting>
                </div>
            </div>
        </div>
    );
};

// eslint-disable-next-line react/prop-types
const Setting = ({ children }) => {
    return (
        <section className="border-b py-3 px-2 flex items-center justify-between w-96">
            {children}
        </section>
    );
};

const ImageInput = () => {
    return (
        <>
            <input
                accept="image/*"
                // onChange={e => setFile(e.target.files[0])}
                id="file-input"
                type="file"
                hidden
            />
            <label
                htmlFor="file-input"
                className="bg-primary px-2 py-1 rounded cursor-pointer"
            >
                Choose image
            </label>
        </>
    );
};

export default Settings;
