const OpenAI = require('openai-api');
const dotenv = require('dotenv');

dotenv.config();
// Load your key from an environment variable or secret management service
// (do not include your key directly in your code)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI(OPENAI_API_KEY);

(async () => {
  const gptResponse = await openai.complete({
    engine: 'text-davinci-002',
    prompt: 'what is 21 + 12',
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(gptResponse.data.choices[0].text);
})();
