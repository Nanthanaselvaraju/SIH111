# 🐄 SmartFeed - AI-Powered Feed Quality Testing System

## Smart India Hackathon 2026 - SIH26111

---

## 📋 Table of Contents
- [Problem Statement](#-problem-statement)
- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Team](#-team)
- [License](#-license)

---

## 🎯 Problem Statement

**Problem Statement ID:** SIH26111  
**Title:** Smart AI-Enabled Rapid Feed and Silage Quality Testing System for Dairy Farmers  
**Theme:** Agriculture, FoodTech & Rural Development  
**Category:** Software  
**Organization:** Ministry of Fisheries, Animal Husbandry & Dairying  
**Department:** Department of Animal Husbandry & Dairying  

### Background
Animal nutrition directly affects milk production, animal health, reproductive performance, and dairy profitability. Dairy farmers often face challenges due to poor-quality cattle feed, adulterated feed ingredients, fungal contamination, toxin presence, and low-quality silage.

Conventional feed testing laboratories are expensive and inaccessible for many rural farmers. There is a need for rapid, portable, affordable, and digitally enabled feed quality assessment systems.

---

## 🚀 Overview

SmartFeed is an AI-powered portable system for rapid on-field quality assessment of cattle feed and silage. It enables dairy farmers to make immediate feed-quality decisions without relying on expensive laboratory testing.

### Key Capabilities
- ✅ Assess nutritional quality of cattle feed and silage
- ✅ Detect adulteration and contamination
- ✅ Provide instant farmer advisories and feed recommendations
- ✅ Monitor feed storage and silage conditions
- ✅ Support multilingual farmer interfaces
- ✅ Work offline in rural areas
- ✅ Enable cloud-based monitoring and traceability

### Detection Parameters
| Parameter | Detection Range | Optimal Range |
|-----------|-----------------|---------------|
| Moisture | 0-75% | 10-15% |
| Crude Protein | 0-30% | 18-22% |
| Fiber | 0-30% | 15-18% |
| Energy | 8-15 MJ/kg | 11-13 MJ/kg |
| pH | 3.5-8.0 | 5.5-7.5 |
| Aflatoxin | 0-50 ppb | <10 ppb |
| Mineral Deficiencies | Yes/No | None |
| Urea Adulteration | Yes/No | None |
| Sand/Silica Contamination | Yes/No | None |
| Fungal Contamination | Yes/No | None |

### Silage Monitoring
- ✅ pH Level
- ✅ Fermentation Quality
- ✅ Moisture Content
- ✅ Spoilage Indicators
- ✅ Mould Growth

---

## ✨ Features

### Frontend Features
- 🎨 **Beautiful UI** - Modern, responsive design with farming theme
- 📱 **Mobile-First** - Works on all devices (phones, tablets, desktops)
- 🌐 **Multilingual Support** - English, Hindi, Tamil, Telugu, Marathi
- 🔬 **Virtual Sensor Simulation** - Generate realistic feed data without hardware
- 🤖 **AI Quality Prediction** - Instant feed quality assessment
- 📊 **Live Dashboard** - Real-time analytics and quality distribution charts
- 📝 **Test History** - Track all tests with timestamps
- 💾 **Export Results** - Print, save as JSON, or share
- ☁️ **Cloud Sync** - Save tests to cloud with user authentication

### Backend Features
- 🔐 **User Authentication** - Register/Login with JWT tokens
- 💾 **Database Storage** - SQLite database for test history
- 🤖 **AI/ML Model** - Rule-based quality prediction (scikit-learn ready)
- 📡 **RESTful API** - Clean API endpoints for all operations
- ☁️ **Cloud Ready** - Firebase integration ready
- 🔄 **Real-time Updates** - WebSocket support (optional)

### AI Detection Capabilities
- 🧪 **Crude Protein** - Detect protein content
- 💧 **Moisture** - Measure moisture levels
- 🌾 **Fiber** - Analyze fiber content
- ⚡ **Energy Value** - Calculate energy content
- 🧬 **Aflatoxin** - Detect contamination
- 🦠 **Contamination** - Identify mold and spoilage

---

## 🛠️ Technology Stack

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

### Cloud (Optional)
| Technology | Purpose |
|------------|---------|
| **Firebase** | Cloud Storage & Auth |
| **Heroku/Render** | Deployment |

---

## 📁 Project Structure
