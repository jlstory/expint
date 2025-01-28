//Vars
let osc, playing, freq, amp, env;
let btna, btnb, btnc, btnd;
let fft;
let sliderA, sliderD, sliderS, sliderR, sliderV;
let setShape = ['arc', 'rect', 'triangle'];


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
  createCanvas(1000, 800);
  background(0);
  
// oscilloscope
  fft = new p5.FFT();
  osc.connect(fft);

// wavform button group

  btna = createButton('SINE');
  btna.mousePressed(typeSine);
  btna.position(900,-650);
  btna.size(100,25);
    
  btnb = createButton('SQUARE');
  btnb.mousePressed(typeSquare);
  btnb.position(910,-650);
  btnb.size(100,25);

  btnc = createButton('TRIANGLE');
  btnc.mousePressed(typeTri);
  btnc.position(920,-650);
  btnc.size(100,25);

  btnd = createButton('SAWTOOTH');
  btnd.mousePressed(typeSaw);
  btnd.position(930,-650);
  btnd.size(100,25);

// Vol/ADSR SliderS

  sliderV = createSlider(0, 1, 1, 0.01);
  sliderV.position(584, -490);
  sliderV.style('transform', 'rotate(270deg)');
  sliderV.style('height', '5px');

  sliderA = createSlider(0, 5, 0);
  sliderA.position(557, -490);
  sliderA.style('transform', 'rotate(270deg)');
  sliderA.style('height', '5px');
    
  sliderS = createSlider(0, 10, 1);
  sliderS.position(475, -490);
  sliderS.style('transform', 'rotate(270deg)');
  sliderS.style('height', '5px');

  sliderD = createSlider(0.05, 10, 0.1);
  sliderD.position(395, -490);
  sliderD.style('transform', 'rotate(270deg)');
  sliderD.style('height', '5px');

  sliderR = createSlider(0, 20, 0.1);
  sliderR.position(318, -490);
  sliderR.style('transform', 'rotate(270deg)');
  sliderR.style('height', '5px');
  
}

function draw() {
  background('black');
// oscilloscope
  let spectrum = fft.analyze(); 
  noStroke();
  fill(160, 0, 0);
  for(let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, width, 0);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);
  }

let fftwave = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0);
  for (let i = 0; i < fftwave.length; i++){
    let x = map(i, 0, fftwave.length, 900, 100);
    let y = map(fftwave[i], -1, 1, 50, 150);
    vertex(x,y);
  }
  endShape();
// ASDR Envelope 
  env.setADSR(sliderA.value(),sliderS.value(),sliderD.value(),sliderR.value());
// Volume  
  outputVolume(sliderV.value());

// Labels
  fill('red');
  text('VOL', 586, 440);
  text('A', 695, 440);
  text('S', 745, 440);
  text('D', 795, 440);
  text('R', 845, 440);

// Shape Generation
  noFill();
  stroke('red');

}

// Keyboard
function keyPressed(){
  
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




 