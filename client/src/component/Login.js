import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import { UserContext } from './UserContext';
import * as yup from 'yup';

function Login() {

  const { user, setUser } = useContext(UserContext)
  const [signup, setSignup] = useState(true);
  const navigate = useNavigate();
  const toggleSignup = () => setSignup((prev) => !prev);

  const formSchema = yup.object({
    name: yup.string(),
    email: yup.string(),
    username: yup.string(),
    password: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      bio: '',
      email: '',
      location: '',
      username: '',
      password: '',
      avatar: ''
    },
    validationSchema: formSchema,
    onSubmit: (values, actions) => {
      fetch(signup ? 'http://127.0.0.1:5000/signup' : 'http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          actions.resetForm();
          setUser(data);
          navigate('/home');
        })
        .catch(error => alert(error))
    },
  });

  return (
    <div className="body">
      <section>
        {signup ? (
          <form className='form' onSubmit={formik.handleSubmit}>
            <h1>signup</h1>
            <label>name</label>
            <input value={formik.values.first_name} onChange={formik.handleChange} type='text' name='first_name' />
            <label>email</label>
            <input value={formik.values.email} onChange={formik.handleChange} type='text' name='email' />
            <label>username</label>
            <input value={formik.values.username} onChange={formik.handleChange} type='text' name='username' />
            <label>password</label>
            <input value={formik.values.password} onChange={formik.handleChange} type='password' name='password' />
            <label>avatar</label>
            <input value={formik.values.avatar} onChange={formik.handleChange} type='text' name='avatar' />
            <input type='submit' value='sign up' className='button' />
          </form>
        ) : (
          <form className='form' onSubmit={formik.handleSubmit}>
            <h1>login</h1>
            <label>username</label>
            <input value={formik.values.username} onChange={formik.handleChange} type='text' name='username' />
            <label>password</label>
            <input value={formik.values.password} onChange={formik.handleChange} type='password' name='password' />
            <input type='submit' value='Login' className='button' />
          </form>
        )}
          <div className='form'>
            <p>{signup ? "Already have an account?" : "Not a member?"}</p>
            <button className="button" onClick={toggleSignup}>
              {signup ? "login" : "sign up"}
            </button>
          </div>
        </section>
    </div>
  )
}

export default Login
