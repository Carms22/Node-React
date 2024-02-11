import {  Link } from 'react-router-dom';
import Like from './Like'

function Card({media, content, creator,id,like, comments}){

  return(
    
      
      <div className="card">
        <div className="card-body row">
        <div className="col-6">
            <Link key={id} className="Link" to={`/user/${creator.id}`} >
                <h6 className='contrast'>Post by: <strong>{creator.name}</strong></h6>
            </Link>
            <h6 className='contrast'>Content: <strong>{content}</strong></h6>
          </div>
          <div className="col-6">
            <h6 className="card-title contrast">Media:<strong> {media}</strong></h6>
            <h6 className="card-title contrast">ID:<strong> {id}</strong></h6>
          </div>
          <div>
            <Like onClick={like}></Like>
            <button className="text-pink-500 background-transparent font-bold uppercase px-8 py-3 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
            <i className="fas fa-heart"></i>
            </button>
          </div>
        
        </div>
        <div className="container">
            <h4 className="light"><strong>Comments:</strong></h4>
            <div className="row">
              { comments ? comments.map( (comment) => 
                <div  className="col-4 card-detail m-2" key={comment.id}>
                  <h5><strong>{comment.commentCreator.name}</strong></h5>
                  <p>{comment.content}</p>
                </div> 
                )
                :
                <div className="spinner-border text-secondary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              }
            </div>
          </div>
      </div>

  )
}
export default Card;

// <h6 className='contrast'>Post by: <strong>{creator.name}</strong><img className='img-user' src={creator.image} alt={creator.name}/></h6>