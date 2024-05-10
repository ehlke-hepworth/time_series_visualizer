from fastapi.testclient import TestClient
from main import app  

client = TestClient(app)

def test_read_data():
    response = client.get("/data/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)  

def test_read_data_content():
    response = client.get("/data/")
    data = response.json()
   
    if data:  
        assert 'parameter' in data[0]
        assert 'value' in data[0]
