import { Next } from "@/components/Route/Next";
import FaqManage from "@/components/Faq/FaqManage";
import { Metadata } from "next";


export const metadata:Metadata = {
  title: 'Faq Manage'
}


export default function Manage() {
    return(
        <>
          <FaqManage/>
          <Next path="manage/add" btnName="Add"/><br />
        </>
    );
}