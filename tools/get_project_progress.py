import os
import json

from tools.dependencies import google_sheet_api as gsa

# ------- Valeurs à modifier --------------------------------------------------

title_to_index: dict[str, int] = {
    "The 25th Ward: The Silver Case": 0,
    "428: Shibuya Scramble": 1,
    "Shuffled deck : The Divine Deception": 2,
    "Infinity : Never7": 3,
}

# -----------------------------------------------------------------------------

creds_json: str | None = os.getenv("GOOGLE_SERVICE_ACCOUNT_JSON")
if not creds_json:
    # dev fallback
    with open("credentials_dreamTeam.json", "r", encoding="utf-8") as f:
        creds_json = f.read()

creds = json.loads(creds_json)

gsa.set_credentials_info(creds)
spreadsheet = gsa.open_spreadsheet("16EKmdx9vb-dNj4xGX5pyVkcdprVCWo6NEzt_u3wrRdk")
if not spreadsheet:
    exit(1)
worksheet = gsa.open_worksheet(spreadsheet, 0)
if not worksheet:
    exit(1)
rows: list[list[str]] | None = gsa.get_worksheet_values(worksheet)
if not rows:
    exit(1)

with open("./public/data/progress.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for row in rows:
    idx = title_to_index.get(row[0])
    if idx is None:
        continue
    data[idx]["progress"]["traduction"] = row[8].removesuffix("%")
    data[idx]["progress"]["images"] = row[9].removesuffix("%")
    data[idx]["progress"]["technique"] = row[10].removesuffix("%")
    data[idx]["progress"]["relecture"] = row[11].removesuffix("%")

with open("./public/data/progress.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)