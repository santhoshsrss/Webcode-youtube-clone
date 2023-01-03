const videoCardContainer = document.querySelector('.video-container')


let api_key = "AIzaSyCmZS1W6CncUeT8fA8-vxOjTMPs9G84fjw";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";


fetch(video_http + new URLSearchParams({           // URLSearchparams methods work with the query string of a URL
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 150,
    regionCode: 'IN'
}))

.then((res)=> res.json())
.then((data)=> {
    // console.log(data);
    data.items.forEach(item => {
        getChannelIcon(item);
        
    });
})
.catch(err => console.log(err));
const getChannelIcon = (video_data) =>{
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId,
    }))
    .then((res)=>res.json())
    .then((data) => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data)
    })
}

let makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
        <div class="video" onclick = "location.href = 'https://youtube.com/watch?v=${data.id}' ">
            <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
            <div class="content">
                <img src="${data.channelThumbnail}" class="channel-icon" alt="">
                <div class="info">
                    <h4 class="title">${data.snippet.title}</h4>
                    <p class="channel-name">${data.snippet.channelTitle}</p>
                </div>
            </div>
        </div>
    `;

}

const searchbox = document.querySelector('.search-bar')
const searchbtn = document.querySelector('.search-btn')
let searchlink = "https://www.youtube.com/results?search_query=";
searchbtn.addEventListener('click', () =>{
    if(searchbox.value.length){
        location.href = searchlink + searchbox.value; 
        // what ever I type in the search it will add to the serachlink url
    }
})

const librarysearch = document.querySelector('#library-search')
let lbsearch = "https://www.youtube.com/feed/library";
librarysearch.addEventListener('click', () =>{
    location.href = lbsearch
    // when I click the library it will redirect me to youtube library.
})

const subscription = document.querySelector('#subscription-here')
let subscription_search = "https://www.youtube.com/feed/subscriptions";
subscription.addEventListener('click', () =>{
    location.href = subscription_search
})
const createAVideo = document.querySelector('#create-video-here')
let create_video = "https://studio.youtube.com/channel/UCQXNbHI9VceH6pjJhurskQA/videos/upload?d=ud&filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D";
createAVideo.addEventListener('click',() => {
    location.href = create_video
})

const click_profile = document.querySelector('#Click-HEre')
let onclick_profile = "https://www.youtube.com/channel/UCQXNbHI9VceH6pjJhurskQA";
click_profile.addEventListener('click', () =>{
    location.href = onclick_profile
})
