from fastapi import APIRouter, HTTPException
from database import get_connection

router = APIRouter(prefix="/productos", tags=["Productos"])


@router.get("/")
def obtener_productos():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM productos")
        rows = cursor.fetchall()
        columnas = [c[0] for c in cursor.description]
        conn.close()
        return [dict(zip(columnas, row)) for row in rows]
    except Exception as e:
        raise HTTPException(500, f"Error al obtener productos: {e}")


@router.post("/")
def crear_producto(nombre: str, descripcion: str, precio: float, imagen_url: str, id_categoria: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO productos (nombre, descripcion, precio, imagen_url, id_categoria)
            VALUES (?, ?, ?, ?, ?)
        """, (nombre, descripcion, precio, imagen_url, id_categoria))
        conn.commit()
        conn.close()
        return {"message": "Producto creado"}
    except Exception as e:
        raise HTTPException(500, f"Error al crear producto: {e}")


@router.put("/{id_producto}")
def actualizar_producto(id_producto: int, nombre: str, descripcion: str, precio: float):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE productos
            SET nombre=?, descripcion=?, precio=?
            WHERE id_producto=?
        """, (nombre, descripcion, precio, id_producto))
        conn.commit()
        conn.close()
        return {"message": "Producto actualizado"}
    except Exception as e:
        raise HTTPException(500, f"Error al actualizar producto: {e}")


@router.delete("/{id_producto}")
def eliminar_producto(id_producto: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM productos WHERE id_producto=?", id_producto)
        conn.commit()
        conn.close()
        return {"message": "Producto eliminado"}
    except Exception as e:
        raise HTTPException(500, f"Error al eliminar producto: {e}")
