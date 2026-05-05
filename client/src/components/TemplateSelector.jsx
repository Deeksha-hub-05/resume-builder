import React from 'react'
import { useState } from 'react'
import { Layout, Check } from 'lucide-react'

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const templates = [
        { id: 'classic', name: 'Classic', preview: 'A clean,traditional resume format with clear sections and professional typography' },
        { id: 'modern', name: 'Modern', preview: 'Sleek design with modern typography and a focus on readability' },
        { id: 'minimal-image', name: 'Minimal Image', preview: 'A minimal, modern resume format with a single image and professional typography' },
        { id: 'minimal', name: 'Minimal', preview: 'Ultra-clean design that puts your content front and center' },
    ]
    return (
        <div className='relative'>
            <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-1 px-3 text-sm transition-all hover:ring py-2 text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100  ring-blue-300 rounded-lg shadow-sm hover:bg-gray-50'>
                <Layout size={14} />
                <span className='max-sm:hidden'>Template</span>

            </button>
            {isOpen && (
                <div className='absolute top-full w-xs p-3 mt-2 w-64 space-y-3 bg-white border border-gray-200 rounded-md shadow-sm'>
                    {templates.map((template) => (
                        <div key={template.id} onClick={() => { onChange(template.id); setIsOpen(false) }} className={`relative p-3 border rounde-md cursor-pointer transition-all ${selectedTemplate === template.id ? 'bg-blue-100 border-blue-400' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-100'} `}>
                            {selectedTemplate === template.id && (
                                <div className='absolute top-2 right-2'>
                                    <div className='bg-blue-400 flex items-center justify-center rounded-full size-5'>
                                        <Check className='text-white w-3 h-3' />
                                    </div>
                                </div>
                            )}
                            <div className="space-y-1">
                                <h4 className='font-medium text-gray-800'>{template.name}</h4>
                                <div className='mt-2 p-2 bg-blue-50 text-xs text-gray-500 italic'>{template.preview}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default TemplateSelector