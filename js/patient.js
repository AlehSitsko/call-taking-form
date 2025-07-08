/**
 * patient.js
 * Helpers for calling the Flask Patient API.
 */

/**
 * Search for patients by name and/or dob.
 * @param {string} name
 * @param {string} dob    // YYYY-MM-DD
 * @returns {Promise<Array<Object>>}
 */
async function searchPatient(name, dob) {
  const params = new URLSearchParams();
  if (name) params.append('name', name);
  if (dob)  params.append('dob', dob);

  const res = await fetch('/api/patients?' + params.toString());
  if (!res.ok) {
    throw new Error(`Search failed (${res.status})`);
  }
  return res.json();
}

/**
 * Create or update a patient.
 * @param {Object} data   // { first_name, last_name, dob, ... }
 * @param {number} [id]   // if present, PUT; otherwise POST
 * @returns {Promise<Object|null>}
 */
async function savePatient(data, id) {
  const url    = id ? `/api/patient/${id}` : '/api/patient';
  const method = id ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Save failed (${res.status}): ${err.error || res.statusText}`);
  }
  return id ? null : res.json();
}

// Export for usage in patients.html
export { searchPatient, savePatient };
