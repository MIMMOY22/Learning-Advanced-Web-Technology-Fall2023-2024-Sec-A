import { Back } from "@/components/Route/Back";
import { FaqUpdate } from "@/components/Faq/FaqUpdate";


export default function Edit({params}:{params: {id: number}}){
    return(
        <div>
            <h1>Update FAQ</h1>
            <FaqUpdate id={params.id}/>
            <Back/>
        </div>
    );
}