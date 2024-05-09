from fastapi import FastAPI
import mysql.connector
from mysql.connector import connect, Error
import logging

app = FastAPI()

# Setup basic logging
logging.basicConfig(level=logging.INFO)

# Database connection function
def get_db_connection():
    try:
        connection = connect(
            host="localhost",
            user="root",
            password="YtkAOTp3IwhWS6XPSyncpwZKH!",
            database="time_series_db"
        )
        return connection
    except Error as e:
        logging.error(f"Error: {e}")

@app.get("/data/")
async def read_data():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM device_data")
        data = cursor.fetchall()
        cursor.close()
        connection.close()
        return data
    except Exception as e:
        logging.error(f"Failed to fetch data: {e}")
        raise HTTPException(status_code=500, detail=str(e))