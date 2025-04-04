const trivia = [
    // Preguntas de Artanis
    { 
        question: "¿Cuál es la raza de Artanis en Heroes of the Storm?", 
        options: ["Protoss", "Terran", "Zerg"], 
        answer: "Protoss", 
        background: "images/ArtanisArt3.jpg",
        image: "images/Protoss.jpg",
        incorrectImages: { 
            "Terran": "images/Terran.jpg",
            "Zerg": "images/Zerg.jpg"
        },
        correctVoiceLine: "audio/impresionante.mp3",
        incorrectVoiceLine: "audio/situestupidez.mp3"
    },
    { 
        question: "¿Qué título tiene Artanis dentro de su raza?", 
        options: ["Jerarca", "Conquistador", "Guardián"], 
        answer: "Jerarca", 
        image: "images/ArtanisArt1.jpg",
        background: "images/ArtanisArt3.jpg",
        incorrectImages: { 
            "Conquistador": "images/Conquistador.jpg",
            "Guardián": "images/Guardian.jpg"
        },
        correctVoiceLine: "audio/buenaestrategia.mp3",
        incorrectVoiceLine: "audio/unapena.mp3"
    },
    {
        question: "¿Qué arma usa Artanis en combate?", 
        options: ["Cañón Gauss", "Cuchillas Psi", "Espada Láser"], 
        answer: "Cuchillas Psi", 
        image: "images/ArtanisArt2.jpg",
        background: "images/ArtanisArt3.jpg",
        incorrectImages: { 
            "Cañón Gauss": "images/Gauss.jpg",
            "Espada Láser": "images/Laser.jpg"
        },
        correctVoiceLine: "audio/buentrabajo.mp3",
        incorrectVoiceLine: "audio/civilizacionmenosavanzada.mp3"
    },

    // Preguntas de Kuroko
    { 
        question: "¿Cuál es el color favorito de Kuroko?", 
        options: ["Azul", "Rojo", "Verde"], 
        answer: "Azul", 
        image: "images/Mock4.jpg",
        background: "images/Kuroko1.jpg",
        incorrectImages: { 
            "Rojo": "images/Mock1.jpg",
            "Verde": "images/Mock2.jpg"
        },
        correctVoiceLine: "audio/impresionante.mp3",
        incorrectVoiceLine: "audio/verde.mp3"
    },
];

let currentIndex = 0; // Índice de la pregunta actual
let currentRound = "Artanis"; // Ronda actual: "Artanis" o "Kuroko"

function loadQuestion() {
    const container = document.getElementById("question-container");
    const question = trivia[currentIndex];

    // Limpia el contenedor de preguntas
    container.innerHTML = `
        <h2>${question.question}</h2>
        <div id="options-container"></div>
    `;

    const optionsContainer = document.getElementById("options-container");

    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.dataset.index = index; // Almacena el índice en un atributo de datos
        button.addEventListener("click", () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });

    // Actualiza el fondo dinámico
    document.body.style.backgroundImage = `url('${question.background}')`;
}

function checkAnswer(selectedIndex) {
    const question = trivia[currentIndex];
    const selectedOption = question.options[selectedIndex];
    const isCorrect = selectedOption === question.answer;

    // Reproduce el audio correspondiente
    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.src = isCorrect ? question.correctVoiceLine : question.incorrectVoiceLine;
    audioPlayer.play();

    // Muestra el mensaje y la imagen dentro del contenedor de preguntas
    const questionContainer = document.getElementById("question-container");

    // Limpia cualquier mensaje o imagen previa
    const existingMessage = questionContainer.querySelector(".message");
    const existingImage = questionContainer.querySelector("#result-image");
    if (existingMessage) existingMessage.remove();
    if (existingImage) existingImage.remove();

    // Agrega el mensaje
    const message = document.createElement("p");
    message.className = "message";
    message.style.color = isCorrect ? "green" : "red";
    message.textContent = isCorrect ? "¡Correcto!" : "¡Incorrecto! Intenta de nuevo...";
    questionContainer.appendChild(message);

    // Agrega la imagen debajo del mensaje
    const image = document.createElement("img");
    image.src = isCorrect ? question.image : question.incorrectImages[selectedOption];
    image.alt = "Resultado";
    image.id = "result-image"; // Agrega un ID para facilitar su eliminación
    questionContainer.appendChild(image);

    // Espera a que el audio termine antes de continuar
    audioPlayer.onended = () => {
        // Elimina el mensaje y la imagen después de que el audio termine
        if (message) message.remove();
        if (image) image.remove();

        // Si es correcto, carga la siguiente pregunta
        if (isCorrect) {
            currentIndex++;
            if (currentIndex === 3 && currentRound === "Artanis") {
                // Muestra el botón para transicionar a la siguiente ronda
                showNextRoundButton();
            } else {
                loadQuestion(); // Carga la siguiente pregunta
            }
        }
    };
}

