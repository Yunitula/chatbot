require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { BlobServiceClient } = require('@azure/storage-blob');
const csvParser = require('csv-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const blobConnectionString = process.env.BLOB_CONNECTION_STRING;
const containerName = process.env.CONTAINER_NAME;
const blobName = process.env.BLOB_NAME;
const openAIEndpoint = process.env.OPENAI_ENDPOINT;
const openAIKey = process.env.OPENAI_API_KEY;

const questionCache = new Map();

app.use(bodyParser.json());
app.use(cors());

async function fetchAnswersFromBlob() {
    const blobServiceClient = BlobServiceClient.fromConnectionString(blobConnectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);
    const downloadBlockBlobResponse = await blobClient.download(0);

    const answers = {};
    await new Promise((resolve, reject) => {
        downloadBlockBlobResponse.readableStreamBody
            .pipe(csvParser())
            .on('data', (row) => {
                answers[row.question] = row.answer;
            })
            .on('end', resolve)
            .on('error', reject);
    });

    return answers;
}

async function queryOpenAI(userQuestion) {
    const requestBody = {
        model: 'gpt-3.5-turbo',  
        prompt: userQuestion,
        max_tokens: 100,
        temperature: 0.7,
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAIKey}`,
    };

    try {
        const response = await axios.post(openAIEndpoint, requestBody, { headers });
        return response.data.choices[0].text.trim();
    } catch (error) {
        if (error.response && error.response.data.error.code === 'insufficient_quota') {
            console.error('Error querying OpenAI:', error.response.data);
            return 'Please wait a moment, we are currently processing your request quota full.'
        } else {
            console.error('Error querying OpenAI:', error.message);
            throw new Error('Error querying OpenAI: ' + error.message);
        }
    }
}

app.post('/ask', async (req, res) => {
    const userQuestion = req.body.question;

    if (!userQuestion) {
        return res.status(400).json({ error: 'No question provided' });
    }

    if (questionCache.has(userQuestion)) {
        return res.json({ answer: questionCache.get(userQuestion) });
    }

    try {
        const answers = await fetchAnswersFromBlob();

        const answer = answers[userQuestion] || (await queryOpenAI(userQuestion));

        questionCache.set(userQuestion, answer);

        res.json({ answer });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});