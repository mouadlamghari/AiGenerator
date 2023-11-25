import React from 'react'

const FormField = ({LabelName,type,name,value,onChange,isSuprisme,placeholder,handelSuprisme}) => {
  return (
    <div>
    <div className='flex  items-center gap-2 mb-2' >
        <label className='block text-sm font-medium text-gray-900'  htmlFor={name}>
        {LabelName}
        </label>
        {isSuprisme && 
        <button 
        type='button' 
        onClick={handelSuprisme}
        className=' font-semibold  text-xs bg-[#ECECF1] py-1 px-2 rounded-md  text-black '
        >
            suprise me
        </button>
        }
    </div>
        <input
        className=' bg-gray-50 border-gray-600 text-gray-900 border text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3  '
        type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} />
       
    </div>
  )
}

export default FormField