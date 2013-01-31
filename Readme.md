
# claw

  simple css 3d transforms via js

## Installation

    $ component install threepointone/claw

## Why?

The problem with css transforms, is that they're all bunched up together into one css property, like so - 
```css
.box{
    transform: rotate(30deg) scale(0.2) translateX(20px) translateY(30px);
}
```

this makes working with them rather painful, since you have to construct the whole string every time, and remember all the previous values of transforms you don't want to change. there exist solutions where you construct objects representing every element you want to control, but those are clumsy as well, and indirection at best.

claw gets around this by simply writing value to the element itself, and retrieving it later when needed to construct the string. hacky? sure. Slightly inefficient? Yup. works? totally. 

## API

```js
var claw = require('claw');

var el = document.getElementById('xyz');

claw(el, {
    rotate: '30deg'
});

claw(el, {
    scale: 2,
    matrix: [0.866, 0.5, -0.5, 0.866, 0, 0]
});

// notice that the rotation is preserved. yay!

// the function itself returns a curried version of itself for further chaining

claw(el)({rotate:'30deg'})({skewX:'10px'})

// boom.

```



## License

  MIT
