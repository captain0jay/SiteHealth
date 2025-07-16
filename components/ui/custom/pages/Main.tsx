import React from 'react'
import Heading from '../section/Hero/Heading'
import AddRoutes from '../section/Hero/AddRoutes'
import RowList from '../section/List/RowList'

export default function Main() {
  return (
    <>
    <div className='p-8'>
        <Heading title='Website Health checker' subtitle='Captain jay'/>
        <AddRoutes />
        <RowList />
    </div>
    </>
  )
}
