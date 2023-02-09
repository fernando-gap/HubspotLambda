# Desafio DevAPI

Esse é o desafio proposto pela DevAPI concluído!

## Setup
A chave de API do HubSpot foi substituido pelos aplicativos privados, por isso, nesse projeto você precisa criar um aplicativo privado e guardar o seu `token`.

Antes de usar certifique-se de ter executado os comandos abaixo:
```sh
git clone https://github.com/fernando-gap/desafio-devapi.git \
&& cd desafio-devapi \
&& npm install --omit=dev
```

Se desejar, instale todas as dependencias:
```sh
npm install
```

Crie o arquivo `.env`:
```sh
touch .env
```
 Edite `.env` e adicione seu `token` da seguinte forma:
```sh
TOKEN="{HUBSPOT_TOKEN}"
```

HOST e PORT podem ser editados utilizando o mesmo arquivo.

## Usage
Para iniciar o servidor - onde os arquivos serão enviados, execute:
```
npm start
```

Para testar basta enviar uma POST request `multpart/form-data` para `/api/file`.

Utilizando o cURL em um dos arquivos de teste em `test/data/mock/`:
```sh
curl -F file='@test/data/mock/mix.csv' \
-X POST 'http://127.0.0.1:8000/api/file'
```
Note: outros http clients podem ser usados também, assim como axios.

Agora é só checar o HubSpot!

## Tests
Há três tipos de arquivos no `./test/data/mock`
- right.csv - são os dados que são corretos em se fazer o upload, isso significa que o email corporativo bate com o site da dominío.
- wrong.csv - o contrario de *right.csv*, contém apenas dados que não devem ser inseridos como contatos no HubSpot. 
- mix.csv - contém dados tanto do *right.csv* quanto do *wrong.csv*

Para testar o projeto rode:
```sh
npm test
```

## Linter
Eslint com plugin para o framework de teste mocha. Git Hooks para linting está disponivel usando husky, execute `npm run prepare` caso queira usar.

## Clean up

Caso queira deletar os contatos do HubSpot rode:
```sh
npm run rm:contacts -- <path> <qty>
```

Onde `<path>` é o diretorio dos arquivos de teste
E `<qty>` a quantidade a ser deletada.

Onde path é o arquivo utilizado dos contatos da planilha e quantidade são quantos contatos serão deletados da planilha.
