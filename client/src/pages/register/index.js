import React, { useEffect }  from 'react'
import { Form, message } from "antd";
import { Link ,useNavigate} from "react-router-dom";
import Button from "../../components/Button";
import { RegisterUser } from "../../apicalls/users";
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { useDispatch } from "react-redux";


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
     try {
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
      if(response.success){
        message.success(response.message);
        window.location.href = "/login"
      }
      else{
        message.error(response.message);
      }
     } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
     }
  };

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/login");
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
      <div className="card2 p-3 w-400 pos">
        <h1 className="text-xl mb-1 text-black">CINEBOOKING - REGISTER</h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <input type="text" />
          </Form.Item>
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
         
          <div className="flex flex-col mt-3   gap-1">
            <Button fullWidth title="REGISTER" type="submit" />
            <p className='text-black'>Already have an account? <Link to="/login">Log in</Link></p>
          </div>
        </Form>
      </div>
    </div>
    </div>
  )
}

export default Register

