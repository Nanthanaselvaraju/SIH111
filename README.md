# DiaryLens - Software-Only Feed and Silage Quality Prototype

## Smart India Hackathon 2026 - SIH26111

**Problem statement:** Smart AI-Enabled Rapid Feed and Silage Quality Testing System for Dairy Farmers
**Theme:** Agriculture, FoodTech & Rural Development
**Category:** Software

## Overview

DiaryLens is a **software-only prototype** aligned with SIH26111. It supports entering feed report values, reviewing a prototype Python AI/ML estimate, viewing saved test records, and exploring clearly labelled simulated demonstrations. It does not require or connect to physical sensors, NIR equipment, or testing hardware.

### What the current prototype does
- Accepts manually entered feed values and returns the existing Python model's estimate.
- Saves authenticated test records locally in SQLite and summarizes those records in the dashboard.
- Provides practical educational information and QR parsing for supported JSON measurements and same-origin saved-report links.
- Offers an optional browser-based simulated demo and a MATLAB Online CSV demonstration for silage temperature, moisture, and pH.

### Scope and limitations
- The existing model artifacts were trained with generated demonstration data and have not been validated against labelled field or laboratory samples. Its predictions are a prototype demonstration, not a verified laboratory result.
- Input bounds are model-input validation bounds, not scientifically validated nutrition or safety limits.
- Feed contamination, aflatoxins, mycotoxins, mould, adulteration, mineral deficiencies, and image-based quality classification are not currently detected.
- Physical sensor acquisition, cloud synchronization, and offline server operation are not implemented.
- MATLAB and browser demonstration readings are simulated. MATLAB thresholds are configurable illustrations, not validated silage safety limits.

## Features

- Responsive multilingual interface.
- Manual feed report entry and optional simulated demo values, labelled as simulated.
- Dashboard for saved test history and the optional MATLAB CSV display.
- Image preview with farmer-selected visible-sign screening, plus QR parsing for measurement records; no image classifier is included.
- Existing Flask API, authentication, SQLite storage, and Python AI/ML prediction path.
- Read-only API endpoint for MATLAB-exported simulated silage data.

### AI/ML and simulation scope
The Python model is used for feed analysis from submitted values. The browser demo generator and MATLAB threshold rules only demonstrate simulated readings; neither replaces nor trains the existing AI/ML model. They must not be represented as physical sensor measurements or validated safety assessments.

## Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure |
| **CSS3** | Styling & Animations |
| **JavaScript (ES6+)** | Interactivity & Logic |
| **Chart.js** | Data Visualization |
| **Font Awesome** | Icons |
| **Google Fonts (Inter)** | Typography |
| **Live Server** | Development Server |

### Backend
| Technology | Purpose |
|------------|---------|
| **Python 3.10+** | Programming Language |
| **Flask** | Web Framework |
| **Flask-CORS** | Cross-Origin Support |
| **Flask-SQLAlchemy** | ORM & Database |
| **Flask-JWT-Extended** | Authentication |
| **Flask-Bcrypt** | Password Hashing |
| **SQLite** | Database |
| **scikit-learn** | AI/ML (Optional) |
| **pandas** | Data Processing |
| **numpy** | Numerical Computing |


## MATLAB Online silage simulation

The MATLAB module is an additional demonstration feature. It creates simulated temperature, moisture, and pH readings, applies configurable illustrative NORMAL/WARNING thresholds, plots each measurement, and exports `diarylens_sensor_results.csv`. These values are not from connected sensors, and the example thresholds are not scientifically validated silage safety limits.

1. Open `diarylens_simulation.m` in MATLAB Online and run the script. It saves `diarylens_sensor_results.csv` in MATLAB's current folder.
2. In MATLAB Online, download the generated CSV. Place it in the project root (`C:\SIH111\diarylens_sensor_results.csv` in this workspace), alongside `README.md`.
3. Start the existing Python application from PowerShell:

   ```powershell
   cd C:\SIH111\backend
   .\venv\Scripts\Activate.ps1
   python app.py
   ```

4. Open `http://127.0.0.1:5000/dashboard`, or use VS Code Go Live on any port while the Flask server remains running. The MATLAB Silage Monitoring card displays the latest CSV row. To check the API directly, open `http://127.0.0.1:5000/api/silage/simulated-reading`. Without an export, the endpoint returns an unavailable message; an empty or malformed CSV is also reported safely.
5. To check the integration after placing the export, refresh the dashboard and confirm the returned latest values and NORMAL/WARNING statuses match the last row in the CSV. The API is read-only and does not require authentication.

The MATLAB dashboard card and the existing browser-based simulated demo use simulated data. Feed quality analysis continues to use the existing Python AI/ML prediction module (`backend/ai_model.py`) and its model artifacts or its existing fallback behavior. MATLAB thresholds do not replace or feed into that model.

---

## 📁 Project Structure


## Current implementation notes and local demo

