'use client'
import { useRouter } from "next/navigation";
import React,{useState} from "react";
import { POST } from "../Api/POSTMethod";


interface FaqEntity{
    question: string;
    answer: string;
}

let Faq : FaqEntity;

export const FaqCreate = () => {

    const [Datas,SetData] = useState(Faq);
    const router = useRouter();

    const handleInput = (e:any) => {
        const name = e.target.name;
        const value = e.target.value;

        SetData({...Datas,[name]: value});
    }


    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const Response = await POST('http://localhost:3000/faq/create',Datas);
        //alert(Response.massage);
        alert('successfull');
        router.push('/faq/manage');

    }


    return(
        <form method="post" onSubmit={handleSubmit}>
            Question: <input type="text" onChange={handleInput} name="question"/> <br />
            Answer: <input type="text" onChange={handleInput} name="answer"/> <br />
            <button type="submit">Create FAQ</button>
        </form>
    );
}