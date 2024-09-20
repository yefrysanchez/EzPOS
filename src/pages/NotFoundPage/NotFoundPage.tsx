import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="h-full w-full text-black bg-purple flex flex-col justify-center items-center">
        <h2 className="font-bold text-[150px] lg:text-[190px] leading-none">404</h2>
        <p className="text-[20px] text-center md:text-[50px] lg:text-[40px]  mb-4">Sorry, We couldn't find what you looking for!</p>
        <Link className="text-white bg-black px-8 p-4 rounded-xl " to={"/"}>Go Back</Link>
    </div>
  )
}

export default NotFoundPage