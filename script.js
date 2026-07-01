let firstRound = true;

let answered = false;

let totalRounds = 0;

let currentRound = 1;

let feedbackRevealed = false;

let pendingFeedback = "";

let rankingActive = false;

/* ========= TEAMS ========= */

let teams = [];
let currentTeamIndex = 0;

/* ========= SETUP ========= */

function generateNameInputs() {
  let count = parseInt(document.getElementById("teamCount").value);
  let container = document.getElementById("teamNames");

  // Save existing names
  let existingNames = [];
  let inputs = container.querySelectorAll("input");

  inputs.forEach(input => {
    existingNames.push(input.value);
  });

  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Team " + (i + 1);
    input.id = "teamName" + i;

    // Restore previous values
    if (existingNames[i]) {
      input.value = existingNames[i];
    }

    // Character limit
    input.maxLength = 12;

    input.className = "team-input";

    container.appendChild(input);
  }
}

function startGame() {
  let count = parseInt(document.getElementById("teamCount").value);

  teams = [];

  for (let i = 0; i < count; i++) {
    let input = document.getElementById("teamName" + i);

    // 🛡️ safety check
    if (!input) {
      alert("Something went wrong. Try selecting the number of teams again.");
      return;
    }

    let nameInput = input.value;
    let teamName = nameInput.trim() !== "" ? nameInput : "Team " + (i + 1);

    teams.push({
      name: teamName,
      score: 0
    });

    totalRounds = parseInt(document.getElementById("roundCount").value);
currentRound = 1;
    
  }

  document.getElementById("setup").style.display = "none";
  document.getElementById("game").style.display = "block";

  updateScoreboard();

  // reset rotation properly
  currentTeamIndex = 0;
  firstRound = true;

  nextRound();
}
/* ========= QUESTIONS ========= */

