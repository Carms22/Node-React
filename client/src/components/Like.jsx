
const Like = (like) => {
  
  return (
    <div>
        <button style={{ color: like ? 'text-pink-500' : 'text-blueGray-500' }} className="background-transparent font-bold uppercase px-8 py-3 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"> 
        <i className="fas fa-heart"></i>
        </button>
    </div>
  )
}
export default Like;