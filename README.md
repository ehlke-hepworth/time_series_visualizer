# Time Series Visualizer

## Description and Features
This application reads Factory X's time-series data (in JSON format) captured from a several sensors through a set of monitoring devices.
The data is then pushed into MySQL database, adding a column which stores the device name.
The Python-based API, FastAPI, retrieves the data from MySQL and uploads it into a localhost.
A web application is created using React.js to visualise this time-series data.

## Technology Stack
MySQL, FastAPI, Python, React.js


## Installation

### Prerequisites
#### Backend
Tools to be installed are listed in backend/requirements.txt, and are as follows:
- fastapi==0.111.0
- mysql-connector-python==8.4.0
- uvicorn==0.29.0
- pytest==8.2.0
These tools can be installed by running in your terminal:
pip install [tool]

#### Frontend
- node.js [node v16.20.2]
- npm [npm 8.19.4]
Download and install from [Node.js official website](https://nodejs.org/).

### Backend Setup
Ensure your are in backend/ for the following steps

1. To push the date onto the MYSQL database, in your terminal, run:
python push_mysequal.py
2. To open mySQL to confirm data was successfully stored in the database, in your terminal, run:
mysql -u root -p time_series_db
3. No that you're in MySQL, view the data by running:
SELECT * FROM device_data;
4. Now that you're in MySQL, retrieve the data from MySQL database using FastAPI, in your terminal, run:
uvicorn main:app --reload --host 0.0.0.0 --port 8000

### Frontend Setup
Ensure you are in frontend/ for the following steps
These steps take place after following the "Backend Setup" instructions

5. To ensure you are granting React (in localhost3000) access to the data (in localhost8000), your terminal, run:
node server.js
6. To open the web application, in your terminal run:
npm start

## Running the Application

### Starting the Backend
Instructions on how to run the backend server.

### Starting the Frontend
Instructions on how to start the frontend application.

## Usage
A few examples of useful commands or tasks.

## Contributing
Guidelines for how to contribute to the project.

## License
State the license (if any).

## Contact Information
How to reach you or the maintainer.