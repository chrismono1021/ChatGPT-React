const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
    apiKey: "your key",
});

const openai = new OpenAIApi(configuration);

// set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// set up the chatGPT endpoint
app.post("/chat", async (req, res) => {
    // get the prompt from the request
    const {prompt} = req.body;
    // Generate a response with ChatGPT
    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
    });
    console.log("backend res:", completion.data)
    res.send(completion.data.choices[0].text);
});

// start the server
const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});