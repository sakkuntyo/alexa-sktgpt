const express = require("express");
const bodyParser = require("body-parser");
const AlexaApp = require("alexa-app");
const axios = require("axios");

// OpenAI API キーを設定
openaiApiKey = "";
const app = express();
const alexaApp = new AlexaApp.app("chatgpt");

// ミドルウェアの設定
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
alexaApp.express({
  expressApp: app,
  endpoint: '/alexa',
  checkCert: true
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// インテントの設定
alexaApp.launch((req, res) => {
  console.log(1);
  res.say("こんにちは、何をお手伝いしましょうか？").shouldEndSession("false");
});

alexaApp.intent("AskGPT", {
  "utterances": ["{-|sentence}"]
}, async function (request, response) {
  console.log(2);
  const sentence = request.slot("sentence");
  console.log(sentence);
  console.log(request.slots);
  response.say(`${sentence} について調べます。少しお待ちください。`).shouldEndSession("false")
  /*  インテントの応答をするまでのタイムアウトに間に合わない
    console.log(`${sentence} を教えて`)
    const gptresponse = await axios.post("https://api.openai.com/v1/chat/completions",
      {
        "model":"gpt-4",
        "messages": [{"role":"user","content":`${sentence} を教えて`}],
        "temperature":0.7
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openaiApiKey}`
        }
      }
    );
    console.log(`3`)
    //gptmessage = gptresponse.data.choices[0].text.trim();
    gptmessage = gptresponse.data.choices[0].message.content;
    console.log(`4`)
    console.log(gptmessage)
    response.say(gptmessage).shouldEndSession("false")
  */
});
