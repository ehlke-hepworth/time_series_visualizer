import mysql.connector
import json
from datetime import datetime
import os

dir_path = os.path.dirname(os.path.realpath(__file__))

# Function to connect to the MySQL database
def connect_to_db():
    return mysql.connector.connect(
        host="localhost",  # or your host, e.g., "127.0.0.1"
        user="root",  # your MySQL username
        password="YtkAOTp3IwhWS6XPSyncpwZKH!",  # your MySQL password
        database="time_series_db"  # your database name
    )

def create_table(db):
    cursor = db.cursor()
    cursor.execute("DROP TABLE IF EXISTS device_data")
    cursor.execute("""
        CREATE TABLE device_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            parameter VARCHAR(255),
            timestamp DATETIME(6),
            value JSON,
            type VARCHAR(50),
            device_name VARCHAR(255)
        )
    """)
    cursor.close()


# Function to insert data into the database
def insert_data(data, device_name):
    db = connect_to_db()
    cursor = db.cursor()
    
    # SQL query to insert data
    query = """
    INSERT INTO device_data (parameter, timestamp, value, type, device_name)
    VALUES (%s, %s, %s, %s, %s)
    """
    
    # Preparing data for insertion
    for item in data:
        parameter = item['parameter']
        timestamp = datetime.fromisoformat(item['timestamp'].replace('Z', '+00:00'))
        value = json.dumps(item['value'])  # Convert value to a JSON string if it's a complex type
        type_val = item['type']
        
        # Executing the SQL query
        cursor.execute(query, (parameter, timestamp, value, type_val, device_name))
    
    db.commit()  # Committing the transaction
    cursor.close()
    db.close()

json_file_path = os.path.join(dir_path, 'data', 'sample10k.json')
# Main function to load JSON and insert data
def main():
    # Load JSON data from a file
    with open(json_file_path, 'r') as file:
        all_data = json.load(file)
    
    # Iterate over each device data key
    for key in all_data:
        if key.startswith('device'):
            data = all_data[key]
            insert_data(data, key)  # Pass the device name as an additional parameter

if __name__ == "__main__":
    main()