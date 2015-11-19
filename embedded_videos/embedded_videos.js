function vidplay() {
    var video = document.getElementById("food");
    var button = document.getElementById("play");
      if (video.paused) {
        video.play();
        button.textContent = "||";
      } else {
          video.pause();
          button.textContent = ">";
            }
}


 function restart() {
    var video = document.getElementById("food");
    video.currentTime = 0;
}

function skip(value) {
  var video = document.getElementById("food");
  video.currentTime += value;
}




function getTime(opt) {
  minsec = opt.value.split(':');
  return parseFloat( minsec[0]*60 + minsec[1] );
}

var curScene = StartScene;
var curSceneStart = getTime(StartScene);
var curSceneEnd = getTime(SecondScene);

function CheckForScene(pos) {
  if( curSceneStart <= pos && pos <= curSceneEnd ) return;
  curSceneEnd = 0; nextscene = scene = null;
  for(sno in Scenes.childNodes) { cn = Scenes.childNodes[sno]; if(cn.tagName=="OPTION") {
    scene = nextscene; nextscene = Scenes.childNodes[sno];
    curSceneStart = curSceneEnd; curSceneEnd = getTime(nextscene);
    if( curSceneStart <= pos && pos < curSceneEnd && scene ) {
      scene.selected = true;
      return;
    }
  }}
  curSceneStart = curSceneEnd; curSceneEnd = ReiherVideo.duration; scene = nextscene;
  if( curSceneStart <= pos && pos <= curSceneEnd && scene ) scene.selected = true;
}

var inited = false;

function InitControls(video) {
  if(inited) return;
  videopos.max = video.duration - 1;
  videopos.style.width = video.videoWidth;
  StartScene.selected = true;
  inited = true;
}

var ratedelta = 0;
var buttons = [ 'playbutton','fstbwdbut','fstfwdbut','snailbut' ];
var savedicon = {};

function PlayPause(video,but,rate) {
  if (video.paused||video.playbackRate + ratedelta != rate) PlayVideo(video,but,rate); else PauseVideo(video);
}

function RestoreButtons() {
  for(butno in buttons) { but_id = buttons[butno]; but = document.getElementById(but_id);
    if(but_id in savedicon) but.value = savedicon[but_id]; }
  }

  function PlayVideo(video,but,rate) {
    if(video.paused) video.play();
    video.playbackRate = rate;
    ratedelta = rate - video.playbackRate;
    RestoreButtons();
    if(!(but.id in savedicon)) savedicon[but.id] = but.value;
    but.value = String.fromCharCode('0x25AE','0x25AE');
  }

  function PauseVideo(video) {
    video.pause(); RestoreButtons();
  }

  function FrameStep(video,but,step) {
    PauseVideo(video);
    video.currentTime =  video.currentTime + step;
    UpdateTime(video);
  }

  function RewindVideo(video) {
    PauseVideo(video);
    video.currentTime =  0;
    UpdateTime(video);
  }

  function UpdateTime(video) {
    videopos.value = video.currentTime; CheckForScene(video.currentTime);}

  function GotoPos(video,newpos) {
      video.currentTime = newpos; CheckForScene(newpos); }

  function SelectScene(video,selector) {
      minsec = selector.value.split(':');
      video.currentTime = parseFloat( minsec[0]*60 + minsec[1] );
      UpdateTime(video);
      //PlayVideo(video,playbutton,1);
  }

  function Mute(video,but) {
      video.muted = !video.muted;
      but.style.color = video.muted ? 'silver' : 'black';
  }

  function AdjustVolume(video,value) {
      video.volume = value;
      VolumeTxt.innerHTML = Math.round(value*100)+'%'
  }




  setTimeout(function(){
    Array.prototype.forEach.call(document.querySelectorAll('iframe'), function(ifrm){
      var src = ifrm.getAttribute('temp-src');

      if (src) {
        ifrm.setAttribute('src', src);
      }
    });
  }, 1000);
