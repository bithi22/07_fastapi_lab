from fastapi import FastAPI, Body, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


uri = "mongodb+srv://shahanazsharmin66:bithi125024@cluster0.7pbwh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
db = client["User_info"]
collection = db["users"]

app = FastAPI()
origins = ["http://localhost:3000", "http://127.0.0.1:8000","http://192.168.1.10:3000"]
app.add_middleware(
    CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

class User(BaseModel):
    username: str
    password: str
    email: str
    phone: str



@app.post("/register")
async def register(user: User):

    existing_user = collection.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")


    user_data = user.model_dump()
    collection.insert_one(user_data)
    return {"message": "Registration Successful."}
