import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle";
import { FaTrashAlt, FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useGetData from "../../../hooks/useGetData";
import useDeleteData from "../../../hooks/useDeleteData";

const AddReligiousNotes = () => {
    const allData = useGetData('allreligiousnotes');
    const [handleDelete] = useDeleteData()
    const axiosPublic = useAxiosPublic()
    const { user} = useAuth();
    console.log(user)
    const {
        register,
        handleSubmit,
        reset
      } = useForm()
      
    
      const onSubmit = async (data) => {

            const religiousData = {
                note: data.notes
            }
            
            const note = await axiosPublic.post('/addregiliousnotes', religiousData);
            if(note?.data.insertedId){

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.notes} is added to the Notes`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  reset()
            }

    }
        
//     const handleDelete = async(id)=>{
//         try{
//           axiosPublic.delete(`/deletereligiousnotes/${id}`)
//           .then(res =>{
//             console.log(res?.data)
//             if(res.data?.deletedCount>0){
//               Swal.fire({
//                 position: "top-end",
//                 icon: "success",
//                 title: `Note is deleteded`,
//                 showConfirmButton: false,
//                 timer: 1500
//               });
//             }
//           })

//         }
//         catch(err){
//           console.log(err)
//         }
//   }
      return (
       <>
            <Helmet>
                    <title>Add Notes</title>
            </Helmet>
            <SectionTitle heading={'Add a Notes'} subHeading={""}/>
            <div className="p-4 border-2 border-blue-700">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-ful my-6">
                        <label className="label">
                            <span className="label-text">Notes name*</span>
                        </label>
                        <input placeholder="notes" className="input input-bordered w-full" {...register("notes")} />
                    </div>
                    {/* Submit */}
                    <button className="btn btn-primary text-white">
                        Add Notes <FaUtensils className="ml-3"/>
                    </button>
                </form>
            </div>
            <div className="text-2xl">{allData?.map((data, index)=><div key={index} className="border-2 border-black flex justify-between items-center px-4 py-2">
                <div>
                <span className="text-blue-800">{data?.note.split(':')[0]} </span>: <span>{data?.note?.split(':')[1]} </span>
                </div>    
                <button onClick={()=>handleDelete('deletereligiousnotes',data?._id)} className="btn btn-primary btn-sm">
                        <FaTrashAlt className=""/>
            </button></div>)}

            </div>
            
       </>
      )
};

export default AddReligiousNotes;