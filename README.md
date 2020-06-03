# Grade Control API

## Instalar e Usar

```
git clone https://github.com/joglimartins/trabalhomodulodois.git
cd trabalhomodulodois
npm install
npm run dev
```

###### Resumo dos endpoints

- http://localhost:3000/ - **GET**
  - Documentação simples
- http://localhost:3000/grades - **POST**
  - Cadastrar nova grade
- http://localhost:3000/grades - **PUT**
  - Atualizar grade
- http://localhost:3000/grades - **DELETE**
  - Excluir grade
- http://localhost:3000/grades/get/*{id}* - **GET**
  - Consultar grade pelo id
- http://localhost:3000/grades/total - **GET**
  - Consultar total dos values das grades pelo seu student e subject
- http://localhost:3000/grades/avg - **GET**
  - Consultar média dos values das grade pelo seu subject e type
