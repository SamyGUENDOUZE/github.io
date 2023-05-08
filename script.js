// Définir les variables qui me servent pour le son
let bip = new Audio("snd/bip.mp3");
let endTimer = new Audio("snd/endTimer.mp3");

// Définir la durée du compte à rebours en secondes
const countdownDuration = 300;

// Obtenir les éléments DOM du minuteur
const countdownElement = document.getElementById("countdown");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

// Mettre à jour l'affichage du minuteur
function updateCountdown() {
  // Obtenir le temps restant en secondes
  const timeLeft = Math.max(countdownDuration - Math.floor((Date.now() - startTime) / 1000), 0);

  // Convertir le temps restant en minutes et secondes
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Mettre à jour l'affichage du minuteur
  minutesElement.innerText = minutes.toString().padStart(2, "0");
  secondsElement.innerText = seconds.toString().padStart(2, "0");

  // Si le compte à rebours est terminé, arrêter le minuteur
  if (timeLeft === 0) {
    clearInterval(countdownInterval);
    clearInterval(countdownInterval2);
    endTimer.play();
  }
}

// Démarrer le minuteur
const startTime = Date.now();
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

//--------------------------------//

// Définir les durées possibles pour le délai entre les comptes à rebours
const effortDelay = [10, 15, 20];

// Définir les durées possibles pour le compte à rebours initial
const possibleInitialDurations = [5, 7, 10];

// Obtenir les éléments DOM du minuteur
const countdownElement2 = document.getElementById("countdown2");
const secondsElement2 = document.getElementById("seconds2");

// Fonction pour effectuer un compte à rebours de n secondes
async function countdown(n) {
  for (let i = n; i >= 1; i--) {
    console.log(i);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// Fonction pour mettre à jour l'affichage du minuteur
function updateCountdown2() {
  // Obtenir le temps restant en secondes
  const timeLeft2 = Math.max(countdownDuration2 - Math.floor((Date.now() - startTime2) / 1000), 0);
  console.log(timeLeft2);

  // Convertir le temps restant en minutes et secondes
  const seconds = timeLeft2 % 60;

  // Mettre à jour l'affichage du minuteur
  secondsElement2.innerText = seconds.toString().padStart(2, "0");

  bip.play();

  // Si le compte à rebours est terminé, relancer le minuteur après un délai aléatoire
  if (timeLeft2 === 0) {
    clearInterval(countdownInterval2);
    if (countdownDuration > 0) {
      const randomDelay = effortDelay[Math.floor(Math.random() * effortDelay.length)];
      countdown(randomDelay).then(() => {
        const randomInitialDuration = possibleInitialDurations[Math.floor(Math.random() * possibleInitialDurations.length)];
        countdownDuration2 = randomInitialDuration;
        startTime2 = Date.now();
        updateCountdown2();
        countdownInterval2 = setInterval(updateCountdown2, 1000);
      });
    } else {
      console.log("Le minuteur principal est terminé, le minuteur aléatoire ne sera pas relancé.");
    }
  }
}

// Démarrer le minuteur
const randomInitialDuration = possibleInitialDurations[Math.floor(Math.random() * possibleInitialDurations.length)];
let startTime2 = Date.now();
let countdownDuration2 = randomInitialDuration;
updateCountdown2();

let countdownInterval2 = setInterval(updateCountdown2, 1000);