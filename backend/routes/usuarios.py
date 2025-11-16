from fastapi import APIRouter, HTTPException
from database import get_connection
from pydantic import BaseModel

class LoginData(BaseModel):
    email: str
    password: str

class RegisterData(BaseModel):
    nombre: str
    email: str
    password: str

class UsuarioUpdate(BaseModel):
    nombre: str
    email: str
    password: str | None = None   # contraseña opcional

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

@router.post("/login")
def login(data: LoginData):
    email = data.email
    password = data.password

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id_usuario, nombre, password_hash FROM Usuarios WHERE email=?", email)
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(404, "Usuario no existe")

    user_id, nombre_db, pass_hash_db = row

    if pass_hash_db != password:
        raise HTTPException(401, "Contraseña incorrecta")

    return {"id_usuario": user_id, "nombre": nombre_db, "email": email}

@router.post("/register")
def registrar_usuario(data: RegisterData):
    conn = get_connection()
    cursor = conn.cursor()

    # ⛔ verificar email duplicado
    cursor.execute("SELECT id_usuario FROM Usuarios WHERE email=?", (data.email,))
    existe = cursor.fetchone()
    if existe:
        conn.close()
        raise HTTPException(400, "El email ya está registrado")

    # 🟢 Insertar datos
    cursor.execute(
        "INSERT INTO Usuarios (nombre, email, password_hash) VALUES (?, ?, ?)",
        (data.nombre, data.email, data.password)  # sin hash por ahora
    )
    conn.commit()
    conn.close()

    return {"message": "Usuario registrado correctamente"}


@router.get("/")
def obtener_usuarios():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM usuarios")
        rows = cursor.fetchall()
        columnas = [c[0] for c in cursor.description]
        conn.close()
        return [dict(zip(columnas, row)) for row in rows]
    except Exception as e:
        raise HTTPException(500, f"Error al obtener usuarios: {e}")


@router.get("/{id_usuario}")
def obtener_usuario(id_usuario: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM usuarios WHERE id_usuario=?", id_usuario)
        row = cursor.fetchone()
        columnas = [c[0] for c in cursor.description]
        conn.close()

        if not row:
            raise HTTPException(404, "Usuario no encontrado")

        return dict(zip(columnas, row))
    except Exception as e:
        raise HTTPException(500, f"Error al obtener usuario: {e}")


@router.post("/")
def crear_usuario(nombre: str, email: str, password_hash: str):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO usuarios (nombre, email, password_hash)
            VALUES (?, ?, ?)
        """, (nombre, email, password_hash))
        conn.commit()
        conn.close()
        return {"message": "Usuario creado correctamente"}
    except Exception as e:
        raise HTTPException(500, f"Error al crear usuario: {e}")


@router.put("/{id_usuario}")
def actualizar_usuario(id_usuario: int, datos: UsuarioUpdate):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Si viene contraseña, actualizar todo
        if datos.password:
            cursor.execute("""
                UPDATE usuarios SET nombre=?, email=?, password_hash=?
                WHERE id_usuario=?
            """, (datos.nombre, datos.email, datos.password, id_usuario))
        else:
            # Si NO viene contraseña, actualizar solo nombre + email
            cursor.execute("""
                UPDATE usuarios SET nombre=?, email=?
                WHERE id_usuario=?
            """, (datos.nombre, datos.email, id_usuario))

        conn.commit()
        conn.close()

        return {"message": "Usuario actualizado correctamente"}

    except Exception as e:
        raise HTTPException(500, f"Error al actualizar usuario: {e}")


@router.delete("/{id_usuario}")
def eliminar_usuario(id_usuario: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM usuarios WHERE id_usuario=?", id_usuario)
        conn.commit()
        conn.close()
        return {"message": "Usuario eliminado"}
    except Exception as e:
        raise HTTPException(500, f"Error al eliminar usuario: {e}")
