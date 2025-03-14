function fact(n) {
    if (n == 0) {
        return 1
    } else {
        return n * fact(n - 1)
    }
}

function applique(f, tab) {
    let f_tab = []
    for (i = 0; i < tab.length; i++) {
        f_tab.push(f(tab[i]))
    }
    return f_tab
}

msgs = [];

function update() {
    fetch('https://a839ce9a-6ee5-40de-b391-0d6942eeab26-00-3ehdhb179sb9e.riker.replit.dev/msg/getAll')
        .then(response => response.json())
        .then(data => {
            msgs = data; // Mettre à jour la liste des messages
            let ul = document.querySelector(".articles ul");
            ul.innerHTML = ""; // Efface la liste existante

            // Trier par date en ordre décroissant
            let sortedMsgs = msgs.sort((a, b) => new Date(b.date) - new Date(a.date));

            sortedMsgs.forEach(item => {
                let li = document.createElement("li");

                // Création du lien vers l'article
                let link = document.createElement("a");
                link.href = item.url;
                link.textContent = item.title;
                link.target = "_blank";

                // Image associée 
                let img = document.createElement("img");
                img.src = item.image;
                img.alt = "Preview " + item.title;
                img.width = 150;

                // Metadata (pseudo + date)
                let metaDiv = document.createElement("div");
                metaDiv.className = "meta";
                metaDiv.textContent = `Posté par : ${item.posted_by} le ${formatDate(item.date)}`;

                // Ajouter les éléments à la liste
                li.appendChild(link);
                li.appendChild(document.createElement("br"));
                li.appendChild(img);
                li.appendChild(document.createElement("br"));
                li.appendChild(metaDiv);

                ul.appendChild(li);
            });
        })
        .catch(error => console.error("Erreur lors de la mise à jour des articles :", error));
}

function formatDate(dateString) {
    let date = new Date(dateString);

    // Extract day, month, year, hour, and minute
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    let year = date.getFullYear();
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');

    // Format: "le 07/03/2025 à 10:35"
    return `${day}/${month}/${year} à ${hours}:${minutes}`;
}

document.getElementById("updateButton").onclick = update;

document.addEventListener("DOMContentLoaded", function () {
    let darkModeButton = document.createElement("button");
    darkModeButton.id = "darkModeButton";
    darkModeButton.textContent = "Dark Mode";
    document.querySelector("header").appendChild(darkModeButton);

    darkModeButton.onclick = function () {
        document.body.classList.toggle("dark-mode");
        darkModeButton.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
    };
});

fetch('https://a839ce9a-6ee5-40de-b391-0d6942eeab26-00-3ehdhb179sb9e.riker.replit.dev/msg/getAll')
    .then(response => response.json())
    .then(data => {
        msgs = data; // Stocker les messages récupérés
    })
    .catch(error => console.error("Erreur lors de la récupération des articles :", error));


document.getElementById("submitMessage").addEventListener("click", function () {
    let pseudo = document.getElementById("pseudo").value.trim();
    let title = document.getElementById("articleTitle").value.trim();
    let url = document.getElementById("articleLink").value.trim();

    if (!pseudo || !title || !url) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Générer la date au format "YYYY-MM-DD HH:MM:SS"
    let now = new Date();
    let formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ` +
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    // Construire l'URL avec les paramètres GET
    let queryParams = new URLSearchParams({
        pseudo: pseudo,
        title: title,
        url: url,
        time: formattedDate,
        image: "img/arxiv.png"
    });

    let requestUrl = `https://a839ce9a-6ee5-40de-b391-0d6942eeab26-00-3ehdhb179sb9e.riker.replit.dev/msg/post?${queryParams}`;

    // Envoyer la requête au serveur
    fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Article ajouté avec succès, index :", data);
        })
        .catch(error => console.error("Erreur lors de l'envoi :", error));

    // Réinitialiser les champs après l'envoi
    document.getElementById("pseudo").value = "";
    document.getElementById("articleTitle").value = "";
    document.getElementById("articleLink").value = "";
});