import { useLoaderData } from "react-router-dom";
import Service from "../../components/service";
// import SectionTitle from "../../components/SectionTitle";
import { Helmet } from "react-helmet-async";
import SearchBar from "./SearchBar";
import useAuth from "../../hooks/useAuth";

const AllServices = () => {
    const services = useLoaderData();
    const {searchResults, setSearchResults}= useAuth()
    return (
        <div className="">
            <Helmet>
                    <title>All Services</title>
            </Helmet>
            {/* <SectionTitle heading={'All Services are Heare'}/> */}
            <SearchBar/>
        {
            searchResults?.length>0 ? <> {searchResults?.map(service => <Service key={service?._id} service={service}/>) }</> : <>{services?.map(service => <Service key={service?._id} service={service}/>)}</>
        
        }
        {/* {
            searchResults?.length< 0 ?  services?.map(service => <Service key={service?._id} service={service}/>) : searchResults?.map(service => <Service key={service?._id} service={service}/>)
        
        } */}
        </div>
    );
};

export default AllServices;