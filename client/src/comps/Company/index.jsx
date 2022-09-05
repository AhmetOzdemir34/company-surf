import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios';
import {Alert, Table} from 'antd';
import countriesJSON from '../../countries.json';
import {TbSortAscendingNumbers, TbSortDescendingNumbers} from 'react-icons/tb';
import {FcAlphabeticalSortingAz, FcAlphabeticalSortingZa} from 'react-icons/fc';

const Company = () => {
  const ref = useRef();
  const [countries, setCountries] = useState([]);
  const [tableDatas, setTableDatas] = useState([]);
  const [country, setCountry] = useState("");
  const [add, setAdd] = useState("");
  const [space, setSpace] = useState(null);
  const [result, setResult] = useState([])
  const [addObj, setAddObj] = useState({
    companyName:"",
    legalNumber:"",
    incorporationCountry:"",
    website:""
  });
  const col = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Country',
      dataIndex: 'incorporationCountry',
      key: 'incorporationCountry',
    },
    {
      title: 'Count of Office',
      dataIndex: 'officeCount',
      key: 'officeCount',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    }
  ];

  useEffect(() => {
    const init = async () => {
      const res = await axios.get("http://localhost:5000/");
      setResult(res.data);

      setCountries(countriesJSON);
    };
    init();
  }, []);

  useEffect(() => {
    setTableDatas(result.productiveCompanies);
  }, [result]);

  const [search, setSearch] = useState("");
  const [update, setUpdate] = useState("");
  const [updateObj, setUpdateObj] = useState({
    companyName:"",
    incorporationCountry:"",
    website:""
  });
  const [del, setDel] = useState("");
  const message = [
    "Güncelle Formunda boş bıraktığınız alanlar değişikliğe uğramaz.",
    "Şirket silme işlemi ile birlikte o şirkete ait ürünler de silinir ve bu işlemler geri alınamaz."
  ]
  useEffect(() => {
    setCountries(countriesJSON);
  }, []);
  
  return (
    <>
      <Navbar />
      <div className='pt-3'>
        <div className="container mx-auto">
          <div className='p-2'>
            <Alert message={message[0]} type="info" showIcon className='w-12/12 mx-auto block' style={{marginLeft:"auto !important", marginRight:"auto !important"}}/>
            <Alert message={message[1]} type="warning" showIcon className='w-12/12 mx-auto block mt-5' style={{marginLeft:"auto !important", marginRight:"auto !important"}}/>
            <div className=' rounded-sm border border-black bg-slate-200 p-2 mt-2'>
              {"CompanySurf Beta sürümündedir. Beta sürüm boyunca Premium özellikleri test edebilirsiniz. "}
              <span onClick={async()=>{
                const res = await axios.get('http://localhost:5000/auth/be-premium');
                alert(res.data.message);
                window.location.reload();
              }} className='m-0 color text-yellow-500 font-bold cursor-pointer'>Premium Hesap ol!</span>
              {" veya "}
              <span onClick={async()=>{
                const res = await axios.get('http://localhost:5000/auth/be-normal');
                alert(res.data.message);
                window.location.reload();
              }} className='m-0 color text-red-500 font-bold cursor-pointer'>Normal Hesap ol!</span>
              </div>
          </div>
          <div className="flex flex-row flex-wrap justify-center items-baseline">
            <div className='md:w-3/12 p-2 w-10/12 mx-auto text-center'>
              <div className='bg-blue-400 rounded p-2'>
                <h2 className='text-xl font-bold text-white'>Şirket Oluştur</h2>
                <form onSubmit={async(e)=>{
                  e.preventDefault();
                  const res = await axios.post(`http://localhost:5000/company`, addObj);

                  return alert(res.data.message);
                }}>
                  <input onChange={(e)=>{setAddObj({...addObj, companyName:e.target.value})}} type="text" className='my-2 block w-10/12 mx-auto p-2 rounded' placeholder='Company Name' />
                  <input onChange={(e)=>{setAddObj({...addObj, legalNumber:e.target.value})}} type="text" className='my-2 block w-10/12 mx-auto p-2 rounded' placeholder='Legal Number' />
                  <select defaultValue={""} onChange={(e)=>{ setAddObj({...addObj, incorporationCountry:e.target.value})}} name="countries" id="countries" className='bg-slate-200 rounded-lg outline-1 w-10/12 p-3'>
                    {countries && countries.map((e)=>{
                      return (
                        <option value={e.country} key={e.country}>{e.country}</option>
                      )
                    })}
                  </select>
                  <input onChange={(e)=>{setAddObj({...addObj, officeCount:e.target.value})}} type="number" className='my-2 block w-10/12 mx-auto p-2 rounded' placeholder='Count of Office' />
                  <input onChange={(e)=>{setAddObj({...addObj, website:e.target.value})}} type="text" className='my-2 block w-10/12 mx-auto p-2 rounded' placeholder='Website' />
                  <button type='submit' className='bg-slate-300 rounded px-3 py-2' >{"Oluştur"}</button>
                </form>
              </div>
            </div>
            <div className='md:w-3/12 p-2 w-10/12 mx-auto text-center'>
              <div className='bg-green-600 rounded p-2'>
                <h2 className='text-xl font-bold text-white'>Şirket Ara</h2>
                <form onSubmit={async(e)=>{
                  e.preventDefault();
                  const res = await axios.post(`http://localhost:5000/company/search`,{companyName: search});
                  setSpace(res.data);
                }}>
                  <input onChange={(e)=>{setSearch(e.target.value)}} type="text" className='my-2 block w-10/12 mx-auto p-2 rounded' placeholder='Company Name' />
                  <button type='submit' className='bg-slate-300 rounded px-3 py-2' >{"Ara"}</button>
                </form>
              </div>
              {space && 
              <div className='border border-2 shadow-lg'>
                <h2 className='font-bold text-lg'>{"Şirket Hakkında"}</h2>
                <p><span className='underline font-bold'>{"Şirket Adı: "}</span>{space.companyName}</p>
                <p><span className='underline font-bold'>{"Şirket Menşei: "}</span>{space.incorporationCountry}</p>
                <p><span className='underline font-bold'>{"Şirket Websitesi: "}</span>{space.website}</p>
              </div>
              }
            </div>
            <div className='md:w-3/12 p-2 w-10/12 mx-auto text-center'>
              <div className='bg-yellow-500 rounded p-2'>
                <h2 className='text-xl font-bold text-white'>Şirket Güncelle</h2>
                <form onSubmit={async(e)=>{
                  e.preventDefault();
                  const res = await axios.put(`http://localhost:5000/company/${update}`, updateObj);
                  return alert(res.data.message);
                }}>
                  <input onChange={(e)=>{setUpdate(e.target.value)}} type="text" className='my-2 block w-10/12 mx-auto p-2 rounded' placeholder='Company ID' />
                  <input onChange={(e)=>{setUpdateObj({...updateObj, companyName:e.target.value})}} type="text" className='my-2 block w-10/12 mx-auto p-2 rounded' placeholder='Company Name' />
                  <select defaultValue={""} onChange={(e)=>{ setUpdateObj({...updateObj, incorporationCountry:e.target.value})}} name="countries" id="countries" className='bg-slate-200 rounded-lg outline-1 w-10/12 p-3'>
                    {countries && countries.map((e)=>{
                      return (
                        <option value={e.country} key={e.country}>{e.country}</option>
                      )
                    })}
                  </select>
                  <input onChange={(e)=>{setUpdateObj({...updateObj, website:e.target.value})}} type="text" className='my-2 block w-10/12 mx-auto p-2 rounded' placeholder='Website' />
                  <button type='submit' className='bg-slate-300 rounded px-3 py-2' >{"Güncelle"}</button>
                </form>
              </div>
            </div>
            <div className='md:w-3/12 p-2 w-10/12 mx-auto text-center'>
              <div className='bg-red-500 rounded p-2'>
                <h2 className='text-xl font-bold text-white'>Şirket Kaydı Sil</h2>
                <form onSubmit={async(e)=>{
                  e.preventDefault();
                  console.log(del);
                  const res = await axios.delete(`http://localhost:5000/company/${del}`);
                  return alert(res.data.message);
                }}>
                  <input onChange={(e)=>{setDel(e.target.value)}} type="text" className='my-2 block w-10/12 mx-auto p-2 rounded' placeholder='Company ID Number' />
                  <button type='submit' className='bg-slate-300 rounded px-3 py-2' >{"Sil"}</button>
                </form>
              </div>
            </div>
          </div>
          <div className='my-5'>
            <hr className='my-5'/>
            <ul>
              <li onClick={async()=>{
                const res = await axios.get('http://localhost:5000/company/name/asc');
                setResult({...result, productiveCompanies: res.data});
              }} className='cursor-pointer'><FcAlphabeticalSortingAz className='inline mx-1' size={28}/> Sırala</li>
              <li onClick={async()=>{
                const res = await axios.get('http://localhost:5000/company/name/desc');
                setResult({...result, productiveCompanies: res.data});
              }} className='cursor-pointer'><FcAlphabeticalSortingZa className='inline mx-1' size={28}/> Sırala</li>
              <li onClick={async()=>{
                const res = await axios.get('http://localhost:5000/company/office/asc');
                console.log(res.data);
                setResult({...result, productiveCompanies: res.data});
              }} className='cursor-pointer'><TbSortAscendingNumbers className='inline mx-1' size={28}/> Sırala</li>
              <li onClick={async()=>{
                const res = await axios.get('http://localhost:5000/company/office/desc');
                console.log(res.data);
                setResult({...result, productiveCompanies: res.data});
              }} className='cursor-pointer'><TbSortDescendingNumbers className='inline mx-1' size={28}/> Sırala</li>
            </ul>
          </div>
          
          <Table dataSource={result.productiveCompanies} columns={col}/>
          
        </div>
      </div>
    </>
  )
}

export default Company