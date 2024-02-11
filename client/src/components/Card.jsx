import {  Link } from 'react-router-dom';

//import comments and Likes and links to creator

function Card({media, content, creator,id}){

  return(
    
      
      <div className="card">
        <div className="card-body row">
          <div className="col-6">
            <h6 className="card-title contrast">Media:<strong> {media}</strong></h6>
            <h6 className="card-title contrast">ID:<strong> {id}</strong></h6>
            
          </div>
          <div className="col-6">
            <Link key={id} className="Link" to={`/user/${creator.id}`} >
                <h6 className='contrast'>Post by: <strong>{creator.name}</strong></h6>
            </Link>
            <h6 className='contrast'>Content: <strong>{content}</strong></h6>

          </div>
        </div>
      </div>

  )
}
export default Card;

// <h6 className='contrast'>Post by: <strong>{creator.name}</strong><img className='img-user' src={creator.image} alt={creator.name}/></h6>