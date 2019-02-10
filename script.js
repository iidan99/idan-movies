'use strict';
let movies = [];
var test = [];
var by = 'Title';
let sortup = [-1, 1];
function init() {
  const apiDetails = [
    'tt7634968',
    'tt3896198',
    'tt6823368',
    'tt0379786',
    'tt1477834',
    'tt0955308',
    'tt4701182',
    'tt4633694',
    'tt4154916',
    'tt1987680',
    'tt3513498',
    'tt0437086',
    'tt8155288',
    'tt4154756',
    'tt1270797',
    'tt1825683'
  ];

  let reqs = [];
  let count = 0;
  apiDetails.forEach(items => {
    let requestURL = `http://www.omdbapi.com/?i=${items}&apikey=1f6ad072&`;
    reqs.push(fetch(requestURL));
  });
  let nextId = 0;
  Promise.all(reqs)
    .then(responses => {
      const jsonResponses = responses.map(res => {
        return res.json();
      });
      return Promise.all(jsonResponses);
    })
    .then(movie => {
      movie.id = nextId++;
      movies.push(...movie);
      //   console.log(movies);
      movies.sort(compare);
      names(movies);
    });
}

function names(items) {
  // console.log(items);
  let innerdiv = '';
  let innerDitails = '';
  for (let i = 0; i < movies.length; i++) {
    innerdiv += /*html*/ `
  
          <div class="movies">
              <div class="flip-card">
                  <div class="flip-card-inner">
                      <div class="flip-card-front">
                          <img src='${items[i].Poster}'/>
                      </div>
                      <div class="flip-card-back">
                          <div class="movie_details">
                          <p>Movie Name: ${items[i].Title}</p>
                          <p>Original Language: ${items[i].Language}</p>
                          <p>Release Date: ${items[i].Released}</p>
                          <p>Age Restrictions: ${items[i].Rated}</p>
                          <p>Runtime: ${items[i].Runtime}</p>
                          <button id="${items[i].imdbID}" onClick="remove(this)" class="btn_more">Delete</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>`;
  }
  document.querySelector('.main').innerHTML = innerdiv;
}
function compare(a, b) {
  if (a[by] < b[by]) {
    return sortup[0];
  }
  if (a[by] > b[by]) {
    return sortup[1];
  }
  return 0;
}
function sortby(object) {
  by = object;

  let movie = [...document.querySelectorAll('.movies')];
  for (let i = 0; i < movie.length; i++) {
    movie[i].classList.add('up');
  }
  if (object === 'Runtime') {
    sortup = [1, -1];
  } else {
    sortup = [-1, 1];
  }

  setTimeout(function() {
    movies.sort(compare);
    names(movies);
  }, 600);
}
var eleme = '';
function remove(element) {
  document.querySelector('.popup').style.display = 'block';
  eleme = element;
  // delete movies[element.id];
  // element.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
}
function del() {
  // delete movies[eleme.id];
  console.log(eleme.id);
  movies = movies.filter(movie => movie.imdbID !== eleme.id);
  eleme.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
  document.querySelector('.popup').style.display = 'none';
}
function done() {
  document.querySelector('.popup').style.display = 'none';
}
