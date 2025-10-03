import json
import re
import sys
import requests


if len(sys.argv) < 2:
    print("Usage: python issue_to_json.py <ISSUE_NUMBER>")
    sys.exit(1)

ISSUE_NUMBER = sys.argv[1]
REPO = "DreamTrad/dreamtrad-web"

def extract_section(body, field):
    pattern = rf"### {field}\n([\s\S]*?)(?=\n###|\Z)"
    match = re.search(pattern, body)
    return match.group(1).strip() if match else None


url = f"https://api.github.com/repos/{REPO}/issues/{ISSUE_NUMBER}"
resp = requests.get(url)
body = resp.json()["body"]

titre = extract_section(body, "Titre")
genres = extract_section(body, "Genres")
duree = extract_section(body, "Durée")
plateformes = extract_section(body, "Plateformes")
liens = extract_section(body, "Liens")
patch_fr = extract_section(body, "Patch FR")
description = extract_section(body, "Description")

def parse_list(text):
    if not text:
        return []
    return [line.strip("- ").strip() for line in text.splitlines() if line.strip()]

genres_list = parse_list(genres)
plateformes_list = parse_list(plateformes)
liens_list = parse_list(liens)
patch_list = parse_list(patch_fr)

# Génération ID et image
id_value = re.sub(r"[^a-z0-9]+", "_", titre.lower()).strip("_")

entry = {
    "id": id_value,
    "titre": titre,
    "image": f"assets/poster/{id_value}.webp",
    "genre": genres_list,
    "duree": duree,
    "note_vndb": "",
    "popularite_vndb": "",
    "plateforme": plateformes_list,
    "lien_jeu": liens_list,
    "patch_fr": patch_list,
    "description": description
}

with open("output.txt", "w", encoding="utf-8") as f:
    f.write(json.dumps(entry, ensure_ascii=False, indent=4))

print(f"Entrée JSON issue #{ISSUE_NUMBER} écrite dans output.txt")
