"use client";
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import saveText from "../api/markdownThingy/core";
import {redirect} from "next/navigation";

export default function MarkdownEditor() {
  const [value, setValue] = useState("type your stuff");
  const [val2, setVal2] = useState("Title...");
  const [error, setError] = React.useState<string | null>(null); // To show any error messages, code stolen from classwork
  const handleButtonClick = async (): Promise<void> => {
    setError(null);
    const returnedThing = await saveText(val2, value);
    console.log(returnedThing); 
    const errorResponse = returnedThing as {message: string};
    if (errorResponse.message) setError(errorResponse.message ?? "An unknown error occured.");
    else redirect(returnedThing as string);
  };
  return (
    <div className="mx-auto content-center p-2 pb-5"> 
      <div className="flex justify-center content-center mx-auto pb-2">
        <input className="input input-bordered" value={val2} onChange={(val) => setVal2(val.target.value)} />
      </div>
      {error && <div className="alert alert-error mb-4"><span>{error}</span></div>}
      <div className="pb-3">
        <MDEditor value={value} onChange={(val) => setValue(val ?? "")} />
      </div>
      <button className="btn btn-block text-xl" onClick={handleButtonClick}>Post!</button>
    </div>
  );
};

