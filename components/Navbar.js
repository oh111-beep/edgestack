 "use client"
import Link from "next/link";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";

export function Navbar () {
    const [dropDown, setDropDown] = useState(false);
     const toggleMenu = () =>{
        setDropDown(!dropDown);
     }
    return(
        <main className="bg-gray-100 shadow shadow-gray-300 w-full ">
            <div className="h-15 flex justify-between items-center px-5">
                <h1 className="text-3xl font-bold text-blue-500">EdgeStack</h1>
                <ul className="hidden md:flex gap-8 text-sm font-semibold">
                    <Link href="/"><li>Home</li></Link>
                    <li>Enroll</li>
                    <li>Student-list</li>
                    <li>Profile</li>
                </ul>
                  <Link href="/auth/login">
                  <div className="hidden md:w-20 md:h-10 md:rounded md:shadow md:text-white md:flex md:justify-center items-center bg-blue-500">
                    <p>Sign Up</p>
                  </div>
                 </Link>
                 <div className="block md:hidden">
                    <IoIosMenu onClick={toggleMenu} className="text-3xl"/>
                 </div>
            </div>
            {dropDown && (
            <div className=" flex flex-col gap-2 justify-center items-center">
                <ul className=" flex flex-col gap-5 text-sm font-semibold md:hidden">
                    <Link href="/"><li>Home</li></Link>
                    <li>Enroll</li>
                    <li>Student-list</li>
                    <li>Profile</li>
                </ul>
                <Link href="/auth/login">
                  <div className="w-20 h-10 rounded shadow text-white flex justify-center items-center bg-blue-500 md:hidden">
                    <p>Sign Up</p>
                  </div>
                 </Link>
            </div>
          )}
        </main>
    )
}