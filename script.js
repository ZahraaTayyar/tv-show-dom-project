//level 350 - Get episodes from API
const url = "https://api.tvmaze.com/shows/82/episodes";
let allEpisodes = [];


//You can edit ALL of the code here
function setup() {
  fetch(url)
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

let count = 0;

//variable to choose episodes from a list
const select = document.createElement("select");
const allOption = document.createElement("option");
document.body.appendChild(select);

//variable to input text for the search function
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Search";

//variable to show number of episodes displayed
let countSpan = document.createElement("span");
document.body.appendChild(searchInput);
document.body.appendChild(countSpan);

//put input tab into one div so can style properly
let inputDiv = document.createElement("div");
inputDiv.className = "input-div";
document.body.appendChild(inputDiv);

inputDiv.appendChild(select);
inputDiv.appendChild(searchInput);
inputDiv.appendChild(countSpan);


//level 100 - function for episodes to be displayed
function displayEpisodes(episodes) {
  episodes.forEach((episode) => {
    let li = document.createElement("li");
    let title = document.createElement("h1");
    let image = document.createElement("img");
    let paragraph = document.createElement("p");

    let episodeCode = `S${("0" + episode.season).slice(-2)}E${("0" + episode.number).slice(-2)}`
    title.innerHTML = `${episode.name} - ${episodeCode}`;
    image.src = episode.image.medium;
    paragraph.innerHTML = episode.summary;

    document.body.appendChild(list);
    list.appendChild(li);
    li.appendChild(title);
    li.appendChild(image);
    li.appendChild(paragraph);
    count++;
  })
}


//level 200 - function for search input
function displayEpisodeWithSearchBox(episodes) {
  displayEpisodes(episodes);
  displayDropBox(episodes);

  countSpan.innerHTML = `Displaying ${count}/${episodes.length} episode(s)`

  searchInput.addEventListener("input", () => {
    const inputValue = searchInput.value.toLowerCase();
    list.innerHTML = "";
    count = 0;

    episodes.forEach((episode) => {
      if (episode.name.toLowerCase().includes(inputValue) || episode.summary.toLowerCase().includes(inputValue)) {
        let li = document.createElement("li");
        let title = document.createElement("h1");
        let image = document.createElement("img");
        let paragraph = document.createElement("p");

        let episodeCode = `S${("0" + episode.season).slice(-2)}E${("0" + episode.number).slice(-2)}`
        title.innerHTML = `${episode.name} - ${episodeCode}`;
        image.src = episode.image.medium;
        paragraph.innerHTML = episode.summary;

        document.body.appendChild(list);
        list.appendChild(li);
        li.appendChild(title);
        li.appendChild(image);
        li.appendChild(paragraph);
        count++;

      }
  })
  countSpan.innerHTML = `Displaying ${count}/${episodes.length} episode(s)`
  })
}


//level 300 - DropBox search bar
function displayDropBox(episodes) {
  allOption.value = "All";
  allOption.innerHTML = "All episodes";
  select.appendChild(allOption);

  episodes.forEach((episode) => {
    let episodeCode = `S${("0" + episode.season).slice(-2)}E${("0" + episode.number).slice(-2)}`;

    const eachOption = document.createElement("option");
    eachOption.value = episode.id;

    eachOption.innerHTML = `${episodeCode} - ${episode.name}`;

    select.appendChild(eachOption)

    select.addEventListener("change", () => {

      let newArr = [];
      if (select.value === "All") {
        newArr = episodes;
      } else {
        newArr = episodes.filter(episode => select.value.includes(episode.id))
      }
      count = 0;
      list.innerHTML = "";
      displayEpisodes(newArr);
      countSpan.innerHTML = `Displaying ${count}/${episodes.length} episode(s)`
    })
  })
}

