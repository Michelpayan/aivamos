# memory.py
"""
Lightweight session logger.
Each ReAct session is written as a JSON file in `react_logs/`
so you can inspect the model’s intermediate thoughts/actions.
"""

import os, json
from typing import List, Dict
from datetime import datetime


def log_react_session(
    session_id: str,
    user_profile: Dict,
    history: List[str],
    log_dir: str = "react_logs",
) -> None:
    os.makedirs(log_dir, exist_ok=True)
    data = {
        "session_id": session_id,
        "user_profile": user_profile,
        "timestamp": datetime.now().isoformat(),
        "history": history,
    }
    path = os.path.join(log_dir, f"{session_id}.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
