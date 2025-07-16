"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
    const router = useRouter()

    const handleClick = () => {
        router.push('/careers/open-positions')
    }
  return (
    <div><div className='w-[100px] h-[100px] bg-black' onClick={handleClick} /></div>
  )
}
