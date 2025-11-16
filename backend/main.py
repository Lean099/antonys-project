from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import get_connection
from routes.usuarios import router as usuarios_router
from routes.productos import router as productos_router
from routes.categorias import router as categorias_router
from routes.pedidos import router as pedidos_router

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(usuarios_router)
app.include_router(productos_router)
app.include_router(categorias_router)
app.include_router(pedidos_router)

@app.get("/")
def root():
    return {"message": "API de Antony's funcionando!"}

@app.get("/test-db")
def test_db():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        conn.close()
        return {"message": "Conexión exitosa a SQL Server"}
    except Exception as e:
        return {"error": str(e)}
