import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { BsFillMicFill } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'

export default function Search () {
  const router = useRouter()

  const [input, setInput] = useState('')
  const [randomSearchLoading, setRandomSearchLoading] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    if (!input.trim()) return
    router.push(`/search/web?searchTerm=${input}`)
  }

  const randomSearch = async () => {
    setRandomSearchLoading(true)

    const res = await fetch('https://random-word-api.herokuapp.com/word')
      .then(res => res.json())
      .then(data => data[0])

    if (!res) return

    router.push(`/search/web?searchTerm=${res}`)
    setRandomSearchLoading(false)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='flex w-full mt-5 mx-auto max-w-[90%] border border-gray-200 px-5 py-3 rounded-full hover:shadow-md focus-within:shadow-md transition-shadow sm:max-w-xl lg:max-w-2xl'
      >
        <AiOutlineSearch className='text-xl text-gray-500 mr-3' />
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='flex-grow focus:outline-none'
        />
        <BsFillMicFill className='text-lg' />
      </form>

      <div className='flex flex-col space-y-2 sm:space-y-0 sm:space-x-4 justify-center sm:flex-row mt-8 '>
        <button onClick={handleSubmit} className='btn'>
          Google Search
        </button>
        <button disabled={randomSearchLoading} onClick={randomSearch} className='btn flex items-center justify-center disabled:opacity-80'>
          {randomSearchLoading
            ? (
              <Image
                src='/spinner.svg'
                alt='loading...'
                width={100}
                height={100}
                className='h-6 text-center justify-center'
              />
              )
            : (
                "I'm Feeling Lucky"
              )}
        </button>
      </div>
    </>
  )
}
