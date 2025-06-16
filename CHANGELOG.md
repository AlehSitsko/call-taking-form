# Changelog

All notable changes to this project will be documented in this file.

---

## [Unreleased]

- Patients page (`patients.html`) under development
- Email sending logic via `mailto:` + file generation (planned)
- Insurance info section (low priority)
- Deployment pipeline and GitHub Pages setup

---

## [2025-06-16] — Price Breakdown & Print Optimization

### Added
- 📦 Detailed price breakdown block showing base, mileage, wait time, and total cost
- 🖨️ Print mode support for pricing: `#priceBreakdownContainer` displays cleanly on print
- 💡 Visual layout enhancements with `.price-print-block` and improved spacing

### Changed
- Price output relocated into calculator pane (under the form)
- Refactored `@media print` CSS to suppress inputs and show results only

### Removed
- FAQ visibility on printed version (hidden via `#faqSection` rule)

---

## [2025-06-13]

### Added
- Auto-expanding `<textarea>` fields
- Mobile-first responsive layout with media queries
- Initial print-friendly layout (hidden controls, clear sections)

### Fixed
- Removed stray `initFormLogic()` call causing JS crash
- Moved dynamic caller input (`#otherCallerType`) outside `<select>` block
- Resolved duplicate `id="waitingTimeCharge"` conflict in return section

### Improved
- English comments added to `style.css`
- Modular JS logic: `main.js` only initializes active modules

---

## [2025-05-27]

### Added
- FAQ/help section with guidelines for service selection
- Instruction labels under calculator and form
- Toggle to enable calculator manually
- Checkbox to exclude miles from pricing
- Price Calculator moved to right-side panel
- Return Ride section with address autofill logic and Will Call mode
- Field for Waiting Time Charge
- Support for Fixed Price service input

### Fixed
- Return Ride section not toggling correctly
- Removed unsupported service types from dropdown (`emergency`, `privateTransfer`)
- Logic bug with sync between run type and service type
- Mobile layout adjustments

---

## [2025-05-23]

### Added
- Basic Price Calculator (miles × multiplier)
- Fixed Price override
- Round-trip price calculation

### Fixed
- Display errors with invalid inputs
- Price not updating when mileage is blank or invalid

---

## [2025-05-21]

### Added
- Toggleable Return Ride section with address mirror logic
- Will Call checkbox logic and styling

---

## [2025-05-20]

### Added
- Initial HTML structure: Caller Info, Patient Info, Run Type
- Baseline layout and form sections
