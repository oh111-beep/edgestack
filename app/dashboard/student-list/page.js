 "use client"
import { db } from "@/config/firebase.config";
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuView } from "react-icons/lu";

const examTypeArray = ["ALL","JAMB","NECO","WAEC"];

export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [examFilter,setExamFilter] = useState("ALL");
    const {data: session} = useSession();
    const router = useRouter();

    if (!session?.user) {
        redirect("/auth/login")
    };
     useEffect(()=>{
         const fetchStudents = async () =>{
            try{
                const studentRef = query(collection(db,"enrollments"),where("user","==",session?.user?.id))
                const snapShot = await getDocs(studentRef);
                const  compileStudents =[];
                snapShot.docs.forEach((doc)=>{
                    compileStudents.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                 setStudents(compileStudents);
                 console.log(compileStudents);
            }
            catch(error) {
                console.error("Error fetching students:", error);
            }
            finally {
                setLoading(false);
            }
         }
         if (session) {
            fetchStudents();
         }
     },[session])
        if(loading) {
            return (
                <main className="h-[80vh] flex items-center justify-center">
                    <CircularProgress className="text-5xl" />
                </main>
            )
        }
    return (
        <main className="min-h-screen max-w-4xl mx-auto my-10 p-4">
            <h1 className="text-3xl font-bold text-blue-500 text-center mb-5">Student List</h1>
            <div className="flex justify-center gap-4 mb-6">
                {examTypeArray.map((type)=>
                <button
                onClick={()=>setExamFilter(type)} 
                key={type} 
                className={`px-5 py-2 rounded-full font-medium transitions
                ${examFilter === type
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-500"
                    : "bg-gray-200 text-gray hover:bg-gray-300"
                }
                `}>
                {type}
                </button> 
                )}
            </div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650,borderSpacing: "0 30px" }}>
                    <TableHead  sx={{backgroundColor: "#A9A9A9"}}>
                        <TableRow>
                            <TableCell sx={{fontWeight: "medium"}}>FULL NAME</TableCell>
                            <TableCell sx={{fontWeight: "medium"}}>PHONE NUMBER</TableCell>
                            <TableCell sx={{fontWeight: "medium"}}>EXAM TYPE</TableCell>
                            <TableCell sx={{fontWeight: "medium"}}>EXAM DATE</TableCell>
                            <TableCell sx={{fontWeight: "medium"}}>SUBJECTS</TableCell>
                            <TableCell sx={{fontWeight: "medium"}}>VIEW</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.filter((student)=>
                          examFilter ==="ALL"
                          ? true
                          : student.data.examType?.trim().toLowerCase() === examFilter.toLowerCase()                     
                         )
                        
                        
                        .map((student)=> 
                        <TableRow sx={{}} onClick={()=>router.push(`/dashboard/student-list/${student.id}`)} key={student.id}>
                            <TableCell>{student.data.fullName} </TableCell>
                            <TableCell>{student.data.phoneNumber} </TableCell>
                            <TableCell>{student.data.examType} </TableCell>
                            <TableCell>{student.data.examDate} </TableCell>
                            <TableCell> {student.data.selectedSubject.join(",")} </TableCell>
                            <TableCell><LuView className="text-2xl cursor-pointer" /></TableCell>
                        </TableRow>
                        )}
                    </TableBody>

                </Table>

            </TableContainer>
            

        </main>
    )
}