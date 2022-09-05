import React, { useEffect, useState } from 'react'
import {FiMenu} from 'react-icons/fi'
import {CgClose} from 'react-icons/cg'
import {Link} from 'react-router-dom';

const Navbar = () => {
  const [btn,setBtn] = useState(false);
  const [path, setPath] = useState(null);
  
  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  if(path){
  return (
    <div className='bg-gray-300 sticky top-0 z-10 text-final font-bold'>
        <div className='container p-5 mx-auto'>
            <div className='flex flex-nowrap flex-row justify-between items-center'>
                <div className='text-lg'><Link to={'/home'}>{"CompanySurf"}</Link></div>
                <ul style={{listStyle:"none"}} className='md:block hidden m-0'>
                    <li className='inline-block mx-2'>
                    <Link to={'/company'} className='text-final'>
                            Company
                        </Link>
                    </li>
                    <li className='inline-block mx-2'>
                    <Link to={'/product'} className='text-final'>
                            Product
                        </Link>
                    </li>
                </ul>
                <div className='md:hidden block cursor-pointer' onClick={()=>setBtn(!btn)}>
                    {btn ? <CgClose size={24} className='inline' /> : <FiMenu size={24} className='inline' />}
                </div>
            </div>
        </div>
        {btn && 
            <div className='md:hidden block cursor-pointer py-2 text-center'>
                <ul className='w-full h-full'>
                    <li className='my-3 block mx-2'>
                        <Link to={'/company'} className='text-final'>
                            Company
                        </Link>
                    </li>
                    <li className='my-3 block mx-2'>
                        <Link to={'/product'} className='text-final'>
                            Product
                        </Link>
                    </li>
                </ul>
                </div>
            }
    </div>
  )
}
}

export default Navbar