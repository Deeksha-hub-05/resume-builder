import React from 'react'
import { useState } from 'react'
import { Palette,Check } from 'lucide-react'

const ColorPicker = ({ selectedColor, onChange }) => {
    const colors = [
        { name: "Blue", value: "#3B82F6" },
        { name: "Green", value: "#10B981" },
        { name: "Purple", value: "#8B5CF6" },
        { name: "Orange", value: "#F97316" },
        { name: "Gray", value: "#6B7280" },
        { name: "Teal", value: "#14B8A6" },
        { name: "Yellow", value: "#F59E0B" },
        { name: "Red", value: "#EF4444" },
        { name: "Black", value: "#000000" },
        { name: "NavyBlue", value: "#000080" },
        { name: "Pink", value: "#ba317aff" },

    ]

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='relative'>
            <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-1 px-3 text-sm transition-all hover:ring py-2 px-3 text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100  ring-purple-300 rounded-lg shadow-sm '>
                <Palette size={16} /><span className='max-sm:hidden'>Accent</span>

            </button>
            {isOpen && (
                <div className='grid grid-cols-4 gap-2 top-full left-0 mt-2 w-60 absolute right-0 p-3 z-10 bg-white rounded-md shadow-sm border border-gray-200'>

                    {colors.map((color) => (
                        <div key={color.value} onClick={() => {onChange(color.value);setIsOpen(false)}} className='flex flex-col relative cursor-pointer group' style={{ backgroundColor: color.value }}>
                            <div className=' group-hover:border-black/25 transition-colors border-transparent border-2 rounded-full w-12 h-12'
                                style={{ backgroundColor: color.value }}>
                            </div>
                            {selectedColor === color.value && (
                                <div className='absolute top-0 left-0 right-0 bottom-4.5 flex items-center justify-center'>
                                    <Check className='w-6 h-6 text-white' />
                                </div>
                            )}
                            <p className='text-xs text-center mt-1 text-gray-600'>{color.name}</p>

                        </div>
                    ))}
                </div>

            )}
        </div>
    )
}

export default ColorPicker