let allQuestions = [
  {
  text: "Players who receive a red card _____ leave the field immediately.",
  options: [
    {
      text: "going to",
      score: 0,
      type: "Wrong",
      explanation: "'Going to' é usado para planos ou previsões com evidência. Aqui a frase precisa expressar uma obrigação."
    },
    {
      text: "will",
      score: 0,
      type: "Wrong",
      explanation: "WILL fala de previsões sem evidência, opiniões, promessas, ofertas e decisões feitas no momento. Receber um cartão vermelho é é uma regra."
    },
    {
      text: "must",
      score: 1,
      type: "Correct",
      explanation: "Exactly! MUST é usado para regras e obrigações. Jogadores com cartão vermelho devem sair do campo."
    },
    {
      text: "may",
      score: 0,
      type: "Wrong",
      explanation: "Usamos MAY para dar ou pedir permissão ou para falar sobre algo que talvez aconteça. Aqui precisamos expressar obrigação."
    }
  ]
},

{
  text: "Excuse me, officer. I have this professional camera with me. __________ I bring it inside the stadium?",
  options: [
    {
      text: "will",
      score: 0,
      type: "Wrong",
      explanation: "WILL fala de previsões sem evidência, opiniões, promessas, ofertas e decisões feitas no momento. Aqui a frase pede permissão."
    },
    {
      text: "should",
      score: 0,
      type: "Wrong",
      explanation: "SHOULD é usado para dar ou pedir conselho. Aqui a frase pede permissão."
    },
    {
      text: "must",
      score: 0,
      type: "Wrong",
      explanation: "MUST é usado para obrigações. Aqui a frase pede permissão."
    },
    {
      text: "may",
      score: 1,
      type: "Correct",
      explanation: "Exactly! MAY pode ser usado para pedir permissão. Também poderíamos usar CAN."
    }
  ]
},

  {
  text: "They are not the favorites,but they ________ win this match. It's a very low probability, but not impossible.",
  options: [
    {
      text: "must",
      score: 0,
      type: "Wrong",
      explanation: "MUST significa que algo é obrigatório. A frase está falando em uma possibilidade remota, então usamos MIGHT."
    },
    {
      text: "should",
      score: 0,
      type: "Wrong",
      explanation: "SHOULD é usado para dar conselho ou recomendação. A frase está falando em uma possibilidade remota, então é MIGHT."
    },
    {
      text: "are going to",
      score: 0,
      type: "Wrong",
      explanation: "GOING TO indicaria um plano ou uma previsão com evidência. A frase está falando em uma possibilidade remota. O correto é MIGHT."
    },
    {
      text: "might",
      score: 1,
      type: "Correct",
      explanation: "Exactly! MIGHT deve ser usado para possibilidades remotas."
    }
  ]
},
  
{
  text: "Fans _____ bring fireworks into a World Cup stadium. Fireworks are not allowed.",
  options: [
    {
      text: "can",
      score: 0,
      type: "Wrong",
      explanation: "CAN indica permissão ou possibilidade. Fogos de artifício não são permitidos no estádio."
    },
    {
      text: "should",
      score: 0,
      type: "Wrong",
      explanation: "SHOULD é usado para conselhos. A frase fala sobre uma proibição."
    },
    {
      text: "are going to",
      score: 0,
      type: "Wrong",
      explanation: "GOING TO fala de previsões e planos.A frase fala sobre uma proibição."
    },
    {
      text: "mustn't",
      score: 1,
      type: "Correct",
      explanation: "Exactly! MUSTN'T é usado para proibições. Não é permitido levar fogos de artifício ao estádio."
    }
  ]
},

  {
  text: "It's scorching hot here at the stadium! I think you ______ drink plenty of water to avoid dehydration. It's really important for your health.",
  options: [
    {
      text: "can",
      score: 0,
      type: "Wrong",
      explanation: "CAN indica permissão, habilidade ou possibilidade. Aqui estamos dando um conselho. A resposta é SHOULD."
    },
    {
      text: "should",
      score: 1,
      type: "Correct",
      explanation: "Exactly! SHOULD é usado para conselhos."
    },
    {
      text: "may",
      score: 0,
      type: "Wrong",
      explanation: "MAY pode indicar permissão ou possibilidade. Aqui estamos dando um conselho. A resposta é SHOULD."
    },
    {
      text: "might",
      score: 0,
      type: "Wrong",
      explanation: "MIGHT pode indicar uma possibilidade pequena. Aqui estamos dando um conselho. A resposta é SHOULD."
    }
  ]
},

  {
  text: "Football is unpredictable, so Paraguay ______ defeat France in the quarter-finals of the World Cup.",
  options: [
    {
      text: "must",
      score: 0,
      type: "Wrong",
      explanation: "Aqui estamos falando sobre a possibilidade não tão remota de uma coisa acontecer. MUST é usado para falar de obrigações. Usamos MAY."
    },
    {
      text: "may",
      score: 1,
      type: "Correct",
      explanation: "Exactly! Aqui estamos falando sobre a possibilidade não tão remota de uma coisa acontecer. Usamos MAY."
    },
    {
      text: "should",
      score: 0,
      type: "Wrong",
      explanation: "SHOULD é usado para falar de conselhos. Aqui estamos falando sobre a possibilidade não tão remota de uma coisa acontecer. Usamos MAY."
    },
    {
      text: "will",
      score: 0,
      type: "Wrong",
      explanation: "WILL é usado para previsões sem evidência, opiniões, promessas, ofertas e decisões feitas no momento. A frase está falando sobre a possibilidade não tão remota de uma coisa acontecer. Usamos MAY."
    }
  ]
},

  {
  text: "After a tough loss, the coach advised the players: 'You ______ analyze your performance and learn from your mistakes.'",
  options: [
    {
      text: "can",
      score: 0,
      type: "Wrong",
      explanation: "CAN indica permissão, habilidade ou possibilidade. Aqui estamos dando um conselho. A resposta é SHOULD."
    },
    {
      text: "should",
      score: 1,
      type: "Correct",
      explanation: "Exactly! SHOULD é usado para conselhos."
    },
    {
      text: "will",
      score: 0,
      type: "Wrong",
      explanation: "MAY pode indicar permissão ou possibilidade. Aqui estamos dando um conselho. A resposta é SHOULD."
    },
    {
      text: "might",
      score: 0,
      type: "Wrong",
      explanation: "MIGHT pode indicar uma possibilidade pequena. Aqui estamos dando um conselho. A resposta é SHOULD."
    }
  ]
},

{
  text: "Unlike other players, goalkeepers _____ use their hands inside the penalty area.",
  options: [
    {
      text: "can",
      score: 1,
      type: "Correct",
      explanation: "Exactly! CAN expressa permissão. Goleiros podem usar as mãos dentro da área."
    },
    {
      text: "will",
      score: 0,
      type: "Wrong",
      explanation: "WILL é usado para previsões sem evidência, opiniões, promessas, ofertas e decisões feitas no momento. A frase fala sobre uma permissão."
    },
    {
      text: "should",
      score: 0,
      type: "Wrong",
      explanation: "SHOULD expressa conselho. A frase fala sobre uma permissão."
    },
    {
      text: "have to",
      score: 0,
      type: "Wrong",
      explanation: "HAVE TO indica obrigação. Os goleiros podem usar as mãos, mas não são obrigados a fazer isso."
    }
  ]
},

{
  text: "A player with a serious injury _____ keep playing without medical attention. It is dangerous.",
  options: [
    {
      text: "can",
      score: 0,
      type: "Wrong",
      explanation: "CAN expressa possibilidade, permissão ou habilidade. A frase está dando um conselho."
    },
    {
      text: "shouldn't",
      score: 1,
      type: "Correct",
      explanation: "Exactly! SHOULDN'T é usado para aconselhar contra algo. Continuar jogando machucado é perigoso."
    },
    {
      text: "won't",
      score: 0,
      type: "Wrong",
      explanation: "WILL é usado para previsões sem evidência, opiniões, promessas, ofertas e decisões feitas no momento. Aqui estamos falando de necessidade ou obrigação."
    },
    {
      text: "has to",
      score: 0,
      type: "Wrong",
      explanation: "HAVE TO indica obrigação. Um jogador machucado não é obrigado a continuar jogando."
    }
  ]
},

{
  text: "Teams _____ arrive at the stadium before the match starts. If they don't, they cannot play.",
  options: [
    {
      text: "have to",
      score: 1,
      type: "Correct",
      explanation: "Exactly! HAVE TO expressa uma necessidade ou obrigação."
    },
    {
      text: "can't",
      score: 0,
      type: "Wrong",
      explanation: "CAN'T indica possibilidade ou permissão. A frase fala de uma obrigação."
    },
    {
      text: "going to",
      score: 0,
      type: "Wrong",
      explanation: "GOING TO é usado para previsões com evidência ou para planos. Aqui estamos falando de necessidade ou obrigação."
    },
    {
      text: "will",
      score: 0,
      type: "Wrong",
      explanation: "WILL é usado para previsões sem evidência, opiniões, promessas, ofertas e decisões feitas no momento. Aqui estamos falando de necessidade ou obrigação."
    }
  ]
},

{
  text: "Fans _____ buy a ticket to enter the stadium. No ticket, no entry.",
  options: [
    {
      text: "can't",
      score: 0,
      type: "Wrong",
      explanation: "CAN'T indica proibição. A frase fala de uma exigência para entrar."
    },
    {
      text: "will",
      score: 0,
      type: "Wrong",
      explanation: "WILL é usado para previsões sem evidência, opiniões, promessas, ofertas e decisões feitas no momento. Comprar o ingresso é obrigatório para entrar."
    },
    {
      text: "have to",
      score: 1,
      type: "Correct",
      explanation: "Exactly! HAVE TO expressa uma obrigação para entrar no estádio."
    },
    {
      text: "are going to",
      score: 0,
      type: "Wrong",
      explanation: "GOING TO é usado para previsões com evidência ou para planos. Aqui é uma exigência."
    }
  ]
},

{
  text: "Spectators _____ sit anywhere they want during the match. They must use their assigned seats.",
  options: [
    {
      text: "should",
      score: 0,
      type: "Wrong",
      explanation: "SHOULD é usado para conselhos. A frase fala de algo que não é permitido."
    },
    {
      text: "can't",
      score: 1,
      type: "Correct",
      explanation: "Exactly! CAN'T indica que algo não é permitido."
    },
    {
      text: "may",
      score: 0,
      type: "Wrong",
      explanation: "MAY indicaria permissão, mas os torcedores não têm essa permissão."
    },
    {
      text: "have to",
      score: 0,
      type: "Wrong",
      explanation: "HAVE TO significaria que eles são obrigados a sentar onde quiserem, o que não faz sentido."
    }
  ]
},

{
  text: "The referee _____ stop the game if there is dangerous weather, but the decision is up to him.",
  options: [
    {
      text: "may",
      score: 1,
      type: "Correct",
      explanation: "Exactly! MAY indica que algo é permitido ou possível."
    },
    {
      text: "can't",
      score: 0,
      type: "Wrong",
      explanation: "CAN'T indicaria que o árbitro não pode parar o jogo, o que não é verdade."
    },
    {
      text: "shouldn't",
      score: 0,
      type: "Wrong",
      explanation: "SHOULDN'T significaria que ele não deveria parar o jogo."
    },
    {
      text: "won't",
      score: 0,
      type: "Wrong",
      explanation: "WILL é usado para previsões sem evidência, opiniões, promessas, ofertas e decisões feitas no momento. Estamos falando de uma coisa que é permitida ou possível."
    }
  ]
},

{
  text: "Fans _____ travel to another country to enjoy the World Cup. They can watch it on TV.",
  options: [
    {
      text: "mustn't",
      score: 0,
      type: "Wrong",
      explanation: "MUSTN'T indica proibição. Viajar não é proibido."
    },
    {
      text: "don't have to",
      score: 1,
      type: "Correct",
      explanation: "Exactly! DON'T HAVE TO significa que algo não é necessário."
    },
    {
      text: "should",
      score: 0,
      type: "Wrong",
      explanation: "SHOULD é usado para conselhos. A frase fala sobre necessidade."
    },
    {
      text: "have to",
      score: 0,
      type: "Wrong",
      explanation: "HAVE TO indicaria obrigação. Os torcedores podem assistir pela TV."
    }
  ]
},

{
  text: "Players _____ respect the referee's decisions during the match.",
  options: [
    {
      text: "can't",
      score: 0,
      type: "Wrong",
      explanation: "CAN'T indicaria proibição ou impedimento. A frase fala sobre uma obrigação."
    },
    {
      text: "will",
      score: 0,
      type: "Wrong",
      explanation: "WILL é usado para previsões sem evidência, opiniões, promessas, ofertas e decisões feitas no momento. Estamos falando de uma obrigação"
    },
    {
      text: "must",
      score: 1,
      type: "Correct",
      explanation: "Exactly! MUST é usado para regras e obrigações."
    },
    {
      text: "don't have to",
      score: 0,
      type: "Wrong",
      explanation: "DON'T HAVE TO significa que algo não é necessário. Respeitar o árbitro é obrigatório."
    }
  ]
},

{
  text: "A coach _____ enter the field during the game without permission.",
  options: [
    {
      text: "will not",
      score: 0,
      type: "Wrong",
      explanation: "WILL é usado para previsões sem evidência, opiniões, promessas, ofertas e decisões feitas no momento. Estamos falando de permissão."
    },
    {
      text: "can't",
      score: 1,
      type: "Correct",
      explanation: "Exactly! CAN'T indica que algo não é permitido."
    },
    {
      text: "isn't going to",
      score: 0,
      type: "Wrong",
      explanation: "GOING TO é usado para previsões com evidência ou para planos. A frase fala sobre uma regra."
    },
    {
      text: "have to",
      score: 0,
      type: "Wrong",
      explanation: "HAVE TO indica obrigação. O técnico não é obrigado a entrar em campo."
    }
  ]
},

{
  text: "Fans _____ bring food from home because food is available inside the stadium.",
  options: [
    {
      text: "don't have to",
      score: 1,
      type: "Correct",
      explanation: "Exactly! DON'T HAVE TO significa que algo não é necessário."
    },
    {
      text: "must",
      score: 0,
      type: "Wrong",
      explanation: "MUST indicaria obrigação. Os torcedores não são obrigados a levar comida."
    },
    {
      text: "should",
      score: 0,
      type: "Wrong",
      explanation: "SHOULD é um conselho. A frase fala sobre necessidade."
    },
    {
      text: "may",
      score: 0,
      type: "Wrong",
      explanation: "MAY indica permissão. O foco da frase é que não é necessário levar comida."
    }
  ]
},

{
  text: "Players _____ argue aggressively with the referee. It is against the rules.",
  options: [
    {
      text: "aren't going to",
      score: 0,
      type: "Wrong",
      explanation: "GOING TO é usado para previsões com evidência ou para planos. A frase fala sobre uma proibição."
    },
    {
      text: "can",
      score: 0,
      type: "Wrong",
      explanation: "CAN indica permissão. Os jogadores não têm essa permissão."
    },
    {
      text: "won't",
      score: 0,
      type: "Wrong",
      explanation: "WILL é usado para previsões sem evidência, opiniões, promessas, ofertas e decisões feitas no momento. Estamos falando de uma proibição."
    },
    {
      text: "mustn't",
      score: 1,
      type: "Correct",
      explanation: "Exactly! MUSTN'T é usado para proibições."
    }
  ]
},

{
  text: "Players _____ wear shin guards during a match. It is mandatory.",
  options: [
    {
      text: "must",
      score: 1,
      type: "Correct",
      explanation: "Exactly! MUST é usado para regras e obrigações."
    },
    {
      text: "will",
      score: 0,
      type: "Wrong",
      explanation: "WILL é usado para previsões sem evidência, opiniões, promessas, ofertas e decisões feitas no momento. Estamos falando de uma regra."
    },
    {
      text: "may",
      score: 0,
      type: "Wrong",
      explanation: "MAY indica permissão. O uso de caneleiras é obrigatório."
    },
    {
      text: "going to",
      score: 0,
      type: "Wrong",
      explanation: "GOING TO é usado para previsões com evidência ou planos. Estamos falando de uma obrigação."
    }
  ]
},

{
  text: "A substitute player _____ enter the field before the referee gives permission.",
  options: [
    {
      text: "will not",
      score: 0,
      type: "Wrong",
      explanation: "WILL é usado para previsões sem evidência, opiniões, promessas, ofertas e decisões feitas no momento. Aqui estamos falando de não ter permissão."
    },
    {
      text: "should",
      score: 0,
      type: "Wrong",
      explanation: "SHOULD é usado para conselhos. A frase fala sobre uma regra."
    },
    {
      text: "must",
      score: 0,
      type: "Wrong",
      explanation: "MUST indicaria obrigação. O jogador não é obrigado a entrar."
    },
    {
      text: "can't",
      score: 1,
      type: "Correct",
      explanation: "Exactly! CAN'T indica que algo não é permitido."
    }
  ]
},

{
  text: "Visitors _____ enter the players' locker room without special permission.",
  options: [
    {
      text: "can",
      score: 0,
      type: "Wrong",
      explanation: "CAN indica permissão, possibilidade ou habilidade. A frase fala sobre uma probibição."
    },
    {
      text: "should",
      score: 0,
      type: "Wrong",
      explanation: "SHOULD é usado para conselhos. AA frase fala sobre uma probibição."
    },
    {
      text: "won't",
      score: 0,
      type: "Wrong",
      explanation: "WILL é usado para previsões sem evidência, opiniões, promessas, ofertas e decisões feitas no momento. A frase fala sobre uma probibição."
    },
    {
      text: "mustn't",
      score: 1,
      type: "Correct",
      explanation: "Exactly! MUSTN'T indica que algo é proibido."
    }
  ]
},
];


