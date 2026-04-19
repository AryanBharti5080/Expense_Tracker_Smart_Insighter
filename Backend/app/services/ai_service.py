def categorize_expense(description: str) -> str:
    desc = description.lower()

    # for Food category.
    if any(word in desc for word in ["pizza", "burger", "food", "restaurant", "dominos", "KFC", "starbucks"]):
        return "Food"

    # for Transportation things.
    elif any(word in desc for word in ["uber", "bus","train", "taxi","ola","plane"]):
        return "Transport"

    # for the online Shopping or buying offline.
    elif any(word in desc for word in ["amazon", "shopping","shopping mall", "flipkart","meesho","myntra","ajio"]):
        return "Shopping"

    # for online Bills and autopay transaction.
    elif any(word in desc for word in ["electricity","bill", "recharge", "internet", "autopay"]):
        return "Bills"
    
    # for the Hotels or Room stays.
    elif any(word in desc for word in ["hotel","reservation", "resort","hostel","room","stay"]):
        return "Hotel"

    else:
        return "Others"