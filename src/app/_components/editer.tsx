"use client";
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import saveText from "../api/markdownThingy/core";
import {redirect} from "next/navigation";
export default function MarkdownEditor() {
  const [value, setValue] = useState("type your stuff");
  const [val2, setVal2] = useState("Title...");
  return (
    <div className="mx-auto content-center p-2 pb-5"> 
      <div className="flex justify-center content-center mx-auto pb-2">
          <input className="input input-bordered" value={val2} onChange={(val) => setVal2(val.target.value)} />
      </div>
     <div className="pb-3">
        <MDEditor value={value} onChange={(val) => setValue(val ?? "")} />
    </div>
      <button className="btn btn-block text-xl" onClick={() => {void saveText(val2,value);redirect('/')}
        }>Post!</button>
    </div>
  );
};