/* ========= GAME ========= */

let remainingQuestions = allQuestions.slice();
let currentQuestion = null;

/* ========= HELPERS ========= */

function shuffleArray(array) {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}


function updateScoreboard() {
  let container = document.getElementById("scoreboard");
  container.innerHTML = "";

  teams.forEach((team, index) => {
    let div = document.createElement("div");
    div.className = "team-box";

    // Highlight current team
    if (index === currentTeamIndex) {
      div.classList.add("active-team");
    }

    div.innerHTML = `
      <div class="team-name">${team.name}</div>
      <div class="team-score">${team.score}</div>
    `;

    container.appendChild(div);
  });
}

/* ========= ROUND ========= */

function nextRound() {

if (currentRound > totalRounds) {
  showRankingScreen();
  return;
}

  answered = false;
  
let nextBtn = document.getElementById("nextBtn");

nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";
nextBtn.style.cursor = "not-allowed";
  
  setTheme("purple");

  // ✅ correct team rotation logic
  if (!firstRound) {
    currentTeamIndex++;
    if (currentTeamIndex >= teams.length) {
      currentTeamIndex = 0;
    }
  } else {
    firstRound = false;
  }

  let index = Math.floor(Math.random() * remainingQuestions.length);
  currentQuestion = remainingQuestions[index];

  document.getElementById("situation").innerText = currentQuestion.text;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  let shuffledOptions = shuffleArray(currentQuestion.options);

  shuffledOptions.forEach(option => {
    let btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = option.text;

    btn.onclick = function (event) {
  handleAnswer(option, event);
};

    optionsDiv.appendChild(btn);
  });




  let feedbackBox = document.getElementById("feedback");

feedbackBox.innerText = "Discuss and choose an answer.";
feedbackBox.style.color = "#666";
feedbackBox.style.cursor = "default"; 
feedbackBox.onclick = null;


  updateScoreboard(); // ✅ keeps highlight in sync


  updateRoundDisplay();
}


