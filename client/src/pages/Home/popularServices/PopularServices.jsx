import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import PopularServic from "./popularService";

const PopularServices = () => {
    const [populaServices, setPopularServices] = useState()
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic(`/populerservices6`)
          .then((res) => {
            setPopularServices(res.data);
          })
          .catch((error) => {
            console.error("Error fetching service data:", error);
          });
      }, []);
      return (
        <div className="pt-16">
         
          <h2 data-aos="fade-left" className="text-5xl font-bold text-center">Top popular Services </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {populaServices?.map((servic, index) => <PopularServic key={index} service={servic}/>)}
          </div>
        </div>
      );
};

export default PopularServices;