import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  const { text, source, target } = req.body;
  try {
    const response = await axios.get("https://api.mymemory.translated.net/get", {
      params: {
        q: text,
        langpair: `${source}|${target}`
      }
    });
    res.json({ translatedText: response.data.responseData.translatedText });
  } catch (error) {
    console.error("Translation API error:", error.message);
    res.status(500).json({ error: "Translation failed" });
  }
});

export default router;
