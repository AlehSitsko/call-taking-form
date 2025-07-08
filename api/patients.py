from flask import Blueprint, request, jsonify
from app import db
from models.patient import Patient
from datetime import datetime

patients_bp = Blueprint('patients', __name__)

@patients_bp.route('/patients', methods=['GET'])
def list_patients():
    """
    GET /api/patients?name=<>&dob=<YYYY-MM-DD>
    Returns a JSON array of matching patients.
    """
    name = request.args.get('name', '').strip()
    dob_str = request.args.get('dob', '').strip()

    query = Patient.query

    if name:
        pattern = f"%{name}%"
        query = query.filter(
            Patient.first_name.ilike(pattern) |
            Patient.last_name.ilike(pattern)
        )

    if dob_str:
        try:
            dob = datetime.strptime(dob_str, '%Y-%m-%d').date()
            query = query.filter_by(dob=dob)
        except ValueError:
            return jsonify({ "error": "Invalid date format. Use YYYY-MM-DD." }), 400

    results = query.all()
    return jsonify([p.to_dict() for p in results]), 200

@patients_bp.route('/patient', methods=['POST'])
def create_patient():
    """
    POST /api/patient
    Body JSON: { first_name, last_name, dob(YYYY-MM-DD), [phone, address, insurance, notes] }
    Returns { "id": newId }.
    """
    data = request.get_json() or {}
    try:
        dob = datetime.strptime(data['dob'], '%Y-%m-%d').date()
    except (KeyError, ValueError):
        return jsonify({ "error": "Missing or invalid 'dob'. Use YYYY-MM-DD." }), 400

    p = Patient(
        first_name=data.get('first_name','').strip(),
        last_name=data.get('last_name','').strip(),
        dob=dob,
        phone=data.get('phone'),
        address=data.get('address'),
        insurance=data.get('insurance'),
        notes=data.get('notes'),
    )
    db.session.add(p)
    db.session.commit()
    return jsonify({ "id": p.id }), 201

@patients_bp.route('/patient/<int:id>', methods=['PUT'])
def update_patient(id):
    """
    PUT /api/patient/<id>
    Body JSON: any of first_name, last_name, dob, phone, address, insurance, notes
    Returns 204 No Content.
    """
    patient = Patient.query.get_or_404(id)
    data = request.get_json() or {}

    for field in ('first_name','last_name','phone','address','insurance','notes'):
        if field in data:
            val = data[field]
            setattr(patient, field, val.strip() if isinstance(val, str) else val)

    if 'dob' in data:
        try:
            patient.dob = datetime.strptime(data['dob'], '%Y-%m-%d').date()
        except ValueError:
            return jsonify({ "error": "Invalid 'dob'. Use YYYY-MM-DD." }), 400

    db.session.commit()
    return '', 204
