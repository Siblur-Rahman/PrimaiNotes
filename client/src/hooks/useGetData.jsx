import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";


const useGetData = (api) => {
    const axiosPublic = useAxiosPublic();

    const [allData, setAllData]= useState([]);
    
    useEffect(()=>{
        axiosPublic.get(`/${api}`)
    // axiosPublic.get('/allreligiousnotes')
    .then(res=>setAllData(res.data))
    })
    return allData
};

export default useGetData;