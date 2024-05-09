from fastapi.testclient import TestClient
from main import app  # Import the FastAPI app from your main.py

client = TestClient(app)

def test_read_data():
    response = client.get("/data/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)  # Assuming the endpoint returns a list of dictionaries

def test_read_data_content():
    response = client.get("/data/")
    data = response.json()
    # Perform a more specific test if you know the structure of your data
    if data:  # Only perform this check if there is data returned
        assert 'parameter' in data[0]
        assert 'value' in data[0]