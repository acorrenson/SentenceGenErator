# SentenceGenErator

Generate sentences with genetic algorithms.

# Acknowledgements and sources

This project is based on Daniel Shiffman project [Shakespeare Monkey](https://github.com/shiffman/The-Nature-of-Code-Examples/tree/master/chp09_ga/NOC_9_01_GA_Shakespeare).

# Dependencies

This project needs [p5.js](https://p5js.org/) to work.

# How to use it ?

Here is a little example :

```javascript
  
  let p;

  function setup() {
    // target : "Hello World."
    // population size : 1000
    // mutation rate : 1%
    p = new Population("Hello World", 0.01, 1000);
  }

  function draw() {
    // let the population evolve
    p.evolve();
    // display the result in real time
    p.display()
  }

```