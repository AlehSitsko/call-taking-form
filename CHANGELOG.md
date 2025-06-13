# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [2025-06-13]
### Added
- Auto-expanding behavior for all `<textarea>` fields
- Responsive design for mobile via media queries
- Print-specific styles to hide calculator and simplify layout

### Fixed
- Removed invalid `initFormLogic()` call that caused JS errors
- Moved `#otherCallerType` input outside `<select>` for valid HTML structure
- Corrected duplicate ID conflict for `waitingTimeCharge` fields

### Improved
- English comments added throughout `style.css`
- Modular JS setup cleaned: only implemented modules are initialized

## [2025-05-27]
### Added
- FAQ section with weight-based service selection guide
- Instructions below calculator and main form
- Enable Calculator toggle
- Option to exclude miles from calculation
- Price Calculator relocated to right pane
- Return Ride section with address autofill and Will Call toggle
- Waiting Time Charge field
- Support for Fixed Price and custom input logic

### Fixed
- Return Ride section not displaying correctly
- Emergency and Private Transfer service types removed from dropdown
- Dynamic switching between run type and service type
- UI rendering issues on mobile

## [2025-05-23]
### Added
- Initial Price Calculator integration (miles + serviceType)
- Fixed Price mode
- Display of round-trip pricing

### Fixed
- Display errors on invalid service types
- Price not updating when miles empty or invalid

## [2025-05-21]
### Added
- Return Ride section toggle with auto-copy of addresses
- Will Call checkbox logic

## [2025-05-20]
### Added
- Core HTML structure: Caller Type, Run Type, Patient Info
- Initial layout and forms for data collection