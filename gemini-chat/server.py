from flask import Flask, request, jsonify, send_from_directory
import openai
import os

app = Flask(__name__, static_folder=".")

# Make sure to set your GEMINI API key in the environment
openai.api_key = os.getenv("GEMINI_API_KEY")

# Serve main HTML pages
@app.route("/")
def home():
    return send_from_directory(".", "immunization.html")  # or awards.html

@app.route("/awards")
def awards():
    return send_from_directory(".", "awards.html")

# Chat endpoint for AI popup
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",  # Gemini model
            messages=[{"role": "user", "content": user_message}],
            temperature=0.7
        )
        ai_reply = response["choices"][0]["message"]["content"]
    except Exception as e:
        ai_reply = f"Error: {str(e)}"

    return jsonify({"reply": ai_reply})

# Serve static files (CSS, JS, images)
@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(".", path)

if __name__ == "__main__":
    app.run(debug=True)