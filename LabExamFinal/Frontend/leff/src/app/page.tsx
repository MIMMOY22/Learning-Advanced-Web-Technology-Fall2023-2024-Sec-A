import { Next } from "@/components/Route/Next";


export default function Home(){
  return(
    <main>
      <h1>This is Home Page</h1>
      <Next path="/faq" btnName="FAQ"/>
    </main>
  )
}