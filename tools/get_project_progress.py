import os
import json

from supabase import Client, create_client
from dotenv import load_dotenv

load_dotenv(".env.local")


SUPABASE_URL: str | None = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY: str | None = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Supabase credentials not found in environment variables, exiting.")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

from tools.dependencies import google_sheet_api as gsa

print("=== Start update script ===")


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

for row_id, row in enumerate(rows):
    if row_id == 0:
        continue
    project_id: str = row[0]

    if not project_id:
        print("Skipping empty id")
        continue

    traduction = int(row[9].replace("%", ""))
    images = int(row[10].replace("%", ""))
    technique = int(row[11].replace("%", ""))
    relecture = int(row[12].replace("%", ""))

    print(f"Updating project '{project_id}'")

    supabase.table("projects").update(
    {
        "progress":
        {
            "traduction": traduction,
            "images": images,
            "technique": technique,
            "relecture": relecture,
        }
    }
    ).eq("id", project_id).execute()

print("=== Script finished successfully ===")
