function appendSVG(document) {
  /*
         'Normal':[1,0,0,0,0, 0,1,0,0,0, 0,0,1,0,0, 0,0,0,1,0],
         'Protanopia':[1.43,-0.43,0,0,0, -0.55,1.55,0,0,0, 0,-0.24,1.24,0,0, 0,0,0,1,0],
         'Protanomaly':[1.18,-0.18,0,0,0, -0.33,1.33,0,0,0, 0,-0.12,1.12,0,0, 0,0,0,1,0],
         'Deuteranopia':[1.37,-0.37,0,0,0, -0.7,1.7,0,0,0, 0,-0.3,1.3,0,0, 0,0,0,1,0],
         'Deuteranomaly':[1.2,-0.2,0,0,0, -0.25,1.25,0,0,0, 0,-0.15,1.15,0,0, 0,0,0,1,0],
         'Tritanopia':[1.05,-0.05,0,0,0, 0,-0.43,1.43,0,0, 0,-0.47,1.47,0,0, 0,0,0,1,0],
         'Tritanomaly':[1.03,-0.03,0,0,0, 0,-0.73,1.73,0,0, 0,-0.18,1.18,0,0, 0,0,0,1,0]
         */

  const svg =
    '<svg id="colorBlindSVG" version="1.1" xmlns="http://www.w3.org/2000/svg" baseProfile="full"> <filter id="protanopia"> <feColorMatrix type="matrix" values="1.43,-0.43,0,0,0,-0.55,1.55,0,0,0,0,-0.24,1.24,0,0,0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="protanomaly"> <feColorMatrix type="matrix" values="1.18,-0.18,0,0,0,-0.33,1.33,0,0,0,0,-0.12,1.12,0,0,0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="deuteranopia"> <feColorMatrix type="matrix" values="1.37,-0.37,0,0,0,-0.7,1.7,0,0,0,0,-0.3,1.3,0,0,0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="deuteranomaly"> <feColorMatrix type="matrix" values="1.2,-0.2,0,0,0,-0.25,1.25,0,0,0,0,-0.15,1.15,0,0,0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="tritanopia"> <feColorMatrix type="matrix" values="1.05,-0.05,0,0,0,0,-0.43,1.43,0,0,0,-0.47,1.47,0,0,0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="tritanomaly"> <feColorMatrix type="matrix" values="1.03,-0.03,0,0,0,0,-0.73,1.73,0,0,0,-0.18,1.18,0,0,0,0,0,1,0" in="SourceGraphic" /> </filter> </svg>';

  const blockColorblindContent = document.getElementById('blockColorblindContent');
  if (blockColorblindContent !== undefined && blockColorblindContent !== null) {
    blockColorblindContent.parentNode.removeChild(blockColorblindContent);
  }

  const iDiv = document.createElement('div');
  iDiv.id = 'blockColorblindContent';
  iDiv.innerHTML = svg;
  iDiv.style.display = 'none'; //Fix issue "blockColorblindContent" is showing and taking up space on some websites #5
  document.getElementsByTagName('body')[0].appendChild(iDiv);
}

function changeColors(type) {
  appendSVG(document);
  revertColors(document);

  var css = `html {filter: url(#${type}); -webkit-filter: url(#${type}); -moz-filter: url(#${type}); -o-filter: url(#${type}); -ms-filter: url(#${type});}`;

  applyingStyle(document, css);
}

function revertColors(document) {
  const css =
    'html { -webkit-filter: none; -moz-filter: none; -o-filter: none; -ms-filter: none; } #blockColorblindContent { display: none; }';
  applyingStyle(document, css);
}

function applyingStyle(document, css) {
  const head = document.getElementsByTagName('head')[0],
    style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
}

function execute() {
  chrome.storage.sync.get('colorblindingValue', function (obj) {
    if (obj.colorblindingValue === null || obj.colorblindingValue === undefined) {
      obj.colorblindingValue = 'normal';
      chrome.storage.sync.set({ colorblindingValue: obj.colorblindingValue });
    }
    changeColors(obj.colorblindingValue);
  });
}

execute();
