import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Game from "./pages/Game";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard";
import useUser from "./hooks/useUser";
import ProtectedLayout from "./components/ProtectedLayout";
import Home from "./pages/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedLayout />, // This will check authentication
        children: [
          { path: '/', element: <Home /> },
          { path: '/settings', element: <Settings /> },
          { path: '/game', element: <Game /> },
          { path: '/leaderboards', element: <Leaderboard /> },
        ],
      },
    {
        path: "/login",
        element: <Login />,
    },
])

const App = () => {
    const { isLoading } = useUser();

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <div className="loading loading-bars w-60"></div>
            </div>
        );
    }

    return <RouterProvider router={router} />
};

export default App;
