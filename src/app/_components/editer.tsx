"use client";
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import saveText from "../api/markdownThingy/core";
import {redirect} from "next/navigation";
export default function MarkdownEditor() {
  const [value, setValue] = useState("type your stuff");
  const [val2, setVal2] = useState("Title...");
  return (
    <div className="mx-auto"> 
      <div className="container">
        <input value={val2} onChange={(val) => setVal2(val.target.value)} className="input input-bordered w-full max-w-xs" />
        <MDEditor value={value} onChange={(val) => setValue(val ?? "")} />
      </div>
      <button onClick={() => {void saveText(val2,value);redirect('/')}
        }>Post!</button>
    </div>
  );
};

