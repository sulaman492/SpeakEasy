import React, { useState } from 'react';
import axios from "axios";
import { FaVolumeUp, FaMicrophone, FaExchangeAlt } from "react-icons/fa";

const languages = [
  { code: "en", name: "English" },
  { code: "ur", name: "Urdu" },
  { code: "zh", name: "Chinese" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
];

const Translation = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("ur");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const handleTranslate = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/translate", {
        text,
        source: sourceLang,
        target: targetLang
      });
      setTranslatedText(response.data.translatedText);
    } catch (err) {
      setTranslatedText("Translation failed. Check server!");
    }
    setLoading(false);
  };

  const handlePlayAudio = (content, lang = "en") => {
    if (!content) return;
    const voices = speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.includes(lang)) || voices[0];
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.voice = voice;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech Recognition not supported");
    setListening(true);
    const recognition = new SpeechRecognition();
    recognition.lang = sourceLang;
    recognition.start();
    recognition.onresult = e => setText(e.results[0][0].transcript);
    recognition.onend = () => setListening(false);
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setText(translatedText);
    setTranslatedText(text);
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col items-center justify-center px-6">

      {/* Language Selectors */}
      <div className="flex items-center gap-6 mb-8">
        <select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          className="px-6 py-3 rounded-full bg-white shadow-md text-gray-700 font-medium focus:outline-none"
        >
          {languages.map(l => (
            <option key={l.code} value={l.code}>{l.name}</option>
          ))}
        </select>

        <button
          onClick={swapLanguages}
          className="bg-white p-3 rounded-full shadow-md text-gray-600 hover:text-purple-500"
        >
          <FaExchangeAlt />
        </button>

        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="px-6 py-3 rounded-full bg-white shadow-md text-gray-700 font-medium focus:outline-none"
        >
          {languages.map(l => (
            <option key={l.code} value={l.code}>{l.name}</option>
          ))}
        </select>
      </div>

      {/* Panels */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">

        {/* Input Panel */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg flex flex-col">

          {/* Toolbar */}
          <div className="flex justify-end gap-4 px-6 py-4 text-gray-500">
            <button onClick={startListening} disabled={listening}>
              <FaMicrophone className={listening ? "text-purple-500" : ""} />
            </button>
            <button onClick={() => handlePlayAudio(text, sourceLang)}>
              <FaVolumeUp />
            </button>
          </div>

          {/* Top Separator */}
          <div className="border-t border-gray-200" />

          {/* Textarea */}
          <textarea
            className="flex-1 px-6 py-4 text-lg resize-none focus:outline-none text-gray-700"
            placeholder="Enter text to translate..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ minHeight: "280px" }}
          />

          {/* Bottom Separator + Counter */}
          <div className="border-t border-gray-200 px-6 py-3 text-sm text-gray-400 text-right">
            {text.length} characters
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg flex flex-col">

          {/* Toolbar */}
          <div className="flex justify-end gap-4 px-6 py-4 text-gray-500">
            <button onClick={() => handlePlayAudio(translatedText, targetLang)}>
              <FaVolumeUp />
            </button>
          </div>

          {/* Top Separator */}
          <div className="border-t border-gray-200" />

          {/* Textarea */}
          <textarea
            className="flex-1 px-6 py-4 text-lg resize-none focus:outline-none text-gray-700"
            placeholder="Translation will appear here..."
            value={translatedText}
            readOnly
            style={{ minHeight: "280px" }}
          />

          {/* Bottom Separator + Counter */}
          <div className="border-t border-gray-200 px-6 py-3 text-sm text-gray-400 text-right">
            {translatedText.length} characters
          </div>
        </div>
      </div>

      {/* Translate Button */}
      <button
        onClick={handleTranslate}
        disabled={loading || listening}
        className="mt-10 px-14 py-4 rounded-full text-white text-lg font-semibold shadow-lg 
                   bg-gradient-to-r from-purple-400 to-pink-400 hover:opacity-90"
      >
        {loading ? "Translating..." : "Translate"}
      </button>
    </div>
  );
};

export default Translation;
