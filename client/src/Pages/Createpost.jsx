import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {preview} from '../assets'
import { FormField, Loder } from '../Components'
import {getRandom} from '../utils'
const Createpost = () => {
    const navigate = useNavigate()
    const [form,setForm]=useState(
        {
            name:'',
            photo:'',
            prompt:''
        }
        )
    const [generatedImg,setGeneratedImg]=useState(false);
    const [loading,setLoading]=useState(false);


    const generateImg= async()=>{
        if(form.prompt){
            try {
                setGeneratedImg(true)
                const body = JSON.stringify({prompt:form.prompt})
                const generated = await fetch('http://localhost:8000/api/v1/dall',{method:'POST',body,credentials:'include',headers:{'Content-Type':'application/json','X-name':"eop"}})
                const data = await generated.json()
                setForm((prev)=>({...prev,photo:`data:image/jpeg;base64,${data.image}`}))
            } catch (error) {
                console.log(error)
            }
            finally{
                setGeneratedImg(false)
            }
        }
    }

    const handelChange=(e)=>{
        setForm((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    const handelSubmit=async()=>{
        if(form.name && form.photo && form.prompt ){
            try {
                setLoading(true)
                const request = await fetch('http://localhost:8000/api/v1/post',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},'body':JSON.stringify(form)})
                await request.json()
                navigate('/')
            } catch (error) {
                console.log(error)
            }
            finally{
                setLoading(false)
            }
        }
    }

    const handelSuprisme=()=>{
        const randomprompt = getRandom(form.prompt)
        setForm({...form,prompt:randomprompt})
    }

  return (
    <section className='max-w-3xl mx-auto' >
    <div>
        
        <h1 className='font-extrabold text-[#222328]  text-[#32px]' >Created An Img</h1>
        <p className='maw-w-500px text-[#666e75] text-[15px] mt-2' >Create  Image generated bu Dall-E AI</p>
    </div>
    <div className='flex flex-col gap-4 mt-4 ' >
    <FormField LabelName='Your Name' type='text' name='name' placeholder='John Doe' value={form.name}  onChange={handelChange} />
    <FormField LabelName='Prompt' type='text' name='prompt' placeholder='Design Items' value={form.prompt} handelSuprisme={handelSuprisme}  isSuprisme onChange={handelChange} />
    <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-64 focus:ring-blue-500 focus-border-blue-500 p-3 h-64 flex justify-center items-start   ' >
            {form.photo ?
            <img src={form.photo} alt={form.name}  className='w-full h-full object-contain' />
            :<img src={preview} alt='generate' />
        }

        {
           generatedImg &&
           <div className='absolute inset-0 z-0  flex justify-center items-center  bg-gray-100 rounded-lg ' >
            <Loder/>
           </div> 
        }
        </div>
    </div>
    <div className='mt-4 flex gap-4' >
        <button  onClick={generateImg} className='  text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-3 text-center '  >{generatedImg ?'Gennerating ...':'Generate' }</button>
        { form.photo && <a href={form.photo}  download className='text-white flex items-center justify-center bg-blue-400 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-3 text-center'    ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>
</a>}
    </div>
    <div className='mt-10' >
        <p className='text-[#666e75] text-[15px] ' >once you create the image uou wont you can share it with the communite</p>
        <button onClick={handelSubmit} className=' mt-4 text-[15px] text-white font-medium rounded-md px-5 py-3    w-full sm:w-auto text-bold bg-[#6469ff] ' >{loading ? 'sharing...' :'Share with communty'}</button>
    </div>
    </section>
  )
}

export default Createpost