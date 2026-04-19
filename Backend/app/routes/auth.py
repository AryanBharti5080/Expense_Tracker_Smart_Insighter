from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserLogin
from app.utils.auth_utils import hash_password, verify_password

router = APIRouter()

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# REGISTER
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    email = user.email.lower()

    existing_user = db.query(User).filter(User.email == email).first()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    new_user = User(
        name=user.name,
        email=email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}

# LOGIN
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    email = user.email.lower()

    db_user = db.query(User).filter(User.email == email).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful"}