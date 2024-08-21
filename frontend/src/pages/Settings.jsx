/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { Select } from "../components/Select";
import useUser from "../hooks/useUser";
import { useState } from "react";

const Settings = () => {
    const { data: user, isLoading } = useUser();
    const [settings, setSettings] = useState({
        difficulty: user.difficulty,
        whacImg: user.whacImg,
        profileImg: user.profileImg,
    });
    

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (settings) => {
            try {
                const res = await fetch(`/api/user/settings`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(settings),
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            // Optionally handle success (e.g., show a message or redirect)
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutateAsync(settings);
    };

    if (isLoading || isPending) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="py-10 flex flex-col items-center grow">
                <h1 className="text-3xl">Settings</h1>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center rounded shadow-sm p-8">
                    <Setting>
                        <p>Game Difficulty</p>
                        <Select
                            value={settings.difficulty}
                            onChange={(e) => setSettings({ ...settings, difficulty: e.target.value })}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </Select>
                    </Setting>
                    <Setting className="border-b py-2 px-1 flex items-center gap-10">
                        <p>Image to whac</p>
                        <ImageInput setSettings={setSettings} settings={settings} state="whacImg" />
                    </Setting>
                    <Setting>
                        <p>Profile picture</p>
                        <ImageInput setSettings={setSettings} settings={settings} state="profileImg" />
                    </Setting>
                    <div className="mt-4">
                        <button type="submit" className="btn btn-primary" disabled={isPending}>
                            {isPending ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Setting = ({ children }) => {
    return (
        <section className="border-b py-3 px-2 flex items-center justify-between w-96">
            {children}
        </section>
    );
};

const ImageInput = ({ settings, setSettings, state }) => {
    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (state === "whacImg") {
                    setSettings({ ...settings, whacImg: reader.result });
                } else if (state === "profileImg") {
                    setSettings({ ...settings, profileImg: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <input
                accept="image/*"
                onChange={handleImgChange}
                id={`file-input-${state}`}
                type="file"
                hidden
            />
            <label
                htmlFor={`file-input-${state}`}
                className="bg-primary px-2 py-1 rounded cursor-pointer"
            >
                Choose image
            </label>
        </>
    );
};

export default Settings;
