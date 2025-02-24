var YTdata = JSON.parse(localStorage.getItem("youtubeVid"));
console.log(YTdata);

let pageTitle=document.querySelector("title")
pageTitle.innerText=YTdata.title

let playVideo = document.createElement("div");

let iframeDiv = document.createElement("div");
iframeDiv.setAttribute("class", "frame")

let iframe = document.createElement("iframe");
let playId=YTdata.videoId || YTdata.id
iframe.src=`https://www.youtube.com/embed/${playId}`
iframe.width="100%"
iframe.height="100%"
iframe.allow="fullscreen"


iframeDiv.append(iframe)

var title=document.createElement("h4")
title.innerText=YTdata.title

var channelName=document.createElement("p")
channelName.innerText=YTdata.channelTitle
var desc=document.createElement("p")
desc.innerText=YTdata.description

playVideo.append(iframeDiv,title,channelName,desc)
document.querySelector("#main_container").append(playVideo)