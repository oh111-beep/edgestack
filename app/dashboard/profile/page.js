import { auth, signOut,  } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";

export default async function Profile () {
    const session = await auth();
    console.log(session);
    if(!session){
        redirect("/auth/login");
    }
    return(
        <main className="min-h-screen flex justify-center py-10 px-2">
            <div className="w-full md:w-90 md:max-h-140 rounded shadow-md py-5 px-4">
                <h1 className="text-center font-semibold text-xl">Profile Details</h1>
                <div className="mt-2 flex justify-center">
                    <Image
                    src={session?.user?.image||<CgProfile />}
                    alt="profile-image"
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full"
                    />
                    </div>
                     <div className="px-5 py-5 flex flex-col gap-4 mt-8 w-80 h-60 shadow rounded-md">
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold">Full Name</p>
                            <p className="text-gray-600 text-xs">{session?.user?.name}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold">Email</p>
                            <p className="text-gray-600 text-xs">{session?.user?.email}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold">Phone Number</p>
                            <p className="text-gray-600 text-xs">{session?.user?.number}</p>
                        </div>
                        <div className="flex justify-between items-cent~er">
                            <p className="text-lg font-semibold">Address</p>
                            <p className="text-gray-600 text-xs">{session.user?.addresss}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold">Gender</p>
                            <p className="text-gray-600 text-xs">Male</p>
                        </div>


                </div>
                 
                    <form
                        action ={async()=>{
                            "use server"
                            await signOut();
                        }}
                        className="mt-5">
                        <button className="bg-red-500 text-white w-30 h-10 shadow cursor-pointer rounded flex justify-center items-center">
                            <LuLogOut />
                            <span className="ml-1"></span>
                        </button>
                    </form>
            </div>
           
        </main>
    )
}