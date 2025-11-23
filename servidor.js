const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

//  usar o ultramsg caro que só a desgraça
const INSTANCE_ID = "instance151971";
const TOKEN = "7f86bdkx451gceyu";

// rota pra receber mensagem
app.post("/send", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Campos incompletos" });
    }

    const texto = `
📩 *Novo contato pelo site*  
--------------------------------  
👤 Nome: ${name}  
📧 Email: ${email}  
💬 Mensagem: ${message}  
    `;

    try {
        const response = await axios.post(
            `https://api.ultramsg.com/instance151971/`,
            {
                token: TOKEN,
                to: "5598984658525", // <-- whatsapp
                body: texto
            }
        );

        res.json({ success: true, data: response.data });
    } catch (error) {
        console.log(error.response?.data || error);
        res.status(500).json({ error: "Erro ao enviar mensagem" });
    }
});

//  iniciar servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
