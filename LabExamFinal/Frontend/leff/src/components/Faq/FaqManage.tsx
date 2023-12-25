'use client'
import { useEffect, useState } from "react";
import { GET } from "../Api/GETMethod";
import { DELETE } from "../Api/DELETEMethod";
import { useRouter } from "next/navigation";
import { Next } from "../Route/Next";


interface FaqEntity{
    id: number; 
    question: string;
    answer: string;
}

const Faq: FaqEntity[]  = []

export const FaqManage = ()  => {

  const [Datas,SetData] = useState(Faq);  

  useEffect(()=>{

    async function fetchData() {
      const Faqs = await GET('http://localhost:3000/faq/showall');
      SetData(Faqs);
    }

    fetchData();

  },[Datas])

    return(
        <div>
            <table>
         <thead>
           <tr>
             <th>Question</th>
             <th>Answer</th>
             <th></th>
             <th></th>
           </tr>
         </thead>
  
         <tbody>
         {Datas.map((Faq: FaqEntity) => (
            <tr key={Faq.id}> 
            <td>{Faq.question}</td>
            <td>{Faq.answer}</td>
            <td><DeleteButton id ={Faq.id}/></td>
            <td><UpdateButton id ={Faq.id}/></td>
            </tr>
           ))}
         </tbody>
       </table>
        </div>
    );
}

const UpdateButton = ({id}:{id: number}) => {
  return(
    <div>
      <Next path={`manage/${id}`} btnName="Edit"/>
    </div>
  );
}


const DeleteButton = ({id}:{id: number}) => {

  const deleteFaqs = async (id: number) => {
    const Response = await DELETE('http://localhost:3000/faq/delete/${id}');
    alert('Deleted');
  }

  return(
    <div>
      <button onClick={async ()=>await deleteFaqs(id)}>Delete</button>
    </div>
  );
}


export default FaqManage;