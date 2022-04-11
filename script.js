const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJump = false;
let position = 0;

function eventKeyUp (event){
    if(event.keyCode === 38){
        if(!isJump){
            jump();
        }
     
    }
}

function jump(){
    
    isJump = true;
    let upInterval = setInterval(() => {
        if(position >=150){
          clearInterval(upInterval);

          let downInterval = setInterval(() =>{
              if(position <=0){
                clearInterval(downInterval);
                isJump = false;
              }else{
                  position -= 20;
                  dino.style.bottom = position + 'px';
          }
        }, 20);  
    }else{
            position += 20;
            dino.style.bottom = position + 'px';
        }
        
    }, 20);
}
function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randowTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';
        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
             clearInterval(leftInterval);
             document.body.innerHTML = '<h1 class= "game-over">Fim de Jogo</h1>';
         } else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px'
        }
    }, 20)

    setTimeout(createCactus, randowTime)
}  
if ('WebSocket' in window) {
    (function() {
        function refreshCSS() {
            var sheets = [].slice.call(document.getElementsByTagName("link"));
            var head = document.getElementsByTagName("head")[0];
            for (var i = 0; i < sheets.length; ++i) {
                var elem = sheets[i];
                head.removeChild(elem);
                var rel = elem.rel;
                if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
                    var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                    elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
                }
                head.appendChild(elem);
            }
        }
        var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
        var address = protocol + window.location.host + window.location.pathname + '/ws';
        var socket = new WebSocket(address);
        socket.onmessage = function(msg) {
            if (msg.data == 'reload') window.location.reload();
            else if (msg.data == 'refreshcss') refreshCSS();
        };
        console.log('Live reload enabled.');
    })();
}
createCactus();
document.addEventListener('keyup', eventKeyUp);

