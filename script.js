// Dictionary of Linux commands and their descriptions with options
const commands = {
  // Existing commands
  ls: {
    description: "List files and directories",
    options: ["ls", "cd", "mkdir", "rm"]
  },
  cd: {
    description: "Change directory",
    options: ["mkdir", "rm", "ls", "cd"]
  },
  pwd: {
    description: "Print working directory",
    options: ["mv", "pwd", "rm", "mkdir"]
  },
  mkdir: {
    description: "Create a new directory",
    options: ["mkdir", "ls", "rm", "cd"]
  },
  touch: {
    description: "Create a new file",
    options: ["rm", "cd", "touch", "ls"]
  },
  cp: {
    description: "Copy files and directories",
    options: ["cp", "mv", "rm", "cd"]
  },
  mv: {
    description: "Move or rename files and directories",
    options: ["mv", "cp", "rm", "cd"]
  },
  rm: {
    description: "Remove files and directories",
    options: ["rm", "mv", "cp", "cd"]
  },
  cat: {
    description: "Concatenate and display file contents",
    options: ["ls", "rm", "cd", "cat"]
  },
  grep: {
    description: "Search for patterns in files",
    options: ["cd", "ls", "grep", "rm"]
  },
  chmod: {
    description: "Change file permissions",
    options: ["ls", "cd", "chmod", "rm"]
  },
  chown: {
    description: "Change file ownership",
    options: ["chown", "chmod", "ls", "rm"]
  },
  ps: {
    description: "Display running processes",
    options: ["rm", "ls", "cd", "ps"]
  },
  top: {
    description: "Monitor system processes",
    options: ["top", "ps", "cd", "ls"]
  },
  kill: {
    description: "Terminate processes",
    options: ["kill", "top", "ls", "rm"]
  },
  ssh: {
    description: "Secure Shell - Connect to a remote server",
    options: ["ssh", "scp", "rm", "cd"]
  },
  scp: {
    description: "Securely copy files between local and remote systems",
    options: ["scp", "ssh", "rm", "cd"]
  },
  ping: {
    description: "Send ICMP echo requests to a network host",
    options: ["ping", "ssh", "cd", "ls"]
  },
  ifconfig: {
    description: "Configure network interfaces",
    options: ["ifconfig", "ping", "ls", "cd"]
  },
  wget: {
    description: "Download files from the web",
    options: ["wget", "cd", "rm", "ls"]
  },
  tar: {
    description: "Archive files and directories",
    options: ["rm", "cd", "tar", "ls"]
  },
  gzip: {
    description: "Compress files",
    options: ["gzip", "tar", "ls", "cd"]
  },
  find: {
    description: "Search for files and directories",
    options: ["find", "ls", "cd", "rm"]
  },
  man: {
    description: "Display the manual page for a command",
    options: ["man", "cd", "ls", "rm"]
  },
  // Additional commands
  uname: {
    description: "Print system information",
    options: ["uname", "whoami", "pwd", "ls"]
  },
  history: {
    description: "Display command history",
    options: ["history", "grep", "ls", "cd"]
  },
  tar: {
    description: "Extract files from a tar archive",
    options: ["tar", "gzip", "ls", "rm"]
  },
  chmod: {
    description: "Change file permissions",
    options: ["chmod", "chown", "ls", "rm"]
  },
  uptime: {
    description: "Show system uptime",
    options: ["uptime", "top", "ps", "ls"]
  },
  whoami: {
    description: "Display the current user",
    options: ["whoami", "uname", "pwd", "ls"]
  },
  du: {
    description: "Estimate file and directory disk usage",
    options: ["du", "ls", "cd", "rm"]
  },
  df: {
    description: "Display free disk space",
    options: ["df", "ls", "cd", "rm"]
  },
  date: {
    description: "Display the current date and time",
    options: ["date", "cal", "ls", "cd"]
  },
  cal: {
    description: "Display a calendar",
    options: ["cal", "date", "ls", "cd"]
  }
  // ... add more commands as needed
};



let questionList = [];
let score = 0;
let currentQuestionIndex = 0;

const startButton = document.getElementById("start-button");
const questionNumberElement = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const optionsList = document.getElementById("options-list");
const submitButton = document.getElementById("submit-button");
const resultElement = document.getElementById("result");

startButton.addEventListener("click", startGame);
submitButton.addEventListener("click", submitAnswer);

function startGame() {
  // Reset variables
  startButton.style.display = 'none';
  questionList = getRandomQuestions(Object.keys(commands), 38);
  score = 0;
  currentQuestionIndex = 0;
  resultElement.textContent = "";

  showQuestion();
  startButton.disabled = true;
}

function showQuestion() {
  const currentQuestion = questionList[currentQuestionIndex];
  questionNumberElement.textContent = `Question ${currentQuestionIndex + 1}:`;
  questionElement.textContent = `Description: ${commands[currentQuestion].description}`;

  // Clear previous options
  while (optionsList.firstChild) {
    optionsList.firstChild.remove();
  }

  // Shuffle options
  const shuffledOptions = shuffle(commands[currentQuestion].options);

  // Add options to the list
  shuffledOptions.forEach((option) => {
    const li = document.createElement("li");
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.value = option;
    label.textContent = option;
    label.appendChild(input);
    li.appendChild(label);
    optionsList.appendChild(li);
  });

  submitButton.disabled = false;
}

function submitAnswer() {
  const currentQuestion = questionList[currentQuestionIndex];
  const selectedOption = optionsList.querySelector("input[type='radio']:checked");

  if (!selectedOption) {
    return;
  }

  const userAnswer = selectedOption.value.toLowerCase().trim();

  if (userAnswer === currentQuestion) {
    score++;
    resultElement.textContent = "Correct answer!";
    selectedOption.parentNode.classList.add("correct");
  } else {
    resultElement.textContent = `Wrong answer! The correct answer is: ${currentQuestion}`;
    selectedOption.parentNode.classList.add("wrong");
  }

  // Disable buttons after submitting
  const optionInputs = Array.from(optionsList.getElementsByTagName("input"));
  optionInputs.forEach(input => (input.disabled = true));

  currentQuestionIndex++;
  if (currentQuestionIndex < questionList.length) {
    setTimeout(showQuestion, 1000);
  } else {
    setTimeout(endGame, 1000);
  }
}

function endGame() {
  questionNumberElement.textContent = "";
  questionElement.textContent = "";
  optionsList.textContent = "";
  submitButton.disabled = true;
  resultElement.textContent = `Quiz Over! Your final score is: ${score}/${questionList.length}`;
  startButton.disabled = false;
}

function getRandomQuestions(array, num) {
  const shuffled = array.sort(() => 0.9 - Math.random());
  return shuffled.slice(0, num);
}

function shuffle(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// Handle option selection
optionsList.addEventListener("click", function(event) {
  if (event.target.matches("input[type='radio']")) {
    const selectedOption = event.target.parentNode;
    const options = Array.from(optionsList.getElementsByTagName("label"));
    options.forEach(option => option.classList.remove("selected"));
    selectedOption.classList.add("selected");
  }
});

