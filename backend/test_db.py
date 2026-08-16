from database import engine

try:
    with engine.connect() as connection:
        print("Supabase PostgreSQL connection successful.")
except Exception as e:
    print("Database connection failed:")
    print(e)