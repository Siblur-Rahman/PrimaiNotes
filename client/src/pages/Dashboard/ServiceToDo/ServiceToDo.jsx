

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../../components/SectionTitle";
import { Helmet } from "react-helmet-async";
 
const ServiceToDo = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure();
    const service = useLoaderData()
    const navigate = useNavigate()

    const handlestatusChange = (e, service) => {
        e.preventDefault();

        const newstatus = e.target.status.value;

        axiosSecure
        .patch(`/bookedservice/${service._id}`, { status: newstatus })
        .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
                navigate(`/servicestodo/${user?.email}`)
            // refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `success  Change status!`,
                showConfirmButton: false,
                timer: 1500,
            });
            }
        })
        .catch((error) => {
            console.error(error);
            
        });
    };

    return (
        <div>
            <Helmet>
                    <title>Service-To-Do</title>
            </Helmet>
        <div className="text-3xl py-2">
            <SectionTitle heading={'Service To Do'}/>
        </div>
        <hr className="w-1/2 mx-auto py-3" />
        <h4>Total service : {service?.length}</h4>

        <div className="overflow-x-auto">
            <table className="table">
            {/* head */}
            <thead className="text-xl">
                <tr>
                <th  className="text-2xl uppercase"> No</th>
                <th  className="text-2xl uppercase">Image</th>
                <th  className="text-2xl uppercase">Name</th>
                <th  className="text-2xl uppercase">status</th>
                <th  className="text-2xl uppercase">Change status</th>
                </tr>
            </thead>
            <tbody>
                {service?.map((service, index) => (
                <tr key={service._id}>
                    <td>{index + 1}</td>
                    <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img
                                src={service?.service_image}
                                alt="Avatar Tailwind CSS Component"
                                />
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                    </td>
                    <td>
                            <div className="font-bold">{service?.service_name}</div>
                    </td>
                    <td className="capitalize">{service?.status}</td>
                    <td>
                    <form onSubmit={(e) => handlestatusChange(e, service)}>
                        <div className=" text-sm flex gap-2">
                        <select
                            name="status"
                            defaultValue={service?.status}
                            className="px-4 py-0  rounded-md text-black"
                        >
                            <option value="pending">Pending</option>
                            <option value="working">Working</option>
                            <option value="completed">Completed</option>
                        </select>
                        <button
                            type="submit"
                            className="btn btn-primary "
                        >
                            Action
                        </button>
                        </div>
                    </form>
                    </td>
                    
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
    };

export default ServiceToDo;
