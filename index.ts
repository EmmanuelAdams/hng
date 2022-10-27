import express from 'express';

const main = () => {
  const app = express();
  const PORT = process.env.PORT || 4000;

  app.get('/data', (_req, res) => {
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
