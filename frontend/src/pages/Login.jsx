import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: async ({ username, password }) => {
            const url = isLogin ? "/api/auth/login" : "/api/auth/signup"
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Something went wrong");
            }
        },
        onSuccess: () => {
            // Refetch the authUser
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            navigate("/"); // Redirect to home after successful login
        },
        onError: (error) => {
            console.error("Login failed:", error.message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="hero-content bg-base-300 flex-col min-h-screen lg:flex-row-reverse">
            <div className="card w-full bg-base-100 max-w-md shrink-0 shadow-2xl">
                <form onSubmit={handleSubmit} className="card-body">
                    <h1 className="text-3xl font-bold">
                        {isLogin ? "Login" : "Signup"}
                    </h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input
                            value={formData.username}
                            onChange={handleInputChange}
                            name="username"
                            placeholder="username"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            value={formData.password}
                            onChange={handleInputChange}
                            type="password"
                            name="password"
                            placeholder="password"
                            className="input input-bordered"
                            required
                        />
                        {isLogin && (
                            <label className="label">
                                <a
                                    href="#"
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </a>
                            </label>
                        )}
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">
                            {isPending ? 'loading...' : isLogin ? "Login" : "Signup"}
                        </button>
                    </div>
                    {isError && <p className='text-red-500'>{error.message}</p>}
                    <a
                        onClick={() => setIsLogin(!isLogin)}
                        className="label-text-alt link link-hover"
                    >
                        {isLogin
                            ? "Don't have an account? Sign up"
                            : "Already have an account? Login"}
                        !
                    </a>
                </form>
                <div className="flex flex-col items-center gap-2">
                    <div className="divider">OR</div>
                    <div className="flex gap-10 mb-4">
                        <button className="btn bg-white text-black hover:bg-gray-100">
                            Google
                        </button>
                        <button className="btn btn-secondary">Discord</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
