const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rota para lidar com o envio do formulário
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  // Validação simples no backend
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Erro: Todos os campos são obrigatórios.' });
  }

  console.log('--- Novo Contato Recebido ---');
  console.log(`Nome: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Mensagem: ${message}`);
  console.log('-----------------------------');

  // Simulação de envio de e-mail bem-sucedido
  res.status(200).json({ message: 'Mensagem recebida com sucesso! Em breve entraremos em contato.' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Aguardando envios do formulário de contato...');
  console.log('Pressione Ctrl+C para parar o servidor.');
});
