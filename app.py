import os
import json
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

DATA_FILE = "data.json"  # file to save form data


# -------------------------
# Load Form Page
# -------------------------
@app.route("/")
def form():
    return render_template("form.html")


# -------------------------
# Save Form Data
# -------------------------
@app.route("/save-form", methods=["POST"])
def save_form():

    data = request.json  # data from form

    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)

    return jsonify({"message": "Data Saved"})


# -------------------------
# Get Saved Data
# -------------------------
@app.route("/get-form")
def get_form():

    if not os.path.exists(DATA_FILE):
        return jsonify({})

    with open(DATA_FILE, "r") as f:
        data = json.load(f)

    return jsonify(data)


# -------------------------
# Awards Page
# -------------------------
@app.route("/awards")
def awards():
    return render_template("awards.html")


if __name__ == "__main__":
    app.run(debug=True)