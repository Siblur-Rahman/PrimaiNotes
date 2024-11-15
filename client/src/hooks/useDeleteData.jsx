import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import Swal from "sweetalert2";


const useDeleteData = () => {
    const axiosPublic = useAxiosPublic();

    // const [allData, setAllData]= useState([]);
    
    // useEffect(()=>{
    //     axiosPublic.get(`/${api}`)
    // // axiosPublic.get('/allreligiousnotes')
    // .then(res=>setAllData(res.data))
    // })
    // return allData
    const handleDelete = async(api, id)=>{
        try{
          axiosPublic.delete(`/${api}/${id}`)
          .then(res =>{
            console.log(res?.data)
            if(res.data?.deletedCount>0){
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Note is deleteded`,
                showConfirmButton: false,
                timer: 1500
              });
            }
          })

        }
        catch(err){
          console.log(err)
        }
  }
  return [handleDelete, ]
};

export default useDeleteData;