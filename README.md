# 📝 Call Taking Form

Web-based EMS trip intake form with built-in price calculator, mobile support, and future-ready modular expansion.

## 🔗 Live Demo  
**Use it directly:**  
[https://alehsitsko.github.io/call-taking-form/](https://alehsitsko.github.io/call-taking-form/)

## 📁 Project Structure

project/
├── index.html # Main form
├── patients.html # (Upcoming) Patient DB interface
├── css/
│ └── style.css # Main and print styles
├── js/
│ ├── main.js # Initialization
│ ├── ui.js # DOM/UI behavior
│ ├── pricing.js # Price calculator
│ ├── form.js # Submission/event logic
│ └── patient.js # Patient DB logic (WIP)


---

## ✨ Features

- Modular intake form for EMS calls
- Return ride and "Will Call" logic
- Dynamic price calculator:
  - Base price by service type
  - Mileage (with optional exclusion)
  - Waiting time charges
  - One-way and round-trip totals
- Smart layout (desktop and mobile)
- Print-optimized billing summary
- Future integration with database and email

---

## 🧾 Price Calculator & Print Support

The price calculator now provides a detailed cost breakdown, including:
- Base service price
- Mileage
- Waiting time
- Full and return trip totals

### 📋 Display
- Breakdown shown **directly below** the calculator
- Clean, formatted block for clarity

### 🖨️ Print Mode
- Inputs and buttons hidden
- Summary block preserved
- FAQ and helper elements suppressed

Built to ensure a readable, billable printout with zero clutter.

---

## 🔜 Roadmap

- [ ] **Patient page** (`patients.html`) with local DB + edit
- [ ] History of trips per patient
- [ ] File generation + prefilled email draft
- [ ] Insurance info block (copay/auth)
- [ ] Mileage calculation via maps
- [ ] Role-based permissions
- [ ] Offline-first or Electron build

---
---

## 🧑‍💻 Author

**Aleh Sitsko**  
EMS Manager • Software Developer-in-Progress  
Philadelphia, PA 🇺🇸

## 📄 License

MIT — free use, change, attribution appreciated.