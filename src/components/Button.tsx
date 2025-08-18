"use client"
import { useExtensionStore } from '@/store/extensionStore'
import React from 'react'

const buttonProps = [
    {
        label: 'All',
        value: 'all'
    },
    {
        label: "Active",
        value: "true"
    },
    {
        label: "Deactive",
        value: "false"
    }
]


const Button = () => {

    const { sortedExtension } = useExtensionStore()

    const handleClick = (tab: string) => {
        sortedExtension(tab)
    }


    return (
        <div className='space-x-2'>

            {
                buttonProps.map((btn, index: number) => <button key={index} onClick={() => handleClick(btn.value)} className='border border-neutral-500 rounded-full px-4 h-[30px] bg-white hover:bg-red-500 focus:bg-red-500 focus:text-white hover:text-white transition-colors duration-200 cursor-pointer'>{btn.label}</button>)
            }

        </div>
    )
}

export default Button