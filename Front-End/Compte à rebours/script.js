"use strict";

// Date actuelle
const maintenant = new Date();

// Date fin du compteur
const jeanGuile = new Date("2021-10-19T00:00:00");

// Durée entre les 2 dates
const duree = jeanGuile - maintenant

// Calcul du nombre de jours dans "durée"
// Durée d'un jour : 24h * 60mn * 60s * 1000ms
// 86 400 000 ms
let jours = Math.floor(duree / (24 * 60 * 60 * 1000));

// On calcule le temps restant après retrait des "jours précédemment calculés"
let reste = duree % (24 * 60 * 60 * 1000);

// Calcul du nombre de heures dans le "reste"
// Durée d'une heure : 60mn * 60s * 1000ms
// 3 600 000 ms
let heures = Math.floor(reste / (60 * 60 * 1000));

// On calcule le temps restant après retrait des heures
reste = reste %  (60 * 60 * 1000);

// Calcul du nombre de minutes dans le "reste"
// Durée d'une minute : 60s * 1000 ms
let minutes = Math.floor(reste / (60 * 1000))

// On calcule le temps restant après retrait des minutes
reste = reste % (60 * 1000);

// Calcul du nombre de secondes dans le "reste"
let secondes = Math.floor(reste / 1000);

let interval;

window.onload = () => {
    afficheNombres();
    interval = setInterval(decompte, 1000);
}

afficheNombres();

/**
 * Cette fonction met à jour le compteur (affichage)
 */
function afficheNombres() {
    document.querySelector('#jours').innerHTML = jours;
    document.querySelector('#heures').innerHTML = heures;
    document.querySelector('#minutes').innerHTML = minutes;
    document.querySelector('#secondes').innerHTML = secondes;
}

/**
 * Décompte 1 seconde
 */
function decompte() {
    if(secondes) {
        secondes--;
    }else if(minutes) {
        secondes = 59;
        minutes--;
    }else if(heures) {
        secondes = minutes = 59;
        heures--;
    }else if(jours) {
        secondes = minutes = 59;
        heures = 23;
        jours--;
    }else{
        clearInterval(interval);
    }
    afficheNombres();
}