from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database URL, adjust the path as needed
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

# Create the SQLAlchemy engine
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# SessionLocal class will be used to create database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class will be used to define models
Base = declarative_base()

class SensorData(Base):
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime)
    value = Column(Float)
    type = Column(String)

# Create the database tables based on the models
Base.metadata.create_all(bind=engine)