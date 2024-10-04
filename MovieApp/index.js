const searchForm = document.querySelector('form');
const moviecontainer = document.querySelector('.move-container');
const inputbox = document.querySelector('.inputbox');

///Function to fetch Movie Detail using API
const getMovieInfo = async (movie) => {
    const myapikey = "9405920d";
    const url = `http://www.omdbapi.com/?apikey=${myapikey}&t=${movie}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch movie data');
        const data = await response.json();
        showmoviedata(data);
    } catch (error) {
        showerror("Movie Not Found");
    
      
    }
}


// Function to show movie data on screen
const showmoviedata = (data) => {
    moviecontainer.innerHTML = "";
    moviecontainer.classList.remove('nobackground');

    // Destructuring assignment from data object
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088;</strong> ${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');
    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerHTML = element.trim();
        movieGenreElement.appendChild(p);
    });
    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML +=
        `<p><strong>Released Date: </strong> ${Released}</p>
         <p><strong>Duration: </strong> ${Runtime}</p>
         <p><strong>Cast: </strong> ${Actors}</p>
         <p><strong>Plot: </strong> ${Plot}</p>`;

    // Creating a div for Movie Poster
    const movieposterElement = document.createElement('div');
    movieposterElement.classList.add('movie-poster');
    const posterURL = Poster !== "N/A" ? Poster : 'default_poster.png';
    movieposterElement.innerHTML = `<img src="${posterURL}" alt="${Title} Poster"/>`;

    moviecontainer.appendChild(movieposterElement);
    moviecontainer.appendChild(movieElement);
}

//Function To display error

const showerror = (message) => {
    moviecontainer.innerHTML = `<h2>${message}</h2>`
    moviecontainer.classList.add('nobackground');

    //Show Image In the Error

    const imageElement = document.createElement('img');
    imageElement.src = 'MovieApp/errorimg.jpg';
    imageElement.alt = 'Error Image';
    moviecontainer.appendChild(imageElement);

    
}

const handleform = (e) => {
    e.preventDefault();
    const moviename = inputbox.value.trim();
    if (moviename !== "") {
        showerror("Featching Movie Information......");
        getMovieInfo(moviename);
    }

    else {
        showerror("Enter Movie Name To Get Information");
       
    }
    
}

// Adding Event Listener to Search Form
searchForm.addEventListener('submit', handleform);






