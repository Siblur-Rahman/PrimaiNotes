import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import PopularServices from "./popularServices/PopularServices";
import TopProviders from "./TopProviders/TopProviders";


const Home = () => {
    return (
        <div>
            <Helmet>
                    <title>Home</title>
            </Helmet>
            <Banner/>
            <PopularServices/>
            <TopProviders/>
        </div>
    );
};

export default Home;