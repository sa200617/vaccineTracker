// ===============================
// GLOBAL FLOATING AI CHAT
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    /* ==============================
       CREATE FLOATING BUTTON
    ============================== */
    const btn = document.createElement("button");
    btn.innerHTML = "🤖 AI";
    btn.style.position = "fixed";
    btn.style.bottom = "25px";
    btn.style.right = "25px";
    btn.style.width = "60px";
    btn.style.height = "60px";
    btn.style.borderRadius = "50%";
    btn.style.border = "none";
    btn.style.background = "#7c5ac9";
    btn.style.color = "white";
    btn.style.fontWeight = "bold";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
    btn.style.zIndex = "9999";

    document.body.appendChild(btn);

    /* ==============================
       CREATE POPUP WINDOW
    ============================== */
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.bottom = "100px";
    popup.style.right = "25px";
    popup.style.width = "350px";
    popup.style.height = "500px";
    popup.style.background = "white";
    popup.style.borderRadius = "15px";
    popup.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
    popup.style.display = "none";
    popup.style.flexDirection = "column";
    popup.style.overflow = "hidden";
    popup.style.zIndex = "9999";

    popup.innerHTML = `
        <div style="background:#7c5ac9;color:white;padding:12px;font-weight:bold;">
            🤖 Ask AI
        </div>

        <div id="chatBox" style="flex:1;overflow-y:auto;padding:12px;font-size:14px;">
        </div>

        <div style="display:flex;padding:10px;border-top:1px solid #ddd;">
            <input id="aiInput" 
                   style="flex:1;padding:8px;border:1px solid #ccc;border-radius:6px;"
                   placeholder="Ask something..." />
            <button id="aiSend"
                style="margin-left:8px;padding:8px 12px;
                background:#7c5ac9;color:white;
                border:none;border-radius:6px;cursor:pointer;">
                Send
            </button>
        </div>
    `;

    document.body.appendChild(popup);

    /* ==============================
       TOGGLE POPUP
    ============================== */
    btn.onclick = () => {
        popup.style.display =
            popup.style.display === "none" ? "flex" : "none";
    };

    /* ==============================
       SEND MESSAGE TO GEMINI
    ============================== */
    popup.querySelector("#aiSend").onclick = async function () {

        const input = popup.querySelector("#aiInput");
        const message = input.value.trim();
        if (!message) return;

        const chatBox = popup.querySelector("#chatBox");

        // Show user message
        chatBox.innerHTML += `
            <div style="margin-bottom:8px;">
                <b>You:</b> ${message}
            </div>
        `;

        input.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;

        const API_KEY = "AIzaSyBKuG2Fiu-RmxdVXdDXuLsYdVEu_bu8fcQ";

        try {

            const response = await fetch(
                "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: message }]
                        }]
                    })
                }
            );

            const data = await response.json();

            const reply =
                data.candidates?.[0]?.content?.parts?.[0]?.text
                || "⚠ AI failed to respond.";

            chatBox.innerHTML += `
                <div style="margin-bottom:8px;background:#e7ebff;padding:8px;border-radius:8px;">
                    <b>AI:</b><br>${reply.replace(/\n/g, "<br>")}
                </div>
            `;

            chatBox.scrollTop = chatBox.scrollHeight;

        } catch (error) {

            chatBox.innerHTML += `
                <div style="color:red;">
                    Error connecting to AI.
                </div>
            `;
        }
    };

});