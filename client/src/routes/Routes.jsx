import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import AllServices from "../pages/AllServices/AllServices";
import AddService from "../pages/Dashboard/AddService/AddService";
import ServiceDetails from "../components/serviceDetails";
import ManageService from "../pages/Dashboard/ManageService/ManageService";
import UpdateService from "../pages/Dashboard/UpdateService/UpdateService";
import ErrorPage from './../pages/ErrorPage';
import MyBookedServices from "../pages/Dashboard/MyBookedServices/MyBookedServices";
import ServiceToDo from "../pages/Dashboard/ServiceToDo/ServiceToDo";
import PrivateRoute from "./PrivateRoute";
import AddReligiousNotes from './../pages/Dashboard/AddService/AddReligiousNotes';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
    errorElement: <ErrorPage/>,
      children:[
        {
            path: "/",
            element:<Home/>
        },
        {
            path: "/registration",
            element:<Registration/>
        },
        {
            path: "/login",
            element:<Login/>
        },
        {
          path:'/addreligiousnotes',
          element:<AddReligiousNotes/>
        },
        {
          path:'/allservices',
          element:<AllServices/>,
          loader:() =>  fetch(`${import.meta.env.VITE_API_URL}/allservices`)
        },
        {
          path:'/serviceDetails/:id',
          element:<PrivateRoute><ServiceDetails/></PrivateRoute>
        },
        // Dashboard Routes
        {
          path:'/addservice',
          element:<PrivateRoute><AddService/></PrivateRoute>
        },
        {
          path:'/manageservice',
           element:<PrivateRoute><ManageService/></PrivateRoute>,
          loader:() =>  fetch(`${import.meta.env.VITE_API_URL}/allservices`)
        },
        {
          path:'/mybookedservices/:email',
          element:<PrivateRoute><MyBookedServices/></PrivateRoute>,
          // element:<PrivateRoute> <MyBookedServices/></PrivateRoute>,
          loader:({params}) =>  fetch(`${import.meta.env.VITE_API_URL}/mybookedservices/${params.email}`)
        },
        {
          path:'/servicestodo/:email',
          element:<PrivateRoute><ServiceToDo/></PrivateRoute>,
          loader:({params}) =>  fetch(`${import.meta.env.VITE_API_URL}/servicestodo/${params.email}`)
        },
        {
          path:'/updateservic/:id',
          element:<UpdateService/>,
          loader:({params}) =>  fetch(`${import.meta.env.VITE_API_URL}/service/${params.id}`)
        }

      ]
    }
    ])