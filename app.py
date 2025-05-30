from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import os
import uuid
import jwt
import Dashboard from "./src/components/Dashboard";
from datetime import datetime, timedelta
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize Flask app with React build folder
app = Flask(__name__, static_folder="frontend/build", static_url_path="/")
CORS(app)

# In-memory user store for Render (non-persistent)
users = []

# Secret key for JWT
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "Us8vGARh31iSm7UJ409mwl9rMfoZGrBP")

# JWT decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            parts = request.headers['Authorization'].split(" ")
            if len(parts) == 2:
                token = parts[1]
        if not token:
            return jsonify({"error": "Token is missing"}), 401
        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            request.user_id = data["user_id"]
        except:
            return jsonify({"error": "Token is invalid"}), 401
        return f(*args, **kwargs)
    return decorated

# Register route
@app.route("/api/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if any(user["email"] == email for user in users):
            return jsonify({"error": "User already exists"}), 400

        new_user = {
            "id": str(uuid.uuid4()),
            "email": email,
            "password": generate_password_hash(password)
        }
        users.append(new_user)
        return jsonify({"message": "User registered"}), 201
    except Exception as e:
        print(e)
        return jsonify({"error": "Registration error"}), 500

# Login route
@app.route("/api/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        for user in users:
            if user["email"] == email and check_password_hash(user["password"], password):
                token = jwt.encode({
                    "user_id": user["id"],
                    "exp": datetime.utcnow() + timedelta(hours=24)
                }, app.config["SECRET_KEY"], algorithm="HS256")
                return jsonify({"token": token})
        return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        print(e)
        return jsonify({"error": "Login error"}), 500

# Protected test routes
@app.route("/api/customer", methods=["GET"])
@token_required
def customer():
    return jsonify({"message": "Customer dashboard"})

@app.route("/api/admin", methods=["GET"])
@token_required
def admin():
    return jsonify({"message": "Admin dashboard"})

# React static file handling
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    try:
        file_path = os.path.join(app.static_folder, path)
        if path != "" and os.path.exists(file_path):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, "index.html")
    except Exception as e:
        print(f"Error serving path '{path}': {e}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(debug=True)
