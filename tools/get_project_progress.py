import os
import json

from tools.dependencies import google_sheet_api as gsa

print("=== Start update script ===")

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
    print("No GOOGLE_SERVICE_ACCOUNT_JSON found, using local fallback")
    with open("credentials_dreamTeam.json", "r", encoding="utf-8") as f:
        creds_json = f.read()
else:
    print("GOOGLE_SERVICE_ACCOUNT_JSON found, using secret")

creds = json.loads(creds_json)

print("Setting credentials")
gsa.set_credentials_info(creds)

print("Opening spreadsheet...")
spreadsheet = gsa.open_spreadsheet("16EKmdx9vb-dNj4xGX5pyVkcdprVCWo6NEzt_u3wrRdk")
if not spreadsheet:
    print("Failed to open spreadsheet")
    exit(1)
print(f"Spreadsheet opened: {spreadsheet.title if hasattr(spreadsheet, 'title') else 'unknown title'}")

print("Opening worksheet...")
worksheet = gsa.open_worksheet(spreadsheet, 0)
if not worksheet:
    print("Failed to open worksheet")
    exit(1)
print(f"Worksheet opened: {worksheet.title if hasattr(worksheet, 'title') else 'unknown title'}")

rows: list[list[str]] | None = gsa.get_worksheet_values(worksheet)
if not rows:
    print("No rows found in worksheet")
    exit(1)
print(f"Fetched {len(rows)} rows from worksheet")

print("Loading local JSON data")
with open("./public/data/progress.json", "r", encoding="utf-8") as f:
    data = json.load(f)
print(f"Loaded {len(data)} entries from progress.json")

for row in rows:
    idx = title_to_index.get(row[0])
    if idx is None:
        print(f"Skipping unknown title: {row[0]}")
        continue
    print(f"Updating '{row[0]}' at index {idx}")
    data[idx]["progress"]["traduction"] = row[8].removesuffix("%")
    data[idx]["progress"]["images"] = row[9].removesuffix("%")
    data[idx]["progress"]["technique"] = row[10].removesuffix("%")
    data[idx]["progress"]["relecture"] = row[11].removesuffix("%")
    print(f"Updated values: {data[idx]['progress']}")

print("Writing updated JSON to file")
with open("./public/data/progress.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("=== Script finished successfully ===")
