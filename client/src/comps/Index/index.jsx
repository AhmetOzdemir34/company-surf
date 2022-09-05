import React, {useState, useEffect, useRef} from 'react'
import {Drawer} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {userPending, userSuccess, userRejected} from '../../redux/userSlice'
import axios from 'axios'

const Index = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const access = useSelector(state => state.user.access);
  const [signin, setSignin] = useState({});
  const [signup, setSignup] = useState({});
  const ref = useRef();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const signIn = async (e) => {
    e.preventDefault();
    dispatch(userPending());
    if(!(signin.email && signin.password)) return alert('Bütün alanları doldurunuz!');
    try{
      const res = await axios.post('http://localhost:5000/auth/sign-in', signin);
      dispatch(userSuccess(res.data));
    }catch(err){
      dispatch(userRejected(err));
      alert(err.response.data.message);
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    if(!ref.current.checked) return alert('Kullanıcı Sözleşmesini Onaylayın!');
    if(!(signup.username && signup.email && signup.password && signup.confirmPassword)) return alert('Bütün alanları doldurunuz!');
    try{
      const res = await axios.post('http://localhost:5000/auth/sign-up', signup);
    }catch(err){
      console.log(err);
      return alert(err.response.data.message);
    }
    alert('Kaydınız oluşturulmuştur lütfen giriş yapınız.');
    onClose();
  };

  if(access){
    return <Redirect to={'/home'}/>
  }

  return (
    <>
    <div className='bg' >
      <div className="container">
        <div className='relative h-screen flex flex-row flex-nowrap justify-center items-center'>
          <div className='md:w-6/12 w-10/12 rounded-lg p-3' style={{backgroundColor:"rgba(255,255,255,.95)"}} >
              <form onSubmit={signIn}>
                <h2 className='text-center md:text-3xl text-xl'>{"Giriş Yap"}</h2>
                <input onChange={(e)=>{setSignin({...signin, email: e.target.value})}} type="text" className='block mx-auto w-10/12 bg-slate-300 font-bold rounded my-5 p-3' placeholder='Email' />
                <input onChange={(e)=>{setSignin({...signin, password: e.target.value})}} type="password" className='block mx-auto w-10/12 bg-slate-300 font-bold rounded my-5 p-3' placeholder='Password' />
                <button type="submit" className='block mx-auto font-bold bg-blue-900 my-3 p-3 rounded text-white' style={{borderRadius:"20px 0", boxShadow:"4px 4px 10px 0 rgb(30,58,138)"}} >Giriş Yap</button>
              </form>
              <p className='text-blue-900 font-bold underline text-center cursor-pointer' onClick={showDrawer}>Henüz bir hesabınız yok mu?</p>
          </div>
        </div>
      </div>
    </div>
    <Drawer
    title="Kolayca Kayıt Ol!"
    placement={'right'}
    closable={false}
    onClose={onClose}
    visible={visible}
  >
    <form onSubmit={signUp}>
      <input onChange={(e)=> setSignup({...signup,username:e.target.value})} type="text" className='block mx-auto w-10/12 bg-slate-200 font-bold rounded my-5 p-3' placeholder='Username' />
      <input onChange={(e)=> setSignup({...signup,email:e.target.value})} type="text" className='block mx-auto w-10/12 bg-slate-200 font-bold rounded my-5 p-3' placeholder='Email' />
      <input onChange={(e)=> setSignup({...signup,password:e.target.value})} type="password" className='block mx-auto w-10/12 bg-slate-200 font-bold rounded my-5 p-3' placeholder='Password' />
      <input onChange={(e)=> setSignup({...signup,confirmPassword:e.target.value})} type="password" className='block mx-auto w-10/12 bg-slate-200 font-bold rounded my-5 p-3' placeholder='Confirm Password' />
      <div className='w-10/12 text-center'>
        <input ref={ref} type="checkbox" /> <span>Kullanıcı Sözleşmesini Okudum, Onaylıyorum!</span>
      </div>
      <button type="submit" className='p-3 mx-auto block w-10/12 my-3 bg-blue-400 rounded text-white font-bold'>{"Kayıt Ol"}</button>
    </form>
  </Drawer>
  </>
  )
}

export default Index