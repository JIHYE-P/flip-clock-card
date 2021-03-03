import './index.scss';
console.log('test')
class ElementBuilder {
  root;
  constructor(tagName, props = {}){
    this.root = Object.assign(document.createElement(tagName), {...props})
  }
  setStyle(style){
    Object.assign(this.root.style, style);
  }
  addClass(...className){
    this.root.classList.add(...className);
  }
  removeClass(...className){
    this.root.classList.remove(...className);
  }
  changeChar(char){
    this.root.innerText = char;
  }
  appendTo(el){
    if(el instanceof Node) el.appendChild(this.root);
    else if(el instanceof ElementBuilder) el.root.appendChild(this.root);
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
    this.addClass('half', className);
    
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
  char;
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

    this.char = char;
  }
  frontChange(char){
    this.frontTop.changeChar(char);
    this.frontBottom.changeChar(char);
  }
  backChange(char){
    this.backTop.changeChar(char);
    this.backBottom.changeChar(char);
  }
  async changeChar(char){
    if(this.char === char) return;
    this.char = char.slice(0, 1);
    this.backChange(char);
    await this.flipAction('active', 500);
    this.frontChange(char);
  }
}

class FlipList extends Set {
  constructor(length, char, className, {width, height, fontSize}){
    super(Array.from({length}, () => char).map(char => new FlipCard(className, char, {width, height, fontSize})));
  }
  appendTo(parent){
    this.forEach(el => el.appendTo(parent));
  }
  changeChar(char){
    [...this].forEach((el, i) => el.changeChar(char[i]));
  }
}

const cardSize = {width: '65px', height: '90px', fontSize: '70px'}
const hoursCard = new FlipList(2, 0, 'flip', cardSize);
const minutesCard = new FlipList(2, 0, 'flip', cardSize);
const secondsCard = new FlipList(2, 0, 'flip', cardSize);

const hoursInner = new ElementBuilder('div', {className: 'inner hours'});
const minutesInner = new ElementBuilder('div', {className: 'inner minutes'});
const secondsInner = new ElementBuilder('div', {className: 'inner seconds'});

hoursCard.appendTo(hoursInner);
minutesCard.appendTo(minutesInner);
secondsCard.appendTo(secondsInner);

hoursInner.appendTo(document.body);
minutesInner.appendTo(document.body);
secondsInner.appendTo(document.body);

setInterval(() => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2,'0').split(''); 
  const minutes = String(now.getMinutes()).padStart(2,'0').split('');
  const seconds = String(now.getSeconds()).padStart(2,'0').split('');

  hoursCard.changeChar(hours);
  minutesCard.changeChar(minutes);
  secondsCard.changeChar(seconds);
}, 1000);



