import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios"

const RightPanel = () => {
    const [text, setText] = useState("")
    const [translatedText, setTranslatedText] = useState("")
    const [sourceLang,setSourceLang]=useState("en")
    const [targetLang,setTargetLang]=useState("ur")
    const [loading,setLoading]=useState(false)
  
    const handleTranslate=async()=>{
        if(!text)return
        setLoading(true)
        try {
            const response=await axios.post("http://localhost:5000/api/translate",{
              text,
              source:sourceLang,
              target:targetLang  
            });
            setTranslatedText(response.data.translatedText)
        } catch (error) {
            console.error("Translation failed:", error.message);
            setTranslatedText("Translation failed. Try again!");
        }
        setLoading(false)
    }

    return (
    <div className="flex flex-col w-full h-screen justify-between items-center bg-gray-200 p-4">

      {/* Input / Translation Box */}
      <div className="w-[95%] h-1/2 p-4 bg-white border border-green-400 rounded flex flex-col justify-between">
        
        {/* Textarea for input */}
        <textarea
            value={text}
          placeholder="Write some text!"
          className="w-full h-[70%] p-2 text-black text-left resize-none outline-none caret-green-500 focus:ring-2 focus:ring-green-400 rounded"
        onChange={(e)=>setText(e.target.value)}
        />

        {/* Language selector + Translate button */}
        <div className="flex justify-between mt-4 gap-2">
          <select className="text-black rounded bg-green-200 p-2 w-1/2"
            value={sourceLang}
            onChange={(e)=>setSourceLang(e.target.value)}
          >
            <option value="en">English</option>
            <option value="ur">Urdu</option>
            <option value="zh">Chinese</option>
          </select>

          <button className="text-black px-4 py-2 rounded bg-green-200 hover:bg-green-300 w-1/2"
          onClick={handleTranslate}
          disabled={loading}>
            {loading?"Translating...":"Translate"}
          </button>
        </div>
      </div>

      {/* Output Box */}
      <div className="w-[95%] h-1/2 p-4 flex flex-col justify-between bg-white border border-green-400 rounded mt-4 overflow-y-auto">
        <p className="text-black text-left">
          {/* Here the translated text will appear */}
          {translatedText===""?"Translation output will show here...":translatedText}
        </p>
        <div>
            <select className="text-black rounded bg-green-200 p-2 w-1/2"
            value={targetLang}
            onChange={(e)=>setTargetLang(e.target.value)}
          >
            <option value="en">English</option>
            <option value="ur">Urdu</option>
            <option value="zh">Chinese</option>
          </select>

        </div>
      </div>

    </div>
  )
}

export default RightPanel
