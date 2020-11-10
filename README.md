# Flip Clock

> javascript로 만들기 전에 html+css로 flip 효과 구현하기

* html
```html
<div class="card">
  <div class="flip front-top">
    <div class="char">1</div>
  </div>
  <div class="flip front-bottom">
    <div class="char">1</div>
  </div>
  <div class="flip back-top">
    <div class="char">2</div>
  </div>
  <div class="flip back-bottom">
    <div class="char">2</div>
  </div>
</div>
```
* css
```scss
.card {
  width: 100px;
  height: 140px;
  position: relative;
  margin: 5px;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -0.5px;
    background: rgba(0,0,0,.45);
    z-index: 5;
  }
}
.char {
  width: 100%;
  height: 140px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  color: #ccc;
}
.flip {
  width: 100%;
  height: 50%;
  position: absolute;
  overflow: hidden;
  background: #333;
}

.front-bottom,
.back-bottom {
  top: 50%;
  z-index: 2;
  .char {
    top: -100%;
  }
}

.back-top {
  transform: perspective(90px) rotateX(0deg);
  z-index: 1;
}
.front-bottom {
  transform: perspective(90px) rotateX(0deg);
  z-index: 2;
}
.front-top {
  transform: perspective(140px) rotateX(0);
  transform-origin: bottom;
  transition: transform 0.5s linear;
  animation: hide 1s linear infinite;
  backface-visibility: hidden;
  z-index: 3;
}
.back-bottom {
  transform: perspective(140px) rotateX(180deg);
  transform-origin: top;
  transition: transform 0.5s linear;
  animation: show 1s linear infinite;
  backface-visibility: hidden;
  z-index: 3;
}
@keyframes hide {
  0% {
    transform: perspective(140px) rotateX(0);
  }
  100% {
    transform: perspective(140px) rotateX(-180deg);
  }
}
@keyframes show {
  0% {
    transform: perspective(140px) rotateX(180deg);
  }
  100% {
    transform: perspective(140px) rotateX(0);
  }
}
```