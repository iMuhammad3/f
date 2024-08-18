import './index.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Game from "./pages/Game";
import Settings from './pages/Settings';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Define your routes here */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/game" element={<Game />} />
                <Route path="settings" element={<Settings />} />

                {/* Catch-all route for 404 page */}
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
