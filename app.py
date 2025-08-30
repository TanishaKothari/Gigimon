import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

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

# Function: insert into jobs
def insertUserJob(user_id, job_name):
    cursor.execute("INSERT INTO jobs VALUES (%s, %s)", (user_id, job_name))

# Function: insert into needs
def insertUserNeed(user_id, need_name):
    cursor.execute("INSERT INTO needs VALUES (%s, %s)", (user_id, need_name))
    match(need_name)

# Match person with a need with people who can do that job
def match(need_name):
    cursor.execute("SELECT user_id FROM jobs WHERE job_name = %s", need_name)