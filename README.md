# Time Series Visualizer

## Description and Features
This application reads Factory X's time-series data (in JSON format) captured from a several sensors through a set of monitoring devices.
The data is then pushed into SQLite database, adding a column which stores the device name.
The Python-based API, FastAPI, retrieves the data from SQLite and uploads it into a localhost.
A web application is created using React.js to visualise this time-series data.

## Technology Stack
SQLite, FastAPI, Python, React.js

## Installation
### Prerequisites
#### Backend
Packages to be installed are listed in backend/requirements.txt, and are as follows:
- fastapi=i=0.111.0
- uvicorn==0.29.0
- pytest==8.2.0
These tools can be installed by running in your terminal:
pip install [package]


#### Frontend
In the frontend/ directrory, download and install from [Node.js official website](https://nodejs.org/en/download/).
Be sure to download the appropriate version for your Operating System.
- node.js [node v16.20.2]
- npm [npm 8.19.4]


Once node is intalled, run:
    ```npm install```
And then run:
    ```npm install express cors axios```


### Backend Setup
Ensure your are in the backend/ directory for the following steps

1. To push the date onto the SQLite database, in your terminal, run:

    ```python sqlite.py```

2. To test whether Step 1 was successful, run the following unit test:

    ```pytest sqlite_unittest.py```


3. To retrieve the data from SQLite database using FastAPI, in your terminal, run:

    ```uvicorn main:app --reload```

4. To test that the data has been successfully retrieved using FastAPI, in your browser, type:

    ```http://localhost:8000/data/```

5. To further test that the data has been successfully retrieved using FastAPI, run a unit test:

    ```pytest fastapi_unittest.py```


### Frontend Setup
Ensure you are in frontend/ for the following steps
These steps take place after following the "Backend Setup" instructions

6. To ensure you are granting React (in localhost:3000) access to the data (in localhost:8000/data/), in your terminal, run:

    ```node server.js```
- THis will execuse server.js to "listen to" the data in localhost:8001/data/ which is then where the data will be fetched from for visualisation using React.

8. To open the web application, in your terminal run:

    ```npm start```

## Guidance using Examples
The following screenshots are examples of what you should expect after running a given command

### Backend Setup
#### Steps 1 & 2
At Step 1, you converted the JSON data into a database. Step 2 is a unit test to ensure this has successfully been implemented.
The unittest should look 
The dataset should look as follows:

![Screenshot of the result from Step 2](images/Step2.png "Screenshot of the result from Step 2")

#### Step 3
After successfully running Step 3 (retrieving the data from SQLite using FastAPI),
your terminal should look as follows:

![Screenshot of the result from Step 3](images/Step3.png "Screenshot of the result from Step 5")

#### Step 4 
After Step 4, opening localhost:8000/data/ in your web browser should look as follows: 

![Screenshot of the result from Step 5](images/Step4.png "Screenshot of the result from Step 4")

#### Step 5
Step 5 is a unit test which provides an additional way to track if the data was successfully retrieved using FastAPI.
After a successful run, your terminal should look as follows:

![Screenshot of the result from Step 5](images/Step5.png "Screenshot of the result from Step 5")


### Frontend Setup
#### Steps 6
After successfully running Step 6 (granting access to data retrieved from backend to display on frontend),
the dataset should look as follows in your terminal:

![Screenshot of the result from Step 6](images/Step6.png "Screenshot of the result from Step 6")

#### Steps 7
You made it!
After Step 7 (visualising the data)
The landing page will look as follows:

![Screenshot of the result from Step 7](images/Step7.png "Screenshot of the result from Step 7")

There are two dropdown menues which provide access to data (numeric and text)
![Screenshot of the result from Numeric visualisationn](images/Step8.png "Screenshot of the result from Numeric visualisationn")

Each datasource shows two datasets, one numerice and the other text.
![Screenshot of the result from Numeric visualisationn](images/Step9.png "Screenshot of the result from Numeric visualisationn")

Each datasource shows two datasets, one numerice and the other text.
![Screenshot of the result from Text visualisation](images/Step10.png "Screenshot of the result from Text visualisation")

## Contact Information
ehlke.hepworth@outlook.com