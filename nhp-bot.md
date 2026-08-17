# Relatório do Projeto: nhp-bot

Este documento fornece uma visão detalhada da estrutura, dependências, funções e funcionalidades do projeto **nhp-bot**, um bot do Discord desenvolvido para a comunidade de Need for Speed World (World United).

## 1. Visão Geral
O **nhp-bot** é um bot utilitário que fornece informações em tempo real sobre recordes de pistas (leaderboards) e rotações de eventos do servidor World United. Ele consome APIs externas para exibir dados formatados diretamente no Discord.

- **Ambiente de Execução:** [Bun](https://bun.sh/)
- **Linguagem:** JavaScript (Node.js/ESModules)
- **Framework Principal:** [discord.js](https://discord.js.org/)

## 2. Dependências e Versões
As dependências estão gerenciadas no `package.json`:

### Produção
- `discord.js`: `^14.26.2` - Interface com a API do Discord.
- `axios`: `^1.15.0` - Cliente HTTP para consumo de APIs (Panel World United).

### Desenvolvimento
- `@biomejs/biome`: `2.4.11` - Ferramenta de linting e formatação.
- `bun-types`: `^1.3.12` - Tipagens para o ambiente Bun.

## 3. Estrutura de Pastas e Arquivos
```text
nhp-bot/
├── src/
│   ├── index.js                # Ponto de entrada (carrega comandos e eventos)
│   ├── deployCommands.js       # Script para registrar Slash Commands no Discord
│   ├── deleteCommands.js       # Script para remover Slash Commands
│   ├── commands/               # Implementação dos comandos do Discord
│   │   ├── bestTrackTimes.js   # Comando /track-leaders
│   │   └── rotation.js         # Comando /rotation
│   ├── events/                 # Manipuladores de eventos do Discord
│   │   ├── ready.js            # Executado quando o bot liga
│   │   └── interactionCreate.js# Gerencia execuções de comandos
│   ├── functions/              # Lógica de negócio e busca de dados
│   │   ├── getGroup.js         # Lógica de cálculo de rotação de tabelas
│   │   ├── getTopTimesByTrack.js# Consumo da API de tempos das pistas
│   │   ├── shuffle.js          # Função utilitária de embaralhamento
│   │   └── sortOrder.js        # Lógica de ordenação personalizada
│   ├── utils/                  # Utilitários de formatação e conversão
│   │   ├── convertMsToTime.js  # Converte milissegundos para formato MM:SS.mmm
│   │   ├── convertSpeed.js     # Converte/formata velocidade
│   │   ├── dateFormatter.js    # Formatação de datas para Timestamps do Discord
│   │   └── getCarClass.js      # Mapeamento de rating de carro para classe (S1, A, etc)
│   └── oldCommands/            # Comandos antigos ou depreciados
└── configurações/
    ├── package.json            # Scripts e dependências
    ├── biome.json              # Configuração do Linter
    ├── Dockerfile              # Configuração de container
    └── docker-compose.yml      # Orquestração de container
```

## 4. Funcionalidades Principais

### Comandos Slash
1.  **/track-leaders [id] [filter] [class]**
    - Busca os 10 melhores tempos de uma pista específica.
    - Filtros: All times, Powerups-only, No powerups.
    - Opcional: Filtrar por classe de carro (S1, A, B, C, D, E).

2.  **/rotation [number]**
    - Informa qual tabela de eventos (1-20) está ativa no momento.
    - Se um número for fornecido, calcula quando será a próxima aparição dessa tabela.

## 5. Funções e Lógica de Negócio

### Funções em `src/functions/`
- `getTopTimesByTrack(id, filter, carClassNumber)`:
    - Faz uma requisição GET para `https://panel.worldunited.gg/api/events/{id}/best-times`.
    - Filtra e formata os resultados em um bloco Markdown para exibição no Discord.
- `getRotation()`:
    - Calcula a rotação atual baseada em uma `startDate` (16/03/2025) e um intervalo de 2 horas.
- `getNextRotation(rotationNumber)`:
    - Calcula o tempo restante e a data exata da próxima ocorrência de uma tabela específica.

### Utilitários em `src/utils/`
- `msToTime(ms)`: Converte milissegundos para `mm:ss.SSS`.
- `timestampToDate(ts)`: Converte timestamps ISO/Unix para formato legível.
- `convertSpeed(speed)`: Formata a velocidade (geralmente KM/H).
- `getClass(rating)`: Converte o valor numérico (ex: 849) para a letra da classe (ex: S1).
- `getDiscordTimestamp(date, style)`: Gera strings como `<t:123456789:F>` para que o Discord exiba a data no fuso horário do usuário.

## 6. Scripts Disponíveis
- `bun run start`: Inicia o bot.
- `bun run deploy`: Registra os comandos no Discord.
- `bun run clear`: Limpa os comandos registrados.
- `bun run lint`: Executa o Biome para corrigir estilo de código.
