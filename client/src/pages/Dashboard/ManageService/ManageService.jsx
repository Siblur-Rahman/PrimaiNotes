import { FaEdit, FaTrashAlt} from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import { useEffect, useState } from "react";
// import axios from "axios";
import useAuth from './../../../hooks/useAuth';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageService = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic()
  const [services, setServices] = useState([])
  const {user} = useAuth()
  useEffect(()=>{
    getData()
  },[user, services?.length])
  const getData = async () =>{
    axiosPublic(`${import.meta.env.VITE_API_URL}/manageservices/${user?.email}`)
    .then(res =>{
        setServices(res.data)
    })
  }
  const handleDelete = async(id)=>{
        try{
          axiosPublic.delete(`${import.meta.env.VITE_API_URL}/deleteservice/${id}`)
          .then(res =>{
            console.log(res?.data)
            if(res.data?.deletedCount>0){
              getData()
              navigate('/manageservice')
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Service is added to the service`,
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
    return (
        <div>
            <Helmet>
                    <title>ManageService</title>
            </Helmet>
            <SectionTitle heading="Manage All Servess" subHeading=""/>

            <div className="flex justify-evenly">
                <h2 className="text-4xl uppercase">Total users: {services.length}</h2>
            </div>
            <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th className="text-2xl uppercase">Service image</th> 
                  <th className="text-2xl uppercase">Service name</th>
                  <th className="text-2xl uppercase">price</th>
                  <th className="text-2xl uppercase">action</th>
                  <th className="text-2xl uppercase">action</th> 
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {services?.map((servic, index) =><tr key={servic._id}>
                  <th>
                    <label>
                      {index+1}
                    </label>
                  </th>
                  <td>
                    <img src={servic?.service_image} alt="" className="w-10 h-10 rounded-full" />
                </td>
                  <td>
                    {servic?.service_name}
                  </td>
                  <th>
                    $ {servic?.price}
                  </th>
                  <th>
                   <Link to={`/updateservic/${servic?._id}`}>
                        <button className="btn btn-primary btn-lg">
                            <FaEdit className="text-white"/>
                        </button>
                   </Link>
                  </th>
                  <th>
                    <button onClick={()=>handleDelete(servic?._id)} className="btn btn-primary btn-lg">
                        <FaTrashAlt className=""/>
                    </button>
                  </th>
                </tr>)
    
                }
              </tbody>
            </table>
          </div>
        </div>
    );
};

export default ManageService;