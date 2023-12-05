// export interface  Student{
//   id: number;
//   name:string;
// }

// export const student:Student[]=[

//   {
//     id:1,
//     name:"Atik"
//   },
//   {
//     id:2,
//     name:"Antik"
//   }

// ]
// StudentTable.tsx
import React from "react";

export interface Student {
  id: number;
  name: string;
}

export const initialStudents: Student[] = [
  {
    id: 1,
    name: "Arif",
  },
  {
    id: 2,
    name: "Shanto",
  },
  {
    id: 3,
    name: "Gekko",
  },
  {
    id: 4,
    name: "Viper",
  },
  {
    id: 5,
    name: "Phoenix",
  },
];

interface StudentTableProps {
  students: Student[];
  onInsert: (student: Student) => void;
  onDelete: (id: number) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onInsert, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>
              <button onClick={() => onInsert(student)}>Insert</button>
              <button onClick={() => onDelete(student.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
