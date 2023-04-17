// Fonction asynchrone pour récupérer les données des photographes depuis le fichier JSON
async function getPhotographers() {
    //les données récupérées dans le json
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
  
  // Fonction asynchrone pour afficher les données des photographes dans la section dédiée du HTML
  async function displayData(photographers) {
      const photographersSection = document.querySelector(".photographer_section");
  
  // Parcourir les photographes et générer les cartes d'utilisateur pour chaque photographe
      photographers.forEach((photographer) => {
          const photographerModel = photographerFactory(photographer);
          const userCardDOM = photographerModel.getUserCardDOM();
          photographersSection.appendChild(userCardDOM);
      });
  };
  
  // Fonction d'initialisation pour récupérer les données des photographes et les afficher
  async function init() {
      // Récupère les datas des photographes
      const { photographers } = await getPhotographers();
      displayData(photographers);
  };
  
  // Appel de la fonction d'initialisation
  init();