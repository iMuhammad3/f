import Chat from "../components/Chat";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Chat />
            <Footer />
        </div>
    );
};

export default Home;
