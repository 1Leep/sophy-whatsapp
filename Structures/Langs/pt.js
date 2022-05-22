module.exports = {
  name: 'pt',
  onlyGroup: '[🤦🏼♀️] Meus comandos estão disponíveis apenas para grupos!',
  commandErr: '[🤷🏼‍♀️] Oops! Um erro ocorreu durante a execução do comando',
  noPermBot: '[🚫] Eu preciso ser um administrador para executar isto!',
  noPermUser: '[🚫] Você precisa ser um administrador para usar isto',
  noPermDev: '[🚫] Você precisa ser um desenvolvedor para usar isto!',
  langChanged: '[🇧🇷] O idioma foi alterado para Português.',
  invArgs: (args) => `Você não forneceu argumentos válidos!\nUso correto: *${args[0] + args[1]} ${args[2]}*`,
  prefixChanged: (prefix) => `[💛] O prefixo foi alterado para: *${prefix}*`,
  prefixRange: '[🤦🏼‍♀️] O prefixo deve ter no máximo 4 caracteres!',
  helpFooter: (prefix) => `*${prefix}help comando* para mais informações\n[exemplo] *${prefix}help lock*`,
  commandInfo: (prefix, args) => `\`\`\`[${args[0].toUpperCase()}]\`\`\`\n\n${args[4]}\n\n*✦─•─『•💮•』─•─✦*\nUso correto: *${prefix + args[0]} ${args[1]}*\nExemplo: *${prefix + args[0]} ${args[2]}*\nSinônimos: *${args[3].join(', ')}*\n*✦─•─『•💮•』─•─✦*`,
  notFound: '[🤷🏼‍♀️] Comando não encontrado!',
  invalidQuoted: '[🚫] Tipo de mídia inválido!',
  invalidUrl: '[🚫] URL inválida ', 
  mentionMedia: '[🤦🏼‍♀️] Você precisa marcar a mídia desejada.',
  mediaRange: '[🚫] Essa mídia é muito longa para converter.',
  lyricsNotFd: '[🤷🏼‍♀️] Não consegui encontrar a letra desta música.',
  invUser: 'Não consegui encontrar esse membro, verifique se é um número válido!',
  alreadyAdm: '[🤦🏼‍♀️] Esse usuário já é um administrador.',
  sucessPromote: (mention) => `[✅] O usuário ${mention} agora é um administrador!`,
  sucessDemote: (mention) => `[✅] O usuário ${mention} foi rebaixado!`,
  sucessChanges: '[✅] Alterações realizadas com sucesso!',
  alreadyAdm: '[🤦🏼‍♀️] Esse usuário não é um administrador.',
  remaining: ([hour, min, sec]) => `Espere o tempo de recarga acabar...\n*[⏳] ${`${hour > 0 ? hour + ' horas' : ''} ${min > 0 ? min + ' minutos' : ''} ${sec > 0 ? sec + ' segundos' : ''}`.trim()} restantes...*`,
  banAdmErr: '[🤦🏼‍♀️] Não posso remover um administrador!',
  pingMsg: ['🏓 º° Calculando...', '*🌐 °º Tempo de resposta: {ping} ms*'],
  mentionMe: (prefix) => `💛 Meu prefixo nesse grupo é *${prefix}*\n°º Digite ${prefix}help para ver a lista de comandos!`,
  levelUp: (level, name) => `🎊 *Parabéns!*\n*Você passou para o nível: ${level} [${name}]*`,
  profileStats: ({ xp, level, nextLevel, money }) => `*[🎖️] Dados do Perfil [🎖️]*\n\n*{⚗️} Xp:* \`\`\`${xp}\`\`\`\n*{🥋} Nível:* \`\`\`${level}\`\`\`\n*{🎴} Próximo Nível:* \`\`\`${nextLevel}\`\`\`\n*{💰} Dinheiro:* \`\`\`${money}\`\`\`\n\n${new Date().toLocaleString('pt-br', {timeZone: 'America/Sao_Paulo', dateStyle: 'medium', timeStyle: 'short' }) }`,
  invBackgroundColor: (arrayColors, levelReqArray) => `Não encontrei essa cor, confira a lista:\n\n${arrayColors.map(i => `➜ *${levelReqArray.includes(i) ?  i + ' (Nvl 2+)' : i }*`).join('\n')}`, 
  insufficientLvl: (levelReq) => `[🤷🏼‍♀️] Seu nível é baixo demais para isso...\n*Nível necessário:* ${levelReq}`, 
  loading: '[⏳] Carregando...', 
  rangeYtVideo: 'Esse vídeo excede o limite de minutos!\n*Máximo: 10 minutos*', 
  willBeSent: (seconds) => `*A questão será enviada em ${seconds} segundos...*`, 
  questAnagram: (shuffledName, hint, time) => `❲📖° ANAGRAMA °📖❳\n\n➜ \`\`\`Palavra: ${shuffledName} \`\`\`\n➜ \`\`\`Dica: ${hint} \`\`\`\n\n❲⏰❳ *${time} segundos*`, 
  correctAnswer: (reward) => `🎊 *Parabéns, você acertou!*\n[💰] recompensa: \`\`\`+${reward}\`\`\``, 
  welcomeMsg: (member) => `💛 Bem-vindo(a) @${member}, espero que divirta-se no grupo!`, 
  removedMsg: (member) => `🤷🏼‍♀️ O membro @${member} deixou o grupo!`, 
  blacklist: '🤦🏼‍♀️ Você não pode usar os comandos, pois está na lista negra.'

};