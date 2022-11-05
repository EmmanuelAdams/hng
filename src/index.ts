import express from 'express';
import * as dotenv from 'dotenv';
import { mySlackUsername } from './utils/constants';
const OpenAI = require('openai-api');

const main = () => {
  dotenv.config();
  const app = express();
  const PORT = process.env.PORT || 4000;

  enum OperationType {
    add = 'addition',
    subtract = 'subtraction',
    multiply = 'multiplication',
  }

  // Load your key from an environment variable or secret management service
  // (do not include your key directly in your code)

  // start
  // const { Configuration, OpenAIApi } = require('openai');

  // const configuration = new Configuration({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });
  // const openai = new OpenAIApi(configuration);

  // const response = async () =>
  //   await openai.createCompletion({
  //     model: 'text-davinci-002',
  //     prompt:
  //       'Can you please add the following numbers together - 13 and 25?\n\nThe answer is 38.', // This is where i want the question from the user to be,
  //     temperature: 0.7,
  //     max_tokens: 256,
  //     top_p: 1,
  //     frequency_penalty: 0,
  //     presence_penalty: 0,
  //   });
  //  end

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
          req.body.operation_type === '-'
            ? OperationType.subtract
            : 'null' && req.body.operation_type === '+'
            ? OperationType.add
            : 'null' && req.body.operation_type === '*'
            ? OperationType.multiply
            : 'null',
        result:
          req.body.operation_type === '-'
            ? req.body.x - req.body.y
            : '' || req.body.operation_type === '+'
            ? req.body.x + req.body.y
            : '' || req.body.operation_type === '*'
            ? req.body.x * req.body.y
            : '',
      });
    });

  app.post('/random', (req, res) => {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const openai = new OpenAI(OPENAI_API_KEY);

    (async () => {
      const gptResponse = await openai.complete({
        engine: 'text-davinci-002',
        prompt: req.body.prompt,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      console.log(gptResponse.data.choices[0].text);
      res.json({
        answer: gptResponse.data.choices[0].text,
      });
    })();
  });

  app.listen(PORT, () => {
    console.log(`server started on localhost:${PORT}`);
  });
};
main();
