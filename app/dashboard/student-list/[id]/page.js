  "use client"
import { db } from "@/config/firebase.config";
import { CircularProgress } from "@mui/material";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

export default function Student() {
    const {data: session} = useSession();
    const {id} = useParams();
    const [student,setStudent] = useState(null);
    const [loading,setLoading] = useState(true)
    const router = useRouter();
    
    //fetch Student from the database
      useEffect(()=>{
        const fetchStudent = async()=>{
            try {
            const studentRef = doc(db,"enrollments",id);
            const snapShot = await getDoc(studentRef);
            if(!snapShot.exists()) {
                router.push("/dashboard/student-list");
                return;
            }
            setStudent({
                id,
                ...snapShot.data(),
            })
           }
           catch (error) {
               console.error("Error fetching Data:", error)
           } 
           finally{
            setLoading(false)
           }
        }
        fetchStudent()
      },[id,router])
          
      const handleDelete = async ()=>{
          const confirmDelete = window.confirm("Are you sure , you want to delete this student?");
          if(!confirmDelete) return;
          try{
            const deleteRef = doc(db,"enrollments",id)
            await deleteDoc(deleteRef);
            alert("Student deleted Succesfully")
            router.push("/dashboard/student-list")
          }
          catch(error) {
            console.error("Unable to delete:", error);
            alert("Failed to delete student")
          }
      }

      if(loading) {
        return (
            <main className="min-h-screen flex justify-center items-center h-[80vh]">
                <CircularProgress className="text-5xl"/>
            </main>
        )
      }

    return(
        <main className="min-h-screen flex justify-center px-2 md:py-20 md:px-12 lg:py-20 lg:px-20">
           <div className="w-full md:w-100 h-120 shadow-md rounded-md py-5 px-5 ">
              <h1 className="text-lg font-semibold text-center ">Student Exam Details</h1>
              <div className="mt-2 flex justify-center">
                 <Image 
                 src={session?.user?.image || <CgProfile />}
                 alt="image"
                 width={70}
                 height={70}
                 className="w-18 h-18 rounded-full"
                 />
              </div>
              <div className="flex flex-col gap-4 mt-5">
                 <div className="flex justify-between">
                    <p className="text-gray-800 text-lg">Student Name</p>
                    <p className="text-gray-600 text-sm mt-2">{student?.fullName}</p>
                 </div>
                  <div className="flex justify-between">
                    <p className="text-gray-800 text-lg">Student PhoneNumber</p>
                    <p className="text-gray-600 text-sm mt-2">{student?.phoneNumber}</p>
                 </div>
                  <div className="flex justify-between">
                    <p className="text-gray-800 text-lg">Exam Type</p>
                    <p className="text-gray-600 text-sm mt-2">{student?.examType}</p>
                 </div>
                 <div className="flex justify-between">
                    <p className="text-gray-800 text-lg">Exam Date</p>
                    <p className="text-gray-600 text-sm mt-2">{student?.examDate}</p>
                 </div>
                 <div className="flex justify-between">
                    <p className="text-gray-800 text-lg">Subjects</p>
                    <p className="text-gray-600 text-sm mt-2">{student?.selectedSubject.join(" ,")}</p>
                 </div>
              </div>
              <div className="mt-10 flex justify-end">
                <button onClick={handleDelete} className="bg-red-500 w-25 h-10 rounded-md shadow-md flex gap-2 justify-center items-center text-white cursor-pointer">
                    <RiDeleteBin6Line />
                    <span>Delete</span>
                </button>
              </div>
              
           </div>
        </main>
    )
}