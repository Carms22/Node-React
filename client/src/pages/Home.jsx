import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="m-10 w-96 rounded-md  bg-slate-600">
        <div className="m-10 basis-1/2 rounded-md  bg-slate-600">
            <h1 className="text-2xl">Welcome to the App</h1>
        </div>
        <div className="m-10 basis-1/2 rounded-md  bg-slate-600">
        <button className='rounded m-2 px-4 pb-2 pt-2 text-xs uppercase text-white bg-slate-800'>
            <Link to={"/register"} >Register</Link>
        </button>
        <button className='rounded m-2 px-4 pb-2 pt-2 text-xs uppercase text-white bg-slate-800'>
            <Link to={"/login"} >Login</Link>
        </button>
        </div>
    </div>
  )
}

export default Home