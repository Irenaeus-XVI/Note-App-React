import style from "./Register.module.css";
import regsiterImage from "../../assets/images/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
export default function Register() {

  const { sendDataToSignUp } = useContext(UserContext)
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    name: Yup.string().min(3).required('userName is required '),
    email: Yup.string().email().required('email is required '),
    password: Yup.string().matches(/^[A-Z]/).required('password is required '),
    age: Yup.number().min(18, 'age must be at least 18').required('age is required '),
    phone: Yup.string().matches(/^01[0125][0-9]{8}/, 'enter valid egyptian number').required('phone is required ')
  })


  const formik = useFormik({
    initialValues: {
      "name": "",
      "email": "",
      "password": "",
      "age": '',
      "phone": ""
    },
    validationSchema,
    onSubmit: async function (values) {
      console.log({ valuesFromOnSubmit: values });
      const response = await sendDataToSignUp(values)
      if (response.msg === 'done') {
        navigate('/login')
      }
    }
  })


  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={regsiterImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form className="col-md-4 d-flex flex-column justify-content-center px-5" onSubmit={formik.handleSubmit}>
          <h2 className="m-0 fw-bold font-Montserrat">Create an account</h2>
          <p className="mb-3">Let's get started for free</p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="name"
              id="name"
              values={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? <p className="error">{formik.errors.name}</p> : ''}

            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
              values={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? <p className="error">{formik.errors.email}</p> : ''}

            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? <p className="error">{formik.errors.password}</p> : ''}

            <input
              type="text"
              inputMode="numeric"
              className="form-control"
              placeholder="Age"
              name="age"
              id="age"
              values={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.age && formik.touched.age ? <p className="error">{formik.errors.age}</p> : ''}

            <input
              type="tel"
              inputMode="numeric"
              className="form-control"
              placeholder="phone"
              name="phone"
              id="phone"
              values={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? <p className="error">{formik.errors.phone}</p> : ''}

            <button type="submit" className="btn btn-main">
              Create account
            </button>
            <p>
              Already have account ?{" "}
              <Link to="/login" className="text-decoration-underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
