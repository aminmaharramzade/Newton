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

async function fetchData() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.artists);
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
          <h3>${album.data.name}</h3>
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
            <h3>${music.data.name}</h3>
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
            <h3>${artist.data.profile.name}</h3>
          </div>`;
        artistArea.appendChild(row);
      });
  } catch (error) {
    console.error(error);
  }
}

fetchData();
