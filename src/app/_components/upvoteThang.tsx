"use client"
import React, {useState, useEffect} from "react";
import { karmaChange } from "../api/upvoteThangy/core";
import { useKarmaData } from '../_hooks/useKarmaData';
type ErrorResponse = {
    error: string
}
export default function UpvoteThang({postID = 31, postKarma = 0, enabled=false}) {
    const { data, error, mutate } = useKarmaData();
    const [btnYesOn, setbtnYesOn] = useState(0);
    const [karmaCount, setKarmaCount] = useState(postKarma);
    let loading = false;
    useEffect(()=>{
        const state = data?.[postID];
        if (state === undefined) {setbtnYesOn(0)} else
        if (state === true) {setbtnYesOn(1)} else
        if (state === false) {setbtnYesOn(-1)};
    }, [data, postID])
    
    // new from client fetch
    
    // if ({enabled}.enabled == true) {void loadKarmaAsync(); console.log("TESTINFG!")} 
    // there's gotta be a better way to do this but I don't know it yet
    function isNumber(val: number | object): val is number {return typeof val === 'number'};
    function isError(val: number | object): val is ErrorResponse {return (val as ErrorResponse).error !== undefined};

    async function handleInputChange (value: number) {
        loading = true;
        setbtnYesOn(value)
        const returnedKarma = await karmaChange(postID, (value===1));
        void mutate();
        if (isNumber(returnedKarma)) {setKarmaCount(returnedKarma); console.log("number ran btw")};
        if (isError(returnedKarma)) alert(returnedKarma.error);
        loading = false;
    };
    
    
    let enabledFlag = "invisible"
    
    if ({enabled}.enabled == true) enabledFlag = "visible";
    
    if (!data && !error || loading) {
        return (
            <div className= "flex grow-13 flex-col mx-5 px-5 py-10  bg-base-200 rounded-xl">
                <span className="loading loading-spinner loading-xs"></span>
                <h1 className="text-white py-6 text-center">{karmaCount}</h1>
                <span className="loading loading-spinner loading-xs"></span>
            </div>
        )
    }

    return (
        <div className= "flex grow-13 flex-col mx-5 px-5 py-10  bg-base-200 rounded-xl">
            <input type="radio" name={`radio-${postID}`}  
                className={"radio py-1 bg-red-100 border-red-300 checked:bg-red-200 checked:text-red-600 checked:border-red-600 ".concat(enabledFlag)} 
                onChange={()=>handleInputChange(1)}
                checked={btnYesOn === 1}>
            </input>
            <h1 className="text-white py-6 text-center">{karmaCount}</h1>
            <input type="radio" name={`radio-${postID}`} 
                className={"radio py-1 bg-blue-100 border-blue-300 checked:bg-blue-200 checked:text-blue-600 checked:border-blue-600 ".concat(enabledFlag)} 
                onChange={()=>handleInputChange(-1)}
                checked={btnYesOn=== -1}>
            </input>
        </div>
    )    
}