import { useForm } from "react-hook-form";
//import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
//import { useEffect } from "react";
//import { isAuthenticated } from "../../context/AuthContext";

function RegisterPage() {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const {signup} = useAuth();
    //const navigate = useNavigate()

    /*useEffect(() => {
        if(isAuthenticated){
            navigate('/profile')
        }
    },[navigate])*/

    const onSubmit = handleSubmit( async values => {
        signup(values);
    })

  return (
    <div className="max-w-md p-10 rounded-md">
        <form action="" onSubmit={onSubmit}>
            <label>Name:</label>
            <input type="text" {...register('name', { require: true })}
                className="w-full px-4 py-2 rounded-md bg-slate-400"
            />
            {errors.name && (<p>Name is require</p>)}
            <label>Email:</label>
            <input type="email" {...register('email', { require: true })}
                className="w-full px-4 py-2 rounded-md bg-slate-400"
            />
            <label>password:</label>
            <input type="password" {...register('password', { require: true })}
                className="w-full px-4 py-2 rounded-md bg-slate-400"
            />
            <button className='w-full px-4 py-2 rounded-md' type="submit">
                Register
            </button>
        </form>
    </div>
    
  )
}

export default RegisterPage