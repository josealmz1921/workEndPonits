const axios = require('axios');
const cors = require('cors');
const express = require('express')

const app = express();

// Hablitar express.json
app.use(express.json({ extend: true, limit: '50mb' }));

// Habilitar cors
app.use(cors());

const PORT = process.env.PORT || 4000;

const username = '89083585';
const password =
    'testpassword_wNLtPTwMWNXwMjH6FkhDYEjmf8U4gueUTx5V9fXPAXAAZ';

app.use('/izipay', async (req, res) => {

    const data = req.body;

    try {
        const url = 'https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment';
        const config = {
            headers: {
                Authorization:
                    'Basic ' +
                    Buffer.from(username + ':' + password).toString(
                        'base64'
                    )
            }
        }

        const query = await axios.post(url, data, config);

        if (query.data.status === 'SUCCESS') {
            const formToken = query.data.answer.formToken;
            res.send(formToken);
        } else {
            setError(true);
            setPaid('An error occurred while getting the form token');
            res.status(500).send(error)
        }
    } catch (error) {
        console.log('error', error);
    }
})

app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})