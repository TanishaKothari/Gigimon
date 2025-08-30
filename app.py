import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

mydb = mysql.connector.connect(
  host=os.getenv("DB_HOST"),
  user=os.getenv("DB_USER"),
  password=os.getenv("DB_PASSWORD")
)
cursor = mydb.cursor()
cursor.execute("USE gigapp")
cursor.execute("CREATE TABLE IF NOT EXISTS jobs (user_id VARCHAR(36) NOT NULL, job_name VARCHAR(100) NOT NULL, PRIMARY KEY (user_id, job_name))")
cursor.execute("CREATE TABLE IF NOT EXISTS needs (user_id VARCHAR(36) NOT NULL, need_name VARCHAR(100) NOT NULL, PRIMARY KEY (user_id, need_name))")