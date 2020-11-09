import './index.scss';

class ElementBuilder {
  root;
  constructor(tagName, props = {}){
    this.root = Object.assign(document.createElement(tagName), {...props})
  }
  setStyle(style){
    Object.assign(this.root.style, style);
  }
  addClass(className){
    this.root.classList.add(className);
  }
  removeClass(className){
    this.root.classList.remove(className);
  }
  innerText(char){
    this.root.innerText = char;
  }
  appendTo(el){
    if(el instanceof Node) el.appendChild(this.root)
    else if(el instanceof ElementBuilder) el.root.appendChild(this.root)
  }
}

class CharCard extends ElementBuilder {
  constructor(className, char, {width, height} = {}){
    super('div');
    this.innerText(char)
    this.addClass(className);
    this.setStyle({width, height});
  }
  changeText(char){
    super.innerText(char)
  }
}

class HalfCard extends ElementBuilder {
  charCard;
  constructor(className, char, {width, height} = {}){
    super('div');
    this.setStyle({width});
    this.addClass(className);
    
    this.charCard = new CharCard('char', char, {width, height});
    this.charCard.appendTo(this);
  }
}

class FlipCard extends ElementBuilder {
  frontTop;
  frontBottom;
  backTop;
  backBottom;
  constructor(char, {width, height, fontSize} = {}){
    super('div');
    this.addClass('flip');
    this.setStyle({width, height, fontSize})

    this.frontTop = new HalfCard('front-top', char, {width, height});
    this.frontBottom = new HalfCard('front-bottom', char, {width, height});
    this.backTop = new HalfCard('back-top', char, {width, height});
    this.backBottom = new HalfCard('back-bottom', char, {width, height});

    this.frontTop.appendTo(this);
    this.frontBottom.appendTo(this);
    this.backTop.appendTo(this);
    this.backBottom.appendTo(this);
  }
}

const flip = new FlipCard(0, {
  width: '100px',
  height: '150px',
  fontSize: '30px'
});
document.body.appendChild(flip.root);