/* ========= ANSWER ========= */

function handleAnswer(option, event) {
  if (answered) return;

  answered = true;

  // click animation on selected option
let clickedBtn = event.target;
  clickedBtn.classList.add("selected");

clickedBtn.style.transform = "scale(0.92)";

setTimeout(() => {
  clickedBtn.style.transform = "scale(1)";
}, 120);

  clickedBtn.style.filter = "brightness(0.95)";

  

  document.querySelectorAll(".option").forEach(btn => {
    btn.disabled = true;
  });

  teams[currentTeamIndex].score += option.score;

  let feedbackText = "[" + option.type.toUpperCase() + "]\n" + option.explanation;

  // ALWAYS remove question after answering
remainingQuestions = remainingQuestions.filter(q => q !== currentQuestion);

if (option.score === 1) {
  updateScoreboard();
  setTheme("green");
  feedbackText = "✅ " + feedbackText;

} else if (option.score === 0.5) {
  updateScoreboard();
  setTheme("yellow");
  feedbackText = "🟡 " + feedbackText;

} else {
  updateScoreboard();
  setTheme("red");
  feedbackText = "❌ " + feedbackText;
}

  pendingFeedback = feedbackText;
feedbackRevealed = false;

let feedbackBox = document.getElementById("feedback");

feedbackBox.innerText = "Click here to reveal feedback.";
feedbackBox.style.color = "#666";

feedbackBox.style.cursor = "pointer";   
feedbackBox.onclick = revealFeedback;  
feedbackBox.classList.add("clickable");


  updateScoreboard();

let nextBtn = document.getElementById("nextBtn");

nextBtn.disabled = false;
nextBtn.style.opacity = "1";
nextBtn.style.cursor = "pointer";

  // track rounds AFTER a team finishes answering
if (currentTeamIndex === teams.length - 1) {
  currentRound++;
}
}

