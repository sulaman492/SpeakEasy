from flask import Flask, request, jsonify
import argostranslate.translate as translate
import argostranslate.package
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)
# =========================
# Ensure language is installed (run once)
# =========================
def ensure_language_installed(source="en", target="ur"):
    installed_languages = translate.get_installed_languages()

    for lang in installed_languages:
        if lang.code == source:
            for t in lang.translations_to:
                if t.to_lang.code == target:
                    return  # Already installed

    print("Downloading language model (one-time)...")
    argostranslate.package.update_package_index()
    packages = argostranslate.package.get_available_packages()

    pkg = next(
        p for p in packages
        if p.from_code == source and p.to_code == target
    )

    argostranslate.package.install_from_path(pkg.download())
    print("Language model installed successfully!")

# Install EN → UR once
ensure_language_installed("en", "ur")

# Load languages AFTER installation
installed_languages = translate.get_installed_languages()

# =========================
# Translation function
# =========================
def offline_translate(text, source_code="en", target_code="ur"):
    try:
        source_lang = next(lang for lang in installed_languages if lang.code == source_code)
        target_lang = next(lang for lang in installed_languages if lang.code == target_code)
        translation = source_lang.get_translation(target_lang)
        return translation.translate(text)
    except StopIteration:
        return f"Language pair {source_code} → {target_code} not installed."
    except Exception as e:
        return f"Error: {str(e)}"

# =========================
# Home route (GET)
# =========================
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "ok",
        "message": "Offline Translator API is running 🚀",
        "usage": {
            "GET": "/api/translate?text=Hello&source=en&target=ur",
            "POST": "/api/translate (JSON)"
        }
    })

# =========================
# Translate route (GET + POST)
# =========================
@app.route("/api/translate", methods=["GET", "POST"])
def translate_text():

    # ---- GET ----
    if request.method == "GET":
        text = request.args.get("text", "")
        source = request.args.get("source", "en")
        target = request.args.get("target", "ur")

        if not text:
            return jsonify({"error": "Missing 'text' query parameter"}), 400

    # ---- POST ----
    else:
        data = request.get_json(silent=True) or {}
        text = data.get("text", "")
        source = data.get("source", "en")
        target = data.get("target", "ur")

        if not text:
            return jsonify({"error": "Missing 'text' in request body"}), 400

    translated_text = offline_translate(text, source, target)

    return jsonify({
        "source": source,
        "target": target,
        "originalText": text,
        "translatedText": translated_text
    })

# =========================
# Run server
# =========================
if __name__ == "__main__":
    print("Offline Translator running on http://127.0.0.1:8000")
    app.run(host="127.0.0.1", port=8000, debug=True)
