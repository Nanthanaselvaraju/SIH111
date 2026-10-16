"""Read and validate the CSV exported by diarylens_simulation.m."""

import math
import os

import pandas as pd

CSV_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "diarylens_sensor_results.csv")
REQUIRED_COLUMNS = {
    "Timestamp", "ReadingNumber", "Temperature_C", "Moisture_pct", "pH",
    "Temperature_Status", "Moisture_Status", "pH_Status", "Overall_Status",
}


def get_latest_sensor_reading(path=CSV_PATH):
    """Return the latest valid exported reading or a safe unavailable reason."""
    if not os.path.isfile(path):
        return {"available": False, "message": "CSV not found. Export diarylens_sensor_results.csv from MATLAB and place it in the project root."}
    try:
        data = pd.read_csv(path)
        if data.empty:
            return {"available": False, "message": "CSV is empty. Run the MATLAB simulation and export the readings again."}
        missing = REQUIRED_COLUMNS.difference(data.columns)
        if missing:
            return {"available": False, "message": "CSV is missing required columns: " + ", ".join(sorted(missing))}

        row = data.iloc[-1]
        numeric = {
            "reading_number": float(row["ReadingNumber"]),
            "temperature_c": float(row["Temperature_C"]),
            "moisture_pct": float(row["Moisture_pct"]),
            "ph": float(row["pH"]),
        }
        if not all(math.isfinite(value) for value in numeric.values()):
            raise ValueError("latest row contains non-finite numeric readings")
        status = {
            "temperature": str(row["Temperature_Status"]).strip().upper(),
            "moisture": str(row["Moisture_Status"]).strip().upper(),
            "ph": str(row["pH_Status"]).strip().upper(),
            "overall": str(row["Overall_Status"]).strip().upper(),
        }
        if any(value not in {"NORMAL", "WARNING"} for value in status.values()):
            raise ValueError("status fields must contain NORMAL or WARNING")
        timestamp = pd.to_datetime(row["Timestamp"], errors="raise")
        if pd.isna(timestamp):
            raise ValueError("timestamp is empty")
        return {
            "available": True,
            "source": "SIMULATED DATA",
            "timestamp": timestamp.isoformat(),
            "reading_number": int(numeric["reading_number"]),
            "temperature_c": numeric["temperature_c"],
            "moisture_pct": numeric["moisture_pct"],
            "ph": numeric["ph"],
            "status": status,
        }
    except pd.errors.EmptyDataError:
        return {"available": False, "message": "CSV is empty. Run the MATLAB simulation and export the readings again."}
    except (OSError, UnicodeError, pd.errors.ParserError, ValueError, TypeError, KeyError) as exc:
        return {"available": False, "message": "CSV data is invalid: " + str(exc)}
