# Call Taking Form and Price Calculator

A modular HTML/JavaScript web application for managing ambulance call-taking, calculating service prices, and optionally collecting patient data. Designed for internal dispatch/logistics usage.

---

## 🔧 Features

- Modular form system for caller and patient information
- Dynamic "Other" field for custom caller types
- Optional Return Ride section with autofill for reversed addresses
- “Will Call” logic to handle uncertain return times
- Independent and manually enabled price calculator
- Service type selection based on patient weight
- Mileage-based and fixed-price calculations
- Waiting Time Charge field
- Print-friendly layout (PDF-ready)
- Modern UI layout with left/right panes
- Modular JavaScript structure (UI, pricing, form, patient DB placeholder)
- 📝 Auto-expanding textareas for better input visibility
- 📱 Responsive layout using CSS media queries
- 🖨️ Print-friendly formatting (form only, hides calculator)

---

## 🔗 Live Demo  
**Use it directly:**  
[https://alehsitsko.github.io/call-taking-form/](https://alehsitsko.github.io/call-taking-form/)


---

## 💡 How to Use

### Left Panel (Main Form)

- **Caller Type / Name** → Who is calling  
  - If "Other" is selected, an additional field will appear to specify custom caller type
- **Run Type** → Type of medical transport
- **Patient Info** → Names, DOB, addresses, appointment time
- **Return Ride** → Check the box to activate and reverse pickup/destination
- **Will Call** → If return time is unknown
- **Waiting Time Charge** → Optional fee added if crew must wait

### Right Panel (Optional Price Calculator)

- Enable manually when needed (patient-paid trips or uninsured rides)
- **Service Type selection based on patient weight:**
  - 1–240 lbs → `BLS`
  - 241–300 lbs → `BLS3`
  - 301–400 lbs → `BLS4`
  - 401+ lbs → `BLS6`
  - `ALS` → If paramedic is required
- **Exclude Miles** → Optionally disable mileage charge
- **Add Waiting Time Charge** → Included once (not doubled for return)
- **Print** → Generate PDF or print using your browser

---

## 🔮 Planned Features

### A. Pricing Enhancements

- [ ] Round-trip logic with double mileage
- [ ] Invoice/PDF export with cost breakdown
- [ ] Insurance logic (copay/auth)

### B. Patient DB

- [ ] Add patient saving locally or via Flask backend
- [ ] Search by name / DOB
- [ ] Save complete form entries as JSON
- [ ] History log of calls
- [ ] Long-term SQL storage

### C. UI and Behavior

- [ ] Auto-expand textareas
- [ ] Age calculation from DOB
- [ ] Auto-capitalize names
- [ ] Required field validation

### D. Extra / Low Priority

- [ ] Map integration (Leaflet or Google Maps)
- [ ] Distance calculation from addresses
- [ ] Email dispatch of call summaries

---

> Built with precision by Aleh Sitsko  
> Feedback and contributions are welcome