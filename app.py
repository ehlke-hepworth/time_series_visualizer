from fastapi import FastAPI
from fastapi.responses import FileResponse
import os

app = FastAPI()

@app.get("/data")
async def read_data():
    data_path = os.path.join('data', 'sample10k.json')  # Adjust the path according to your file location
    return FileResponse(data_path)
