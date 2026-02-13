import Image from "next/image";

export default function HomePage (){
  return(
    <main>
      <div className="bg-[url(/tet.jpg)] h-screen bg-contain bg-no-repeat md:bg-[url(/tet.jpg)] md:h-[60vh] md:bg-contain lg:bg-[url(/tet.jpg)] lg:h-screen lg:bg-no-repeat lg:bg-cover">
      <div className="py-50 flex flex-col items-center justify-center">
      <h1 className="text-bold text-7xl text-white text-center">Achieve Your Dreams With Us</h1>
      <h2 className="text-white text-bold text-2xl">Now OPen For Registration</h2>
      <h3 className="text-white text-bold text-xl">Easy to get started and intuitive to use. EdgeStack equips you with all the power and functionality you need to create secure exams</h3>
      </div>
      </div>
      <div className="bg-gray-300 min-h-screen py-10 ">
  <h1 className="text-3xl">Course Details</h1>
  <h2 className="text-7xl">Explore Our Courses </h2>
  <button className="h-8 cursor-pointer rounded bg-stone-500 font-semibold text-white">10% Off Frist Course</button>
</div>


    </main>
  )
}
