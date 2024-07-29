from app_init import create_app
from updated_routes.user_routes import user_bp
from updated_routes.resume_routes import resume_bp
from updated_routes.job_offerer_routes import job_offerer_bp
from updated_routes.job_posting_routes import job_posting_bp
from updated_routes.job_seeker_routes import job_seeker_bp
from updated_routes.interview_routes import interview_bp
from updated_routes.application_routes import application_bp
from updated_routes.messages_routes import message_bp
# from updated_routes.auth_routes import auth_bp  # Import the auth blueprint

app = create_app()
app.register_blueprint(user_bp)
app.register_blueprint(resume_bp)
app.register_blueprint(job_offerer_bp)
app.register_blueprint(job_posting_bp)
app.register_blueprint(job_seeker_bp)
app.register_blueprint(interview_bp)
app.register_blueprint(application_bp)
app.register_blueprint(message_bp)
# app.register_blueprint(auth_bp, url_prefix='/auth')  # Register the auth blueprint

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == "__main__":
    app.run(debug=True, port=8000)


# from app_init import create_app
# from updated_routes.user_routes import user_bp
# from updated_routes.resume_routes import resume_bp
# from updated_routes.job_offerer_routes import job_offerer_bp
# from updated_routes.job_posting_routes import job_posting_bp
# from updated_routes.job_seeker_routes import job_seeker_bp
# from updated_routes.interview_routes import interview_bp
# from updated_routes.application_routes import application_bp
# from updated_routes.messages_routes import message_bp
# from updated_routes.auth_routes import auth_bp

# app = create_app()
# app.register_blueprint(user_bp)
# app.register_blueprint(resume_bp)
# app.register_blueprint(job_offerer_bp)
# app.register_blueprint(job_posting_bp)
# app.register_blueprint(job_seeker_bp)
# app.register_blueprint(interview_bp)
# app.register_blueprint(application_bp)
# app.register_blueprint(message_bp)
# app.register_blueprint(auth_)


# @app.route('/')
# def hello_world():
#     return 'Hello, World!'

# if __name__ == "__main__":
#     app.run(debug=True, port=8000)
