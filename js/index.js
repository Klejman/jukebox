$( document ).ready(function() {

    document.addEventListener("DOMContentLoaded", function(event) {
   enableGalleryScroll();
   initActionButtons();
 
});

var THRESHOLD = 0.6,
    MAX_SPEED = 25,
    LEFT = 'left',
    RIGHT = 'right',
    scrolling,
    pageX,
    screenWidth;


function enableGalleryScroll() {
  var gallery = document.getElementById('gallery'); 

  gallery.onmouseover = function(event) {
    pageX = event.clientX || event.screenX;
    screenWidth = window.innerWidth;
    var currentPosPercentage = (screenWidth - pageX) / screenWidth;
    var speed;
    
    if (currentPosPercentage > THRESHOLD ) {
      speed = calculateSpeed(LEFT, currentPosPercentage);
      setScroll(gallery, LEFT, speed)
    } else if (currentPosPercentage < (1 - THRESHOLD)) {
      speed = calculateSpeed(RIGHT, currentPosPercentage);
      setScroll(gallery, RIGHT, speed)
    } else {
      endScroll();
    }

  }
}

function calculateSpeed(direction, ratio) {
  var positionPercentage = direction === LEFT ? ratio : 1 - ratio,
      speedPercentage = (positionPercentage - THRESHOLD) / (1 - THRESHOLD);
  return speedPercentage * MAX_SPEED;
}



function endScroll() {
  clearInterval(scrolling);
}

function setScroll(object, direction, speed) {
  endScroll();
  scrolling = setInterval(function() {
    var newPos = direction === LEFT ? (-1 * speed) : speed; 
    object.scrollLeft += newPos
  }, 10);
}


function initActionButtons() {
  var fullScreenButton = document.getElementById('requestFullScreen');
  fullScreenButton.addEventListener('click', setFullScreen);
  
  var expandButton = document.getElementById('toggleExpand');
  expandButton.addEventListener('click', toggleExpand);
}

function toggleExpand() {
  document.getElementById('gallery')
          .classList
          .toggle('expanded');
}

function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function setFullScreen() {

  var elem = document.getElementById('fullscreen');
  launchIntoFullscreen(elem);
  
}

let musicPlayer = document.getElementById("musicPlayer");

const musicLibrary = [
  {
    name: "ready",
    url: "NjrrK52ZH6c",
    time: 3500
  },
    {
    name: "star_wars2",
    url: "_D0ZQPqeJkk",
  },
  {
    name: "indiana_jones",
    url: "gU1ybiFHjJI",
  },
   {
    name: "superman",
    url: "KOqiIX1Z5Fo",
  },
     {
    name: "et",
    url: "zREVZ6hsYQw",
  },
   {
    name: "mib",
    url: "fE2tuCHtSEM",
  },
   {
    name: "dick-tracy",
    url: "H9i8v8NGttE",
  },
  {
    name: "harry_potter",
    url: "Htaj3o3JD8I",
  },
  {
    name: "ghost_busters",
    url: "m9We2XsVZfc",
  },
  {
    name: "captain_america",
    url: "qrXwAeJ87Bk",
  },
  {
    name: "9_to_5",
    url: "LwDMFOLIHxU",
  },
 {
    name: "jurassic_park",
    url: "zHalXjs0cDA",
  },
   {
    name: "tarzan",
    url: "zc3MnoSS5Hw",
  },
   {
    name: "body_guard",
    url: "3JWTaaS7LdU",
  },
  {
    name: "dick_tracy",
    url: "H9i8v8NGttE",
  },
    {
    name: "doors_the_end",
    url: "JSUIQgEVDM4",
  },
];
function buildYoutubeVideoUrl(action) {
  let url = "https://www.youtube.com/embed/@?autoplay=1";
  return url.replace("@", action);
}

const SONG_DELAY = 1000;
function playSong(index = 0) {
  // if (index >= musicLibrary.length) {
  //   musicPlayer.src = "";
  //   console.log("No more music");
  //   return false;
  // }
  let nextSong = musicLibrary[index];
  musicPlayer.src = buildYoutubeVideoUrl(nextSong.url);
  let time = setTimeout(function() {
    playSong(index + 1);
    clearTimeout(time);
  }, nextSong.time);
}



function start() {
  starWars();
  setTimeout(function(){
  }, musicLibrary[0].time);
}

function starWars() {
  playSong();
  let marquee = document.getElementById("scrollText");
  marquee.classList.remove("hide");
  setTimeout(function(){
    marquee.stop();
    marquee.setAttribute("scrollamount", 0);
    marquee.setAttribute("hidden", true);
    marquee.classList.add("hide");
  }, 3500); //
}


start();

// $( document ).ready(function() {
    $( document).on("click", ".songPlay", function () {
        console.log("yess");
        var myURL = $(this).attr("data-myValue");
        console.log(myURL);
        //  This is where you would play the song based on the id
        // musicPlayer.src = "https://www.youtube.com/embed/KOqiIX1Z5Fo?autoplay=1"
        musicPlayer.src = buildYoutubeVideoUrl(myURL);
        // console.log(musicPlayer);
    });
});
