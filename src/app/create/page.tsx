"use client";
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Page = () => {
    const [isbn, setIsbn] = useState('') 
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('') 
    const [price, setPrice] = useState(0) 
    const [categoryId, setCategoryId] = useState(0) 
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setIsLoading(true)

        await fetch("/api/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                isbn, 
                author,
                title, 
                price, 
                categoryId 
            })
        }).then((res) => {
            console.log(res);
        }).catch((e) => {
            console.log(e);
        })

        setIsLoading(false)
        router.push('/')
    }

    return (
        <form className='w-[500px] mx-auto pt-20 flex flex-col gap-2' onSubmit={handleSubmit}>
            <input type="text" placeholder='Masukkan ISBN' value={isbn} onChange={(e) => setIsbn(e.target.value)} className='w-full border p-2 rounded-md' /> 
            <input type="text" placeholder='Masukkan Author' value={author} onChange={(e) => setAuthor(e.target.value)} className='w-full border p-2 rounded-md' /> 
            <input type="text" placeholder='Masukkan Title' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full border p-2 rounded-md' />
            <input type="number" placeholder='Masukkan Price' value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} className='w-full border p-2 rounded-md' /> 
            <input type="number" placeholder='Masukkan Category ID' value={categoryId} onChange={(e) => setCategoryId(parseInt(e.target.value))} className='w-full border p-2 rounded-md' />
            <button disabled={isLoading}>{isLoading ? "Loading..." : "Submit"}</button>
        </form>
    )
}

export default Page
