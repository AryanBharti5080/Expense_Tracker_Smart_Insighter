def categorize_expense(description: str) -> str:
    desc = description.lower()

    categories = {
        "Food": [
            "pizza", "burger", "food", "restaurant", "dominos", "kfc",
            "starbucks", "cafe", "coffee", "dinner", "lunch", "snacks"
        ],
        "Transport": [
            "uber", "ola", "bus", "train", "taxi", "metro", "flight",
            "petrol", "diesel", "fuel"
        ],
        "Shopping": [
            "amazon", "flipkart", "myntra", "ajio", "meesho",
            "mall", "shopping", "clothes", "electronics"
        ],
        "Bills": [
            "electricity", "bill", "recharge", "internet",
            "wifi", "mobile bill", "subscription", "netflix", "spotify"
        ],
        "Hotel": [
            "hotel", "resort", "hostel", "room", "stay",
            "booking", "reservation"
        ],
        "Health": [
            "doctor", "hospital", "medicine", "pharmacy",
            "clinic", "treatment"
        ],
        "Education": [
            "course", "fees", "tuition", "books", "udemy",
            "coursera", "college", "exam"
        ],
        "Entertainment": [
            "movie", "cinema", "netflix", "game",
            "concert", "party"
        ]
    }

    for category, keywords in categories.items():
        if any(word in desc for word in keywords):
            return category

    return "Others"