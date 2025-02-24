const key = "AIzaSyDPyXyRXL2pfKXqPsALjTybfDWnUHMEAAA";
const searchVideo = async () => {
  try {
    const videos = document.querySelector("#search").value;
    var url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${videos}&videoCaption=any&key=${key}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.items);
    appendVideos(data.items);
  } catch (err) {
    console.log(err);
  }
};


var appendVideos = (data) => {
  let container = document.querySelector("#main_container");
  container.innerHTML = null;
  data.forEach(
    ({ id: { videoId }, snippet: { channelTitle, title, thumbnails } }) => {
      let cards = document.createElement("div");
      cards.setAttribute("class", "cards");

      let img = document.createElement("img");
      img.src = thumbnails.default.url;

      let name = document.createElement("h4");
      name.innerText = title;

      let channelName = document.createElement("p");
      channelName.innerText = channelTitle;

      cards.onclick = () => {
        playVideo(vidObj);
      };
      let vidObj = {
        videoId,
        channelTitle,
        title,
      };

      cards.append(img, name, channelName);
      container.append(cards);
    }
  );
};
const trendingVid = async () => {
  try {
    let api = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=IN&key=${key}`;
    const res = await fetch(api);
    const data = await res.json();
    console.log(data.items);
    trendAppend(data.items);
  } catch (err) {
    console.log(err);
  }
};

trendingVid();
const trendAppend = (contain) => {
  let container = document.querySelector("#main_container");
  container.innerHTML = null;

  contain.forEach(
    ({
      id,
      snippet: { channelTitle, title, thumbnails, description },
      statistics: { likeCount, viewCount },
    }) => {
      let cards = document.createElement("div");
      cards.setAttribute("class", "cards");

      let img = document.createElement("img");
      img.src = thumbnails.standard.url;

      let name = document.createElement("h4");
      name.innerText = title;

      let desc = document.createElement("p");
      desc.innerText = description;

      let channelName = document.createElement("p");
      channelName.innerText = channelTitle;

      let view = document.createElement("p");
      if (viewCount <= 999999) {
        let n = (viewCount / 1000).toFixed();
        view.innerText = `${n}K views`;
      } else if (viewCount <= 100000000) {
        let num = (viewCount / 1000000).toFixed(1);
        view.innerText = `${num}M views`;
      }
      
      let vidObj = {
        id,
        channelTitle,
        title,
        description,
      };
      cards.onclick = () => {
        playVideo(vidObj);
        console.log(vidObj);
      };

      cards.append(img, name, channelName, view);

      container.append(cards);
    }
  );
};

const playVideo = (vid) => {
  window.location.href = "html/video.html";
  localStorage.setItem("youtubeVid", JSON.stringify(vid));
};
