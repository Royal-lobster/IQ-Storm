import { Card } from '@/components/ui/card'
import React from 'react'

function LoadingIdeaCard() {
  return (
    <Card className='max-w-xs flex flex-col gap-2 mt-2 w-[400px] p-6'>
      <div className='animate-pulse bg-gray-200 h-10 w-full rounded' />
      <div className='animate-pulse bg-gray-200 h-4 w-full rounded' />
      <div className='animate-pulse bg-gray-200 h-4 w-full rounded' />
      <div className='animate-pulse bg-gray-200 h-4 w-1/2 rounded' />
    </Card>
  )
}

export default LoadingIdeaCard