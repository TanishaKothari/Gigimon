import mysql.connector
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText

load_dotenv()

app = Flask(__name__)
CORS(app)

# Connect to mysql database
mydb = mysql.connector.connect(
  host=os.getenv("DB_HOST"),
  user=os.getenv("DB_USER"),
  password=os.getenv("DB_PASSWORD"),
  database=os.getenv("DB_NAME")
)
cursor = mydb.cursor()

# Create tables in db
cursor.execute("CREATE TABLE IF NOT EXISTS jobs (user_id VARCHAR(36) NOT NULL, job_name VARCHAR(100) NOT NULL, email VARCHAR(255) NOT NULL, PRIMARY KEY (user_id, job_name))")
cursor.execute("CREATE TABLE IF NOT EXISTS needs (user_id VARCHAR(36) NOT NULL, need_name VARCHAR(100) NOT NULL, location VARCHAR(255), email VARCHAR(255), username VARCHAR(255), PRIMARY KEY (user_id, need_name))")

# Insert into jobs
@app.route('/insert-job', methods=['POST'])
def insertUserJob():
    data = request.get_json()
    user_id = data.get('user_id')
    job_name = data.get('job_name')
    email = data.get('email')
    cursor.execute("INSERT INTO jobs VALUES (%s, %s, %s)", (user_id, job_name, email))
    mydb.commit()
    return jsonify({'status': 'success'})

# Insert into needs
@app.route('/insert-need', methods=['POST'])
def insertUserNeed():
    data = request.get_json()
    user_id = data.get('user_id')
    need_name = data.get('need_name')
    location = data.get('location')
    email = data.get('email')
    username = data.get('username')
    try:
      cursor.execute("INSERT INTO needs VALUES (%s, %s, %s, %s, %s)", (user_id, need_name, location, email, username))
      mydb.commit()
    except mysql.connector.Error as err:
        return jsonify({'status': 'error', 'message': str(err)}), 400
    matched_users = match_and_notify(need_name)
    return jsonify({'status': 'success', 'matched_users': matched_users})

@app.route('/get-needs', methods=['GET'])
def get_needs():
    cursor.execute("SELECT username, need_name, location, email FROM needs")
    needs = [
        {"name": row[0], "job": row[1], "location": row[2], "email": row[3]}
        for row in cursor.fetchall()
    ]
    return jsonify(needs)

# Match person with a need with people who can do that job
def match_and_notify(need_name):
    cursor.execute("SELECT user_id, email FROM jobs WHERE job_name = %s", (need_name,))
    users = cursor.fetchall()

    for user_id, email in users:
        try:
            send_email(
                email,
                f"New gig match for {need_name}",
                f"Hi! Someone needs a {need_name}. Accept if you're interested."
            )
        except Exception as e:
            print(f"Failed to send email to {email}: {e}")

    return [user_id for user_id, email in users]

def send_email(to_email, subject, body):
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT"))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = smtp_user
    msg["To"] = to_email

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, [to_email], msg.as_string())


if __name__ == '__main__':
    app.run(debug=True)