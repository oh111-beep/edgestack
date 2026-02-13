import { auth } from "@/auth";
import Image from "next/image";

export default async function Profile () {
    const session = await auth();
    console.log(session);
    return(
        <main className="min-h-screen flex justify-center py-6 px-2">
            <div className="w-full md:w-90 md:max-h-110 rounded shadow-md py-5 px-4">
                <h1 className="text-center font-semibold text-xl">Profile Details</h1>
                <div className="mt-2 flex justify-center">
                    <Image
                    src="/mb.jpg"
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
                            <p className="text-gray-600 text-xs">+07089893207</p>
                        </div>
                        <div className="flex justify-between items-cent~er">
                            <p className="text-lg font-semibold">Address</p>
                            <p className="text-gray-600 text-xs">aso rock villa</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold">Gender</p>
                            <p className="text-gray-600 text-xs">Male</p>
                        </div>


                </div>

            </div>
        </main>
    )
}