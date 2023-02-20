const urlAllShows = "https://api.tvmaze.com/shows";
const urlGotEpisodes = getUrlFromId(82);
let allShows = [];
let allEpisodes = [];

//fetch shows and episodes
function setup() {
  fetch(urlAllShows)
  .then((response) => response.json())
  .then((data) => {
    allShows = data;
    displayShowsDropbox(allShows);
    displayShows(allShows);
  })
  .catch((err) => console.log(err));

  fetch(urlGotEpisodes)
    .then((res) => res.json())
    .then((data) => {
      allEpisodes = data;
      displayEpisodeWithSearchBox(allEpisodes);
    })
    .catch((err) => console.log(err));
}

window.onload = setup;


/**
 * GLOBAL VARIABLES
 */

const list = document.createElement("ul");
const li = document.createElement("li");
let count = 0;
const countSpan = document.querySelector("span");
const inputDiv = document.querySelector('.input-div');
searchInput = document.querySelector('.search-input');
const selectShowsEl = document.querySelector(".select-shows");
const selectEpisodesEl = document.querySelector(".select-episodes");


/**
 * START FUNCTIONS
 */

//level 200 - function for search input
function displayEpisodeWithSearchBox(episodes) 
{
  displayDropBox(episodes);

  countSpan.innerHTML = `Displaying ${count}/${episodes.length} episode(s)`;

  searchInput = document.querySelector('.search-input');

  searchInput.addEventListener("input", () => 
  {
    const inputValue = searchInput.value.toLowerCase();
    list.innerHTML = "";
    count = 0;

    episodes.forEach((episode) => 
    {
      if (episode.name.toLowerCase().includes(inputValue) || episode.summary.toLowerCase().includes(inputValue)) 
      {
        makeEpisodeCard(list, episode);
      }
    })
  countSpan.innerHTML = `Displaying ${count}/${episodes.length} episode(s)`
  })
}


//level 300 - Episode DropDown search bar
function displayDropBox(episodes) 
{
  const allOption = document.querySelector(".episode-option");
  allOption.value = "All";

  episodes.forEach((episode) => 
  {
    const eachOption = document.createElement("option");
    eachOption.value = episode.id;

    makeMediaTitleV2(selectEpisodesEl, episode);

    selectEpisodesEl.addEventListener("change", () => 
    {
      let newArr = [];

      if (selectEpisodesEl.value === "All") {
        newArr = episodes;
      } else {
        //something is wrong with the below part of the if statement.
        newArr = episodes.filter(episode => selectEpisodesEl.value.includes(episode.id));
      }
      // count = 0;
      list.innerHTML = "";
      displayEpisodes(newArr);
      countSpan.innerHTML = `Displaying ${count}/${episodes.length} episode(s)`
    })
  })
}

//level 400 - Shows dropbox

function displayShowsDropbox(shows) 
{
  const selectShowsOptions = document.querySelector(".show-option");
  selectShowsOptions.value = "All";

  shows.forEach((show) => 
  {
    const selectShowsOption = document.createElement("option");
    selectShowsOption.value = show.id;

    const showName = show.name;
    selectShowsOption.innerHTML = showName;
    selectShowsEl.appendChild(selectShowsOption);

    selectShowsEl.addEventListener("change", () => 
    {
      let newArr = [];

      if (selectShowsEl.value === "All") {
        newArr = shows;
      } else {
        newArr = shows.filter(show => selectShowsEl.value.includes(show.id))
      }

      list.innerHTML = "";
      displayShows(newArr);

      countSpan.innerHTML = `Displaying ${count}/${shows.length} show(s)`;
    })
})
}


  /**
   * HELPER FUNCTIONS
   */


  function displayShows(shows)
  {  
    count = 0;
    shows.forEach((show) => 
    {
      makeShowCard(list, show);
    })
    countSpan.innerHTML = `Displaying ${count}/${shows.length} show(s)`
  }

  function displayEpisodes(episodes) 
  {  
    count = 0;
    episodes.forEach((episode) => 
    {
      makeEpisodeCard(list, episode);
    })
  }

  function makeEpisodeCard(el, episode) 
  {
    let li = document.createElement("li");

    makeEpisodeTitle(li, episode);

    makeCardImage(li, episode, 'episodes-image');

    makeCardSummary(li, episode);

    document.body.appendChild(el);
    el.appendChild(li);
    count++;
  }

  function makeShowCard(el, show) {
    let li = document.createElement("li");

    makeShowTitle(li, show);

    makeCardImage(li, show, 'shows-image');

    makeCardSummary(li, show);

    document.body.appendChild(el);
    el.appendChild(li);
    count++;
  }

  function makeEpisodeTitle(el, episode) 
  {
    let title = document.createElement("h1");

    let episodeCode = `S${("0" + episode.season).slice(-2)}E${("0" + episode.number).slice(-2)}`;

    title.innerHTML = `${episode.name} - ${episodeCode}`;

    el.appendChild(title);
  };

  function makeShowTitle(el, show) 
  {
    let title = document.createElement("h1");
    title.innerHTML = `${show.name}`;
    el.appendChild(title);
  }

  function makeMediaTitleV2(el, media) 
  {
    let episodeCode = `S${("0" + media.season).slice(-2)}E${("0" + media.number).slice(-2)}`;

    const eachOption = document.createElement("option");

    eachOption.innerHTML = `${episodeCode} - ${media.name}`;

    el.appendChild(eachOption)
  };

  function makeCardImage(el, media, className) 
  {
    let image = document.createElement("img");
    image.src = media.image.medium;
    image.className = `${className}`;
    el.appendChild(image);
  }

  function makeCardSummary(el, media) 
  {
    let paragraph = document.createElement("p");

    if (media.summary.length > 130) {
      paragraph.innerHTML = `${media.summary.substr(0, 130)}...`;
    } else {
      paragraph.innerHTML = media.summary;
    }

    el.appendChild(paragraph);
  }

  function getUrlFromId(id) 
  {
    return `https://api.tvmaze.com/shows/${id}/episodes`;
  }


  //functions for count to be displayed - yet to be used - breaks code each time i use it, need to fix

  function displayEpisodeCount() 
  {
    countSpan.innerHTML = `Displaying ${count}/${episodes.length} episode(s)`;
  }

  function displayShowCount() {
    countSpan.innerHTML = `Displaying ${count}/${shows.length} show(s)`;
  }


/**
 * EVENT LISTENERS
 */

// selectShowsEl.addEventListener("change", (e) => {
//   const showIdSelectedByUser = Number(e.target.value);
//   const nextFetchUrl = getUrlFromId(showIdSelectedByUser);
// })