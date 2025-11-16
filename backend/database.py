import pyodbc

def get_connection():
    connection_string = (
        "DRIVER={ODBC Driver 17 for SQL Server};"
        "SERVER=LEANDRO;"
        "DATABASE=AntonysDB;"
        "Trusted_Connection=yes;"
    )

    conn = pyodbc.connect(connection_string)
    return conn