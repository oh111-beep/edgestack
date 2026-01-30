import {TextField} from "@mui/material";

export default function login (){
    return (
        <main className="min-h-scren flex justify-center py-6 px-2">
            <div className="w-full shadow-md rounded md:W-94 md:flex md:flex-col md:gap-3 Max-h-120 md:px-3 md:py-4">
                <h1 className="text-2xl font-blod text-center">Sign Into Exam Protal</h1>
                <p className="text-sm text-gray-500 mt-2 text-center">Create an account or sign In</p>
                <form className="flex flex-col gap-3">
                    <div>
                        <TextField
                        fullWidth
                        size="small"
                        label="Email"
                        type="email"
                        placeholder="emeake@gmail.com"
                        id="email"
                        />
                    </div>
                    <button className="text-white w-full h-10 font-semi  blod bg-blue-500 "></button>
                </form>

            </div>

        </main>
    )
}