const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rota para lidar com o envio do formulário
app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  // Validação simples no backend
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Erro: Todos os campos são obrigatórios.' });
  }

  try {
    // Criar uma conta de teste Ethereal (não precisa de credenciais reais)
    let testAccount = await nodemailer.createTestAccount();

    // Criar um transportador reutilizável usando os dados da conta de teste
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // usuário gerado pelo Ethereal
        pass: testAccount.pass, // senha gerada pelo Ethereal
      },
    });

    // Configurar o conteúdo do e-mail
    let mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'contato@lunnamodas.com.br', // O destinatário que você quer que receba
      subject: 'Nova mensagem do formulário de contato ✔',
      text: message,
      html: `<p>Você recebeu uma nova mensagem de <strong>${name}</strong> (${email}):</p><p>${message}</p>`,
    };

    // Enviar o e-mail
    let info = await transporter.sendMail(mailOptions);

    console.log('--- Novo Contato Recebido e E-mail Enviado --');
    console.log(`Nome: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Mensagem: ${message}`);
    console.log('URL de preview do E-mail: %s', nodemailer.getTestMessageUrl(info));
    console.log('---------------------------------------------');

    // Enviar resposta de sucesso com o link de preview
    res.status(200).json({
      message: 'Mensagem enviada com sucesso!',
      previewUrl: nodemailer.getTestMessageUrl(info) 
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