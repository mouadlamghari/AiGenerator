import React from 'react'
import {saveAs} from 'file-saver'
const Card = ({photo,prompt,name,_id}) => {
  const download = ()=>{
    saveAs(photo,'downloads/'+_id+'.'+'jpg')
  }
  return (
    <div className='rounded-xl card relative group shadow-card hover:sahdow-card ' >
      <img src={photo} className=' w-full h-full object-contain rounded-xl ' alt="" />
      <div className='group-hover:flex flex-col max-h-[94%] hidden absolute bottom-0 left-0  right-0 bg-[#10131f]  m-2 p-4 rounded-md  ' >
        <p className='text-white text-sm overflow-y-auto text-md' >{prompt}</p>
      <div className='mt-5 flex justify-between items-center gap-2' >

    <div className='flex  justify-between items-center gap-2 ' >
        <div className=' w-7  h-7  rounded-full  object-contain bg-green-600  flex justify-center items-center text-white font-bold text-xs ' >
          {name[0]}
        </div>
        <p className='text-sm text-bold text-white ' >
          {name}
        </p>
    </div>

    <div className='text-white cursor-pointer' onClick={download}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
    </div>

      </div>
    </div>
    </div>
  )
}

export default Card