# Hubspot Lambda

Leia dados de uma planilha do Google Sheets e Adicione como contatos no Hubspot!

## Index
- [Setup](#setup)
- [Testing](#testing)
- [Linter](#linter)
- [Clean up](#clean-up)
- [Troubleshoting](#troubleshoting)

## Setup
A chave de API do HubSpot foi substituido pelos aplicativos privados, por isso, nesse projeto você precisa criar um aplicativo privado e guardar o seu `token`.

Para fazer deployment da função lambda, é necessário instalar o [**aws-cli**](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/getting-started-install.html) e o [**aws-sam-cli**](https://docs.aws.amazon.com/pt_br/serverless-application-model/latest/developerguide/install-sam-cli.html), lembre-se de criar o `access token` da aws e configurar com o comando `aws configure`.

Antes de iniciar certifique-se de ter executado os comandos abaixo:
```sh
git clone https://github.com/fernando-gap/desafio-devapi.git \
&& cd desafio-devapi \
&& npm install
```

Crie o arquivo `.env`:
```sh
touch .env
```
 Edite `.env` e adicione seu `token` da seguinte forma:
```sh
TOKEN="{HUBSPOT_TOKEN}"
```

A seguir, rode o npm script para configurar o deployment no aws sam. Esse script cria o nome do S3 bucket para fazer o trigger do lambda.

```sh
npm run aws:setup
```

Depois iremos fazer o deployment na AWS com o commando:
```
npm run aws:deploy
```
Isso ira acionar o commando `sam deploy -g`, que irá usar a configuração definido em `samconfig.toml`, que é seu token e o nome do S3 Bucket por padrão, deixe como padrão para evitar possíveis erros.


## Testing
Há três tipos de arquivos de teste no diretório `./test/data/mock`
- right.csv - são os dados aceitos para a criação de contatos, isso significa que o email corporativo bate com o site da dominío.
- wrong.csv - o contrario de *right.csv*, contém apenas dados que não devem ser inseridos como contatos no HubSpot. 
- mix.csv - contém dados tanto do *right.csv* quanto do *wrong.csv*

Após o deployment na AWS, para testar a função lambda, é só executar o comando abaixo e escolher um dos arquivos acima:

```sh
npm run aws:test -- ./test/data/mock/mix.csv
```

Espere uns segundos e verifique seu hubspot. Voilá!

Para rodar o teste unitário do projeto:
```sh
npm test
```

Note: essa ação remove todos os contados dos arquivos de teste

## Linter
Eslint com plugin para o framework de teste mocha. E, Git Hooks para linting antes do commit está disponivel usando husky, execute `npm run git:hook` para configurar.

## Clean up

Para deletar os recursos criados na aws, rode:
```sh
npm run aws:cleanup
```
**Note**: o nome da stack do cloudformation e do S3 bucket devem ser o padrão, gerados pelo `npm run aws:setup`.

Caso queira deletar os contatos do HubSpot rode:
```sh
npm run hubspot:cleanup -- <path> <qty>
```

Onde `<path>` é o diretorio dos arquivos de teste
e `<qty>` a quantidade a ser deletada do arquivo path.

```sh
npm run hubspot:cleanup -- test/data/mock/mix.csv 25
```

Caso não deletou tudo é só fazer uma outra request ou aumentar o valor de `<qty>`, fique tranquilo, os contatos deletados somente são os que estão no arquivo `<path>`.


## Troubleshoting

Não Funcionou? Tudo bem! Nessa seção são erros que podem acontecer.

Você pode limpar o cache da build e tentar de novo:
```sh
rm -rf ./.aws-sam ./lib ./samconfig.toml
```

### #0 .env não configurado
- Configure o token do hubspot da seguinte forma:
```
TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

### #1 S3 Bucket
O nome do s3 bucket não é o mesmo que o configurado.
- Você rodou duas ou mais vezes `npm run aws:setup`
- O comando `npm run aws:test` falha
  - Não passou o path para arquivo como argumento
  - O arquivo não existe
- Você deletou o S3 bucket

### #2 Stack name
O nome da stack não é o padrão: "hubspot-app", então o comando `aws:cleanup` falha em deletar


### #3 AWS
A aws-cli não foi configurada corretamente
- Não existe aws-cli e aws-cli-sam, instale.
- Existem ambos os binários, porém não foi configurado, rode `aws configure`, talvez seja necessário criar um IAM USER e criar um `access token`.
- Você não tem permissão para fazer o deployment da aplicação

### #4 Hubspot
A chave de acesso é invalida.
- Você usou a chave de API invés de um token criado a partir do aplicativo privado.
- Seu aplicativo privado não existe.
- O comando `npm run hubspot:cleanup` não funciona
  - .env não existe com o token.
  - Falta argumentos, o path e a quantidade a ser deletada.
