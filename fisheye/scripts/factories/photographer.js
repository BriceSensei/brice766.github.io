// Définition d'une variable globale pour compter l'index du photographe
let indexNumber = 0;

// Fonction factory pour créer les objets photographe
function photographerFactory(data) {
    const { id, name, portrait, city, country, price, tagline } = data;

    const picture = `assets/photographers/${portrait}`;

    // Fonction pour générer le DOM de la carte d'utilisateur pour le photographe
    function getUserCardDOM() {
        indexNumber += 1;

        // Création de l'élément "a" pour le lien vers la page du photographe
        const a = document.createElement('a');
        a.setAttribute("tabindex", `${(indexNumber + 1)}`);
        a.setAttribute('href', `photographer.html?&id=${id}`);
        a.style.textDecoration = 'none';

        // Création de l'élément "article" pour la carte d'utilisateur
        const article = document.createElement( 'article' );
        article.setAttribute('aria-labelledby', `name-${indexNumber}`); // Ajout de l'attribut aria-labelledby

        // Création de la div pour l'image du photographe
        const divImg = document.createElement( 'div' );
        divImg.setAttribute('class', 'image-container');

        // Création de l'élément "img" pour afficher l'image du photographe
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name); // Ajout de la balise alt

        // Création de l'élément "p" pour afficher la ville et le pays du photographe
        const origin = document.createElement('p');
        origin.textContent = `${city}, ${country}`;
        origin.setAttribute('aria-label', `Basé à ${city}, ${country}`); // Ajout de l'attribut aria-label

        // Création de l'élément "p" pour afficher la tagline du photographe
        const tag = document.createElement('p');
        tag.setAttribute("class", "tagline");
        tag.textContent = tagline;
        tag.setAttribute('aria-label', `Tagline : ${tagline}`); // Ajout de l'attribut aria-label
        
        // Création de l'élément "p" pour afficher le prix du photographe
        const prc = document.createElement('p')
        prc.setAttribute('class', 'price');
        prc.textContent = `${price}€/jour`;
        prc.setAttribute('aria-label', `Prix : ${price}€/jour`); // Ajout de l'attribut aria-label

        // Création de l'élément "h2" pour afficher le nom du photographe
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        // Ajout des éléments à la carte d'utilisateur
        divImg.appendChild(img);
        article.appendChild(h2);
        article.appendChild(origin);
        article.appendChild(tag);
        article.appendChild(prc);
        article.appendChild(divImg);
        a.appendChild(article);
        
        return (a);
    }

    // Retourne les propriétés et la fonction getUserCardDOM comme objets
    return { name, picture, getUserCardDOM };
}

export default photographerFactory;