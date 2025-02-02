//Vars
let osc, playing, freq, amp, env;
let btna, btnb, btnc, btnd;
let fft;
let sliderA, sliderD, sliderS, sliderR, sliderV;
let setShape = ['arc', 'rect', 'triangle'];
let g;
let h;




function preload(){
  userStartAudio();
  // oscillator, envelope, and volume
  env = new p5.Envelope();
  env.setRange(1, 0);
  osc = new p5.Oscillator();
  osc.setType('square');
  osc.amp(env);

}

function setup() {
  createCanvas((windowWidth - (windowWidth * 0.47)), (windowHeight - (windowHeight * 0.1)));
  let c1 = color(20);
  let c2 = color(10);
  for(let y = 0; y < height; y++) {
    h = map(y, 0, height, 0, 1);
    let newc = lerpColor(c1, c2, h);
    stroke(newc);
    line(0 , y, width, y);
  }
  
// oscilloscope
  fft = new p5.FFT();
  osc.connect(fft);

// wavform button group

  btna = createButton('SINE');
  btna.mousePressed(typeSine);
  btna.position((innerWidth * 0.32),(innerHeight * 0.31));
  btna.size(100,25);
  btna.style('background-color', 'red');
  btna.style('color', '#fff');
    
  btnb = createButton('SQUARE');
  btnb.mousePressed(typeSquare);
  btnb.position((innerWidth * 0.42),(innerHeight * 0.31));
  btnb.size(100,25);
  btnb.style('background-color', 'red');
  btnb.style('color', '#fff');

  btnc = createButton('TRIANGLE');
  btnc.mousePressed(typeTri);
  btnc.position((innerWidth * 0.52),(innerHeight * 0.31));
  btnc.size(100,25);
  btnc.style('background-color', 'red');
  btnc.style('color', '#fff');

  btnd = createButton('SAWTOOTH');
  btnd.mousePressed(typeSaw);
  btnd.position((innerWidth * 0.62),(innerHeight * 0.31));
  btnd.size(100,25);
  btnd.style('background-color', 'red');
  btnd.style('color', '#fff');

// Vol/ADSR SliderS

  sliderV = createSlider(0, 1, 0.6, 0.01);
  sliderV.position((innerWidth * 0.51),(innerHeight * 0.46));
  sliderV.style('transform', 'rotate(270deg)');
  sliderV.style('height', '5px');
  sliderV.addClass('sliderV');

  sliderA = createSlider(0, 5, 0);
  sliderA.position((innerWidth * 0.55),(innerHeight * 0.46));
  sliderA.style('transform', 'rotate(270deg)');
  sliderA.style('height', '5px');
  sliderA.addClass('sliderA');
    
  sliderS = createSlider(0, 10, 1);
  sliderS.position((innerWidth * 0.58),(innerHeight * 0.46));
  sliderS.style('transform', 'rotate(270deg)');
  sliderS.style('height', '5px');
  sliderS.addClass('sliderS');
  
  sliderD = createSlider(0.05, 10, 0.1);
  sliderD.position((innerWidth * 0.61),(innerHeight * 0.46));
  sliderD.style('transform', 'rotate(270deg)');
  sliderD.style('height', '5px');
  sliderD.addClass('sliderD');

  sliderR = createSlider(0, 20, 0.1);
  sliderR.position((innerWidth * 0.64),(innerHeight * 0.46));
  sliderR.style('transform', 'rotate(270deg)');
  sliderR.style('height', '5px');
  sliderR.addClass('sliderR');

// Rotate and Translate Rules/Values
  angleMode(DEGREES);
}

// DRAW
function draw() {
  let c1 = color(20);
  let c2 = color(30, 30, 30, 0);
  for(let y = 0; y < height; y++) {
    g = map(y, 0, (height - (height / 1.35)), 0, 1);
    let newc = lerpColor(c1, c2, g);
    stroke(newc);
    line(0 , y, width, y);
  }

// FPS
  frameRate(30);

// oscilloscope LOOP
let fftwave = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0);
  for (let i = 0; i < fftwave.length; i++){
    let x = map(i, 0, fftwave.length, (innerWidth - (innerWidth * 0.53)), (innerWidth - (innerWidth * 0.95)));
    let y = map(fftwave[i], -1, 1, 50, 150);
    vertex(x,y);
  }
  endShape();

// ASDR Envelope 
  env.setADSR(sliderA.value(),sliderS.value(),sliderD.value(),sliderR.value());

// Volume  
  outputVolume(sliderV.value());

