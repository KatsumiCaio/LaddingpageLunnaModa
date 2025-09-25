require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiting para prevenir spam
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // Limita cada IP a 10 requisições por janela
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Muitas solicitações deste IP, tente novamente após 15 minutos.',
});

// Função simples para sanitizar o input e remover tags HTML
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const { body, validationResult } = require('express-validator');

// Rota para lidar com o envio do formulário, com rate limiting
app.post('/send', limiter, [
    // Validação e sanitização dos campos
    body('name').trim().notEmpty().withMessage('O nome é obrigatório.').escape(),
    body('email').isEmail().withMessage('Forneça um endereço de e-mail válido.').normalizeEmail(),
    body('message').trim().notEmpty().withMessage('A mensagem é obrigatória.').isLength({ min: 5 }).withMessage('A mensagem precisa ter pelo menos 5 caracteres.').escape(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    try {
        // Criar um transportador reutilizável usando os dados da conta de teste
        let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configurar o conteúdo do e-mail
    let mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email, // Adiciona o email do remetente no campo Reply-To
      to: process.env.RECIPIENT_EMAIL, // O destinatário que você quer que receba
      subject: 'Nova mensagem do formulário de contato ✔',
      text: message,
      html: `<p>Você recebeu uma nova mensagem de <strong>${name}</strong> (${email}):</p><p>${message}</p>`,
    };

    // Enviar o e-mail
    await transporter.sendMail(mailOptions);

    console.log('--- Novo Contato Recebido e E-mail Enviado --');
    console.log(`Nome: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Mensagem: ${message}`);
    console.log('---------------------------------------------');

    // Enviar resposta de sucesso
    res.status(200).json({
      message: 'Mensagem enviada com sucesso!',
    });

  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    res.status(500).json({ message: 'Ocorreu um erro no servidor ao tentar enviar a mensagem.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Aguardando envios do formulário de contato...');
  console.log('Pressione Ctrl+C para parar o servidor.');
});