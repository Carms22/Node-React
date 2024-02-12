import { useFormik } from "formik";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import FormControl from "../../components/FormControl/FormControl";
import Input from "../../components/Input";
import AuthContext from "../../context/AuthContext";
import { userLogin as loginService } from "../../services/AuthServices";
import loginSchema  from "../Login/LoginSchema";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { login, currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/profile" />;
  }
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
    setSubmitting,
    setFieldError,
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: loginSchema,
    onSubmit:  onSubmit
  })

 

  function onSubmit (values)  {
      console.log( `loginServices ${values}`);
      loginService({ email: values.email, password: values.password }) // llama a /login del back pasandole el email y la password
        .then((response) => {
          // Usar el login del contexto
          login(response.accessToken);
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            setFieldError("email", err?.response?.data?.message);
          } else {
            setFieldError("email", err.message);
          }
          setSubmitting(false);
        });
      // Peticion al back para que me devuelva el JWT
    }

  return (
    <div className="m-10 max-w-md p-5 rounded-md  bg-slate-600">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <FormControl
          text="Email"
          error={touched.email && errors.email}
          htmlFor="email"
        >
          <Input
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && errors.email}
            placeholder="Enter your email..."
          />
        </FormControl>

        <FormControl
          text="Password"
          error={touched.password && errors.password}
          htmlFor="password"
        >
          <Input
            id="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={touched.password && errors.password}
            placeholder="Enter your password..."
            type="password"
          />
        </FormControl>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;
