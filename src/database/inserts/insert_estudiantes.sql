-- Insertar datos de ejemplo en la tabla ESTUDIANTE
INSERT INTO ESTUDIANTE (
    tipo_documento_est,
    documento_id_est,
    usuario_est,
    nombre_est,
    seg_nombre_est,
    apellido_est,
    seg_apellido_est,
    fecha_nac_est,
    contacto_est,
    taller_est,
    direccion_id,
    ciclo_escolar_est,
    horaspasrealizadas_est,
    nombre_poliza,
    numero_poliza,
    fecha_inicio_pasantia,
    fecha_fin_pasantia
) VALUES
    ('Cédula', '12345678', 1, 'Juan', 'Carlos', 'Pérez', 'Gómez', '2000-01-01', 1, 3, 14, 1, 0.00, 'Poliza Segura', 'PZ-123456', '2025-01-01', '2025-06-01'),
    ('Cédula', '87654321', 1, 'María', 'Isabel', 'Rodríguez', 'Martínez', '2001-03-20', 1, 3, 14, 1, 0.00, 'Poliza Segura', 'PZ-123457', '2025-01-01', '2025-06-01'),
    ('Cédula', '23456789', 1, 'Carlos', 'Alberto', 'García', 'López', '2000-11-10', 1, 3, 14, 1, 0.00, 'Poliza Segura', 'PZ-123458', '2025-01-01', '2025-06-01'),
    ('Cédula', '34567890', 1, 'Ana', 'María', 'Sánchez', 'Díaz', '2001-07-25', 1, 3, 14, 1, 0.00, 'Poliza Segura', 'PZ-123459', '2025-01-01', '2025-06-01'),
    ('Cédula', '45678901', 1, 'Luis', 'Miguel', 'Torres', 'Ramírez', '2000-09-30', 1, 3, 14, 1, 0.00, 'Poliza Segura', 'PZ-123460', '2025-01-01', '2025-06-01'); 