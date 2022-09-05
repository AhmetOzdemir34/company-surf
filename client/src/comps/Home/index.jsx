import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios';
import {Table} from 'antd';
import {useSelector} from 'react-redux';
import countriesJSON from '../../countries.json';
import moment from 'moment';
import {FaDotCircle} from 'react-icons/fa';

const Home = () => {
  const [result, setResult] = useState({});
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [countryResult, setCountryResult] = useState([]);
  const [legalNumber, setLegalNumber] = useState("");
  const [legalNumberResult, setLegalNumberResult] = useState([]);
  const user = useSelector(state => state.user.user);
  moment.locale("tr");
  
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
      title: 'Products Count',
      dataIndex: 'count',
      key: 'count',
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


  if(user){
  return (
    <>
    <Navbar />
    <div>
      <div className="container pb-10 mx-auto">
        <div className="flex flex-row flex-wrap justify-center items-center">
            <div className='w-10/12 mx-auto md:w-4/12 text-center border border-gray-200 p-4 mt-3 shadow-2xl'>
              <h2 className='md:text-xl text-lg font-bold'>Toplam Şirket Sayısı</h2>
              <p className='text-blue-800 font-bold m-0' style={{fontSize:"62px"}}>{result.totalCompany}</p>
            </div>
            <div className='w-10/12 mx-auto md:w-4/12 text-center border border-gray-200 p-4 mt-3 shadow-2xl'>
              <h2 className='md:text-xl text-lg font-bold'>Toplam Ürün Sayısı</h2>
              <p className='text-blue-800 font-bold m-0' style={{fontSize:"62px"}}>{result.totalProduct}</p>
            </div>
        </div>
        <div className='w-10/12 mx-auto mt-10'>
          <h2 className='md:text-2xl text-lg mb-3 font-bold'>En Çok üretim yapan şirketlerle tanışın!</h2>
          <Table dataSource={result.productiveCompanies} columns={col} />
        </div>
        <div className="flex flex-row flex-wrap justify-center items-baseline">
          <div className='md:w-7/12 w-10/12 mx-auto'>
            {user.isPremium ? 
            <>
              <h2 className='md:text-2xl text-lg mb-3 font-bold'>{"Legal Numara Sorgulama (Legal Number)"}</h2>
              <input onChange={(e)=>{setLegalNumber(e.target.value)}} type="text" className='bg-slate-200 rounded-lg outline-1 w-8/12 p-3' placeholder='enter legal number' /> <button 
              onClick={async()=>{
                const res = await axios.post("http://localhost:5000/search/legal",{legalNumber});
                setLegalNumberResult(res.data);
              }} className='bg-slate-400 text-white p-3 rounded-lg'>Arama</button>
              {legalNumberResult.created_at && 
                  <div className='p-3'>
                    <h2 className='text-xl font-bold'>{"Şirket Hakkında"}</h2>
                    <h2 className='italic font-bold'>{">>> "+legalNumberResult.companyName}{` (ID : ${legalNumberResult._id})`}</h2>
                    <p className='mb-0'>{legalNumberResult.incorporationCountry} {"menşeli şirket"} {moment(legalNumberResult.created_at).format('L')} tarihinde kuruldu.</p>
                    <p className='mb-0'>{legalNumberResult.count} ürün sunuyor.</p>
                    <ol className='block pl-10'>
                    {(legalNumberResult.products) && legalNumberResult.products.map((e)=>{
                      return (
                        <li><FaDotCircle className='inline-block' size={16}/> {e.productCategory} kategorisinde {e.productName} isimli ürün {e.amount}₺. Stok Durumu: {e.amountUnit}</li>
                      )
                    })}
                    </ol>
                  </div>
                }
            </>
            :
            <>
              <div className='gradient p-5 rounded-3xl text-center font-extrabold text-white text-2xl'>
                <p className='mb-0'>Bu özellikten faydalanmak için premium üyelik edinin.</p>
              </div>
            </>
            }
          </div>
          <div className='md:w-3/12 w-10/12 mx-auto'>
            <div>
              <h2 className='md:text-2xl text-lg mb-3 font-bold text-center'>{"Ülkeler Göre Arama Yap"}</h2>
              <select onChange={(e)=>{ setCountry(e.target.value)}} name="countries" id="countries" className='bg-slate-200 rounded-lg outline-1 w-8/12 p-3'>
                {countries && countries.map((e)=>{
                  return (
                    <option value={e.country} key={e.country}>{e.country}</option>
                  )
                })}
              </select>
               <button className='bg-slate-400 text-white p-3 rounded-lg'
                onClick={async()=>{
                  if(country === "") return alert("Seçim Yapınız!");
                  const res = await axios.post('http://localhost:5000/search/country', {incorporationCountry:country});
                  setCountryResult(res.data);
                }}
               >Arama</button>
               {countryResult && countryResult.map((e,i)=>{
                return (
                  <div className={i%2===0 ? 'font-bold border-l-8 border-blue-400 p-3 rounded':'font-bold border-l-8 border-green-400 p-3 rounded'}>{`${i+1}) `}{e.companyName}, {e.count} ürün sunuyor!</div>
                )
               })}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
}

export default Home