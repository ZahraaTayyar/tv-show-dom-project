const urlAllShows = "https://api.tvmaze.com/shows";
const urlGotEpisodes = "https://api.tvmaze.com/shows/82/episodes";
let allShows = [];
let allEpisodes = [];

//fetch shows and episodes
function setup() {
  fetch(urlAllShows)
  .then((response) => response.json())
  .then((data) => {
    allShows = data;
    displayShowsDropbox(allShows);
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


//initial variable (global scope)
let list = document.createElement("ul");
let li = document.createElement("li");
let count = 0;

//variable to choose episodes from a select input
const select = document.createElement("select");

//variable to input text for the search function
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Search";

//variable to show number of episodes displayed
let countSpan = document.createElement("span");

//put input tab into one div so can style properly
let inputDiv = document.createElement("div");
inputDiv.className = "input-div";


//append elements to body
document.body.appendChild(inputDiv);
//append elements to inputDiv
inputDiv.appendChild(select);
inputDiv.appendChild(searchInput);
inputDiv.appendChild(countSpan);


//level 200 - function for search input
function displayEpisodeWithSearchBox(episodes) 
{
  displayEpisodes(episodes);
  displayDropBox(episodes);

  countSpan.innerHTML = `Displaying ${count}/${episodes.length} episode(s)`;

  searchInput.addEventListener("input", () => 
  {
    const inputValue = searchInput.value.toLowerCase();
    list.innerHTML = "";
    count = 0;

    episodes.forEach((episode) => 
    {
      if (episode.name.toLowerCase().includes(inputValue) || episode.summary.toLowerCase().includes(inputValue)) 
      {
        makeEpisodeCard(list, episode)
      }
    })
  countSpan.innerHTML = `Displaying ${count}/${episodes.length} episode(s)`
  })
}


//level 300 - Episode DropDown search bar
function displayDropBox(episodes) {
  const allOption = document.createElement("option");
  allOption.value = "All";
  allOption.innerHTML = "All episodes";
  select.appendChild(allOption);

  episodes.forEach((episode) => 
  {
    const eachOption = document.createElement("option");
    eachOption.value = episode.id;

    makeMediaTitleV2(select, episode);

    select.addEventListener("change", () => 
    {
      let newArr = [];

      if (select.value === "All") {
        newArr = episodes;
      } else {
        newArr = episodes.filter(episode => select.value.includes(episode.id))
      }

      list.innerHTML = "";
      displayEpisodes(newArr);
      countSpan.innerHTML = `Displaying ${count}/${episodes.length} episode(s)`
    })
  })
}

//level 400 - Shows dropbox

function displayShowsDropbox(shows) 
{
  //variables to choose shows from select input
  const selectShowsEl = document.createElement("select");
  inputDiv.appendChild(selectShowsEl);

  const selectShowsOptions = document.createElement("option");
  selectShowsOptions.value = "All";
  selectShowsOptions.innerHTML = "All shows";

  selectShowsEl.appendChild(selectShowsOptions);

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
  })
})
}


  /**
   * HELPER FUNCTIONS
   */


  function displayShows(shows) //level 400 - function to display shows
  {  
    count = 0;
    shows.forEach((show) => 
    {
      makeShowCard(list, show);
  })
  }

  function displayEpisodes(episodes) //level 100 - function for episodes to be displayed 
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

  function makeSelectEl(el, media) 
  {
    const selectEl = document.createElement("select");
    el.appendChild(selectEl);
  }

  function makeOptionEl(el, media) {

  }
