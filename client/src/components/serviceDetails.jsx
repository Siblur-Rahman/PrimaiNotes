
import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import Modal from './Modal';
const ServiceDetails = () => {
    const [showModal, setShowModal] = useState(false)
    const [service, setService] = useState([])
  const {service_image, service_area, service_name, providerEmail, providerImage, providerName, service_description, price, }=service;
  const {id}=useParams()
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API_URL}/service/${id}`)
    .then(res=>res.json())
    .then(data=>{
        setService(data)
    })
},[id])

    return (
        
    <div className=''>
                {showModal && <Modal onClose={()=>setShowModal(false)} service={service}/>}
            <div className="card shadow-xl border-2 p-2 mt-4 grid justify-items-stretch">
                <div className='lg:flex lg:gap-2'>
                   <div className='border-2 lg:w-[48%] mx-auto'>
                        <img className='bg-base-200 h-[500px] lg:visible' src={service_image} alt={service_name} />
                        <div className='flex justify-between p-4'><span className='rounded-lg p-1'>{service_name}</span>  <span className='rounded-lg p-1'>${price}</span></div>
                        <div className='flex justify-between p-4'><span className='rounded-lg p-1'>Service Area</span>    <span className='rounded-lg p-1'>{service_area}</span></div>
                   </div>
                   <div className='border-2 lg:w-[48%]'>
                        <img className='bg-base-200 h-[500px] w-[500px] mx-auto hidden lg:block' src={providerImage} alt={providerName} />
                            <div className='flex justify-between p-4'>
                                <span className='rounded-lg p-1 text-xl font-semibold'>Service Provider : </span> 
                                <span className='rounded-lg p-1'>{providerName}</span>
                            </div>
                            <div className='flex justify-between p-4'>
                                <span className='rounded-lg p-1 text-xl font-semibold'>Provider Email : </span> 
                                <span className='rounded-lg p-1'>{providerEmail}</span>
                            </div>
                   </div>
                    
                </div>
                                <div className="mt-2"><span>{service_description}</span></div>
            <button onClick={()=>setShowModal(true)} className='btn btn-primary'><button>Book Now!</button></button>

            </div>
    </div>
        
    );
};
export default ServiceDetails;