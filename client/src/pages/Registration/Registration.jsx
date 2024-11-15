import { Link, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import SocialLoin from '../../components/SocialLoin';


const Registration = () => {
    const axiosPublic= useAxiosPublic()
    const { createUser, updateUserProfile} = useAuth()
    const {register, handleSubmit, reset, formState: { errors }, } = useForm();
    const navigate = useNavigate();
      const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log('created user', user);

            updateUserProfile(data.name, data.photoURL)
            .then(() =>{
                // create user entry in the Database
                const userInfo = {
                    name:data.name,
                    email:data.email,
                    image:data.photoURL,
                    createCount:0,
                }
                axiosPublic.post('/signup', userInfo)
                .then(res =>{
                    if(res.data.insertedId){
                        console.log('To Database')
                        reset();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Sign UP Successful",
                            showConfirmButton: false,
                            timer: 1500
                          });
                          navigate("/")
                    }
                })
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    }
    return (
        
        <div className="lg:w-3/5 mx-auto border-2 border-blue-500 py-4 p-10 rounded-md">
            <Helmet>
                <title>Registration</title>
            </Helmet>
                    <h1 className="text-5xl text-center font-bold">Registration now!</h1>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                        <label className="label">
                            {/* <span className="label-text text-white">Name</span> */}
                        </label>
                        <input type="text"{...register("name", { required: true })} placeholder="name" name="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            {/* <span className="label-text text-white">Photo URL</span> */}
                        </label>
                        <input type="text"{...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            {/* <span className="label-text text-white">Email</span> */}
                        </label>
                        <input type="email" {...register("email", { required: true })} placeholder="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            {/* <span className="label-text text-white">Password</span> */}
                        </label>
                        <input type="password" {...register("password", { required: true })} name="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        </div>
                        <div className="form-control my-6">
                            <button className="btn btn-primary">Registration</button>
                        </div>
             </form>
             {/* Social Loin */}
                    <SocialLoin/>
            <p className='my-4 text-center'>Already Have an Account? <Link className='text-orange-600 font-bold' to="/login">Login</Link> </p>
        </div>
    );
};

export default Registration;