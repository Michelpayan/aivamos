# memory.py
import os
import json
from typing import List, Dict
from datetime import datetime

def log_react_session(session_id: str, user_profile: Dict, history: List[str], log_dir: str = "react_logs"):
    os.makedirs(log_dir, exist_ok=True)
    session_data = {
        "session_id": session_id,
        "user_profile": user_profile,
        "timestamp": datetime.now().isoformat(),
        "history": history
    }
    with open(os.path.join(log_dir, f"{session_id}.json"), "w", encoding="utf-8") as f:
        json.dump(session_data, f, indent=2, ensure_ascii=False)
