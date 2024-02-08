import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext"

import LoginSchema from "../LoginSchema";
import Input from "../../../components/Input";
import { userLogin } from "../../../services/AuthServices";


function Login() {
  console.log('entro en login page');
  const { state } = useLocation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const INITIAL_VALUES = {
    email: (state && state.email) || '',
    password: ''
  }
 
  const {
    values, handleChange, handleBlur, handleSubmit, errors,
    isSubmitting, setSubmitting, setFieldError
  } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: onSubmit,
    validationSchema: LoginSchema,
    validateOnBlur: false,
    validateOnChange: false,
  })
   
  
  
  function onSubmit (values) {
    
    for(let prop in values){
      console.log(`entro en onSubmit con los valores ${values[prop]}`);
    }
    
      userLogin(values)
        .then(({ accessToken }) => {
          console.log(`entro en onSubmit en el then acce ${values}`)
          login(accessToken, () => {
            navigate('/profile')
          })
      })
      .catch(err => {
        err.response.data &&
          Object.keys(err.response.data.errors)
            .forEach((errorKey) => {
              setFieldError(errorKey, err.response.data.errors[errorKey])
            })
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return ( 
    <div className="Login container">
      <div className="start-div">
        <div className="login-box">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}> 
            <Input className="login-input"
              label="Email"
              placeholder="Introduce your email"
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              onBlur={handleBlur}
            />

              <Input
                label="Password"
                placeholder="Write your password"
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                error={errors.password}
                onBlur={handleBlur}
              />
            <button type="submit" className="button">
              {isSubmitting ? 'Loading' : 'Login'}
            </button>
          </form>
        </div>

      </div>
    </div>
   );
}

export default Login;