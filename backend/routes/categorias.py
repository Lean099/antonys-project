from fastapi import APIRouter, HTTPException
from database import get_connection

router = APIRouter(prefix="/categorias", tags=["Categorias"])


@router.get("/")
def obtener_categorias():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM categorias")
        rows = cursor.fetchall()
        columnas = [c[0] for c in cursor.description]
        conn.close()
        return [dict(zip(columnas, row)) for row in rows]
    except Exception as e:
        raise HTTPException(500, f"Error al obtener categorías: {e}")


@router.post("/")
def crear_categoria(nombre: str):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO categorias (nombre) VALUES (?)", (nombre,))
        conn.commit()
        conn.close()
        return {"message": "Categoría creada"}
    except Exception as e:
        raise HTTPException(500, f"Error al crear categoría: {e}")


@router.put("/{id_categoria}")
def actualizar_categoria(id_categoria: int, nombre: str):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE categorias SET nombre=? WHERE id_categoria=?
        """, (nombre, id_categoria))
        conn.commit()
        conn.close()
        return {"message": "Categoría actualizada"}
    except Exception as e:
        raise HTTPException(500, f"Error al actualizar categoría: {e}")


@router.delete("/{id_categoria}")
def eliminar_categoria(id_categoria: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM categorias WHERE id_categoria=?", id_categoria)
        conn.commit()
        conn.close()
        return {"message": "Categoría eliminada"}
    except Exception as e:
        raise HTTPException(500, f"Error al eliminar categoría: {e}")
