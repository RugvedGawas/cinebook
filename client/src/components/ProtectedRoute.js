import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";




function ProtectedRoute({ children }) {
 const {user} = useSelector((state)=>state.users)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        dispatch(SetUser(null));
        message.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      dispatch(HideLoading());
      dispatch(SetUser(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
        getCurrentUser();
      } else {
        navigate("/login");
      }
  }, []);

  return (
   user && ( 
   <div className="layout p">
   <div className='header  flex justify-between'>
   <div>
    <h1 className="text-2xl text-white">
    <i class="ri-movie-2-fill"></i>CINEBOOKING
    </h1>
    </div>

   

    <div className="p-1 flex gap-1">
     <h1 className="text-sm text-white gap-1 nm"   onClick={() => {
                if(user.isAdmin){
                  navigate("/admin");
                }
                else {
                  navigate("/profile");
                }
              }}>
     <i class="ri-user-fill text-white ml-2"></i>
    {user.name}
    
     </h1>
     <i class="ri-logout-circle-r-fill textwhite ml-2"
    onClick={()=>{
        localStorage.removeItem("token");
        navigate("/login");
    }}    
    >Logout</i>
    </div>
   </div>
   <div className="content mt-1 p-1">
   {children}
   </div>
      </div>
  )
  );
}

export default ProtectedRoute
