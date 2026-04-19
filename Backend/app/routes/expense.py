from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.expense import Expense
from app.schemas.expense_schema import ExpenseCreate, ExpenseUpdate
from app.services.ai_service import categorize_expense

router = APIRouter(prefix="/expenses", tags=["Expenses"])

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ADD EXPENSE
@router.post("/")
def add_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    
    #  AI service
    category = categorize_expense(expense.description)

    new_expense = Expense(
        user_id=1,
        amount=expense.amount,
        description=expense.description,
        category=category,
        date=expense.date
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return {
        "message": "Expense added successfully",
        "category": category
    }

# GET ALL EXPENSES
@router.get("/")
def get_expenses(db: Session = Depends(get_db)):
    expenses = db.query(Expense).all()
    return expenses

# DELETE EXPENSE
@router.delete("/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    expense = db.query(Expense).filter(Expense.id == expense_id).first()

    if expense:
        db.delete(expense)
        db.commit()
        return {"message": "Deleted successfully"}

    return {"error": "Expense not found"}

# UPDATE EXPENSE
@router.put("/{expense_id}")
def update_expense(expense_id: int, updated_expense: ExpenseUpdate,  db: Session = Depends(get_db)):
    
    expense = db.query(Expense).filter(Expense.id == expense_id).first()

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    
     # Only update category if description changed
    if expense.description != updated_expense.description:
        expense.category = categorize_expense(updated_expense.description)


    expense.amount = updated_expense.amount
    expense.description = updated_expense.description
    expense.date = updated_expense.date

    db.commit()
    db.refresh(expense)

    return {"message": "Expense updated successfully"}