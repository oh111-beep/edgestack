    export function footer (){
        const year = new Date().getFulllYear()
        return(
           <footer className="bg-white px-5 py-5 flex justify-between inset-shadow-md ">
            <div className="">
                <p>&copy; {year} Exam</p>
                <p></p>
            </div>
            <div>
                <p>Prrivacy policy</p>
                <p>Terms of servic</p>
                <p>Support</p>
            </div>

           </footer>
        )
    }