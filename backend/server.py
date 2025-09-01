from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Modèles pour les contacts
class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nom: str
    prenom: str
    email: str
    telephone: str
    entreprise: Optional[str] = None
    service: str
    message: str
    urgence: bool = False
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="nouveau")

class ContactFormCreate(BaseModel):
    nom: str
    prenom: str
    email: str
    telephone: str
    entreprise: Optional[str] = None
    service: str  
    message: str
    urgence: bool = False

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Endpoints pour les contacts
@api_router.post("/contact", response_model=ContactForm)
async def create_contact(input: ContactFormCreate):
    """Recevoir une demande de contact depuis le formulaire"""
    contact_dict = input.dict()
    contact_obj = ContactForm(**contact_dict)
    
    # Sauvegarder en base de données
    await db.contacts.insert_one(contact_obj.dict())
    
    # Log pour debug
    urgence_text = "🚨 URGENCE 24/7" if contact_obj.urgence else "📧 Normal"
    logger.info(f"{urgence_text} - Nouveau contact: {contact_obj.prenom} {contact_obj.nom} ({contact_obj.email}) - Service: {contact_obj.service}")
    
    return contact_obj

@api_router.get("/contact", response_model=List[ContactForm])
async def get_contacts():
    """Récupérer toutes les demandes de contact (pour back office)"""
    contacts = await db.contacts.find().sort("timestamp", -1).to_list(1000)
    return [ContactForm(**contact) for contact in contacts]

@api_router.get("/contact/urgent")
async def get_urgent_contacts():
    """Récupérer uniquement les demandes urgentes"""
    urgent_contacts = await db.contacts.find({"urgence": True}).sort("timestamp", -1).to_list(100)
    return [ContactForm(**contact) for contact in urgent_contacts]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
