import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import dotenv from "dotenv"
import dbInit from './db/init';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(routes); 

const port = process.env.PORT || 3000;
dbInit();

app.listen(port, () => {
if(!process.env.PORT) console.log(`Port not defined in environment variable, using default port 3000`);
  console.log(`Server is running on port ${port}`);
});

export default app;
