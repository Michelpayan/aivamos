"""
Thin wrapper around Google Programmable (Custom) Search JSON API.
Set env vars:
    GOOGLE_CSE_KEY = <your API key>
    GOOGLE_CSE_ID  = <your Search‑Engine ID (cx)>
"""
import os, requests

API_KEY = os.getenv("GOOGLE_CSE_KEY")
CX      = os.getenv("GOOGLE_CSE_ID")
SEARCH_URL = "https://www.googleapis.com/customsearch/v1"

def google_custom_search(query: str, num: int = 5) -> str:
    if not (API_KEY and CX):
        raise RuntimeError("Set GOOGLE_CSE_KEY and GOOGLE_CSE_ID env vars.")
    params = {"key": API_KEY, "cx": CX, "q": query, "num": num}
    data = requests.get(SEARCH_URL, params=params, timeout=10).json()
    items = data.get("items", [])
    return "\n\n".join(f"{it['title']} – {it['snippet']} ({it['link']})"
                       for it in items)
