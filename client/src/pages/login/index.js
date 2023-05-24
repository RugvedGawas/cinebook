import React, { useEffect } from 'react'
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const onFinish = async (values) => {
      try {
        dispatch(ShowLoading());
        const response = await LoginUser(values);
        dispatch(HideLoading());
        if (response.success) {
          message.success(response.message);
          localStorage.setItem("token", response.data);
          window.location.href = "/"
        } else {
          message.error(response.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
     };

     useEffect(()=>{
      if(localStorage.getItem("token")){
        navigate("/");
      }
     },[]);

  return (
    <div className="layout p">
    <div className='pos'>
     <h1 className="text-2xl text-white">
     <i class="ri-movie-2-fill"></i>CINEBOOKING
     </h1>
     </div>
    <div className="flex justify-center h-screen items-center">
     <div className="layout p"></div>
    <div className="card2 p-3 w-400 pos">
      <h1 className="text-xl mb-1 text-black">CINEBOOKING - LOGIN</h1>
      <hr />
      <Form layout="vertical" className="mt-1" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <input type="password" />
        </Form.Item>

        <div className="flex flex-col mt-3 gap-1">
          <Button fullWidth title="LOGIN" type="submit" />
          <p className='text-black'>Not registered yet? <Link to="/register">Register</Link></p>

          
        </div>
      </Form>
    </div>
  </div>
  </div>
  )
}

export default Login
