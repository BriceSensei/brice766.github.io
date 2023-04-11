let indexNumber = 0

function photographerFactory(data) {
    const { id, name, portrait, city, country, price, tagline } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        indexNumber += 1

        const a = document.createElement('a');
        a.setAttribute("tabindex", `${(indexNumber + 1)}`)
        a.setAttribute('href', `photographer.html?&id=${id}`);
        a.style.textDecoration = 'none';

        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const origin = document.createElement('p');
        origin.textContent = `${city}, ${country}`;

        const tag = document.createElement('p');
        tag.setAttribute("class", "tagline");
        tag.textContent = tagline;
        
        const prc = document.createElement('p')
        prc.setAttribute('class', 'price');
        prc.textContent = `${price}€/jour`

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        
        article.appendChild(img);
        article.appendChild(h2);
        a.appendChild(article);
        article.appendChild(origin);  
        article.appendChild(tag);
        article.appendChild(prc);
        
      
        return (a);
    }
    return { name, picture, getUserCardDOM }
}