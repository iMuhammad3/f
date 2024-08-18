import { useState } from "react";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    console.log(isLogin);

    return (
        <div className="hero-content bg-base-300 flex-col min-h-screen lg:flex-row-reverse">
            <div className="card w-full bg-base-100 max-w-md shrink-0 shadow-2xl">
                <form className="card-body">
                    <h1 className="text-3xl font-bold">
                        {isLogin ? "Login" : "Signup"}
                    </h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input
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
                            type="password"
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
                        <button className="btn btn-primary">
                            {isLogin ? "Login" : "Signup"}
                        </button>
                    </div>
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
