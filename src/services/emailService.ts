import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ronielrodriguezcolon@gmail.com',
    pass: 'nhbh rvly qkaa tjih' // Contraseña de aplicación de Google
  }
});

export const sendPasswordResetEmail = async (to: string, resetToken: string): Promise<boolean> => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
    
    const mailOptions = {
      from: 'Sistema de Pasantías <ronielrodriguezcolon@gmail.com>',
      to,
      subject: 'Recuperación de contraseña',
      html: `
        <h1>Recuperación de contraseña</h1>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Restablecer contraseña</a>
        <p>Este enlace expirará en 1 hora.</p>
        <p>Si no solicitaste un cambio de contraseña, por favor ignora este correo.</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.response);
    return true;
  } catch (error) {
    console.error('Error al enviar el email:', error);
    return false;
  }
}; 