/**
* file : src/population.js
*
* description : class Population
*
* author : Arthur Correnson
* 
* mail : <arthur.correnson@gmail.com>
* 
*/

class Population {
  constructor(t, m, n) {
    // total population
    this.population = [];
    // best result
    this.best = "";
    // sentence we want to find
    this.target = t;
    // number of generations
    this.generations = 0;
    // mutation rate
    this.mutationRate = m;
    // target found or not
    this.done = false;
    // average fitness for each generation
    this.averages = [];
    // timer
    this.timeStart = Date.now();
    this.time = 0;

    // fill the population array
    for (let i = 0; i < n; i++) {
      this.population[i] = new DNA(this.target.length);
    }
  }

  // get the mating pool
  naturalSelection() {

    this.matingPool = [];
    
    // get the maximum fitess
    let maxFit = 0;
    for (let i = 0; i < this.population.length; i++) {
      if(this.population[i].fitness > maxFit) {
        maxFit = this.population[i].fitness;
      }
    }

    // fill the mating pool
    for (let i = 0; i < this.population.length; i++) {
      // normalize fitness
      let fitness = map(this.population[i].fitness, 0, maxFit, 0, 1);
      // fill the mating pool depending
      // on the fitness of each member of the
      // population.
      // fintess = 1 -> 100 clones in the mating pool
      let n = floor(fitness * 100);
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }

  }

  // generate the population (reproduction)
  generate() {
    for (let i = 0; i < this.population.length; i++) {
      let pa = random(this.matingPool);
      let pb = random(this.matingPool);
      let child = pa.crossover(pb);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }

  // get the fitness of each member of the population
  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.target);
    }
  }

  // find the best result in the population
  evaluate() {
    let b = this.population.reduce((acc, val) => {
      if (val.fitness >= acc.fitness) return val;
      else return acc;
    }, this.population[0]);
    
    this.best = b.genes.join("")

    if(b.genes.join("") == this.target) {
      this.done = true;
    } else {
      this.time = (Date.now() - this.timeStart)/1000;
    }
  }

  // display data
  display(all) {
    text("Best :", 10, 10);
    text(p.best, 10, 25);
    text("Generations    : " + p.generations, 10, 50);
    text("Max population : " + p.population.length, 10, 65);
    text("Mutation rate  : " + floor(p.mutationRate*100) + "%", 10, 80);
    text("Time :" + this.time + "s", 10, 95);
    text("Average fitness :", 10, 185);
    if(all) {
      for (let i = 0; i < this.population.length; i++) {
        let t = this.population[i].genes.join("");
        text(t, 215, 10 + i * 10);
      }
    }
  }

  getAverage() {
    let m = 0;
    let t = 0;
    this.calcFitness();
    this.population.forEach((e) => {
      m += floor(e.fitness*100)
      t++;
    });
    this.averages.push(m/t);
  }

  displayGraph() {
    push()
    fill("#333");
    rect(0, 200, 200, 200);
    noFill();
    beginShape();
    stroke(255,0,0);
    strokeWeight(1);
    for (var i = 0; i < this.averages.length; i++){
      let x = map(i, 0, this.generations, 0, 200);
      let y = map(this.averages[i], 0, 100, 400, 200);
      vertex(x,y);
    }
    endShape();
    pop();
  }

  // Run
  evolve() {
    if(!p.done) {
      p.calcFitness();
      p.naturalSelection();
      p.generate();
      p.evaluate();
      p.getAverage();
    }
  }

}