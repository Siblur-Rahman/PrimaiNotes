// import { useState } from "react";
import { useForm } from "react-hook-form";
// import Service from "../../components/service";
import useAuth from "../../hooks/useAuth";

const SearchBar = () => {
  const { register, handleSubmit } = useForm();
//   const [searchResults, setSearchResults] = useState([]);
const {setSearchResults}= useAuth()

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/service/search/${data.search}`);
      const result = await response.json();
      setSearchResults(result);
    } catch (error) {
      console.error("Error searching: ", error);
    }
  };

  return (
    <div className="flex mx-auto">       
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="join border my-5 mx-auto ">
                <input
                  required
                  type="text"
                  name="search"
                  className=" w-[200px] lg:w-[400px] bg-[#fff0] px-4 "
                  placeholder="Search by servic name text"
                  {...register("search")}
                />
                <button type="submit" className="btn join-item rounded">
                  Search
                </button>
              </div>
            </form>
            <button onClick={()=> setSearchResults([])} type="submit" className="btn btn-primary join-item rounded my-5">
                  All Service
            </button>
    </div>
  );
};

export default SearchBar;