/* ========= RESTART ========= */

function restartGame() {
  setTheme("purple");

  teams.forEach(team => team.score = 0);

  remainingQuestions = allQuestions.slice();
  currentTeamIndex = 0;
  currentRound = 1;
  firstRound = true;

  // hide everything properly
  document.getElementById("game").style.display = "none";
  document.getElementById("ranking").style.display = "none";
  document.getElementById("setup").style.display = "block";

  // reset ranking UI
  document.getElementById("rankingList").innerHTML = "";

  updateScoreboard();
}
/* ========= INIT ========= */

window.onload = function () {
  generateNameInputs();
  updateRoundOptions();
};


/* ========= HOW MANY ROUNDS ========= */
function updateRoundOptions() {
  let teamCount = parseInt(document.getElementById("teamCount").value);
  let totalQuestions = allQuestions.length;

  let maxRounds = Math.floor(totalQuestions / teamCount);

  let select = document.getElementById("roundCount");
  select.innerHTML = "";

  for (let i = 1; i <= maxRounds; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.text = i + " round" + (i > 1 ? "s" : "");
    select.appendChild(option);
  }
}

/* ========= ROUND DISPLAY ========= */

function updateRoundDisplay() {
  document.getElementById("roundDisplay").innerText =
    "Round " + currentRound + " of " + totalRounds;
}