// Shape Generation
  // Background
  fill(0, 0, 0, 0);
  stroke('red');
  strokeWeight(2);
  rect(((innerWidth / 2) - (width * 0.85)), ((innerHeight / 2) - (height * 0.19)), ((innerWidth / 3) - (width * 0.2)), ((innerHeight / 2 - (height * 0.001))));

  // // Clipping Mask
  // push();
  // clip(mask);
  // noFill();
  // rect(((innerWidth / 2) - (width * 0.85)), ((innerHeight / 2) - (height * 0.19)), ((innerWidth / 3) - (width * 0.2)), ((innerHeight / 2 - (height * 0.001))));

  // // Draw Shapes
  // frameRate(10);
  // let xPos = random(50, width / 2);
  // let yPos = random(300, ((height / 2) + (height / 2)));
  // let scale = random(25, 100);
  // beginShape();
  // noFill();
  // circle(xPos, yPos, scale);
  // endShape();

  // // End Shape
  // // End Mask 
  // pop();
}
  // Clip Function
    function mask() {
    strokeWeight(1.5);
      rect(((innerWidth / 2) - (width * 0.85) + 3), ((innerHeight / 2) - (height * 0.19) + 3), ((innerWidth / 3) - (width * 0.2) - 6), ((innerHeight / 2 - (height * 0.001)) - 6));
    }

// Keyboard
function keyPressed(){
  // Clipping Mask
  push();
  clip(mask);
  fill(0,0,0,0);
  rect(((innerWidth / 2) - (width * 0.85)), ((innerHeight / 2) - (height * 0.19)), ((innerWidth / 3) - (width * 0.2)), ((innerHeight / 2 - (height * 0.001))));
  // Draw Shapes
  frameRate(20);

  let xPos = random(50, width / 2);
  let yPos = random(300, ((height / 2) + (height / 2)));
  let scale = random(25, 100);
  beginShape();
  noFill();
  circle(xPos, yPos, scale);
  circle(xPos, yPos, scale * 3);
  endShape();
  // End Shape
  // End Mask 
  pop();
  
  // Keys
  if  (key === 'a') {
  osc.start();
  env.triggerAttack();
  osc.freq(261.63);
  } 
  else if  (key === 's') {
  osc.start();
  env.triggerAttack();
  osc.freq(293.66);
  } 
  else if  (key === 'd') {
  osc.start();
  env.triggerAttack();
  osc.freq(329.63);
  } 
  else if  (key === 'f') {
  osc.start();
  env.triggerAttack();
  osc.freq(349.23);
  } 
  else if  (key === 'g') {
  osc.start();
  env.triggerAttack();
  osc.freq(392);
  } 
  else if  (key === 'h') {
  osc.start();
  env.triggerAttack();
  osc.freq(440);
  } 
  else if  (key === 'j') {
  osc.start();
  env.triggerAttack();
  osc.freq(493.88);
  } 
  else if  (key === 'k') {
  osc.start();
  env.triggerAttack();
  osc.freq(523.25);
  }  
  else if  (key === 'l') {
  osc.start();
  env.triggerAttack();
  osc.freq(587.33);
  }   
  else if  (key === 'z') {
  osc.start();
  env.triggerAttack();
  osc.freq(130.81);
  }   
  else if  (key === 'x') {
  osc.start();
  env.triggerAttack();
  osc.freq(146.83);
  }  
  else if  (key === 'c') {
  osc.start();
  env.triggerAttack();
  osc.freq(164.81);
  }    
  else if  (key === 'v') {
  osc.start();
  env.triggerAttack();
  osc.freq(174.61);
  }   
  else if  (key === 'b') {
  osc.start();
  env.triggerAttack();
  osc.freq(196);
  }  
  else if  (key === 'n') {
  osc.start();
  env.triggerAttack();
  osc.freq(220);
  }   
  else if  (key === 'm') {
  osc.start();
  env.triggerAttack();
  osc.freq(246.94);
  }   
  else if  (key === ',') {
  osc.start();
  env.triggerAttack();
  osc.freq(261.63);
  }   
  // Octave Down
  else if  (key === 'A') {
  osc.start();
  env.triggerAttack();
  osc.freq(130.81);
  } 
  else if  (key === 'S') {
  osc.start();
  env.triggerAttack();
  osc.freq(146.83);
  } 
  else if  (key === 'D') {
  osc.start();
  env.triggerAttack();
  osc.freq(164.81);
  } 
  else if  (key === 'F') {
  osc.start();
  env.triggerAttack();
  osc.freq(174.61);
  } 
  else if  (key === 'G') {
  osc.start();
  env.triggerAttack();
  osc.freq(196);
  } 
  else if  (key === 'H') {
  osc.start();
  env.triggerAttack();
  osc.freq(220);
  } 
  else if  (key === 'J') {
  osc.start();
  env.triggerAttack();
  osc.freq(246.94);
  } 
  else if  (key === 'K') {
  osc.start();
  env.triggerAttack();
  osc.freq(261.63);
  }  
  else if  (key === 'L') {
  osc.start();
  env.triggerAttack();
  osc.freq(293.66);
  }   
  else if  (key === 'Z') {
  osc.start();
  env.triggerAttack();
  osc.freq(65.41);
  }   
  else if  (key === 'X') {
  osc.start();
  env.triggerAttack();
  osc.freq(73.42);
  }  
  else if  (key === 'C') {
  osc.start();
  env.triggerAttack();
  osc.freq(82.41);
  }    
  else if  (key === 'V') {
  osc.start();
  env.triggerAttack();
  osc.freq(87.31);
  }   
  else if  (key === 'B') {
  osc.start();
  env.triggerAttack();
  osc.freq(98);
  }  
  else if  (key === 'N') {
  osc.start();
  env.triggerAttack();
  osc.freq(110);
  }   
  else if  (key === 'M') {
  osc.start();
  env.triggerAttack();
  osc.freq(123.47);
  }   
  // Sharps and Flats
  else if  (key === 'w') {
  osc.start();
  env.triggerAttack();
  osc.freq(277.18);
  } 
  else if  (key === 'e') {
  osc.start();
  env.triggerAttack();
  osc.freq(311.13);
  } 
  else if  (key === 't') {
  osc.start();
  env.triggerAttack();
  osc.freq(369.99);
  } 
  else if  (key === 'y') {
  osc.start();
  env.triggerAttack();
  osc.freq(415.3);
  } 
  else if  (key === 'u') {
  osc.start();
  env.triggerAttack();
  osc.freq(466.16);
  } 
  else if  (key === 'o') {
  osc.start();
  env.triggerAttack();
  osc.freq(554.37);
  } 
  else if  (key === 'p') {
  osc.start();
  env.triggerAttack();
  osc.freq(622.25);
  } 
  else if  (key === 'W') {
  osc.start();
  env.triggerAttack();
  osc.freq(138.59);
  } 
  else if  (key === 'E') {
  osc.start();
  env.triggerAttack();
  osc.freq(155.56);
  } 
  else if  (key === 'T') {
  osc.start();
  env.triggerAttack();
  osc.freq(185);
  }  
  else if  (key === 'Y') {
  osc.start();
  env.triggerAttack();
  osc.freq(207.65);
  }   
  else if  (key === 'U') {
  osc.start();
  env.triggerAttack();
  osc.freq(233.08);
  }  
  else if  (key === 'O') {
  osc.start();
  env.triggerAttack();
  osc.freq(277.18);
  }  
  else if  (key === 'P') {
  osc.start();
  env.triggerAttack();
  osc.freq(311.13);
  } 
}

