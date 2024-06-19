
let muted = false;
var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");



var buildUrl = "Build";
var loaderUrl = buildUrl + "/WebGl.loader.js";
var config = {
  dataUrl: buildUrl + "/WebGl.data",
  frameworkUrl: buildUrl + "/WebGl.framework.js",
  codeUrl: buildUrl + "/WebGl.wasm",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "dKargo",
  productName: "grown",
  productVersion: "1.2.2",
  devicePixelRatio:1,
  showBanner: unityShowBanner,
};

window.onload = function() {
  var bgmSound      = document.createElement('audio');
 bgmSound.id       = 'bgm';
 bgmSound.src      = 'Build/src/sound/Casual Game Music 01.mp3';
 bgmSound.type     = 'audio/mpeg';
 bgmSound.autoplay = 'autoplay';
 bgmSound.loop     = true;
 bgmSound.muted    = 'muted';
 document.getElementById('sector_audio').appendChild(bgmSound);

var audioContext = new (window.AudioContext || window.webkitAudioContext)();;
}
window.addEventListener("message", this.receiveMessage); 

document.body.addEventListener('mouseover', () => {
    if(!muted)
    {
    document.getElementById("bgm").muted = false;
      document.getElementById("bgm").play();
    }
});

document.body.addEventListener('touchstart', () => {
    if(!muted)
    {
    document.getElementById("bgm").muted = false;
      document.getElementById("bgm").play(); 
    }
});
document.body.addEventListener('touchend', () => {
if(!muted)
  {
  document.getElementById("bgm").muted = false;
    document.getElementById("bgm").play();
  }
});

document.addEventListener("visibilitychange", event => {
if (document.visibilityState === "visible") {
if(!muted)
{
  document.getElementById('bgm').play();
} 
} else {
  const audio = document.getElementById('bgm');
  audio && audio.pause();
 
}
})
function receiveMessage(event) 
{
    //if (event.origin !== "https://launcher.bleepy.net") 
    //return;
  switch(event.data.messageType) {
     case "init":
        window.unityInstance.SendMessage("GameManager","SendPost" , JSON.stringify(event.data));
        break;
    
    case "submitSuccess":
        window.unityInstance.SendMessage("GameManager","SendPost" , JSON.stringify(event.data));
        break;
  
    case "resetCharacter":
        window.unityInstance.SendMessage("GameManager","SendPost" , JSON.stringify(event.data));
        break;
    
    case "mode":
        window.unityInstance.SendMessage("GameManager","modeSet" , JSON.stringify(event.data));
        break;
    
    case "getServerTime":
        window.unityInstance.SendMessage("GameManager","SendPost" , JSON.stringify(event.data));
        break;
  } 

}


function muteON()
{
muted = true;
document.getElementById("bgm").volume=0;
const audio = document.getElementById('bgm');
audio && audio.pause();
 
}

function muteOff()
{
muted = false;
document.getElementById("bgm").volume=1;
}

function toLauncher(message)
{
 
        window.parent.postMessage(message, "*"); 

}
function getSaveData(uid,level,first,state,sort,created,reps,lastworktime,nexttime)
{
  
  firebase.firestore().collection('Dkargo_User').doc(uid.toString()).set({Level:level,first:first,Status:state,Sort:sort,Create:created,Reps:reps,LWT:lastworktime,NT:nexttime});
  
}
function getLoadData(uid)
{
       document.getElementById("unity-canvas").focus();
      firebase.firestore().collection('Dkargo_User').doc(uid).get().then((결과)=>
      {
        if(결과.exists==false)
        {
          firebase.firestore().collection('Dkargo_User').doc(uid).set({Level:1,first:true,Status:0,Sort:0,Create:false,Reps:0,LWT:"",NT:""});
          firebase.firestore().collection('Dkargo_User').doc(uid).get().then((결과2)=>
          {  
            window.unityInstance.SendMessage("GameManager","LoadData" , JSON.stringify(결과2.data()));
          });
        }
        else
        {
          window.unityInstance.SendMessage("GameManager","LoadData" , JSON.stringify(결과.data()));
        
        } 
      }
        );
     

}

function getLoadSound(uid)
{
       document.getElementById("unity-canvas").focus();
      firebase.firestore().collection('Dkargo_Sound').doc(uid).get().then((결과)=>
      {
        if(결과.exists==false)
        {
          firebase.firestore().collection('Dkargo_Sound').doc(uid).set({bgm:1,effect:1});
          firebase.firestore().collection('Dkargo_Sound').doc(uid).get().then((결과2)=>
          {  
            window.unityInstance.SendMessage("GameManager","LoadSoundData" , JSON.stringify(결과2.data()));
          });
        }
        else
        {
          window.unityInstance.SendMessage("GameManager","LoadSoundData" , JSON.stringify(결과.data()));
        
        } 
      }
        );
     

}
          
function getSaveSound(uid,b,e)
{ 
  firebase.firestore().collection('Dkargo_Sound').doc(uid.toString()).set({bgm:b,effect:e}); 
}

function getLauncherMode(data){
  let modeMessage = {
    messageType: "mode"
};
  window.parent.postMessage(modeMessage, "*"); 
 // window.unityInstance.SendMessage("GameManager","modeSet" , JSON.stringify(data));
}


let message = 
{
    messageType: "load"
}

function getLauncherData()
{
  
  window.parent.postMessage(message, "*"); 
}

function SendLauncherData(data) {

window.unityInstance.SendMessage("GameManager","SendPost" , JSON.stringify(data));

}

function SendProgress(progressRate){
  let procMsg = {
    messageType: "progress",
    progress : progressRate
  }
  window.parent.postMessage(procMsg, "*"); 
}

function gg(data) {
firebase.initializeApp(data);
}
function unityShowBanner(msg, type) {

  var div = document.createElement('div');
  div.innerHTML = msg;
}
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {

  var meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
  document.getElementsByTagName('head')[0].appendChild(meta);
  container.className = "unity-mobile";



  canvas.width = window.innerWidth;
  canvas.height= window.innerHeight;
  canvas.style.height = "100vh";  
} else {
  canvas.width=720;
  canvas.height=1280;
  
  canvas.style.height = "100vh";
}


loadingBar.style.display = "block";

var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
  config.devicePixelRatio = window.devicePixelRatio;
  createUnityInstance(canvas, config, (progress) => {
    progressBarFull.style.width = 100 * progress + "%";
    SendProgress(progress);
  }).then((unityInstance) => {
    window.unityInstance = unityInstance;
    loadingBar.style.display = "none";
  }).catch((message) => {
  });
};
document.body.appendChild(script);
