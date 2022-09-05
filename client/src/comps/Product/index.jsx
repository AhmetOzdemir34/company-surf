import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios';
import { Table } from 'antd';
import {TbSortAscendingNumbers, TbSortDescendingNumbers} from 'react-icons/tb';
import {FcAlphabeticalSortingAz, FcAlphabeticalSortingZa} from 'react-icons/fc';
import categories from '../../categories.json';

const Product = () => {
  const [add, setAdd] = useState({});
  const [updateUri, setUpdateUri] = useState("");
  const [product, setProduct] = useState(null);
  const [result, setResult] = useState(null);
  const [category, setCategory] = useState(null);
  const [categorySelect, setCategorySelect] = useState("");
  const [update, setUpdate] = useState({
    productName:"",
    productCategory:"",
    amount:"",
    amountUnit:""
  });
  const [getAndDel, setGetAndDel] = useState("");
  const col = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) => <span onClick={function(){
        navigator.clipboard.writeText(text);
      }} className='cursor-pointer'>{text.substring(0,5)}...</span>,
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Category',
      dataIndex: 'productCategory',
      key: 'productCategory',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    }
  ];
  useEffect(() => {
    async function init () {
      const res = await axios.get("http://localhost:5000/product");
      setResult(res.data);
      setCategory(categories);
    }
    init();
  }, [])
  
  return (
    <>
      <Navbar />
      <div>
        <div className="container mx-auto">
          <div className='flex flex-row flex-wrap justify-between items-baseline'>
            <div className='md:w-4/12 mx-auto w-10/12 p-3 md:border-r-2'>
                <div className='rounded-lg p-3 bg-slate-800 mt-2'>
                  <h2 className='text-white text-center text-xl'>Ürün Oluştur</h2>
                  <form onSubmit={async(e)=>{
                    e.preventDefault();
                    const res = await axios.post('http://localhost:5000/product',add);
                    return alert(res.data.message);
                  }}>
                    <input onChange={(e)=> setAdd({...add, productName:e.target.value})} type="text" className='my-1 p-2 block mx-auto w-10/12 rounded-xl' placeholder='Product Name' />
                    {/* <input onChange={(e)=> setAdd({...add, productCategory:e.target.value})} type="text" className='my-2 p-2 block mx-auto w-10/12 rounded-xl' placeholder='Product Category' /> */}
                    <select defaultValue={""} onChange={(e)=> setAdd({...add, productCategory:e.target.value})} className='my-2 p-2 block mx-auto w-10/12 rounded-xl'>
                      {category && 
                      categories.map((e)=>{
                        return (
                          <option value={e}>{e}</option>
                        )
                      })
                      }
                    </select>
                    <input onChange={(e)=> setAdd({...add, amount:e.target.value})} type="number" className='my-2 p-2 block mx-auto w-10/12 rounded-xl' placeholder='Amount' />
                    <input onChange={(e)=> setAdd({...add, amountUnit:e.target.value})} type="number" className='my-2 p-2 block mx-auto w-10/12 rounded-xl' placeholder='Amount Unit' />
                    <input onChange={(e)=> setAdd({...add, company:e.target.value})} type="text" className='my-1 p-2 block mx-auto w-10/12 rounded-xl' placeholder='Company ID' />
                    <button type='submit' className='bg-slate-300 p-2 rounded block mx-auto'>{"Ürün Ekle"}</button>
                  </form>
                </div>
                <div className='rounded-lg p-3 bg-slate-500 mt-2'>
                  <h2 className='text-white text-center text-xl'>Ürün Güncelle</h2>
                  <form onSubmit={async(e)=>{
                    e.preventDefault();
                    const res = await axios.put(`http://localhost:5000/product/${updateUri}`, update);
                    alert(res.data.message);
                  }}>
                    <input onChange={(e)=> setUpdateUri(e.target.value)} type="text" className='my-1 p-2 block mx-auto w-10/12 rounded-xl' placeholder='Product ID' />
                    <input onChange={(e)=> setUpdate({...update, productName:e.target.value})} type="text" className='my-2 p-2 block mx-auto w-10/12 rounded-xl' placeholder='Product Name' />
                    <select defaultValue={""} onChange={(e)=> setUpdate({...update, productCategory:e.target.value})} className='my-1 p-2 block mx-auto w-10/12 rounded-xl'>
                      {category && 
                      categories.map((e)=>{
                        return (
                          <option value={e}>{e}</option>
                        )
                      })
                      }
                    </select>
                    {/* <input onChange={(e)=> setUpdate({...update, productCategory:e.target.value})} type="text" className='my-2 p-2 block mx-auto w-10/12 rounded-xl' placeholder='Product Category' /> */}
                    <input onChange={(e)=> setUpdate({...update, amount:e.target.value})} type="number" className='my-2 p-2 block mx-auto w-10/12 rounded-xl' placeholder='Amount' />
                    <input onChange={(e)=> setUpdate({...update, amountUnit:e.target.value})} type="number" className='my-1 p-2 block mx-auto w-10/12 rounded-xl' placeholder='Amount Unit' />
                    <button type='submit' className='bg-slate-300 p-2 rounded block mx-auto'>{"Ürün Güncelle"}</button>
                  </form>
                </div>
                <div className='rounded-lg p-3 bg-red-300 mt-2'>
                  <div>
                    <input onChange={(e)=> setGetAndDel(e.target.value)} type="text" className='my-1 p-2 block mx-auto w-10/12 rounded-xl' placeholder='Product ID' />
                    <div className='flex flex-row flex-nowrap justify-center w-8/12 mx-auto items-center gap-x-2'>
                      <button onClick={async()=>{
                        const res = await axios.get(`http://localhost:5000/product/${getAndDel}`);
                        setProduct(res.data);
                      }} type='submit' className='bg-slate-300 p-2 rounded block mx-auto'>{"Ürün Göster"}</button>
                      <button onClick={async()=>{
                        const res = await axios.delete(`http://localhost:5000/product/${getAndDel}`);
                        return alert(res.data.message);
                      }} type='submit' className='bg-slate-300 p-2 rounded block mx-auto'>{"Ürün Sil"}</button>
                    </div>
                  </div>
                </div>
                {
                product &&
                <div className="border-t-2 mt-2 pt-2">
                  <h2 className='text-center font-bold text-xl'>Ürün Detayı</h2>
                  <p className="mb-0"><span className='font-bold'>Ürün Adı: </span>{product.productName}</p>
                  <p className="mb-0"><span className='font-bold'>Üretici Şirket: </span>{product.company.companyName}</p>
                  <p className="mb-0"><span className='font-bold'>Yayınlandığı Tarih: </span>{product.created_at}</p>
                  <p className="mb-0"><span className='font-bold'>Güncel Fiyat: </span>{product.amount}{"₺"}</p>
                  <p className="mb-0"><span className='font-bold'>Stok Bilgisi: </span>{product.amountUnit}</p>
                </div>
                }
            </div>
            <div className='md:w-6/12 mx-auto w-10/12 p-3'>
              <div>
              <p className='my-5 font-bold text-red-800'>
              Ürün üzerinde işlemler yapmak için ID bilgisine ihtiyacınız olacaktır. Tablo üzerinden ürün ID'lerine tıklayarak
              kopyalayabilirsiniz.
            </p>
                <span onClick={async()=>{
                  const res = await axios.get('http://localhost:5000/product/name/asc');
                  setResult(res.data);
                }} className="mx-2 border-2 cursor-pointer p-2"><FcAlphabeticalSortingAz  className='inline' size={24} /> Sırala</span>
                <span onClick={async()=>{
                  const res = await axios.get('http://localhost:5000/product/name/desc');
                  setResult(res.data);
                }} className="mx-2 border-2 cursor-pointer p-2"><FcAlphabeticalSortingZa className='inline' size={24} /> Sırala</span>
                <span onClick={async()=>{
                  const res = await axios.get('http://localhost:5000/product/amount/asc');
                  setResult(res.data);
                }} className="mx-2 border-2 cursor-pointer p-2"><TbSortAscendingNumbers className='inline' size={24} /> Sırala</span>
                <span onClick={async()=>{
                  const res = await axios.get('http://localhost:5000/product/amount/desc');
                  setResult(res.data);
                }} className="mx-2 border-2 cursor-pointer p-2"><TbSortDescendingNumbers className='inline' size={24} /> Sırala</span>
                <span className="mx-2 border-2 cursor-pointer p-2">
                  <select defaultValue={""} onChange={(e)=>setCategorySelect(e.target.value)}>
                    {category && 
                    categories.map((e)=>{
                      return (
                        <option value={e}>{e}</option>
                      )
                    })
                    }
                  </select>
                </span>
                <button type='button' onClick={async()=>{
                  const res = await axios.post('http://localhost:5000/product/category',{category:categorySelect});
                  setResult(res.data);
                }}>Kategori Ara</button>
              </div>
            <Table dataSource={result} columns={col} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product