const API_URL = "http://localhost:8000"; // Cambiar si deployan el backend

async function request(endpoint, method = "GET", data = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(`${API_URL}/${endpoint}`, options);

    // Si la API devuelve error, lo capturamos igual
    const result = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        error: result.detail || "Error en la petición",
        status: res.status,
      };
    }

    return result;

  } catch (err) {
    return {
      error: "Error de conexión con el servidor",
      detail: err.message,
    };
  }
}

// Métodos CRUD estándar
export function getData(endpoint) {
  return request(endpoint, "GET");
}

export function postData(endpoint, data) {
  return request(endpoint, "POST", data);
}

export function putData(endpoint, data) {
  return request(endpoint, "PUT", data);
}

export function deleteData(endpoint) {
  return request(endpoint, "DELETE");
}

// Exportar por si querés usar el request genérico
export default request;
