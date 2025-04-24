let button = document.querySelector('#btn');
let glow = document.querySelector('#glow');
let backGlow = document.querySelector('.border-glow');
let backGlow2 = document.querySelector(".border-glow2");
let resetGlowTimeout; 
let resetBackGlow1Timeout;
let resetBackGlow2Timeout;
// button boundaries
let rect = button.getBoundingClientRect();
let width = rect.width/2;
// Glow width
backGlow2.style.width = width + "px";
backGlow.style.width = width + "px";
// Glow center
let glowCenter = glow.getBoundingClientRect();
// Inside the buttons
window.addEventListener('mousemove', function(e) {
    var inside = e.clientX > rect.left && e.clientX < rect.right && e.clientY > rect.top && e.clientY < rect.bottom;
    // proccess
    let center = rect.width/2;
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    let X = x - glowCenter.width/2;
    if(inside){
        glow.style.left = X + "px";
        if (resetGlowTimeout) clearTimeout(resetGlowTimeout);
        resetGlowTimeout = null ;
    } else {
        if (resetGlowTimeout) clearTimeout(resetGlowTimeout);
            resetGlowTimeout = setTimeout(function(){
            glow.style = "";
        }, 2000);
    }
    console.log(inside);
    // border GLOW 1
    let distance1 = Math.abs(x - center);
    let maxDistance1 = center;
    let opacity1 = distance1/maxDistance1;
    opacity1 = Math.min(1, opacity1);

    if(x > 0 && x < center && y > 0 && y < rect.height){
        backGlow.style.opacity = opacity1;
        if (resetBackGlow1Timeout) clearTimeout(resetBackGlow1Timeout);
        resetBackGlow1Timeout = null;
    }else if (!inside) {
        if (resetBackGlow1Timeout) clearTimeout(resetBackGlow1Timeout);
            resetBackGlow1Timeout = setTimeout(function(){
            backGlow.style.opacity = 0;
        }, 2000);
    } else {
        backGlow.style.opacity = 0;
    }
    // border GLow 2
    let distance2 = Math.abs(center - x);
    let maxDistance2 = rect.width - center;
    let opacity2 = distance2/maxDistance2;
    opacity2 = Math.min(1, opacity2);

    if (inside){
        if(x > center && x < rect.width && y > 0 && y < rect.height){
            backGlow2.style.opacity = opacity2;
            if (resetBackGlow2Timeout) clearTimeout(resetBackGlow2Timeout);
                resetBackGlow2Timeout = null;
        } else if(x > 0 && x <= center && y > 0 && y < rect.height) {
                backGlow2.style.opacity = 0;
                if (resetBackGlow2Timeout) clearTimeout(resetBackGlow2Timeout);
                resetBackGlow2Timeout = null;
        } 
    } else if (!inside) {
        if (resetBackGlow2Timeout) clearTimeout(resetBackGlow2Timeout);
            resetBackGlow2Timeout = setTimeout(function(){
            backGlow2.style.opacity = 1;
        }, 2000);
    }
    
    });
    