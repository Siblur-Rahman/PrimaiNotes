import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLoin from "../../components/SocialLoin";


const Login = () => {
    const {signIn} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogin = e =>{
        e.preventDefault();
        const form = e.target;
        const emeil = form.email.value;
        const password = form.password.value;
        signIn(emeil, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            navigate(location?.state ? location.state : "/");
            Swal.fire({
            title: "User Login Successful",
            showClass: {
                popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
                `
            },
            hideClass: {
                popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
                `
            }
        });
        })
        .catch(error => console.log(error));
    }
    return (
    <>
        <Helmet>
            <title>Login</title>
        </Helmet>
        <div className="lg:w-3/5 mx-auto border-2 border-blue-500 py-4 p-10 rounded-md">
                    <h1 className="text-5xl text-center font-bold">Login now!</h1>
            <form className="card-body" onSubmit={handleLogin}>
                        <div className="form-control">
                        <label className="label">
                            {/* <span className="label-text text-white">Email</span> */}
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            {/* <span className="label-text text-white">Password</span> */}
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        </div>
                        <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                        </div>
             </form>
             <p className='px-6 text-white'>Are You Here New?</p>
                <SocialLoin/>
                    <div className="px-8">
                            <button className='btn btn-primary w-full mt-4'><Link to="/registration">registration</Link></button>
                    </div>
        </div>
    </>
    );
};

export default Login;