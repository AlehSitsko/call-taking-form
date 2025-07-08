import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# 1) Single SQLAlchemy instance
db = SQLAlchemy()

def create_app():
    # 2) Flask factory
    app = Flask(__name__, instance_relative_config=True)
    os.makedirs(app.instance_path, exist_ok=True)

    # 3) Configure SQLite
    db_path = os.path.join(app.instance_path, 'database.db')
    app.config.from_mapping(
        SECRET_KEY='dev',
        SQLALCHEMY_DATABASE_URI=f"sqlite:///{db_path}",
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )

    # 4) Init extensions
    db.init_app(app)
    CORS(app)

    # 5) Register blueprints & create tables
    with app.app_context():
        from api.patients import patients_bp
        app.register_blueprint(patients_bp, url_prefix='/api')
        db.create_all()

    @app.route('/')
    def index():
        return "Welcome to the Flask App!"

    return app

# 6) Only run when executed directly
if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
