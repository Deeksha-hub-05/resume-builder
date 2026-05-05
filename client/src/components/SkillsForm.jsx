import React, { useState } from 'react';
import { Plus, X, Sparkles } from 'lucide-react';

const SkillsForm = ({ data = { technical: [], soft: [] }, onChange }) => {
    const [newSkill, setNewSkill] = useState("");
    const [type, setType] = useState("technical"); // 👈 switch between types
    console.log("FORM DATA →", data);

    const addSkill = () => {
        if (!newSkill.trim()) return;

        const updated = {
            ...data,
            [type]: [...(data[type] || []), newSkill.trim()]
        };

        onChange(updated);
        setNewSkill("");
    };

    const removeSkill = (skillType, index) => {
        const updated = {
            ...data,
            [skillType]: data[skillType].filter((_, i) => i !== index)
        };
        onChange(updated);
    };

    return (
        <div className='space-y-4'>
            <div>
                <h3 className='text-lg font-semibold text-gray-900'>Skills</h3>
                <p className='text-sm text-gray-600'>Add technical and soft skills</p>
            </div>

            {/* TYPE SELECTOR */}
            <div className="flex gap-2">
                <button
                    onClick={() => setType("technical")}
                    className={`px-3 py-1 rounded ${type === "technical" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                    Technical
                </button>
                <button
                    onClick={() => setType("soft")}
                    className={`px-3 py-1 rounded ${type === "soft" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                    Soft
                </button>
            </div>

            {/* INPUT */}
            <div className='flex gap-2'>
                <input
                    type='text'
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder={`Add ${type} skill`}
                    className='px-3 py-2 text-sm flex-1 border rounded'
                />
                <button
                    onClick={addSkill}
                    className='px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2'
                >
                    <Plus className='size-4' /> Add
                </button>
            </div>

            {/* TECHNICAL SKILLS */}
            <div>
                <h4 className="font-medium text-gray-800">Technical Skills</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                    {(data.technical || []).map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 rounded flex items-center gap-1">
                            {skill}
                            <button onClick={() => removeSkill("technical", index)}>
                                <X className="size-3" />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* SOFT SKILLS */}
            <div>
                <h4 className="font-medium text-gray-800">Soft Skills</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                    {(data.soft || []).map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 rounded flex items-center gap-1">
                            {skill}
                            <button onClick={() => removeSkill("soft", index)}>
                                <X className="size-3" />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* EMPTY STATE */}
            {(!data.technical?.length && !data.soft?.length) && (
                <div className='text-center text-gray-500 py-6'>
                    <Sparkles className='w-8 h-8 mx-auto mb-2' />
                    <p>No skills added yet</p>
                </div>
            )}
        </div>
    );
};

export default SkillsForm;