//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  // makePageForEpisodes(allEpisodes);
  displayEpisodes(allEpisodes);
}

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

window.onload = setup;

let list = document.createElement("ul");

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
  })
}
