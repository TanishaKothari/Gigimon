import mysql.connector
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

# Connect to mysql database
mydb = mysql.connector.connect(
  host=os.getenv("DB_HOST"),
  user=os.getenv("DB_USER"),
  password=os.getenv("DB_PASSWORD")
)
cursor = mydb.cursor()
cursor.execute("USE gigapp")

# Create tables in db
cursor.execute("CREATE TABLE IF NOT EXISTS jobs (user_id VARCHAR(36) NOT NULL, job_name VARCHAR(100) NOT NULL, PRIMARY KEY (user_id, job_name))")
cursor.execute("CREATE TABLE IF NOT EXISTS needs (user_id VARCHAR(36) NOT NULL, need_name VARCHAR(100) NOT NULL, PRIMARY KEY (user_id, need_name))")

# Insert into jobs
@app.route('/insert-job', methods=['POST'])
def insertUserJob():
    data = request.get_json()
    user_id = data.get('user_id')
    job_name = data.get('job_name')
    cursor.execute("INSERT INTO jobs VALUES (%s, %s)", (user_id, job_name))
    mydb.commit()
    return jsonify({'status': 'success'})

# Insert into needs
@app.route('/insert-need', methods=['POST'])
def insertUserNeed():
    data = request.get_json()
    user_id = data.get('user_id')
    need_name = data.get('need_name')
    try:
      cursor.execute("INSERT INTO needs VALUES (%s, %s)", (user_id, need_name))
      mydb.commit()
    except mysql.connector.Error as err:
        return jsonify({'status': 'error', 'message': str(err)}), 400
    matched_users = match(need_name)
    return jsonify({'status': 'success', 'matched_users': matched_users})

# Match person with a need with people who can do that job
def match(need_name):
    cursor.execute("SELECT user_id FROM jobs WHERE job_name = %s", (need_name,))
    users = [row[0] for row in cursor.fetchall()]
    return users


if __name__ == '__main__':
    app.run(debug=True)