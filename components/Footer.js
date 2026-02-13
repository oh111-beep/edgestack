   export function Footer () {
    const year = new Date().getFullYear()

     return (
        <footer className="bg-white px-5 py-5 block inset-shadow-sm  md:flex md:justify-between ">
            <div className="flex gap-2 text-gray-600">
                <p>&copy; {year} EdgeStack System </p>
                <p>All rights reserved</p>
            </div>
            <div className="flex gap-2 text-gray-600">
                <p>Privacy Policy</p>
                <p>Terms of service</p>
                <p>Support</p>
            </div>
     
        </footer>
     )
}