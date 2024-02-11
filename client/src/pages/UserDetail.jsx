import {logout} from '../store/AccessTokenStore'
import { useCallback, useEffect, useState } from 'react';
//import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser} from '../services/UserServices';
//import { deleteComment, createComment } from '../services/CommentServices';
import Card from '../components/Card';
import { deletePosts, getPosts } from '../services/PostServices';

function UserDetailScreen() {
    const [user, setUser] = useState()
    const [posts, setPosts] = useState([]);
    //const [postsOfFollowing, setPosts] = useState([]);
    //const [like, setLike] = useState([])
    const navigate = useNavigate()

  //Logout
  function handleLogout(){
    logout()
      .then(() => console.log("you just logout"))
      .catch(err => console.log(err))
  }
  function handleGoHome(){
    navigate(`/user/${user.id}`)
  }

  //Delete post
  function handleDelete(id){
    deletePosts(id)
      .then(() => {
        console.log("Post has been deleted")
        getPostsOfCreator()
      })
      .catch(err => console.log(err))
  }
  //Edit post --go to form
  function handleUpdate(id){
    navigate(`/posts/${id}`)
  }

  const getPostsOfCreator = useCallback(() => {
    getPosts()
      .then( posts => {
        setPosts(posts)
      })
      .catch(err => console.log(err))
  },[])

  useEffect( ()=> {
    getPostsOfCreator()
    getCurrentUser()
        .then(user => {
            setUser(user)
        })
  },[getPostsOfCreator])

  console.log(`currentUser ${user}`);

  //PROFILE 
  return ( 
    <div className=''>
        
        {user ? 
        <div className='m-10 max-w-md p-5 rounded-md  bg-slate-600'>
            <h2 className='col-12'>Welcome to your profile {user.name}</h2>
            <button className="rounded px-4 pb-2 pt-2 text-xs uppercase text-white bg-slate-800" 
                onClick={handleLogout}>Logout
            </button>
            <button className="rounded px-4 pb-2 pt-2 text-xs uppercase text-white bg-slate-800" 
                onClick={handleGoHome}>Go Home
            </button>
        </div>
        
        :
        <>
            <h6 className='m-10 max-w-md p-5 rounded-md  bg-slate-600'>User not found</h6>
        </>

    }
        <h3 className='m-10 max-w-md'>My Posts: </h3>
        <div className=''>
            {posts.length > 0 ? posts.map((post) => 
                <div className='m-10 max-w-md p-5 rounded-md  bg-slate-600'  key={post._id}>
                    <Card className='row card-body' {...post} key={post._id} />
                    <button className='rounded m-2 px-4 pb-2 pt-2 text-xs uppercase text-white bg-slate-800' 
                        onClick={() => handleDelete(post._id)}>
                        Delete
                    </button>
                    <button className='rounded px-4 pb-2 pt-2 text-xs uppercase text-white bg-slate-800' 
                        onClick={() => handleUpdate(post._id)}>
                        Edit
                    </button>
                </div>
             )
            :
            <>
                <h6 className='m-10 max-w-md p-5 rounded-md  bg-slate-600'>You have not posts yet</h6>
            </>
            }
        </div>
    </div>
   );
}

export default UserDetailScreen;