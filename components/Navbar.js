import Link from "next/link"

function Navbar() {
  return (
    <div className="w-full relative shadow-md ">
      <div className="text-center bg-white mx-auto px-5 py-4 ">
        <div className="font-bold text-2xl italic text-rose-700 cursor-pointer">
          <Link href="/">DailyAnime</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar