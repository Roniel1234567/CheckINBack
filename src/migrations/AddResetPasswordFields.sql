-- Añadir email a la tabla usuario
ALTER TABLE usuario ADD COLUMN IF NOT EXISTS email_usu VARCHAR(100);

-- Añadir campos para la recuperación de contraseña
ALTER TABLE usuario ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255);
ALTER TABLE usuario ADD COLUMN IF NOT EXISTS reset_token_expiry TIMESTAMP; 