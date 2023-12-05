import { initialStudents } from "./StudentTable";

export default function Items(){
return(
  <div>
{initialStudents.map(item=>(
  <div key={item.id}>
    {item.name}
  </div>
                        )
              )
}      
  </div>
)
}
