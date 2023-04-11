async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const respons = await fetch("data/photographers.json");

    let data = await respons.json();
    let photographers = [...data.photographers];
    let dataMedia = [...data.media];

    /*création de photographerMedias qui contient les oeuvres de chacun des photographes
    et on l'ajoute dnas l'ARRAY qui contient les informations personnelles de chacun d'eux
    le résultat est :photographers */
    photographers.forEach(photographer => {
        const photographerMedias = dataMedia.filter(photographerMedia => photographerMedia.photographerId === photographer.id);
        photographer.medias = [...photographerMedias];
    })
    // et bien retourner le tableau photographers seulement une fois
    return { photographers }
}
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();