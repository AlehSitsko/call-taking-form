# 🛣️ Call Taking Form – Roadmap

This document outlines the planned features and development milestones for the Call Taking Form project.

---

## ✅ MVP Complete (v0.3)
- Core form structure with caller/patient info
- Return ride support (with Will Call and waiting time)
- Optional price calculator with breakdown
- Print support with clean layout
- Email export (via `mailto:` + `.txt` file generation)
- Modular JavaScript (main/ui/pricing/form/patient)

---

## 🔜 High Priority
- [ ] **Patient database UI** (`patients.html`)
  - Search by last name / first name / DOB
  - Add and edit patient records
  - Simple local storage or JSON structure

- [ ] **Trip history per patient**
  - Auto-log each trip submission
  - View past trip records from the patient pane

- [ ] **Auto-fill form from selected patient**
  - Populate main form when patient is selected

- [ ] **Improved file export**
  - Add PDF generation option
  - Enable `.json` export for data reuse or import

---

## 🧠 Mid Priority
- [ ] **Insurance info block**
  - List of supported insurance companies
  - Flags: requires copay / authorization needed

- [ ] **Server-side email (SMTP / Flask-Mail)**
  - Send email without opening a mail client
  - Enables backend logging and future audit trail

- [ ] **Role-based access**
  - Dispatcher vs admin roles
  - Optional authentication system

- [ ] **Mileage calculation**
  - Estimate miles between addresses using:
    - Google Maps API, Mapbox, or Leaflet.js

---

## 💻 Platform Expansion
- [ ] **Offline-first version**
  - Use local storage or IndexedDB
  - Save trips while offline and sync later

- [ ] **Electron desktop build**
  - Fully self-contained desktop app
  - Ideal for field use in EMS dispatch

- [ ] **Mobile UI improvements**
  - Better layout on tablets/phones
  - Collapsible panels, larger inputs

---

## 🧪 Experimental Ideas (Future)
- Voice input for call takers
- Real-time crew assignment from map
- AI summarization of patient instructions