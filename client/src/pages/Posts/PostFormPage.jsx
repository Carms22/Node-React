import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { createPosts } from '../../services/PostServices';
import Input from '../../components/Input';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';


function PostFormPage() {
    const { currentUser } = useContext(AuthContext);
    console.log(`currentUser ${currentUser}`);
    const INITIAL_VALUES = {
        creator: currentUser,
        content:'',
        media: '',
        likesCount:0,
        commentsCount: 0
    }
  console.log(INITIAL_VALUES);
  const navigate = useNavigate();

  const {
    values, handleChange, handleBlur, handleSubmit, errors,
    isSubmitting, setSubmitting, setFieldError
  } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  })

  async function onSubmit(values) { 
    console.log(`Estoy en onSubmit de postForm y estos son los valores: ${values}`);

    try {
        if (currentUser) {
            const createdPost = await createPosts(values); // Crea la publicación
            navigate("/profile"); // Navega a la página de detalles de la publicación
            console.log(createdPost); // Loguea la publicación creada
        }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        Object.keys(err.response.data.errors).forEach((errorKey) => {
          setFieldError(errorKey, err.response.data.errors[errorKey]);
        });
      }
    } finally {
      setSubmitting(false);
    }
  }
 
  return (
    <div className="">
      <div className="start-div">
        <div className="m-10 max-w-md p-5 rounded-md  bg-slate-600">
         <h1>Register</h1>

          <form onSubmit={handleSubmit}>
            <Input
              label="content"
              placeholder="Add content"
              name="content"
              id="content"
              value={values.content}
              onChange={handleChange}
              error={errors.content}
              onBlur={handleBlur} 
            />

            <Input
              label="media"
              placeholder="Add media"
              type="media"
              name="media"
              id="media"
              value={values.media}
              onChange={handleChange}
              error={errors.email}
              onBlur={handleBlur}
            />

            <button type="submit" className="button" disabled={isSubmitting}>
              {isSubmitting ? 'Loading' : 'Submit'}
            </button>
          </form>
      </div>
      </div>
    </div>
  )
}


export default PostFormPage;