import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Game from "./pages/Game";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard";
import useUser from "./hooks/useUser";
import ProtectedLayout from "./components/ProtectedLayout";
import Home from "./pages/Home";
import Loader from "./components/Loader"

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
        return <Loader />
    }

    return <RouterProvider router={router} />
};

export default App;
