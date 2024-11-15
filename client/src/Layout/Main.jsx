import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navber/Navbar";
import Footer from "../shared/Footer/Footer";

const Main = () => {
    return (
        <div className="max-w-5xl mx-auto">
                <Navbar/>
            <div className="pt-20 min-h-screen">
                <Outlet/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default Main;