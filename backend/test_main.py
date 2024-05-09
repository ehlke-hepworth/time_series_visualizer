# test_main.py
from fastapi.testclient import TestClient
from main import app  # Import your FastAPI app

client = TestClient(app)

def test_read_data():
    response = client.get("/data/")
    assert response.status_code == 200  # Check for successful response status
    data = response.json()
    assert isinstance(data, dict)  # Check if the response is a dictionary
    
    # Check for specific keys and their types
    expected_keys = ['device.bar','device.foo']  
    for key in expected_keys:
        assert key in data
        assert isinstance(data[key], list)
        if data[key]:  # Check if the list is not empty
            assert all(isinstance(item, dict) for item in data[key])
            # Optionally, check for specific fields in the dictionaries
            for item in data[key]:
                assert 'parameter' in item
                assert 'timestamp' in item
                assert 'type' in item
                assert 'value' in item