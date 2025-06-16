# 📝 Call Taking Form

A lightweight, modular EMS intake form with built-in price calculator, print/export tools, and planned patient database integration.

---

## 🔗 Live Demo

Use it directly from GitHub Pages:  
👉 [https://alehsitsko.github.io/call-taking-form/](https://alehsitsko.github.io/call-taking-form/)

---

## 📁 Project Structure

index.html # Main call-taking interface
patients.html # Patient search and edit module (in progress)
css/
└── style.css # Visual layout and print rules
js/
├── main.js # App entry point: print, email, init
├── ui.js # UI interactions (toggle sections, visibility)
├── pricing.js # Price calculator logic
├── form.js # Field helpers, future validation
└── patient.js # Future patient DB logic

---

## ✅ Features

- Structured EMS call intake with caller and patient info
- Return ride support (incl. Will Call and wait time)
- Optional price calculator (base rate, miles, wait time)
- Email export with downloadable `.txt` trip file
- Print-friendly layout (clean, readable output)
- Responsive layout (usable on tablets and mobile)
- Modular JavaScript for easy maintenance and growth

---

## 🚀 How to Use

1. Fill out trip details in the left panel.
2. (Optional) Enable and configure the price calculator on the right.
3. Click **Print** to generate a paper copy.
4. Click **Send Email** to:
   - auto-generate a `.txt` file with trip details;
   - open a prefilled email with the same content.

---

## 🧾 Price Calculator & Print Mode

**Breakdown Includes:**
- Base service rate (BLS/ALS/etc.)
- Mileage
- Waiting time
- Optional round-trip total

**Print Mode:**
- Inputs and controls are hidden
- Summary block stays visible
- FAQ/help sections are suppressed
- Result: clean, professional output for billing or dispatch

---

## 📌 Roadmap

- [ ] Patient management page (`patients.html`) with local DB
- [ ] Call history per patient
- [ ] PDF export and prefilled server-side email
- [ ] Insurance block (copay, authorization flag)
- [ ] Distance calculation via maps (e.g., Leaflet, Mapbox)
- [ ] Role-based access control
- [ ] Offline-capable or desktop (Electron) version

---

## 🧑‍💻 Author

**Aleh Sitsko**  
EMS Manager • Software Developer-in-Progress  
Philadelphia, PA 🇺🇸

## 📄 License

MIT — free use, change, attribution appreciated.