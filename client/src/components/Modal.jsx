import {LucideShoppingBasket, X} from 'lucide-react'
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Modal = ({onClose, service}) => {
    const modalRef = useRef();
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()


    const {_id, service_name, service_area, price, service_image, providerName, providerEmail, providerImage, service_description, bookingCount} = service


    const closeModal = (e)=>{
        if(modalRef.current===e.target){
            onClose()
        }
    }
    const {
        register,
        handleSubmit,
      } = useForm();
      const bookedService = async (data) => {

        const serviceData = {
            uId:_id,
            service_name:service_name,
            service_area:service_area,
            price: price,
            service_image:service_image,
            status:'pending',
            userName:user?.displayName,
            userEmail:user?.email,
            userAddress:data?.address,
            providerEmail: providerEmail,
            providerImage:user?.photoURL
        }
        
        const service = await axiosPublic.post('/bookedservice', serviceData);
        if(service.data.insertedId){

        navigate(`/mybookedservices/${user?.email}`)
        axiosPublic.patch(`/bookingCount/${_id}`);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `The servic is added to Your Booking List`,
                showConfirmButton: false,
                timer: 1500
              });
        }
}
const data = [
    {
        key:'ServiceId',
        value:_id,
    },
    {
        key:'Service ',
        value:service_name
    },
    {
        key:'Provider Name',
        value:providerName
    },
    {
        key:'Provider Email',
        value:providerEmail
    },
    {
        key:'Customer Name:',
        value:user?.displayName
    },
    {
        key:'Customer Email',
        value:user?.email
    },
    {
        key:'Price',
        value:price
    },
    {
        key:'Service Area',
        value:service_area
    },
]
    return (
        <div ref={modalRef} onClick={closeModal} className="bg-slate-900 fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20 lg:w-full]">
            <div className='flex flex-col'> 
                <button onClick={onClose} className='place-self-end -mr-3 bg-blue-700 text-white hover:bg-red-600 -mb-4 z-30 rounded-full'><X size={30} /></button>
                <div className='bg-white rounded-xl px-10 flex flex-col items-center border-2 p-4 over'>
                        <div className='flex'>
                            <figure className='h-[230px] w-[320px] mx-auto'><img src={service_image} className='rounded-lg' alt="pictur" /></figure>
                            <div className='px-4'>
                                {data?.map((service, index)=><div key={index}> <span className="text-xl font-semibold"> {service?.key}:</span> <span className='rounded-lg p-1'>{service?.value}</span></div>)}
                            </div>
                        </div>
                    <form onSubmit={handleSubmit(bookedService)} className='w-[600px]'>

                        {/* Address */}
                        <div  className="form-control">
                            <label className="label">
                                <span className="label-text">Address*</span>
                            </label>
                            <textarea placeholder={'Address Please'} {...register("address")} className="textarea textarea-bordered h-24 w-[600px]"></textarea>
                        </div>
                        {/* Submit */}
                        <div className='w-full flex'><button className='btn btn-primary mx-auto mt-5'><LucideShoppingBasket />Purchase!</button></div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;