const express = require('express');

const main = () => {
  const app = express();
  const PORT = 4000;

  app.get('/', (req, res) => {
    res.json([
      {
        slackUsername: 'Emmy',
        backend: true,
        age: 21,
        bio: 'My name is Emmanuel Adams and I am a junior backend developer',
      },
    ]);
  });

  app.listen(PORT, () => {
    console.log(`server started on localhost:${PORT}`);
  });
};
main();
