"use client"

export default function UpvoteThang({postID = 31, className=""}) {
    return (
        <div className= "flex grow-13 flex-col mx-5 px-5 py-10  bg-base-200 rounded-xl">
            <input type="radio" name={`radio-${postID}`} className="radio py-1 bg-red-100 border-red-300 checked:bg-red-200 checked:text-red-600 checked:border-red-600"></input>
            <h1 className="text-white py-6 text-center">0</h1>
            <input type="radio" name={`radio-${postID}`} className="radio py-1 bg-blue-100 border-blue-300 checked:bg-blue-200 checked:text-blue-600 checked:border-blue-600"></input>
        </div>
    )    
}