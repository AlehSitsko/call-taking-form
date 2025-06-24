from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Create a global SQLAlchemy object for database operations
db = SQLAlchemy()

def create_app():
    # Initialize the Flask application
    app = Flask(__name__, instance_relative_config=True)

    # Configure the app: secret key and database URI
    app.config.from_mapping(
        SECRET_KEY='dev',  # Replace with a secure key in production
        SQLALCHEMY_DATABASE_URI='sqlite:///instance/database.db',
        SQLALCHEMY_TRACK_MODIFICATIONS=False,  # Disable event system to save memory
    )

    # Bind SQLAlchemy to the app
    db.init_app(app)

    # Enable CORS so that the frontend can make API requests
    CORS(app)

    # Register blueprints and create database tables inside the app context
    with app.app_context():
        # Import the patients blueprint and patient model so Flask knows about them
        from api.patients import patients_bp
        from models.patient import Patient

        # Register the patients blueprint under the `/api` URL prefix
        app.register_blueprint(patients_bp, url_prefix='/api')

        # Create any database tables that don't yet exist
        db.create_all()

    @app.route('/')
    def index():
        # A simple health-check endpoint
        return "Welcome to the Flask App!"

    return app

if __name__ == '__main__':
    # Run the application in debug mode for local development
    app = create_app()
    app.run(debug=True)