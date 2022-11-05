import express from 'express';
import * as dotenv from 'dotenv';
import { mySlackUsername } from './utils/constants';

const OpenAI = require('openai-api');

const main = () => {
  dotenv.config();
  const app = express();
  const PORT = process.env.PORT || 4000;

  const Enum = {
    addition: 'addition',
    subtraction: 'subtraction',
    multiplication: 'multiplication',
  };

  app.use(express.json());
  app
    .route('/')
    .get((_, res) => {
      res.json({
        slackUsername: mySlackUsername,
        backend: true,
        age: 21,
        bio: 'My name is Emmanuel Adams and I am a junior backend developer',
      });
    })
    .post(async (req, res) => {
      res.json({
        slackUsername: mySlackUsername,
        operation_type:
          req.body.operation_type === 'subtraction'
            ? Enum.subtraction
            : 'null' &&
              req.body.operation_type === 'addition'
            ? Enum.addition
            : 'null' &&
              req.body.operation_type === 'multiplication'
            ? Enum.multiplication
            : 'null',
        result:
          req.body.operation_type === 'subtraction'
            ? req.body.x - req.body.y
            : '' || req.body.operation_type === 'addition'
            ? req.body.x + req.body.y
            : '' ||
              req.body.operation_type === 'multiplication'
            ? req.body.x * req.body.y
            : '',
      });
    });

  app.post('/randomQuestion', (req, res) => {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const openai = new OpenAI(OPENAI_API_KEY);

    (async () => {
      const gptResponse = await openai.complete({
        engine: 'text-davinci-002',
        prompt: req.body.prompt,
        temperature: 0.8,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      console.log(gptResponse.data.choices[0].text.trim());
      res.json({
        answer: gptResponse.data.choices[0].text.trim(),
      });
    })();
  });

  app.listen(PORT, () => {
    console.log(`server started on localhost:${PORT}`);
  });
};
main();
