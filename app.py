from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',  # Change this in production
        SQLALCHEMY_DATABASE_URI='sqlite:///instance/database.db',
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )

    CORS(app)

    @app.route('/')
    def index():
        return "Welcome to the Flask App!"

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)