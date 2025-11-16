-- DROP SI EXISTEN (orden seguro)
DROP TABLE IF EXISTS Pedidos;
DROP TABLE IF EXISTS Productos;
DROP TABLE IF EXISTS Categorias;
DROP TABLE IF EXISTS Usuarios;

-- 1) USUARIOS
CREATE TABLE Usuarios (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    email NVARCHAR(150) UNIQUE NOT NULL,
    password_hash NVARCHAR(200) NOT NULL,
    fecha_registro DATETIME DEFAULT GETDATE()
);

-- 2) CATEGORIAS
CREATE TABLE Categorias (
    id_categoria INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL
);

-- 3) PRODUCTOS
CREATE TABLE Productos (
    id_producto INT IDENTITY(1,1) PRIMARY KEY,
    id_categoria INT NOT NULL,
    nombre NVARCHAR(150) NOT NULL,
    descripcion NVARCHAR(500) NULL,
    precio DECIMAL(10,2) NOT NULL,
    imagen_url NVARCHAR(500) NULL,
    CONSTRAINT FK_Productos_Categorias FOREIGN KEY (id_categoria)
        REFERENCES Categorias(id_categoria)
);

-- 4) PEDIDOS (simplificado con JSON)
CREATE TABLE Pedidos (
    id_pedido INT IDENTITY(1,1) PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha DATETIME DEFAULT GETDATE(),
    total DECIMAL(10,2) NOT NULL,
    productos_json NVARCHAR(MAX) NOT NULL,  -- JSON con id_producto y cantidad
    estado NVARCHAR(50) NOT NULL,
    CONSTRAINT FK_Pedidos_Usuarios FOREIGN KEY (id_usuario)
        REFERENCES Usuarios(id_usuario)
);

-- =======================================================
-- INSERTS: 10 registros por tabla (orden: Usuarios, Categorias, Productos, Pedidos)
-- =======================================================

-- 1) USUARIOS (10)
INSERT INTO Usuarios (nombre, email, password_hash) VALUES
('Juan Pérez', 'juan@example.com', 'hash1'),
('María López', 'maria@example.com', 'hash2'),
('Carlos Gómez', 'carlos@example.com', 'hash3'),
('Ana Torres', 'ana@example.com', 'hash4'),
('Luis Ramírez', 'luis@example.com', 'hash5'),
('Sofía Martínez', 'sofia@example.com', 'hash6'),
('Pedro Díaz', 'pedro@example.com', 'hash7'),
('Florencia Silva', 'flor@example.com', 'hash8'),
('Miguel Castro', 'miguel@example.com', 'hash9'),
('Lucía Fernández', 'lucia@example.com', 'hash10');

-- 2) CATEGORIAS (10)
INSERT INTO Categorias (nombre) VALUES
('Hamburguesas'),
('Sandwiches'),
('Pizzas'),
('Bebidas'),
('Postres'),
('Snacks'),
('Vegano'),
('Promos'),
('Ensaladas'),
('Extras');

-- 3) PRODUCTOS (10)  -- id_categoria corresponde a las categorías insertadas arriba
INSERT INTO Productos (id_categoria, nombre, descripcion, precio, imagen_url) VALUES
(1, 'Hamburguesa Clásica', 'Medallón de carne, lechuga, tomate y queso.', 4500.00, 'https://example.com/img/hamburguesa_clasica.jpg'),
(1, 'Hamburguesa Doble', 'Doble carne, queso cheddar, panceta y salsa.', 5500.00, 'https://example.com/img/hamburguesa_doble.jpg'),
(2, 'Lomo Completo', 'Lomo con papas y aderezos.', 6000.00, 'https://example.com/img/lomo_completo.jpg'),
(3, 'Pizza Muzza', 'Muzzarella clásica, masa casera.', 7000.00, 'https://example.com/img/pizza_muzza.jpg'),
(4, 'Coca-Cola 500ml', 'Bebida gaseosa 500ml.', 1500.00, 'https://example.com/img/coca500.jpg'),
(4, 'Agua Mineral 500ml', 'Agua sin gas 500ml.', 1200.00, 'https://example.com/img/agua500.jpg'),
(6, 'Papas Fritas', 'Porción de papas fritas crocantes.', 2500.00, 'https://example.com/img/papas_fritas.jpg'),
(5, 'Flan Casero', 'Flan artesanal con dulce de leche.', 2000.00, 'https://example.com/img/flan.jpg'),
(7, 'Hamburguesa Veggie', 'Hamburguesa de vegetales y quinoa.', 4800.00, 'https://example.com/img/hamburguesa_veggie.jpg'),
(8, 'Combo Promo: Burger + Bebida', 'Hamburguesa + bebida 500ml en promo.', 7500.00, 'https://example.com/img/combo_promo.jpg');

-- 4) PEDIDOS (10) -- id_usuario va de 1 a 10; productos_json contiene objetos con id_producto y cantidad
INSERT INTO Pedidos (id_usuario, total, productos_json, estado) VALUES
(1, 9000.00,  '[{"id_producto":1,"cantidad":2}]', 'pendiente'),
(2, 1500.00,  '[{"id_producto":5,"cantidad":1}]', 'pendiente'),
(3, 8000.00,  '[{"id_producto":2,"cantidad":1},{"id_producto":7,"cantidad":1}]', 'completado'),
(4, 6000.00,  '[{"id_producto":3,"cantidad":1}]', 'pendiente'),
(5, 4800.00,  '[{"id_producto":9,"cantidad":1}]', 'cancelado'),
(6, 2400.00,  '[{"id_producto":6,"cantidad":2}]', 'pendiente'),
(7, 4500.00,  '[{"id_producto":8,"cantidad":1},{"id_producto":7,"cantidad":1}]', 'completado'),
(8, 9000.00,  '[{"id_producto":10,"cantidad":1},{"id_producto":5,"cantidad":1}]', 'pendiente'),
(9, 7000.00,  '[{"id_producto":4,"cantidad":1}]', 'pendiente'),
(10,11000.00,  '[{"id_producto":2,"cantidad":2}]', 'completado');

-- FIN DEL SCRIPT
