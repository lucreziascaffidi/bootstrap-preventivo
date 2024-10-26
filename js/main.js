console.log('Sono connesso');

//Prendo il form dall'HTML
const myForm = document.getElementById('my-form');
console.log(myForm);

// Dichiaro le variabili che mi servono con i dati che sono stati forniti nel testo della milestone
// Variabile che contiene il prezzo orario per ciascun lavoro --> un oggetto che continene tutti i prezzi per ogni tipo di lavoro
const hourPrice = {
    'backend-development': 20.50,
    'frontend-development': 15.30,
    'project-analysis': 33.60
};

// Variabile che contiene i codici promozionali --> un array con i codici promozionali validi
const validPromoCodes = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];

// Variabile sconto (25%)
const discountRate = 0.25;

// Aggiungo l'evento al click di Submit al form
// Devo prevenire il refresh della pagina
// Accedere ai dati inseriti dall'utente 

// Calcolo del preventivo base

// Calcolo del preventivo con evenuale sconto se il codice è valido
// Se il codice promozionale inserito non è valido far uscire un alert 

// Formattare il prezzo finale in modo leggibile con due decimali

// Farlo apparire nel DOM

// Svuoltare i campi del form
