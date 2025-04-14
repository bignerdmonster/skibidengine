"use client"
import React, { useState} from "react";
import { karmaChange } from "../api/upvoteThangy/core";
import { karmaLoad } from "~/server/queries";
type ErrorResponse = {
    error: string
}
export default function UpvoteThang({postID = 31, postKarma = 0, enabled=false}) {
    const [btnYesOn, setbtnYesOn] = useState(0);
    const [karmaCount, setKarmaCount] = useState(postKarma);
    // new from client fetch
    
    // if ({enabled}.enabled == true) {void loadKarmaAsync(); console.log("TESTINFG!")} 
    // there's gotta be a better way to do this but I don't know it yet
    function isNumber(val: number | object): val is number {return typeof val === 'number'};
    function isError(val: number | object): val is ErrorResponse {return (val as ErrorResponse).error !== undefined};

    async function handleInputChange (value: number) {
        setbtnYesOn(value)
        const returnedKarma = await karmaChange(postID, (value===1))
        if (isNumber(returnedKarma)) {setKarmaCount(returnedKarma); console.log("number ran btw")};
        if (isError(returnedKarma)) alert(returnedKarma.error);
    };
    
    

    let enabledFlag = "invisible"
    
    if ({enabled}.enabled == true) enabledFlag = "visible";
    
    return (
        <div className= "flex grow-13 flex-col mx-5 px-5 py-10  bg-base-200 rounded-xl">
            <input type="radio" name={`radio-${postID}`}  
                className={"radio py-1 bg-red-100 border-red-300 checked:bg-red-200 checked:text-red-600 checked:border-red-600 ".concat(enabledFlag)} 
                onChange={e=>handleInputChange(1)}
                checked={btnYesOn === 1}>
            </input>
            <h1 className="text-white py-6 text-center">{karmaCount}</h1>
            <input type="radio" name={`radio-${postID}`} 
                className={"radio py-1 bg-blue-100 border-blue-300 checked:bg-blue-200 checked:text-blue-600 checked:border-blue-600 ".concat(enabledFlag)} 
                onChange={e=>handleInputChange(-1)}
                checked={btnYesOn=== -1}>
            </input>
        </div>
    )    
}