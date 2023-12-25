'use client'

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PUT } from "../Api/PUTMethod";

interface FaqEntity{
    question: string;
    answer: string;
}

let Faq : FaqEntity;

export const FaqUpdate = ({id}: {id: number})=>{

    const [Datas,SetData] = useState(Faq);
    const router = useRouter();

    const handleInput = (e:any) => {

        const name = e.target.name;
        const value = e.target.value; 

        SetData({...Datas, [name]: value});
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const Response = await PUT('http://localhost:3000/faq/update/${id}',Datas);
        alert('updated');
        router.push('/faq/manage');
    }

    return(
        <form method="post" onSubmit={handleSubmit}>
            Question: <input type="text" onChange={handleInput} name="question"/> <br />
            Answer: <input type="text" onChange={handleInput} name="answer"/> <br />
            <button type="submit">Update FAQ</button>
        </form>
    );
}