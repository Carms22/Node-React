import { useCallback, useContext, useEffect, useState } from 'react';
//import moment from 'moment';
import {  useParams } from 'react-router-dom';
import { myHome, follow, search} from '../services/UserServices';
import { createComment } from '../services/CommentServices';
import Card from '../components/Card';
import Like from '../components/Like';
import { like } from '../services/PostServices';
import SearchBar from '../components/SearchBar';
import AuthContext from '../context/AuthContext';

function UserDetailScreen() {
  const { currentUser } = useContext(AuthContext);
    const {id}= useParams();
    const [postsOfFollowing, setPosts] = useState([]);
    const [comment, setComment] = useState({content: ""});
    const [data, setData] = useState("");
  
  const handleSearchBar = (data) => {
    setData(data)
  }
  const onSubmit =(event) => {
    event.preventDefault()
    search(data)
      .then(postFeched => setPosts(postFeched))
  }
  const onClear = () => {
    getPostsOfFollowing();
    setData("")
  }

  function handleComment (){
    if(comment){
      createComment(id,comment)
        .then(post => {
          setComment({content: ""})
        })
    } else{
      <div>You must write a comment</div>
    }
  }

  function handleFollow (id){
    follow(id)
  }
  function handleLike (id){
    like(id)
  }


  const getPostsOfFollowing = useCallback(() => {
    
    myHome()
    .then( posts => {
      setPosts(posts)
      console.log(`getPostsOfFollowing post ${posts}`);
    })
    .catch(err => console.log(err))
  },[])

  useEffect( ()=> {
    getPostsOfFollowing()
 
  },[getPostsOfFollowing])

  //HOME
  return ( 
    <div className=''>
        <h1 className="text-2xl">Profile</h1>
        <form onSubmit={onSubmit}>
          <SearchBar
            name="data"
            handleSearchBar={handleSearchBar}
            placeholder="Filter by destination of the journey"
          />
          <div>
            <button className='rounded m-2 px-4 pb-2 pt-2 text-xs uppercase text-white bg-slate-800' 
              type="submit">
                Search
            </button>
            <button className='rounded m-2 px-4 pb-2 pt-2 text-xs uppercase text-white bg-slate-800' 
              type="submit" 
              onClick={() => onClear()}>
                Clear
            </button>
          </div>
        </form>

        {currentUser ? 
        <div className=''>
            {postsOfFollowing.length > 0 ? postsOfFollowing.map((post) => 
                <div className='m-10 max-w-md p-5 rounded-md  bg-slate-600'  key={post._id}>
                    <Card className='row card-body' {...post} key={post._id} />
                    <button className='rounded m-2 px-4 pb-2 pt-2 text-xs uppercase text-white bg-slate-800' 
                        onClick={() => handleComment(post._id)}>
                        Comment
                    </button>
                    <button className='rounded px-4 pb-2 pt-2 text-xs uppercase text-white bg-slate-800' 
                        onClick={() => handleFollow(post._id)}>
                        Follow
                    </button>
                    <Like onClick= {() => handleLike()}>Like</Like>
                </div>
                
             )
            :
            <>
                <h6 className='m-10 max-w-md p-5 rounded-md  bg-slate-600'>You have not posts yet</h6>
            </>
            }
        </div>
        
        :
        <>
            <h6 className='m-10 max-w-md p-5 rounded-md  bg-slate-600'>User not found</h6>
        </>

    }
        
    </div>
   );
}

export default UserDetailScreen;