// waveforms
function typeSine() {
  osc.setType('sine');
}
function typeSquare() {
  osc.setType('square');
}
function typeTri() {
  osc.setType('triangle');
}
function typeSaw() {
  osc.setType('sawtooth');
}


// End Osc
function keyReleased(){
  env.triggerRelease();
}

// Resize
function windowResized() { 
    resizeCanvas((windowWidth - (windowWidth * 0.47)), (windowHeight - (windowHeight * 0.1)));

    btna.position((innerWidth * 0.32),(innerHeight * 0.31));
    btnb.position((innerWidth * 0.42),(innerHeight * 0.31));
    btnc.position((innerWidth * 0.52),(innerHeight * 0.31));
    btnd.position((innerWidth * 0.62),(innerHeight * 0.31));

    sliderV.position((innerWidth * 0.51),(innerHeight * 0.46));
    sliderA.position((innerWidth * 0.55),(innerHeight * 0.46));
    sliderS.position((innerWidth * 0.58),(innerHeight * 0.46));
    sliderD.position((innerWidth * 0.61),(innerHeight * 0.46));
    sliderR.position((innerWidth * 0.64),(innerHeight * 0.46));

    let fftwave = fft.waveform();
      noFill();
      beginShape();
      stroke(255,0,0);
      for (let i = 0; i < fftwave.length; i++){
      let x = map(i, 0, fftwave.length, (innerWidth - (innerWidth * 0.53)), (innerWidth - (innerWidth * 0.95)));
      let y = map(fftwave[i], -1, 1, 50, 150);
      vertex(x,y);
    }
    endShape();

} 




 