/* ========= THEME COLORS ========= */

function setTheme(color) {
  const body = document.body;
  const box = document.querySelector(".game-box");
  const dialogue = document.querySelector(".dialogue-box");
  const buttons = document.querySelectorAll(".option");
 const nextBtn = document.getElementById("nextBtn");
  const active = document.querySelector(".active-team");

  let colors = {
    purple: { border: "#8c7ae6", bg: "#f4f1ff", button: "#dcd6ff" },
    green:  { border: "#2ecc71", bg: "#eafaf1", button: "#d5f5e3" },
    yellow: { border: "#f1c40f", bg: "#fff9e6", button: "#fff3cd" },
    red:    { border: "#ff8a8a", bg: "#ffe0e0", button: "#ffd6d6" }
  };

  let c = colors[color];

  // 🌈 BACKGROUND (whole page)
  body.style.backgroundColor = c.bg;

  // 🎮 main box
  box.style.borderColor = c.border;
  box.style.boxShadow = `6px 6px 0px ${c.border}`;

  // 💬 question box
  dialogue.style.borderColor = c.border;

  // 🎯 options
  buttons.forEach(btn => {
    btn.style.backgroundColor = c.button;
    btn.style.borderColor = c.border;
  });

  // ▶️ next button
  if (nextBtn) {
    nextBtn.style.backgroundColor = c.button;
    nextBtn.style.borderColor = c.border;
  }

  // 🧑‍🤝‍🧑 active team
// 🎯 force active team styling AFTER render
setTimeout(() => {
  const active = document.querySelector(".active-team");
  if (active) {
    active.style.border = `2px solid ${c.border}`;
    active.style.backgroundColor = c.bg;
  }
}, 0);

  // 🏆 scoreboard boxes (important!)
  document.querySelectorAll(".team-box").forEach(box => {
    box.style.borderColor = "#ccc"; // reset first
  });

  if (active) {
    active.style.borderColor = c.border;
  }

  //THEME ANIMATIONS
box.classList.remove("theme-flash");
void box.offsetWidth;
box.classList.add("theme-flash");
  
}

