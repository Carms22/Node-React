import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/AuthServices';
import Input from '../../components/Input';
import RegisterSchema from './RegisterSchema';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';


const INITIAL_VALUES = {
  name: '',
  email: '',
  password: ''
}

function RegisterPage() {
  console.log(INITIAL_VALUES);
  const navigate = useNavigate();

  const {
    values, handleChange, handleBlur, handleSubmit, errors,
    isSubmitting, setSubmitting, setFieldError
  } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: onSubmit,
    validationSchema: RegisterSchema,
    validateOnBlur: false,
    validateOnChange: false,
  })
  const { currentUser } = useContext(AuthContext);
  if(currentUser){
    navigate('/login', { state: { email: currentUser.email } })
 }
  async function onSubmit(values) { 
    console.log(`Estoy en onSubmit de Formik y estos son los valores: ${values}`);
    
    
    try {
      createUser(values);
      navigate('/login', { state: { email: values.email } });
      console.log(values);
      
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
      <div className="">
        <div className="m-10 max-w-md p-5 rounded-md  bg-slate-600">
         <h1>Register</h1>

          <form onSubmit={handleSubmit}>
            <Input
              label="Name"
              placeholder="Add user name"
              name="name"
              id="name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              onBlur={handleBlur} 
            />

            <Input
              label="Email"
              placeholder="Add email"
              type="email"
              name="email"
              id="email"
              value={values.email.toLowerCase()}
              onChange={handleChange}
              error={errors.email}
              onBlur={handleBlur}
            />

            <Input
              label="Password"
              placeholder="Add password"
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
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


export default RegisterPage;