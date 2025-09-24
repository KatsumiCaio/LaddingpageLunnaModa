# Lunna Modas - Landing Page

Esta é uma landing page responsiva para a Lunna Modas, uma loja de roupas fictícia. O projeto foi criado para apresentar coleções, destacar os valores da marca e capturar o interesse dos visitantes através de um design elegante e chamadas para ação (CTAs) eficazes.

## ✨ Demo Ao Vivo

**[Clique aqui para ver a demonstração ao vivo](https://katsumicaio.github.io/LaddingpageLunnaModa/)**



## 📸 Preview

![Preview da Landing Page](assets/images/Demonstração.png)


## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

#### **Frontend**
-   HTML5
-   CSS3 (com Flexbox e Grid Layout)
-   JavaScript (ES6+)

#### **Backend (para o formulário de contato)**
-   Node.js
-   Express.js
-   Nodemailer
-   Express-Rate-Limit (para segurança do formulário)
-   Dotenv (para variáveis de ambiente)

#### **Ferramentas de Otimização**
-   Terser (para minificar JavaScript)
-   CSS-Minify (para minificar CSS)
-   Imagemin (para otimizar imagens para WebP)

## ⚙️ Como Executar o Projeto

Para executar este projeto localmente, siga os passos abaixo.

#### **Pré-requisitos**
-   [Node.js](https://nodejs.org/en/) (versão 14 ou superior)
-   [NPM](https://www.npmjs.com/)

#### **Passo a Passo**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/KatsumiCaio/LaddingpageLunnaModa.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd LaddingpageLunnaModa
    ```

3.  **Instale as dependências:**
    Este comando instalará todas as dependências do frontend e do backend.
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto e adicione as seguintes variáveis para o envio de e-mail (você pode usar um serviço como o [Ethereal](https://ethereal.email/) para testes):
    ```
    EMAIL_HOST=smtp.example.com
    EMAIL_PORT=587
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_password
    RECIPIENT_EMAIL=recipient@example.com
    ```

5.  **Inicie o servidor de desenvolvimento:**
    Este comando iniciará o servidor backend com `nodemon`, que reiniciará automaticamente após qualquer alteração nos arquivos.
    ```bash
    npm start
    ```
    O servidor estará rodando em `http://localhost:3000`.

6.  **Abra a página no navegador:**
    Abra o arquivo `index.html` diretamente no seu navegador para visualizar a landing page. O formulário de contato se comunicará com o servidor local.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.