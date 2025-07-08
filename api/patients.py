from datetime import date
from flask import Blueprint, request, jsonify, abort
from app import db                    # only import the global SQLAlchemy()
from models.patient import Patient    # your ORM model

patients_bp = Blueprint('patients', __name__)

@patients_bp.route('/patients', methods=['GET'])
def list_patients():
    """
    GET /api/patients
    Optional query params:
      - name:  filter by first_name or last_name (case-insensitive, partial match)
      - dob:   filter by exact date of birth (YYYY-MM-DD)
    Returns list of patient dicts.
    """
    name = request.args.get('name')
    dob = request.args.get('dob')

    query = Patient.query
    if name:
        pattern = f"%{name}%"
        query = query.filter(
            (Patient.first_name.ilike(pattern)) |
            (Patient.last_name.ilike(pattern))
        )
    if dob:
        try:
            dob_obj = date.fromisoformat(dob)
        except ValueError:
            abort(400, description="Invalid dob format; expected YYYY-MM-DD")
        query = query.filter_by(dob=dob_obj)

    patients = query.all()
    return jsonify([p.to_dict() for p in patients])


@patients_bp.route('/patient', methods=['POST'])
def create_patient():
    """
    POST /api/patient
    Body JSON must include first_name, last_name, dob.
    Returns { "id": new_patient_id } on success.
    """
    data = request.get_json() or {}
    for field in ('first_name', 'last_name', 'dob'):
        if field not in data:
            abort(400, description=f"Missing field: {field}")

    # parse dob
    try:
        dob_obj = date.fromisoformat(data['dob'])
    except ValueError:
        abort(400, description="Invalid dob format; expected YYYY-MM-DD")

    patient = Patient(
        first_name=data['first_name'],
        last_name=data['last_name'],
        dob=dob_obj,
        phone=data.get('phone'),
        address=data.get('address'),
        insurance=data.get('insurance'),
        notes=data.get('notes')
    )
    db.session.add(patient)
    db.session.commit()

    return jsonify({'id': patient.id}), 201


@patients_bp.route('/patient/<int:id>', methods=['PUT'])
def update_patient(id):
    """
    PUT /api/patient/<id>
    Body JSON may include any of: first_name, last_name, dob, phone, address, insurance, notes.
    Returns 204 No Content on success.
    """
    patient = Patient.query.get_or_404(id)
    data = request.get_json() or {}

    if 'dob' in data:
        try:
            patient.dob = date.fromisoformat(data['dob'])
        except ValueError:
            abort(400, description="Invalid dob format; expected YYYY-MM-DD")

    # update other fields if present
    for attr in ('first_name', 'last_name', 'phone', 'address', 'insurance', 'notes'):
        if attr in data:
            setattr(patient, attr, data[attr])

    db.session.commit()
    return '', 204