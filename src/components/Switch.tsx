"use client"
import React from 'react';

interface SwitchProps {
    isOn: boolean;
    onToggle: () => void;
    label?: string;
}

const Switch: React.FC<SwitchProps> = ({ isOn, onToggle, label }) => {
    return (
        <div className="flex items-center gap-3">
            {label && <span className="text-sm font-medium">{label}</span>}
            <button
                onClick={onToggle}
                className={`w-12 cursor-pointer h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${isOn ? 'bg-red-600' : 'bg-gray-300'
                    }`}
            >
                <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isOn ? 'translate-x-6' : 'translate-x-0'
                        }`}
                />
            </button>
        </div>
    );
};

export default Switch;