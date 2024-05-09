from fastapi import FastAPI, HTTPException
import sqlite3
import json

app = FastAPI()

def get_db_connection():
    conn = sqlite3.connect('time_series_data.db')
    conn.row_factory = sqlite3.Row  # This enables column access by name: row['column_name']
    return conn

@app.get("/data/")
async def read_data():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM device_data")
        data = cursor.fetchall()
        # Convert row objects to dictionary
        data = [dict(row) for row in data]
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()