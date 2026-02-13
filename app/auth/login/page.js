import { TextField } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { auth, signIn } from "@/auth";



export default async function Login () {
    const session = await auth();
    console.log(session);
    
    return (
        <main className="min-h-screen flex justify-center py-6 px-2">
            <div className="w-full shadow-md rounded md:w-92 md:h-100 md:px-3 md:py-4 md:flex md:flex-col md:gap-3">
                <h1 className="text-2xl font-bold text-center">Sign into Exam portal</h1>
                <p className="text-sm text-gray-500 mt-2 text-center">Create an account or sign In</p>
                <form className="flex flex-col gap-3">
                    <div>
                        <TextField

                        fullWidth
                        size="small"
                        label="Email"
                        type="email"
                        placeholder="ifeanyi@email.com"
                        id="email"
                        />
                    </div>
                    <button className="text-white w-full h-10 bg-blue-500 p-3 mt-2 rounded-md flex justify-center cursor-pointer items-center">Continue</button>
                </form>
                <p className="mt-2 text-gray-500 text-center">Or sign up with</p>
                <div className="flex justify-center gap-2">
                    <form
                    action={async()=>{
                        "use server"
                        await signIn();
                    }}
                    >
                        <button type="submit" className="w-12 h-12 rounded shadow-lg flex justify-center items-center cursor-pointer"><FcGoogle className="text-4xl"/></button>
                    </form>
                    <form>
                        <button type="submit" className="w-12 h-12 rounded shadow-lg flex justify-center items-center cursor-pointer"><FaGithub className="text-4xl"/></button>
                    </form>
                </div>
            </div>
        </main>
    )
}