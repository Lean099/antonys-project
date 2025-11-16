from fastapi import APIRouter, HTTPException
from database import get_connection
from pydantic import BaseModel

router = APIRouter(prefix="/pedidos", tags=["Pedidos"])

class PedidoSchema(BaseModel):
    id_usuario: int
    total: float
    productos_json: str
    estado: str

@router.get("/")
def obtener_pedidos():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM pedidos")
        rows = cursor.fetchall()
        columnas = [c[0] for c in cursor.description]
        conn.close()
        return [dict(zip(columnas, row)) for row in rows]
    except Exception as e:
        raise HTTPException(500, f"Error al obtener pedidos: {e}")


@router.post("/")
def crear_pedido(data: PedidoSchema):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO pedidos (id_usuario, total, productos_json, estado)
            VALUES (?, ?, ?, ?)
        """, (data.id_usuario, data.total, data.productos_json, data.estado))

        conn.commit()
        conn.close()

        return {"message": "Pedido creado"}
    except Exception as e:
        raise HTTPException(500, f"Error al crear pedido: {e}")


@router.put("/{id_pedido}")
def actualizar_estado(id_pedido: int, estado: str):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE pedidos SET estado=? WHERE id_pedido=?
        """, (estado, id_pedido))
        conn.commit()
        conn.close()
        return {"message": "Estado de pedido actualizado"}
    except Exception as e:
        raise HTTPException(500, f"Error al actualizar pedido: {e}")


@router.delete("/{id_pedido}")
def eliminar_pedido(id_pedido: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM pedidos WHERE id_pedido=?", id_pedido)
        conn.commit()
        conn.close()
        return {"message": "Pedido eliminado"}
    except Exception as e:
        raise HTTPException(500, f"Error al eliminar pedido: {e}")
    

@router.get("/usuario/{id_usuario}")
def obtener_pedidos_usuario(id_usuario: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM pedidos WHERE id_usuario = ?", (id_usuario,))
        rows = cursor.fetchall()

        # Obtener nombres de columnas para convertir a dict
        columns = [col[0] for col in cursor.description]
        pedidos = [dict(zip(columns, row)) for row in rows]

        conn.close()
        return pedidos

    except Exception as e:
        raise HTTPException(500, f"Error al obtener pedidos: {e}")
