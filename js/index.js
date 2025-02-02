const url =
  "https://spotify23.p.rapidapi.com/search/?q=6ae9c663acmsh3757c0801b0a6a5p1928c0jsna6485c0e8310&type=multi&offset=0&limit=10&numberOfTopResults=5";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "6ae9c663acmsh3757c0801b0a6a5p1928c0jsna6485c0e8310",
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
  },
};

function formatDuration(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000); // Corrected calculation
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function truncateText(text, maxLength) {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

async function fetchData() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.podcasts);
    document.querySelector(
      "#albumCount"
    ).innerHTML = `Albums(${result.albums.totalCount})`;

    const albumArea = document.querySelector("#albumCardArea");
    result.albums.items.forEach((album) => {
      const row = document.createElement("div");
      row.classList.add("album-card");
      row.innerHTML = `
        <img src="${album.data.coverArt.sources[0].url}" />
        <div class="card-text">
          <h3>${truncateText(album.data.name, 20)}</h3>
           <p>${album.data.artists.items[0].profile.name}</p>
        </div>`;
      albumArea.appendChild(row);
    });

    document.querySelector(
        "#musicCount"
      ).innerHTML = `Tracks(${result.tracks.totalCount})`;
  
      const musicArea = document.querySelector("#musicCardArea");
      result.tracks.items.forEach((music) => {
        const row = document.createElement("div");
        row.classList.add("music-card");
        row.innerHTML = `
          <img src="${music.data.albumOfTrack.coverArt.sources[0].url}" />
          <div class="card-text">
            <h3>${truncateText(music.data.name, 20)}</h3>
             <p>${music.data.artists.items[0].profile.name}</p>
             <p>${formatDuration(music.data.duration.totalMilliseconds)}</p>
          </div>`;
        musicArea.appendChild(row);
      });

      document.querySelector(
        "#artistCount"
      ).innerHTML = `Artists(${result.artists.totalCount})`;
  
      const artistArea = document.querySelector("#artistCardArea");
      result.artists.items.forEach((artist) => {
        const row = document.createElement("div");
        row.classList.add("artist-card");
        row.innerHTML = `
          <img src="${artist.data.visuals.avatarImage.sources[0].url}" />
          <div class="card-text">
            <h3 style="font-size: 22px">${truncateText(artist.data.profile.name, 20)}</h3>
          </div>`;
        artistArea.appendChild(row);
      });

      document.querySelector(
        "#podcastCount"
      ).innerHTML = `Podcasts(${result.podcasts.totalCount})`;
  
      const podcastArea = document.querySelector("#podcastCardArea");
      result.podcasts.items.forEach((podcast) => {
        const row = document.createElement("div");
        row.classList.add("podcast-card");
        row.innerHTML = `
          <img src="${podcast.data.coverArt.sources[0].url}" />
          <div class="card-text">
            <h3 style="font-size: 22px">${truncateText(podcast.data.name, 12)}</h3>
          </div>`;
        podcastArea.appendChild(row);
      });
  } catch (error) {
    console.error(error);
  }
}

fetchData();
