"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = ({
    params,
}: {
    params: {isbn: string };
}) => {
    const isbn = params.isbn

  
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [categoryId, setCategoryId] = useState('')


    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        await fetch("/api/book", {
            method: "PUT",
            headers: {
                "Content-Type": " application/json"
            },
            body: JSON.stringify({
                isbn, author, title, price, categoryId
            })
        }).then((res) => {
            console.log(res);
        }).catch((e) => {
            console.log(e);
        })

        router.push('/')
    }

    useEffect(() => {
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getData = async () => {
        const res = await fetch("/api/book/" + isbn)
        const json = await res.json()

        if(!json){
            router.push('/404')
            return;
        }
        

       
        setAuthor(json.book.author)
        setTitle(json.book.title)
        setPrice(json.book.price)
        setCategoryId(json.book.categoryId)

    }

    return (
        <form className='w-[500px] mx-auto pt-20 flex flex-col gap-2' onSubmit={handleSubmit}>
            <input type="text" disabled placeholder='Masukkan ISBN' value={isbn} className='w-full text-white border p-2 rounded-md' />
            <input type="text" placeholder='Masukkan Nama Author' value={author} onChange={(e) => setAuthor(e.target.value)} className='w-full  text-black border p-2 rounded-md' />
            <input type="text" placeholder='Masukkan Judul' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full  text-black border p-2 rounded-md' />
            <input type="text" placeholder='Masukkan Harga' value={price} onChange={(e) => setPrice(e.target.value)} className='w-full  text-black border p-2 rounded-md' />
            <input type="text" placeholder='Masukkan Category' value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className='w-full  text-black border p-2 rounded-md' />
            <button>Update</button>
        </form>
    )
}

export default Page