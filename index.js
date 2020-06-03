import express from 'express';
import gradesRouter from './routers/grades.js';
import path from 'path';

const app = express();
app.use(express.json());

const __dirname = path.resolve();

// Exibe pagina com uma documentação simples
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname + '/doc/index.html'))
);

// Busca o arquivo de rotas para "/grades"
app.use('/grades', gradesRouter);

// Inicia o server
app.listen(3000, () => console.log('Server On'));
