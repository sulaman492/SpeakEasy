import React, { useState } from 'react'
import axios from "axios"
import { FaVolumeUp, FaMicrophone } from "react-icons/fa";

const RightPanel = () => {
  const [text, setText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLang, setSourceLang] = useState("en")
  const [targetLang, setTargetLang] = useState("ur")
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false) // new state

  const handleTranslate = async () => {
    if (!text) return
    setLoading(true)
    try {
      const response = await axios.post("http://localhost:5000/api/translate", {
        text,
        source: sourceLang,
        target: targetLang
      });
      setTranslatedText(response.data.translatedText)
    } catch (error) {
      console.error("Translation failed:", error.message);
      setTranslatedText("Translation failed. Try again!");
    }
    setLoading(false)
  }

  const handlePlayAudio = (content, lang = "en") => {
    if (!content) return;

    const voices = speechSynthesis.getVoices();
    let voice;

    // Try to select a voice matching the language
    switch (lang) {
      case "ur":
        voice = voices.find(v => v.lang.includes("ur")) || voices[0];
        break;
      case "en":
        voice = voices.find(v => v.lang.includes("en")) || voices[0];
        break;
      case "zh":
        voice = voices.find(v => v.lang.includes("zh")) || voices[0];
        break;
      default:
        voice = voices[0];
    }

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.voice = voice;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }


  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition!");
      return;
    }

    setListening(true) // disable buttons while listening

    const recognition = new SpeechRecognition();
    recognition.lang = sourceLang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript)
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false)
    };

    recognition.onend = () => {
      setListening(false) // re-enable buttons after listening ends
    };
  }

  return (
    <div className="flex flex-col w-full h-screen justify-between items-center bg-gray-200 p-4">

      {/* Input Box */}
      <div className="w-[95%] h-1/2 p-4 bg-white border border-green-400 rounded flex flex-col justify-between relative">
        <textarea
          value={text}
          placeholder="Write some text!"
          className="w-full h-[70%] p-2 text-black text-left resize-none outline-none caret-green-500 focus:ring-2 focus:ring-green-400 rounded"
          onChange={(e) => setText(e.target.value)}
        />
        <FaMicrophone
          className={`w-6 h-6 text-green-500 absolute top-4 right-12 cursor-pointer ${listening ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={startListening}
          title="Click to speak"
        />
        <FaVolumeUp
          className="w-6 h-6 text-green-500 absolute top-4 right-4 cursor-pointer"
          onClick={() => handlePlayAudio(text)}
          title="Play audio"
        />
        <div className="flex justify-between mt-4 gap-2">
          <select
            className="text-black rounded bg-green-200 p-2 w-1/2 cursor-pointer"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            <option value="en">English (EN)</option>
            <option value="ur">Urdu (UR)</option>
            <option value="zh">Chinese (ZH)</option>
            <option value="fr">French (FR)</option>
            <option value="de">German (DE)</option>
          </select>
          <button
            className={`text-black px-4 py-2 rounded bg-green-200 hover:bg-green-300 w-1/2 cursor-pointer ${loading || listening ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleTranslate}
            disabled={loading || listening}
          >
            {loading ? "Translating..." : "Translate"}
          </button>
          
        </div>    
      </div>
      
      {/* Output Box */}
      <div className="w-[95%] h-1/2 p-4 flex flex-col justify-between bg-white border border-green-400 rounded mt-4 overflow-y-auto relative">
        <p className="text-black text-left min-h-[80px]">
          {translatedText === "" ? "Translation output will show here..." : translatedText}
        </p>
        <select
          className="text-black rounded bg-green-200 p-2 w-1/2 cursor-pointer mt-2"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          <option value="en">English (EN)</option>
          <option value="ur">Urdu (UR)</option>
          <option value="zh">Chinese (ZH)</option>
          <option value="fr">French (FR)</option>
          <option value="de">German (DE)</option>
        </select>
        <FaVolumeUp
          className="w-6 h-6 text-green-500 absolute top-3 right-3 cursor-pointer"
          onClick={() => handlePlayAudio(translatedText, targetLang)}
        />
      </div>
    </div>
  )
}

export default RightPanel
