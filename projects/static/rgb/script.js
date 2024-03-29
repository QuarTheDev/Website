// parameters
const queryParams = new URLSearchParams(window.location.search);

const toggleActions = {
  showCursor: () => {
    document.body.style.cursor = 'default';
  },
  help: () => {
    setTimeout(() => {
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed;
        top: -100%;
        left: 0;
        right: 0;
        padding: 16px;
        margin-inline: 5px;
        background-color: #000;
        color: #fff;
        text-align: center;
        transition: top 1.5s ease-in-out;
        border-radius: 0 0 23px 23px;
        white-space: pre-line;
        font-family: Arial, Helvetica, sans-serif;
      `;
      toast.innerText = '* Help *\n\nshowCursor: toggles cursor visibility\nhelp: displays this message\nhome: goes to home\nopacity: sets brightness of static (0-1)\npageTitle: sets a custom page title\n\nThis message will automatically close in 10 seconds.';
      
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.style.top = '0';
        setTimeout(() => {
          toast.style.top = '-100%';
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 1500);
        }, 10000);
      }, 0);
    }, 0);
  },
  home: () => {
    window.location.href = '/';
  },
  opacity: () => {
    const opacityValue = parseFloat(queryParams.get('opacity'));
    if (!isNaN(opacityValue)) {
      document.body.style.opacity = opacityValue;
    }
  },
  pageTitle: () => {
    const pageTitleValue = queryParams.get('pageTitle');
    if (pageTitleValue) {
      document.title = pageTitleValue;
    }
  }
};

for (const toggle in toggleActions) {
  if (queryParams.has(toggle)) {
    toggleActions[toggle]();
  }
}

var canvas = document.getElementById('static-canvas');
var ctx = canvas.getContext('2d');
var width, height;
var imageData, data;

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    imageData = ctx.createImageData(width, height);
    data = imageData.data;
}

function genStatic() {
    var length = width * height * 4;
    var randomByte = Math.floor(Math.random() * 256);

    for (var i = 0; i < length; i += 4) {
        data[i] = Math.floor(Math.random() * 256); // red
        data[i + 1] = Math.floor(Math.random() * 256); // green
        data[i + 2] = Math.floor(Math.random() * 256); // blue
        data[i + 3] = 255; // alpha
    }
    
    ctx.putImageData(imageData, 0, 0);
}

function animStatic() {
    requestAnimationFrame(animStatic);
    genStatic();
}

resizeCanvas();
animStatic();

window.addEventListener('resize', resizeCanvas);