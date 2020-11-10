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
  changeChar(char){
    this.root.innerText = char;
  }
  appendTo(el){
    if(el instanceof Node) el.appendChild(this.root)
    else if(el instanceof ElementBuilder) el.root.appendChild(this.root)
  }
  forceReflow(){
    this.root.offsetHeight;
  }
}

class CharCard extends ElementBuilder {
  constructor(className, char, {width, height} = {}){
    super('div');
    this.changeChar(char)
    this.addClass(className);
    this.setStyle({width, height});
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
  changeChar(char){
    this.charCard.changeChar(char);
  }
}

class FlipAnimate extends ElementBuilder {
  constructor(){
    super('div');
  }
  flipAction(className, timeout){
    return new Promise(res => {
      this.forceReflow();
      if(!this.root.classList.contains(className)) this.addClass(className);
      setTimeout(() => {
        this.removeClass(className);
        res();
      }, timeout);
    });
  }
}

class FlipCard extends FlipAnimate {
  frontTop;
  frontBottom;
  backTop;
  backBottom;
  constructor(className, char, {width, height, fontSize} = {}){
    super('div');
    this.addClass(className);
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
  frontChange(char){
    this.frontTop.changeChar(char);
    this.frontBottom.changeChar(char);
  }
  backChange(char){
    this.backTop.changeChar(char);
    this.backBottom.changeChar(char);
  }
  async flipChange(char){
    this.backChange('1');
    await this.flipAction('active', 500);
    this.frontChange('0');
  }
}

const flip = new FlipCard('flip', 0, {
  width: '85px',
  height: '115px',
  fontSize: '80px'
});
document.body.appendChild(flip.root);
// setInterval(() => flip.flipChange(), 1000);