//REVEAL FEEDBACK ON CLICK

function revealFeedback() {
  if (feedbackRevealed) return;

  let feedbackBox = document.getElementById("feedback");

  feedbackBox.innerText = pendingFeedback;
  feedbackBox.style.color = "#000";

  feedbackRevealed = true;

  feedbackBox.style.cursor = "default";
feedbackBox.onclick = null;
  feedbackBox.classList.remove("clickable");
}

//RANKING SCREEN

/* ========= RANKING SCREEN ========= */

let ranking = [];
let revealIndex = 0;

function showRankingScreen() {
  setTheme("purple");

  document.getElementById("game").style.display = "none";
  document.getElementById("ranking").style.display = "block";

  let container = document.getElementById("rankingList");
  container.innerHTML = "";

  ranking = [...teams].sort((a, b) => {
  if (b.score !== a.score) return b.score - a.score;
  return a.name.localeCompare(b.name); // tie breaker
});

  revealIndex = ranking.length - 1;

 container.innerHTML = `
  <button id="revealBtn">Click to reveal ranking</button>
`;

  // ✅ USE GLOBAL variable
  rankingActive = true;

  document.getElementById("revealBtn").onclick = function () {
  if (!rankingActive) return;

  // remove button after first click
  this.remove();

  revealNextRank();
};
}

