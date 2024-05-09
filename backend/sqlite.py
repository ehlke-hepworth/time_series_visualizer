import os
import sqlite3
import json

# Get the directory path and JSON file path
dir_path = os.path.dirname(os.path.realpath(__file__))
json_file_path = os.path.join(dir_path, 'data', 'sample10k.json')
with open(json_file_path, 'r') as file:
    data = json.load(file)
# Connect to the SQLite database
conn = sqlite3.connect('time_series_data.db')
cursor = conn.cursor()


# Create a table
sql_create_table = '''CREATE TABLE IF NOT EXISTS device_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parameter VARCHAR(255),
    timestamp DATETIME,
    value TEXT,
    type VARCHAR(50),
    device_name VARCHAR(255)
)'''
cursor.execute(sql_create_table)


# Insert data into the table
insert_sql = '''INSERT INTO device_data (parameter, timestamp, value, type, device_name)
                VALUES (?, ?, ?, ?, ?)'''
for device_key, entries in data.items():
    for item in entries:
        cursor.execute(insert_sql, (item['parameter'], item['timestamp'], item['value'], item['type'], device_key))

# Commit changes and close the connection
conn.commit()
conn.close()