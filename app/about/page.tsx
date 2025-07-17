import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <div>page<Image src="/rickroll.jpg" alt="jay" width={300} height={200} /></div>
  )
}
