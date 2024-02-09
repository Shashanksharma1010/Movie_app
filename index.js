// most popular movie
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";


// Search Movie
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const movieBox = document.querySelector('.movie');

const getMovies = async (api) => {
    const response = await fetch(api)
    const data = await response.json()
    console.log(data);
    showPopularMovies(data.results)

}

const showPopularMovies = (movies) => {
    // empty 
    movieBox.innerHTML = "";
    // console.log(movies)
    movies.forEach(element => {
        const image = element.poster_path;
        const title = element.title;
        const vote = element.vote_average;
        const description = element.overview;
        // console.log(image, title, vote, description);

        const card = document.createElement('div');
        card.classList.add('movie-card');

        const img = document.createElement('img');
        img.classList.add('movie-img');
        img.setAttribute('src', IMGPATH + image);
        img.setAttribute('alt', title);

        const cardTextSection = document.createElement('div');
        cardTextSection.classList.add('description-section');

        const rating = document.createElement('span');
        rating.classList.add('description-rating');
        rating.innerText = vote;

        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('description-title');
        cardTitle.innerText = title;
        cardTitle.append(rating);
       
        const cardText = document.createElement('p');
        cardText.classList.add('description-text');
        cardText.innerText = description;

        cardTextSection.append(cardTitle);
        cardTextSection.append(cardText);

        card.append(img);
        card.append(cardTextSection);
        movieBox.append(card);
    });
}

// init call
getMovies(APIURL)

document.querySelector('.searchbar').addEventListener('keyup', (e) => {
    if (e.target.value != "") {
        console.log(e.target.value);
        getMovies(SEARCHAPI + e.target.value);
    } 
    else {
        getMovies(APIURL);
    }
})