function revealNextRank() {
  let container = document.getElementById("rankingList");

  let hint = document.querySelector(".reveal-hint");
  if (hint) hint.remove();

  if (revealIndex === 0) {
  // next reveal will be winner, so prepare button AFTER
}


 let currentScore = ranking[revealIndex].score;
  let originalRanking = [...ranking];

// get ALL teams with this score
let group = ranking.filter(t => t.score === currentScore);

// remove them from ranking so they aren't reused
ranking = ranking.filter(t => t.score !== currentScore);

// update revealIndex properly
revealIndex = ranking.length - 1;

// determine position
let higherScores = originalRanking.filter(t => t.score > currentScore).length;
let position = higherScores + 1;

// render ALL teams in group
group.forEach(team => {
  let div = document.createElement("div");
  div.className = "rank-card reveal";

  let display = "";

  if (position === 1) display = "🥇";
  else if (position === 2) display = "🥈";
  else if (position === 3) display = "🥉";
  else display = position + (position === 4 ? "th" : "th");

  if (group.length > 1) display += " (tie)";

  div.innerHTML = `
    <div class="rank-emoji">${display}</div>
    <div class="rank-name">${team.name}</div>
    <div class="rank-score">${team.score} pts</div>
  `;

  // medal styling
  if (position === 1) {
  div.classList.add("winner", "gold");
  div.style.background = "#fff7cc";
  div.style.borderColor = "#e1b700";
}
else if (position === 2) {
  div.classList.add("silver");
  div.style.background = "#f2f2f2";
  div.style.borderColor = "#aaa";
}
else if (position === 3) {
  div.classList.add("bronze");
  div.style.background = "#f8e1d4";
  div.style.borderColor = "#c97c4a";
}

  container.prepend(div);

  div.onclick = function () {
  if (!rankingActive) return;

  div.onclick = null;

  setTimeout(() => {
    revealNextRank();
  }, position === 1 ? 1200 : 700);
};

  
});

// 🎉 winner effects (only once)
if (position === 1) {
  setTimeout(() => launchConfetti(), 400);

  setTimeout(() => {
    if (!document.getElementById("playAgainBtn")) {
      let btn = document.createElement("button");
      btn.id = "playAgainBtn";
      btn.innerText = "Restart Game";
      btn.onclick = restartGame;
      btn.style.marginTop = "20px";

      container.appendChild(btn);
    }
  }, 600);
}
}

function getRankEmoji(index, total) {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";
  if (index === 3) return "🎖️";
  if (index === 4) return "👏";
  return "⭐";
}


//CONFETTI FOR WINNER
function launchConfetti() {
  for (let i = 0; i < 40; i++) {
    let confetti = document.createElement("div");
    confetti.className = "confetti";

    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.animationDuration = (Math.random() * 1 + 1) + "s";

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 2000);
  }
}
