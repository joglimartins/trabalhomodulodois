import Router from 'express';
import { promises } from 'fs';

const router = Router();

const { readFile, writeFile } = promises;

/**
 * Endpoint e Função para criar novo registro no arquivo grades.json
 */
router.post('/', async (req, res) => res.send(await createGrade(req.body)));

const createGrade = async (grade) => {
  try {
    // ler arquivo
    let db = await readFile('./db/grades.json', 'utf8');
    let data = await JSON.parse(db);
    // Inserir registro
    let newReg = { id: data.nextId++, ...grade, timestamp: new Date() };
    data.grades.push(newReg);
    // gravar arquivo
    await writeFile('./db/grades.json', JSON.stringify(data));
    //retornar registro efetuado
    return newReg;
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Endpoint e Função para atualizar uma grade no arquivo grades.json
 */
router.put('/', async (req, res) => res.send(await updateGrade(req.body)));

const updateGrade = async (grade) => {
  try {
    // ler arquivo
    let db = await readFile('./db/grades.json', 'utf8');
    let data = await JSON.parse(db);
    // Validar se a grade existe
    let indexGrade = data.grades.findIndex((g) => g.id === grade.id);
    if (indexGrade !== -1) {
      // Atualizar dados da grade
      let oldReg = data.grades[indexGrade];
      let newReg = { ...oldReg, ...grade };
      data.grades[indexGrade].timestamp = new Date();
      data.grades[indexGrade] = newReg;
      // gravar arquivo
      await writeFile('./db/grades.json', JSON.stringify(data));
      // retorna o registro atualizado
      return newReg;
    } else {
      return { error: `Registro de id ${grade.id} não encontrado` };
    }
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Endpoint e Função para excluir uma grade no arquivo grades.json
 */
router.delete('/', async (req, res) => res.send(await deleteGrade(req.body)));

const deleteGrade = async (grade) => {
  try {
    // ler arquivo
    let db = await readFile('./db/grades.json', 'utf8');
    let data = await JSON.parse(db);
    // Validar se a grade existe
    let indexGrade = data.grades.findIndex((g) => g.id === grade.id);
    if (indexGrade !== -1) {
      // Excluir dados da grade
      data.grades.splice(indexGrade, 1);
      // gravar arquivo
      await writeFile('./db/grades.json', JSON.stringify(data));
      // retorna o registro atualizado
      return { status: `Registro de id ${grade.id} excluido com sucesso` };
    } else {
      return { error: `Registro de id ${grade.id} não encontrado` };
    }
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Endpoint e Função para consultar uma grade no arquivo grades.json
 */
router.get('/get/:id', async (req, res) =>
  res.send(await getGrade(req.params))
);

const getGrade = async (grade) => {
  try {
    // ler arquivo
    let db = await readFile('./db/grades.json', 'utf8');
    let data = await JSON.parse(db);
    // Consultar dados da grade
    let reg = data.grades.find((g) => g.id === parseInt(grade.id));
    // Validar se a grade existe
    if (reg !== -1) {
      // retorna o registro atualizado
      return reg;
    } else {
      return { error: `Registro de id ${grade.id} não encontrado` };
    }
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Endpoint e Função para consultar o total das notas de um student
 * em uma subject no arquivo grades.json
 */
router.get('/total', async (req, res) =>
  res.send(await getGradeTotal(req.body))
);

const getGradeTotal = async (grade) => {
  try {
    // ler arquivo
    let db = await readFile('./db/grades.json', 'utf8');
    let data = await JSON.parse(db);
    // Consultar dados da grade
    let reg = data.grades.filter(
      (g) => g.student == grade.student && g.subject == grade.subject
    );
    // Totalizar as notas
    let total = reg.reduce((acc, cur) => {
      return acc + cur.value;
    }, 0);
    // retorna o registro com os dados
    return { student: grade.student, subject: grade.subject, total };
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Endpoint e Função para consultar a media das notas das grades de um
 * determinado subject e type no arquivo grades.json
 */
router.get('/avg', async (req, res) => res.send(await getGradeAvg(req.body)));

const getGradeAvg = async (grade) => {
  try {
    // ler arquivo
    let db = await readFile('./db/grades.json', 'utf8');
    let data = await JSON.parse(db);
    // Consultar dados das grades
    let reg = data.grades.filter(
      (g) => g.subject == grade.subject && g.type == grade.type
    );
    // Totalizar as notas
    let total = reg.reduce((acc, cur) => {
      return acc + cur.value;
    }, 0);
    // Calculando a média
    let avg = total / reg.length;
    // retorna o registro com a media
    return { subject: grade.subject, type: grade.type, avg };
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Endpoint e Função para consultar o top 3 das melhores notas das grades de
 * um determinado subject e type no arquivo grades.json
 */
router.get('/top', async (req, res) => res.send(await getGradeTop(req.body)));

const getGradeTop = async (grade) => {
  try {
    // ler arquivo
    let db = await readFile('./db/grades.json', 'utf8');
    let data = await JSON.parse(db);
    // Consultar dados das grades
    let reg = data.grades.filter(
      (g) => g.subject == grade.subject && g.type == grade.type
    );
    // Ordenar por notas em decrescente
    reg.sort((a, b) => {
      return b.value - a.value;
    });
    // retorna os 3 registros com maiores notas
    return reg.slice(0, 3);
  } catch (err) {
    console.log(err.message);
  }
};

export default router;
