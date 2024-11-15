
import PropTypes from 'prop-types';
import { Link} from 'react-router-dom';
// import axios from 'axios';
const Service = ({service}) => {
  const {_id, service_image, service_area, service_name, service_description, price}=service;
    return (
        
            <div className="card shadow-xl border-2 p-2 mt-4 grid justify-items-stretch">
                <figure className='bg-base-200 mx-auto'><img src={service_image} alt="pictur" /></figure>
                <div className="card-body">
                        <div className=''>
                                <div className="text-center text-3xl">{service_name}</div>
                                <div className='flex justify-between mt-4'>
                                    <div className="text-2xl font-semibold">$<span className='rounded-lg p-1'>{price}</span></div>
                                    <div className="text-2xl font-semibold"><span className='rounded-lg p-1'>{service_area}</span></div>
                                </div>
                                <div className="mt-2"><span>{service_description}</span></div>
                        </div>       
                            <Link to={`/serviceDetails/${_id}`} className='btn btn-primary'><button>Details</button></Link>
                </div>
            </div>
        
    );
};
Service.propTypes = {
    service: PropTypes.object.isRequired,
    }
export default Service;