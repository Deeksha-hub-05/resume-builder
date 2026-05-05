import React, { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../config/api.js'


const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {

    const { token } = useSelector(state => state.auth)
    const [isGenerating, setIsGenerating] = useState(false)

    const generateSummary = async () => {
        try {
            setIsGenerating(true)

            const prompt = `Enhance this professional summary: "${data}"`

            const response = await api.post(
                '/api/ai/enhance-pro-sum',
                { userContent: prompt },
                { headers: { Authorization: token } }
            )

            setResumeData(prev => ({
                ...prev,
                professional_summary: response.data.enhancedContent
            }))

        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            setIsGenerating(false)
        }
    } // ✅ FIX: function properly closed here

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
                        Professional Summary
                    </h3>
                    <p className='text-sm text-gray-600'>
                        Write a brief summary of your resume here
                    </p>
                </div>

                <button
                    onClick={generateSummary}
                    disabled={isGenerating}
                    className='flex items-center gap-2 px-3 py-1 text-sm text-purple-600 bg-gradient-to-br from-blue-50 to-blue-100 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'
                >
                    {isGenerating ? (
                        <Loader2 className='animate-spin size-4' />
                    ) : (
                        <Sparkles className='size-4' />
                    )}
                    {isGenerating ? 'Enhancing...' : 'AI Enhance'}
                </button>
            </div>

            <div className='mt-6'>
                <textarea
                    className='w-full p-3 px-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors text-sm focus:border-blue-500 resize-none'
                    placeholder='Write a brief summary that highlights your key strengths and career objectives...'
                    rows={7}
                    value={data || ''}
                    onChange={(e) => onChange(e.target.value)}
                />

                <p className='text-xs text-gray-500 mx-auto text-center max-w-4/5'>
                    Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.
                </p>
            </div>
        </div>
    )
}

export default ProfessionalSummaryForm
