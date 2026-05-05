import React, { useState, useEffect } from 'react'
import { PlusIcon, TrashIcon, PencilIcon, FilePenLineIcon, XIcon, UploadCloud, LoaderCircleIcon } from 'lucide-react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../config/api'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {

  const { user, token } = useSelector(state => state.auth)
  const colors = ["#1e4f49", "#432f0d", "#434040", "#483574", "#162e53"]

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState("")
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } });
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)

    }
  }
  const createResume = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.post('/api/resumes/create', { title }, {
        headers: { Authorization: token }
      })
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)

    }

  }
  const uploadResume = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, {
        headers: { Authorization: token }
      })
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)

    }
    setIsLoading(false)
  }
  const editTitle = async (event) => {
    try{
      event.preventDefault()
      const {data} = await api.put(`/api/resumes/update`,{resumeId:editResumeId,resumeData:{title}}, {
        headers:{Authorization:token}
      }
      )
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? {...resume,title} : resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    }catch(error){
      toast.error(error?.response?.data?.message || error.message)
    }
  }
  const deleteResume = async (resumeId) => {
    const confirm = window.confirm('Are you sure you want to delete this resume?')

    try {
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: {
            Authorization: token

          }
        })
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)

    }
  }
  useEffect(() => {
    loadAllResumes()
  }, [])
  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8 '>
        <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>Welcome,John Doe</p>
        <div className="flex gap-4">
          <button onClick={() => setShowCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-600 hover:shadow-lg cursor-pointer transition-all duration-300'>
            <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 rounded-full text-white ' />
            <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
          </button>
          <button onClick={() => setShowUploadResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-600 hover:shadow-lg cursor-pointer transition-all duration-300'>
            <UploadCloud className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-600 rounded-full text-white ' />
            <p className='text-sm group-hover:text-purple-600 transition-all duration-300'>Upload Existing</p>
          </button>
        </div>

        <hr className='my-6 border-slate-300 sm:w-[305px]' />
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button key={index} onClick={() => navigate(`/app/builder/${resume._id}`)} className=' group relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border hover:shadow-lg cursor-pointer transition-all duration-300' style={{ background: `linear-gradient(135deg,${baseColor}10,${baseColor}40)`, borderColor: baseColor + '40' }}>
                <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all duration-300' style={{ color: baseColor }} />
                <p className='text-sm group-hover:scale-105 text-center transition-all px-2'>{resume.title}</p>
                <p className='absolute bottom-1 text-[11px] group-hover:text-slate-500 transition-all duration-300 px-2 text-center text-slate-400' style={{ color: baseColor + '90' }}>Last edited {new Date(resume.updatedAt).toLocaleDateString()}</p>
                <div onClick={(e) => e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                  <TrashIcon onClick={() => deleteResume(resume._id)} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors' />
                  <PencilIcon onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors' />
                </div>
              </button>
            )

          })}
        </div>

        {showCreateResume && (
          <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className='fixed inset-0 bg-black/50 flex items-center justify-center z-10 backdrop-blur bg-opacity-50'>
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6 '>
              <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type='text' placeholder='Enter Resume Title' className='w-full py-2 px-4 mb-4 focus:border-green-600 ring-green-600' required />
              <button className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors'>Create Resume</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => { setShowCreateResume(false); setTitle("") }} />
            </div>
          </form>
        )}
        {
          showUploadResume && (
            <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className='fixed inset-0 bg-black/50 flex items-center justify-center z-10 backdrop-blur bg-opacity-50'>
              <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6 '>
                <h2 className='text-xl font-bold mb-4'>Upload Resume</h2>
                <input onChange={(e) => setTitle(e.target.value)} value={title} type='text' placeholder="Enter the resume title" className='w-full py-2 px-4 mb-4 focus:border-green-600 ring-green-600' required />

                <div>
                  <label htmlFor="resume-input" className='block text-sm text-slate-700 '>Select resume File
                    <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors'>
                      {resume ? (
                        <p className='text-green-700'>{resume.name}</p>
                      ) : (
                        <>
                          <UploadCloud className='size-14 stroke-1' />
                          <p>Upload resume</p>
                        </>
                      )}
                    </div>
                  </label>
                  <input type='file' id='resume-input' accept='.pdf' hidden onChange={(e) => setResume(e.target.files[0])} />
                </div>
                <button disabled={isLoading} type='submit'
                className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors flex items-center gap-3 justify-center'>
                  {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white' />}
                  {isLoading ? 'Uploading...' : 'Upload Resume'}
                </button>
                <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => { setShowUploadResume(false); setTitle("") }} />
              </div>
            </form>
          )
        }

        {
          editResumeId && (
            <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className='fixed inset-0 bg-black/50 flex items-center justify-center z-10 backdrop-blur bg-opacity-50'>
              <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6 '>
                <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
                <input onChange={(e) => setTitle(e.target.value)} value={title} type='text' placeholder="Enter the resume title" className='w-full py-2 px-4 mb-4 focus:border-green-600 ring-green-600' required />
                <button className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors'>Edit Resume</button>
                <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => { setEditResumeId(''); setTitle("") }} />
              </div>
            </form>
          )
        }
      </div>
    </div>
  )
}

export default Dashboard