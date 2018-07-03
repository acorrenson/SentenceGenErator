/**
* file : src/dna.js
*
* description : class DNA
*
* author : Arthur Correnson
* 
* mail : <arthur.correnson@gmail.com>
*
*/

class DNA {
  constructor(n) {
    this.genes = [];
    this.fitness = 0;
    for (let i = 0; i < n; i++) {
      this.genes[i] = this.randomChar();
    }
  }

  randomChar() {
    let c = floor(random(63, 122));
    if (c === 63) c = 32;
    if (c === 64) c = 46;
    return String.fromCharCode(c);
  }

  crossover(b) {
    let child = new DNA(this.genes.length);
    let mid = floor(random(this.genes.length));
    
    for(let i = 0; i < this.genes.length; i++) {
      if(i > mid) child.genes[i] = this.genes[i];
      else child.genes[i] = b.genes[i];
    }
    
    return child;
  }

  mutate(mr) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mr) {
        this.genes[i] = this.randomChar();
      }
    }
  }

  calcFitness(target) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      score += this.genes[i] == target[i];
    }
    this.fitness = score / target.length;
  }
}