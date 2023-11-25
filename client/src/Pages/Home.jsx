'use strict'
import React, { useEffect, useMemo, useState } from 'react'
import { Card,FormField, Loder } from '../Components';
const Home = () => {
const [loding,setloading]= useState(false)
const [posts, setposts] = useState([]);
const [search, setsearch] = useState('');
console.log(posts)
useEffect(
  ()=>{
    (async()=>{
        try {  
            const request = await fetch('http://localhost:8000/api/v1/post',{headers:{"Content-Type":'application/json'},credentials:'include'})
            const response = await request.json()
            setposts(response.data)
        } catch (error) {
            console.log(error)
        }
    })()  
  } 
  ,[]  
)


const RenderCards=({data=[],title})=>{
    if(!data.length) return  <h2 className=' mt-3 uppercase text-[#644f99] font-bold text-xl  ' >{title}</h2>
    return data.map(e=><Card key={e._id} {...e} />)
}



  return (
    <section className='max-w-5xl mx-auto' >
        <div>
            <h1 className='font-extrabold text-[#222328]  text-[#32px]' >The Comminuty ShowCase</h1>
            <p className='maw-w-500px text-[#666e75] text-[15px] mt-2' >Browse throught a collection of Images generated bu Dall-E AI</p>
        </div>
        <div className='mt-6' >
    <input type="text" placeholder='Search Keywords ...' onChange={(e)=>setsearch(e.target.value)}  className=' w-full   focus:ring-[#6469fe]  border-blue-500 rounded-lg px-2 py-3'  />
        </div>
        <div className='mt-10'>
            {loding ? <div className='flex justify-between items-center' ><Loder/></div>:
            <>
            {search && <h2 className=' font-medium text-[#666e75] text-xl mb-3 '>
                showing resultat for <span className='text-[#222328] ' >{search}</span>
            </h2>}
            <div className=' grid lg:grid-cols-4 sm:grid-cols-3  xs:grid-cols-2 grid:cols-1 gap-3 ' >
                {search?<RenderCards data={posts.filter(e=>e.prompt.includes(search))} title={'search data not found'}  />:<RenderCards data={posts} title={'posts not found'} />}
            </div>
            </>}

        </div>
    </section>
  )
}

export default Home