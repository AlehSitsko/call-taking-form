from app import db

class Patient(db.Model):
    """
    Represents a patient record in the database.
    """
    __tablename__ = 'patient'

    id         = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name  = db.Column(db.String(80), nullable=False)
    dob        = db.Column(db.Date, nullable=False)
    phone      = db.Column(db.String(20))
    address    = db.Column(db.String(200))
    insurance  = db.Column(db.String(100))
    notes      = db.Column(db.Text)

    def to_dict(self):
        """
        Serialize to JSON-friendly dict.
        """
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'dob': self.dob.isoformat(),
            'phone': self.phone,
            'address': self.address,
            'insurance': self.insurance,
            'notes': self.notes,
        }
