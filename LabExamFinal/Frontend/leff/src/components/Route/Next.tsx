'use client'
import { useRouter } from "next/navigation";


export const Next = ({path,btnName}: {path: string, btnName:string}) =>{
    const router = useRouter();
    return(
        <button id="nextBtn" onClick={() => router.push(path)}>{btnName}</button>
    );
}