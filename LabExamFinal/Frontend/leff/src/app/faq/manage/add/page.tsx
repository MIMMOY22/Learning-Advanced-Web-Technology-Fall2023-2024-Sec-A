import { FaqCreate } from "@/components/Faq/FaqCreate";
import { Back } from "@/components/Route/Back";

export default function Add(){
    return(
        <div>
            <h1>Add FAQ</h1>
            <FaqCreate/>
            <Back/>
        </div>
    );
}