(function () {
    const BASE_URL = 'https://movie-list.alphacamp.io'
    const INDEX_URL = BASE_URL + '/api/v1/movies/'
    const POSTER_URL = BASE_URL + '/posters/'
    const data = []
    const genresNow = '1';
  
    const genresList = document.querySelector('#genres-list')
    const moviesPanel = document.querySelector('#movies-panel')
    const genres = {
      "1": "Action",
      "2": "Adventure",
      "3": "Animation",
      "4": "Comedy",
      "5": "Crime",
      "6": "Documentary",
      "7": "Drama",
      "8": "Family",
      "9": "Fantasy",
      "10": "History",
      "11": "Horror",
      "12": "Music",
      "13": "Mystery",
      "14": "Romance",
      "15": "Science Fiction",
      "16": "TV Movie",
      "17": "Thriller",
      "18": "War",
      "19": "Western"
    }
    
    //Genres List
    const genresValues = Object.values(genres)
    const genresKeys = Object.keys(genres)
   
    for (let i = 0; i < 19; i++){
      genresList.innerHTML += `
        <li class="list-group-item list-group-item-action" data-toggle="pill" href="#" data-id="${genresKeys[i]}">
          ${genresValues[i]}
        </li>
    `
    }
  
    axios.get(INDEX_URL).then((response) => {
      data.push(...response.data.results)
      displayCard (data)
    }).catch((err) => console.log(err))
    
    function displayCard (data) {
      let htmlContent = ''
      data.forEach(function (item, index) {
        //add badges
        let badgeHTML = ''
        item.genres.forEach( g => {
        let a = g - 1
        badgeHTML += `
          <span class="badge badge-light mr-1" style="font-weight: normal;background-color: #d3dfdf">${genresValues[a]}</span>
        `
      })
        //cards content
        htmlContent += `
          <div class="col-md-6 col-lg-4">
            <div class="card mb-2">
              <img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap">
              <div class="card-body movie-item-body">
                <h6 class="card-title">${item.title}</h6>
                <div class="badges">${badgeHTML}</div>
              </div>
            </div>
          </div>
        ` 
      })
      moviesPanel.innerHTML = htmlContent
    }
    
     function removeGenresActive() {
      for (let elm of genresList.children) {
          elm.classList.remove("active")
      }
    }
    
    //listen to genres list
    genresList.addEventListener('click', e => {
      let id = e.target.dataset.id
      let results = []
      if (id === '0'){
         results = data
         } else {
         results = data.filter(item => 
         item.genres.includes(Number(id)))
      }
      displayCard(results)
      removeGenresActive()
      e.target.classList.add('active')
    })
  
    
  })()
  
  
  