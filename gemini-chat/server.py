const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyBKuG2Fiu-RmxdVXdDXuLsYdVEu_bu8fcQ";

app.post("/chat", async (req, res) => {

    const userMessage = req.body.message;

    try {

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: userMessage }]
                    }]
                })
            }
        );

        const data = await response.json();

        const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text
            || "AI failed.";

        res.json({ reply });

    } catch (err) {
        res.json({ reply: "Server error." });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});