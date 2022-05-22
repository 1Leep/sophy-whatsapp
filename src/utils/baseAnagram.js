const words = [
  {
    name: { pt: 'silicone', en: 'silicone' },
    hint: { pt: 'material', en: 'material' }
  },

  {
    name: { pt: 'elefante', en: 'elephant' },
    hint: { pt: 'animal', en: 'animal' }
  },

  {
    name: { pt: 'girassol', en: 'sunflower' },
    hint: { pt: 'flor', en: 'flower' }
  },

  {
    name: { pt: 'espada', en: 'sword' },
    hint: { pt: 'objeto', en: 'object' }
  },

  {
    name: { pt: 'guerreiro', en: 'warrior' },
    hint: { pt: 'combate', en: 'combat' }
  },

  {
    name: { pt: 'computador', en: 'computer' },
    hint: { pt: 'tecnologia', en: 'technology' }
  },

  {
    name: { pt: 'cabelo', en: 'hair' },
    hint: { pt: 'corpo', en: 'body' }
  },

  {
    name: { pt: 'beatles', en: 'beatles' },
    hint: { pt: 'banda', en: 'band' }
  },

  {
    name: { pt: 'helicóptero', en: 'helicopter' },
    hint: { pt: 'transporte', en: 'transport' }
  },

  {
    name: { pt: 'caminhão', en: 'truck' },
    hint: { pt: 'veículo', en: 'vehicle' }
  },

  {
    name: { pt: 'esgrima', en: 'fencing' },
    hint: { pt: 'esporte', en: 'sport' }
  },

  {
    name: { pt: 'guitarra', en: 'guitar' },
    hint: { pt: 'instrumento', en: 'instrument' }
  },

  {
    name: { pt: 'ovelha', en: 'sheep' },
    hint: { pt: 'animal', en: 'animal' }
  },

  {
    name: { pt: 'espátula', en: 'spatula' },
    hint: { pt: 'utensílio', en: 'utensil' }
  },

  {
    name: { pt: 'escada', en: 'ladder' },
    hint: { pt: 'objeto', en: 'object' }
  },

  {
    name: { pt: 'cientista', en: 'scientist' },
    hint: { pt: 'profissão', en: 'profession' }
  },

  {
    name: { pt: 'igreja', en: 'church' },
    hint: { pt: 'local', en: 'place' }
  },

  {
    name: { pt: 'iguana', en: 'iguana' },
    hint: { pt: 'animal', en: 'animal' }
  },

  {
    name: { pt: 'shopping', en: 'shopping' },
    hint: { pt: 'local', en: 'place' }
  },

  {
    name: { pt: 'engenheiro', en: 'engineer' },
    hint: { pt: 'profissão', en: 'profession' }
  },

  {
    name: { pt: 'arco', en: 'bow' },
    hint: { pt: 'objeto', en: 'object' }
  },

  {
    name: { pt: 'bicicleta', en: 'bicycle' },
    hint: { pt: 'veículo', en: 'vehicle' }
  },

  {
    name: { pt: 'saxofone', en: 'saxophone' },
    hint: { pt: 'instrumento', en: 'instrument' }
  },

  {
    name: { pt: 'futebol', en: 'football' },
    hint: { pt: 'esporte', en: 'sport' }
  },

  {
    name: { pt: 'headphone', en: 'headphone' },
    hint: { pt: 'tecnologia', en: 'technology' }
  },

  {
    name: { pt: 'teclado', en: 'keyboard' },
    hint: { pt: 'tecnologia', en: 'technology' }
  },

  {
    name: { pt: 'ornitorrinco', en: 'platypus' },
    hint: { pt: 'animal', en: 'animal' }
  },

  {
    name: { pt: 'basquete', en: 'basketball' },
    hint: { pt: 'esporte', en: '' }
  },


  ];


function shuffleWord(word) {
  const shuffled = Array.from(word).sort(() => 0.5 - Math.random()).join('');
  return shuffled;
}

function getRandomWord(lang) {
  const random = words[Math.floor(Math.random() * words.length)];
  const name = random.name[lang];
  const hint = random.hint[lang];
  const shuffledName = shuffleWord(name);
  return { name, hint, shuffledName };
}

module.exports = getRandomWord;
