import React from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import ResumePreview from '../components/ResumePreview'
import Loader from '../components/Loader'
import { ArrowLeftIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useState } from 'react'

const Preview = () => {
  const {resumeId}=useParams()
  const [resumeData,setResumeData]=useState(null)
  const [isLoading,setIsLoading]=useState(true)
 
  const loadResume=async()=>{
  try{
    const {data}=await api.get('/api/resume/public/'+resumeId)
    setResumeData(data.resume)
  } catch (error) {
    console.log(error.message)
  } finally {
    setIsLoading(false)

  }

  }
  useEffect(()=>{
    loadResume()
  },[])
  return resumeData? (
    <div className='bg-slate-100'>
      <div className='max-w-4xl mx-auto py-10'>
       <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accentColor} className="bg-white py-4"/>
      </div>
    </div>
  ):(
    <div className=''>
      {isLoading ? <Loader/> : (
        <div className='flex flex-col items-center justify-center h-screen'>
        <p className='text-center text-6xl text-slate-400 font-medium'>Resume not found</p>
        <a href='/' className='mt-6 flex transition-colors items-center text-white bg-green-500 hover:bg-green-600 px-6 h-9 m-1 rounded-full ring-offset-1 ring-1 ring-green-400'>
          <ArrowLeftIcon className='size-4 mr-2'/>
          Go to Home Page
        </a>
        </div>
        )}
    </div>
    
  )
}

export default Preview