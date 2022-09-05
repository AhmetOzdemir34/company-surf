import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {loggedinPending,loggedinSuccess,loggedinRejected} from './redux/userSlice'
import axios from 'axios'

const GuardedRoute = ({component:Component, ...rest}) => {
  const dispatch = useDispatch();
  const access = useSelector(state => state.user.access);

  useEffect(()=>{
    const init = async () => {
      dispatch(loggedinPending());
        try{
        const res = await axios.get('http://localhost:5000/auth/is-signed-in');
        dispatch(loggedinSuccess(res.data));
        }catch(err){
          dispatch(loggedinRejected(err));
        }
    };
    init();
  }, []);
  console.log(access);
  return (
    <Route
    {...rest}
    render={(props)=>{
        if(access){
            return <Component />
        } else{
             return(
                <Redirect to="/"/>
            ) 
        }
    }}
    />
  )
}

export default GuardedRoute