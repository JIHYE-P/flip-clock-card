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
  border-radius: 6px;
}
.flip {
  width: 100%;
  height: 50%;
  position: absolute;
  overflow: hidden;
  background: #333;
  border-radius: 6px;
}

.front-bottom,
.back-bottom {
  top: 50%;
  z-index: 2;
  .char {
    top: -100%;
  }
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

.flip::after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.front-top::after,
.back-top::after {
  background: linear-gradient(to bottom, rgba(0,0,0,0.1) 95%, rgba(255,255,255,0.1) 100%);
}
```