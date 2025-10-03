import re
import requests
import json
import sys
import os
from datetime import date
from pathlib import Path

# --- Config ---
REPO = "DreamTrad/dreamtrad-web"
ASSETS_DIR = Path("assets/articles-cover")
MD_DIR = Path("data/articles")
OUTPUT_JSON = Path("data/articles.json")

# --- Fonctions utilitaires ---
def slugify(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")

def extract_section(body, field):
    pattern = rf"### {field}\n([\s\S]*?)(?=\n###|\Z)"
    match = re.search(pattern, body)
    return match.group(1).strip() if match else None

def parse_attachments(issue_json):
    """Get uploaded attachments (images, etc.) from issue body/links"""
    urls = re.findall(r"https?://[^\s)]+", issue_json["body"])
    return [u for u in urls if u.lower().endswith((".png", ".jpg", ".jpeg", ".webp"))]

def estimate_reading_time(text):
    words = len(text.split())
    return f"{max(1, words // 200)} min"

# --- Script principal ---
if len(sys.argv) < 2:
    print("Usage: python issue_to_article.py <ISSUE_NUMBER>")
    sys.exit(1)

ISSUE_NUMBER = sys.argv[1]

# Récupération de l'issue
url = f"https://api.github.com/repos/{REPO}/issues/{ISSUE_NUMBER}"
resp = requests.get(url)
issue = resp.json()

body = issue["body"]
user = issue["user"]["login"]

# Extraction sections
titre = extract_section(body, "Titre")
excerpt = extract_section(body, "Extrait")
contenu = extract_section(body, "Contenu de l’article")

# Génération des métadonnées
id_value = slugify(titre)
today = date.today().isoformat()
cover_path = f"/assets/articles-cover/{id_value}.webp"
md_path = f"/data/articles/{id_value}.md"
reading_time = estimate_reading_time(contenu)

# Extraction cover depuis le champ spécifique
cover_field = extract_section(body, "Image de couverture")
# on récupère la première URL dans le Markdown
cover_url_match = re.search(r"https?://[^\s)]+", cover_field or "")
if cover_url_match:
    img_url = cover_url_match.group(0)
    img_resp = requests.get(img_url)
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    cover_file = ASSETS_DIR / f"{id_value}.webp"
    with open(cover_file, "wb") as f:
        f.write(img_resp.content)
else:
    cover_file = None


# Sauvegarde du markdown
MD_DIR.mkdir(parents=True, exist_ok=True)
with open(MD_DIR / f"{id_value}.md", "w", encoding="utf-8") as f:
    f.write(contenu)

# Création de l'entrée JSON
entry = {
    "id": id_value,
    "title": titre,
    "author": user,
    "date": today,
    "tags": [],  # Tu peux ajouter un champ tags dans ton formulaire si besoin
    "coverImage": cover_path,
    "markdownPath": md_path,
    "excerpt": excerpt,
    "readingTime": reading_time
}

# Mise à jour du fichier JSON global
OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
if OUTPUT_JSON.exists():
    with open(OUTPUT_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)
else:
    data = []

data.append(entry)

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print(f"Article généré : {md_path}")
print(f"Image sauvegardée : {cover_path}")
print(f"Métadonnées ajoutées dans {OUTPUT_JSON}")