function showNextRoundButton() {
    const questionContainer = document.getElementById("question-container");

    // Limpia el contenedor y agrega el botón
    questionContainer.innerHTML = `
        <button id="next-round-button">Siguiente Ronda</button>
    `;

    // Configura el botón para iniciar la ronda de Kuroko
    document.getElementById("next-round-button").addEventListener("click", () => {
        currentRound = "Kuroko"; // Cambia a la ronda de Kuroko
        currentIndex = 3; // Asegúrate de que el índice apunte a la primera pregunta de Kuroko

        // Cambia la música de fondo a KurokoMusic
        const backgroundMusic = document.getElementById("background-music");
        backgroundMusic.src = "audio/KurokoMusic.mp3";
        backgroundMusic.loop = true; // Asegúrate de que la música se repita
        backgroundMusic.play();

        loadQuestion(); // Carga la primera pregunta de Kuroko
    });
}

function startKurokoMusic() {
    const backgroundMusic = document.getElementById("background-music");

    // Cambia la música a la de Kuroko
    fadeOutMusic(backgroundMusic, () => {
        backgroundMusic.src = "audio/KurokoMusic.mp3";
        backgroundMusic.load();
        backgroundMusic.play();
        fadeInMusic(backgroundMusic, 0.1); // Volumen objetivo: 10%
    });
}

function startKurokoRound() {
    const triviaContainer = document.getElementById("trivia-container");
    const backgroundMusic = document.getElementById("background-music");

    // Cambia la música a la de Kuroko
    fadeOutMusic(backgroundMusic, () => {
        backgroundMusic.src = "audio/KurokoMusic.mp3";
        backgroundMusic.load();
        backgroundMusic.play();
        fadeInMusic(backgroundMusic, 0.1); // Volumen objetivo: 10%
    });

    // Asegúrate de que la trivia esté visible
    triviaContainer.classList.remove("hidden");

    // Carga la primera pregunta de Kuroko
    loadQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
    const backgroundMusic = document.getElementById("background-music");
    const audioPlayer = document.getElementById("audio-player");

    // Configuración inicial de la música de fondo
    backgroundMusic.src = "audio/ArtanisMusic.mp3";
    backgroundMusic.volume = 0.1;

    // Reproduce la música de fondo al hacer clic
    document.addEventListener("click", () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch((error) => {
                console.error("Error al reproducir la música de fondo:", error);
            });
        }
    });

    // Vincula el slider al volumen de la música
    document.getElementById("volume-slider").addEventListener("input", (event) => {
        backgroundMusic.volume = event.target.value; // Ajusta el volumen de la música
    });

    // Vincula el slider al volumen de las voice lines
    document.getElementById("voice-slider").addEventListener("input", (event) => {
        audioPlayer.volume = event.target.value; // Ajusta el volumen de las voice lines
    });

    // Maneja el botón para comenzar la trivia
    document.getElementById("start-trivia").addEventListener("click", () => {
        const introContainer = document.getElementById("intro-container");
        const triviaContainer = document.getElementById("trivia-container");

        // Oculta la introducción y muestra la trivia
        introContainer.classList.add("fade-out");

        setTimeout(() => {
            introContainer.style.display = "none"; // Oculta completamente el intro
            triviaContainer.classList.remove("hidden"); // Muestra la trivia
            triviaContainer.classList.add("fade-in"); // Agrega animación de aparición

            // Reproduce la música de Artanis
            backgroundMusic.play().catch((error) => {
                console.error("Error al reproducir la música de fondo:", error);
            });

            // Carga la primera pregunta
            loadQuestion();
        }, 1000); // Duración de la animación (1s)
    });
});