- The analysis form calls the existing Python prediction module. Its saved Random Forest artifacts are in `backend/ai_models/`. The artifacts were produced from generated demonstration data; model performance has not been evaluated on labelled field data. The fallback is explicitly identified as rule-based.
- Accepted input bounds follow the model's generated training-data domain; they are input validation bounds, not nutrition or safety recommendations. Contamination is not assessed by the current model.
- Photos are previewed only; the optional image screen summarizes signs selected by the farmer and does not analyze pixels. There is no image classification model or physical sensor driver. JSON measurement QR analysis requires moisture, protein, fiber, energy, and pH; missing values are not filled with simulated estimates. Private report QR links require the owning account.
- Sign-in is required to save tests and view database-backed dashboard statistics/history. Unauthenticated analysis is returned by the existing Python model but is not saved. If Flask cannot be reached, the form shows a separately labelled local rule-based fallback; it is not the trained model and is never saved.

### Farm tools and data limits

- `farm-tools.html` focuses on four workflows: combined silage/contamination screening, dated milk and cost tracking, the multilingual farmer assistant, and farm history. Nutrition planning and ingredient comparisons are not included in this simplified workspace.
- Feed samples store a sample name, optional collection date, and one declared source for the entered values. The source applies to all entered parameters and is not independently verified. Simulated auto-fill is labelled as simulated.
- Signed-in farm records are stored in the existing local SQLite database and scoped to the account. Unsigned farm-tool entries are stored only in that browser's local storage. There is no cloud synchronization or service worker/offline cache.
- Silage and contamination screens record reported observations; they do not detect toxins, chemical adulteration, pathogens, or certify feed safety. Photos are not uploaded or automatically classified.
- The Dashboard shows the latest saved silage observation and charts milk entries only when at least two dated entries exist for the same animal/group. A timeline does not establish cause.
- Private QR links are generated for saved feed reports and account farm records. Opening a link requires the owning account to sign in; local development URLs are not public links.
- The text assistant uses transparent rule-based guidance and, when signed in, can reference the user's latest saved feed, silage, milk, or cost record. It is not a live AI service or veterinary advice. Voice input/output uses browser speech APIs when that exact language is available: `en-IN`, `hi-IN`, `ta-IN`, `te-IN`, and `mr-IN`. Speech recognition may require an online browser service; typed chat remains available.
- Production economics use only the expenses and milk values entered by the user; omitted costs are not inferred.

### Run and test

Start the backend from the project root in PowerShell:

```powershell
cd .\backend
python app.py
```

Keep that terminal open. Open the project root with VS Code Live Server and visit `http://127.0.0.1:5501/index.html`. The added farm workspace is at `http://127.0.0.1:5501/farm-tools.html`. The Flask app also serves the same page at `http://127.0.0.1:5000/farm-tools`.

Run the focused backend integration suite from the project root:

```powershell
python -m unittest backend.test_farm_records
```

The test suite creates a uniquely named temporary user and removes its test records. It covers authentication, validation, duplicate sample IDs, editing, account isolation, sample provenance, and QR image generation.

### Manual checks

1. Choose each of the five languages; confirm the feed source selector, assistant prompts, and assistant responses change with the selection.
2. On Test, fill simulated values and confirm the source says “Simulated demo values”; with an account signed in, submit and check the saved record in Reports and Farm Tools.
3. Save a silage observation and contamination concern. Confirm warning language describes observations only and does not claim toxin detection or safety.
4. Save at least two milk entries for the same animal/group and confirm the Dashboard trend uses those actual entries. Check the cost calculation and CSV export.
5. Generate a private QR from an account record; confirm a signed-in owner can open it and a different account cannot.
6. On a browser/device without a matching speech voice or recognition service, confirm typed chat remains usable and the unavailable speech feature is stated without switching languages.

### Start from Windows Command Prompt

```cmd
cd /d "C:\Users\Pavithra Gangadharan\OneDrive\Desktop\SIH111\SIH111\backend"
python app.py
```

Keep the Flask terminal open. Open the project root with VS Code Live Server, then browse to `test.html`. If the Python environment is missing packages, create and install a virtual environment from the project root with `python -m venv backend\venv`, `backend\venv\Scripts\activate.bat`, and `python -m pip install -r backend\requirements.txt` before starting Flask.

### Demo sequence

1. Register and log in with either your username or registration email so completed results are saved to SQLite.
2. On Test, select Details, choose a type, enter values within the displayed model input bounds, and submit. You can use the simulated demo button; those readings are simulated. The demo does not connect to physical hardware.
3. Review the backend model category, score, parameters, advisory, model source, and limitations. The saved status and test ID appear in the result.
4. Open Dashboard to view saved-record metrics, distribution, recent history, or filter by date and type.
5. Open Advisory / Reports, search saved reports, and open a record to inspect the original saved inputs and analysis. Use the print button for a print-friendly copy.
6. For the optional MATLAB simulation, run `diarylens_simulation.m` in MATLAB Online and put its downloaded CSV in the project root to view the simulated monitoring card on Dashboard.
