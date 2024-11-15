import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddService = () => {
    const { user} = useAuth();
    console.log(user)
    const {
        register,
        handleSubmit,
        reset
      } = useForm()
      const axiosPublic = useAxiosPublic();
    
      const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers:{"content-type" : 'multipart/form-data'

            }
        })
        if(res.data.success){
            const serviceData = {
                service_name: data.service_name,
                service_area: data.service_area,
                price: parseFloat(data.service_price),
                service_image:res.data.data.display_url,
                service_description:data.service_description,
                bookingCount:0,
                providerName:user?.displayName,
                providerEmail:user?.email,
                providerImage:user?.photoURL
            }
            
            const service = await axiosPublic.post('/service', serviceData);
            if(service?.data.insertedId){
                // Increce createCount
                const userEmail = {email:user?.email}
                axiosPublic.patch('/createCount', userEmail);

                // axiosPublic.patch('/createCount', {email:user?.email});
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.service_name} is added to the service`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  reset()
            }
        }
        console.log(res.data)
    }
        
      return (
       <>
            <Helmet>
                    <title>Add Service</title>
            </Helmet>
            <SectionTitle heading={'Add a Service'} subHeading={""}/>
            <div className="p-4 border-2 border-blue-700">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-ful my-6">
                        <label className="label">
                            <span className="label-text">Service name*</span>
                        </label>
                        <input placeholder="service Name" className="input input-bordered w-full" {...register("service_name")} />
                    </div>
                    <div className="flex gap-6">
                        <div className="w-1/2 my-6">
                            <label className="label">
                                <span className="label-text">Service Area*</span>
                            </label>
                            <input  placeholder="service Area*" className="input input-bordered w-full" {...register("service_area")} />
                        </div>
                        {/* price */}
                        <div className="w-1/2 my-6">
                            <label className="label">
                                <span className="label-text">Service Price*</span>
                            </label>
                            <input  placeholder="Price" className="input input-bordered w-full" {...register("service_price")} />
                        </div>
                    </div>
                    {/* service Details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Service Description*</span>
                        </div>
                        <textarea {...register("service_description")} className="textarea textarea-bordered h-24" placeholder="service Description*"></textarea>
                    </label>
                    {/* file-input */}
                    <div>
                        <input {...register('image', {required: true})} type="file" className="file-input w-full max-w-xs my-6" />
                    </div>
                    {/* Submit */}
                    <button className="btn btn-primary text-white">
                        Add Service <FaUtensils className="ml-3"/>
                    </button>
                </form>
            </div>
       </>
      )
};

export default AddService;