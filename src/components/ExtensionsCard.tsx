"use client"
import { Extension } from '@/actions/actions'
import Image from 'next/image'
import React, { useState } from 'react'
import Switch from './Switch'
import { useExtensionStore } from '@/store/extensionStore'

const ExtensionsCard: React.FC<Extension> = ({ id, name, description, logo, isActive }) => {

    const { updateExtension, deleteExtension } = useExtensionStore()

    const [active, setActive] = useState<boolean>(isActive)

    const handleToggle = async () => {
        await updateExtension(id, active ? false : true)
        setActive((prev: boolean) => !prev)
    }

    const handleRemove = async () => {
        await deleteExtension(id)
    }


    return (
        <div className='max-w-[400px] min-h-[200px] flex flex-col items-start justify-between w-full rounded-[12px] border border-neutral-300 p-3 bg-white hover:shadow-md transition-shadow duration-200'>
            <div className='flex items-start gap-4 w-full'>
                <Image src={logo} alt={`${name}-logo`} width={50} height={50} quality={90} />
                <div className='flex flex-col gap-1'>
                    <h4 className='font-bold text-neutral-900'>{name}</h4>
                    <p className='font-normal text-neutral-500'>{description}</p>
                </div>
            </div>
            <div className='flex justify-between w-full'>
                <button className='border border-neutral-300 rounded-full px-3 py-1 cursor-pointer text-sm' onClick={handleRemove}>Remove</button>
                <Switch label='' onToggle={handleToggle} isOn={active} />
            </div>
        </div>
    )
}

export default ExtensionsCard