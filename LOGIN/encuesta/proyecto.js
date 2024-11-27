// Obtener los elementos HTML
const questionsElement = document.getElementById('questions');
const scoreElement = document.getElementById('score');
const resultElement = document.getElementById('result');
const submitButton = document.getElementById('submit');

// Definir las preguntas y respuestas
const questions = [
  {
    question: 'What is the most romantic thing you can do for your partner?',
    a: 'Cook their favorite meal',
    b: 'Surprise them with a weekend getaway',
    c: 'Write them a love letter',
    d: 'Give them a thoughtful gift',
    correct: 'c'
  },
  {
    question: 'What is the key to a happy relationship?',
    a: 'Communication',
    b: 'Trust',
    c: 'Love',
    d: 'All of the above',
    correct: 'd'
  },
  {
    question: 'What is the most important quality in a partner?',
    a: 'Sense of humor',
    b: 'Intelligence',
    c: 'Kindness',
    d: 'All of the above',
    correct: 'd'
  },
  {
    question: 'What is the best way to show love and affection?',
    a: 'Through words',
    b: 'Through actions',
    c: 'Through gifts',
    d: 'All of the above',
    correct: 'd'
  },
  {
    question: 'What is the most romantic holiday?',
    a: 'Valentine\'s Day',
    b: 'Christmas',
    c: 'New Year\'s Eve',
    d: 'All of the above',
    correct: 'd'
  }
];

// Inicializar el puntaje y la pregunta actual
let score = 0;
let currentQuestion = 0;

// Función para mostrar la pregunta actual y puntaje
function displayQuestion() {
  const question = questions[currentQuestion];
  questionsElement.innerHTML = `
    <h2>${question.question}</h2>
    <ul>
      <li><input type="radio" id="a" name="answer" value="a"><label for="a">${question.a}</label></li>
      <li><input type="radio" id="b" name="answer" value="b"><label for="b">${question.b}</label></li>
      <li><input type="radio" id="c" name="answer" value="c"><label for="c">${question.c}</label></li>
      <li><input type="radio" id="d" name="answer" value="d"><label for="d">${question.d}</label></li>
    </ul>
  `;

  // Actualizar el puntaje actual
  scoreElement.textContent = `Respuestas correctas: ${score}`;

  // Limpiar la clase 'selected' de todas las opciones antes de mostrar una nueva pregunta
  const answerItems = document.querySelectorAll('ul li');
  answerItems.forEach(item => {
    item.classList.remove('selected');
  });

  // Agregar evento a cada li para marcar las respuestas
  answerItems.forEach(item => {
    item.addEventListener('click', selectAnswer);
  });
}

// Función para marcar la respuesta seleccionada
function selectAnswer(event) {
  const selectedLi = event.target.closest('li'); // Encontrar el contenedor <li>
   
  // Remover la clase 'selected' de todas las opciones
  const allOptions = document.querySelectorAll('ul li');
  allOptions.forEach(option => option.classList.remove('selected'));

  // Agregar la clase 'selected' al <li> que fue seleccionado
  selectedLi.classList.add('selected');
}

// Función para verificar la respuesta
function checkAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  // Verificar si se seleccionó una respuesta
  if (!selectedAnswer) {
    alert('Please select an answer before submitting!');
    return; // No hacemos nada si no se seleccionó respuesta
  }

  const answer = selectedAnswer.value;
  if (answer === questions[currentQuestion].correct) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    displayResult();
  }
}

// Función para mostrar el resultado final
function displayResult() {
  resultElement.innerHTML = `
    <h2>Cuestionario completado</h2>
    <p>Tu puntuaje final es de ${score} de ${questions.length}.</p>
    <p>¿Has aprobado esta prueba? ${score === questions.length ? '¡Si!' : 'No, vaya vaya ya te vale...'}</p>
  `;

  // Ocultar el puntaje en la pantalla final
  scoreElement.style.display = 'none';  
  submitButton.style.display = 'none';  // Ocultar el botón de submit al final
  questionsElement.style.display = 'none'; // Ocultar las preguntas

  // Mostrar el botón solo si todas las respuestas son correctas
  const nextPageButton = document.getElementById("goToNextPage");
  if (score === questions.length) {
    nextPageButton.style.display = "block"; // Mostrar el botón para pasar a la siguiente página
  } else {
    nextPageButton.style.display = "none"; // Ocultar el botón si no todas las respuestas son correctas
  }

  // Agregar evento para redirigir al hacer clic en el botón
  nextPageButton.addEventListener("click", function() {
    window.location.href = "/LOGIN/pagina3.corazon/index3.html";  // Cambia la URL de acuerdo a tu estructura
  });
}

// Mostrar la primera pregunta
displayQuestion();


// Agregar el evento al botón de submit
submitButton.addEventListener('click', checkAnswer);

// Agregar evento a cada li para marcar las respuestas
document.querySelectorAll('ul li').forEach(item => {
  item.addEventListener('click', selectAnswer);
});
