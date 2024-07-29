from flask import Flask, render_template
import mysql.connector

app = Flask(__name__)

# Database configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'college24'
app.config['MYSQL_DB'] = 'JobConnect'

# Initialize MySQL connection
def get_db_connection():
    connection = mysql.connector.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB']
    )
    return connection

# Define routes for each table

@app.route('/')
def home():
    return 'Welcome to the JobConnect App!'


@app.route('/jobseekers')
def get_jobseekers():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM JobSeeker')
    jobseekers = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('jobseekers.html', jobseekers=jobseekers)

@app.route('/interviews')
def get_interviews():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Interview')
    interviews = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('interviews.html', interviews=interviews)

@app.route('/jobofferers')
def get_jobofferers():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM JobOfferer')
    jobofferers = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('jobofferers.html', jobofferers=jobofferers)

@app.route('/jobpostings')
def get_jobpostings():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM JobPosting')
    jobpostings = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('jobpostings.html', jobpostings=jobpostings)

@app.route('/messages')
def get_messages():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Message')
    messages = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('messages.html', messages=messages)

@app.route('/resumes')
def get_resumes():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Resume')
    resumes = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('resumes.html', resumes=resumes)

@app.route('/revenue')
def get_revenue():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Revenue')
    revenue = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('revenue.html', revenue=revenue)

@app.route('/users')
def get_users():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM User')
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('users.html', users=users)

if __name__ == '__main__':
    app.run(debug=True)

