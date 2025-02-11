//Vars
let osc, playing, freq, amp, env;
let distort, reverb, delay, filt;
let btna, btnb, btnc, btnd, btne;
let fft;
let sliderA, sliderD, sliderS, sliderR, sliderV, sliderDist, sliderFreq, sliderRes, sliderRev, sliderDelay, sliderDelayTime;
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
  distort = new p5.Distortion();
  reverb = new p5.Reverb();
  delay = new p5.Delay();
  filt = new p5.Filter();    
}

function setup() {
  createCanvas((windowWidth - (windowWidth * 0.47)), (windowHeight - (windowHeight * 0.1)));
  // Alert
   window.alert("KEYBOARD LAYOUT: \nCAPS Z - M = Cmaj (Lowest Octave) \nz - ',' = Cmaj (Mid Range) \na - l = Cmaj (Higher Octave) \nw, e, t, y, u, o, p = sharps & flats at respective octaves. \n* CAPS LOCK WILL LOWER ALL NOTES ONE OCTAVE \n* PRESS '?' AT ANY TIME TO RETURN TO THIS KEY");
  //BG Gradient
  let c1 = color(200);
  let c2 = color(100);
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
  btna.style('background-color', 'dodgerblue');
  btna.style('color', '#fff');
    
  btnb = createButton('SQUARE');
  btnb.mousePressed(typeSquare);
  btnb.position((innerWidth * 0.42),(innerHeight * 0.31));
  btnb.size(100,25);
  btnb.style('background-color', 'dodgerblue');
  btnb.style('color', '#fff');

  btnc = createButton('TRIANGLE');
  btnc.mousePressed(typeTri);
  btnc.position((innerWidth * 0.52),(innerHeight * 0.31));
  btnc.size(100,25);
  btnc.style('background-color', 'dodgerblue');
  btnc.style('color', '#fff');

  btnd = createButton('SAWTOOTH');
  btnd.mousePressed(typeSaw);
  btnd.position((innerWidth * 0.62),(innerHeight * 0.31));
  btnd.size(100,25);
  btnd.style('background-color', 'dodgerblue');
  btnd.style('color', '#fff');

// Vol/ADSR SliderS

  sliderV = createSlider(0, 1, 0.6, 0.01);
  sliderV.position((innerWidth * 0.51),(innerHeight * 0.46));
  sliderV.style('transform', 'rotate(270deg)');
  sliderV.style('height', '5px');
  sliderV.addClass('sliderV');

  sliderA = createSlider(0, 5, 0, 0.01);
  sliderA.position((innerWidth * 0.55),(innerHeight * 0.46));
  sliderA.style('transform', 'rotate(270deg)');
  sliderA.style('height', '5px');
  sliderA.addClass('sliderA');
    
  sliderS = createSlider(0, 10, 1, 0.1);
  sliderS.position((innerWidth * 0.58),(innerHeight * 0.46));
  sliderS.style('transform', 'rotate(270deg)');
  sliderS.style('height', '5px');
  sliderS.addClass('sliderS');
  
  sliderD = createSlider(0.05, 10, 0.1, 0.01);
  sliderD.position((innerWidth * 0.61),(innerHeight * 0.46));
  sliderD.style('transform', 'rotate(270deg)');
  sliderD.style('height', '5px');
  sliderD.addClass('sliderD');

  sliderR = createSlider(0, 20, 0.1, 0.01);
  sliderR.position((innerWidth * 0.64),(innerHeight * 0.46));
  sliderR.style('transform', 'rotate(270deg)');
  sliderR.style('height', '5px');
  sliderR.addClass('sliderR');

  sliderDist = createSlider(0, 1, 0, 0.1);
  sliderDist.position((innerWidth * 0.55),(innerHeight * 0.64));
  sliderDist.style('transform', 'rotate(270deg)');
  sliderDist.style('height', '5px');
  sliderDist.addClass('sliderDist');
    
  sliderRev = createSlider(0, 1, 0.0, 0.1);
  sliderRev.position((innerWidth * 0.58),(innerHeight * 0.64));
  sliderRev.style('transform', 'rotate(270deg)');
  sliderRev.style('height', '5px');
  sliderRev.addClass('sliderRev');

  sliderDelay = createSlider(0, 1, 0, 0.01);
  sliderDelay.position((innerWidth * 0.61),(innerHeight * 0.64));
  sliderDelay.style('transform', 'rotate(270deg)');
  sliderDelay.style('height', '5px');
  sliderDelay.addClass('sliderDelay');

  sliderDelayTime = createSlider(0.05, 1, 0.33, 0.01);
  sliderDelayTime.position((innerWidth * 0.64),(innerHeight * 0.64));
  sliderDelayTime.style('transform', 'rotate(270deg)');
  sliderDelayTime.style('height', '5px');
  sliderDelayTime.addClass('sliderDelayTime');
  
  sliderFreq = createSlider(30, 22000, 17000, 0.01);
  sliderFreq.position((innerWidth * 0.54),(innerHeight * 0.83));
  sliderFreq.style('height', '5px');
  sliderFreq.addClass('sliderFreq');

  sliderRes = createSlider(0.001, 300, 0, 0.01);
  sliderRes.position((innerWidth * 0.54),(innerHeight * 0.77));
  sliderRes.style('height', '5px');
  sliderRes.addClass('sliderRes');

  // sliderPitch = createSlider(-12, 12, 0, 0.01);
  // sliderPitch.position((innerWidth * 0.64),(innerHeight * 0.77));
  // sliderPitch.style('height', '5px');
  // sliderPitch.addClass('sliderPitch');

  // sliderLfoTime = createSlider(0.001, 1000, 0, 0.01);
  // sliderLfoTime.position((innerWidth * 0.64),(innerHeight * 0.83));
  // sliderLfoTime.style('height', '5px');
  // sliderLfoTime.addClass('sliderLfoTime');

// Rotate and Translate Rules/Values
  angleMode(DEGREES);
}

// DRAW
function draw() {
  let c1 = color(100);
  let c2 = color(30, 30, 30, 0);
  for(let y = 0; y < height; y++) {
    g = map(y, 0, (height - (height / 1.35)), 0, 1);
    let newc = lerpColor(c1, c2, g);
    stroke(newc);
    line(0 , y, width, y);
  }

// FPS
  frameRate(5);

// oscilloscope LOOP
let fftwave = fft.waveform();
  noFill();
  beginShape();
  stroke(0, 150, 255);
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
// Distortion / Wave Shaper Connect
  distort.process(osc);
  distort.set(sliderDist.value(), '2x');
  distort.amp(sliderDist.value());
// Reverb Connect
  reverb.drywet(sliderRev.value());
// Delay Connect
  delay.process(osc, (sliderDelayTime.value()), (sliderDelay.value())); 
// Filter
  filt.process(osc, (sliderFreq.value()), (sliderRes.value()));
 

// Shape Generation
  // Background
  fill(25, 25, 25, 2);
  stroke(80, 80, 90);
  strokeWeight(3);
  rect(((innerWidth / 2) - (width * 0.85)), ((innerHeight / 2) - (height * 0.19)), ((innerWidth / 3) - (width * 0.2)), ((innerHeight / 2 - (height * 0.001))));

  // Clipping Mask
  push();
  clip(mask);
  noFill();
  rect(((innerWidth / 2) - (width * 0.85)), ((innerHeight / 2) - (height * 0.19)), ((innerWidth / 3) - (width * 0.2)), ((innerHeight / 2 - (height * 0.001))));

  // Draw Shapes
  let xPos = random(50, width / 2);
  let yPos = random(300, ((height / 2) + (height / 2)));
  let scale = random(25, 200);
  //Begin Shapes
  beginShape();
  noFill();
  stroke(random((115), (120)));
  strokeWeight(random(3, 25));
  point(xPos, yPos);
  line((xPos - 50), (yPos + 50), (xPos + 50), (yPos - 50));
  rect(xPos, yPos, scale, scale);
  endShape(); 
  // End Shape
  pop();
}  // End Mask 

  // Clip Function
    function mask() {
    stroke('dodgerblue'); 
    fill(0); 
    strokeWeight(1.5);
      rect(((innerWidth / 2) - (width * 0.85) + 3), ((innerHeight / 2) - (height * 0.19) + 3), ((innerWidth / 3) - (width * 0.2) - 6), ((innerHeight / 2 - (height * 0.001)) - 6));
    }

// Keyboard
function keyPressed(){
  // Clipping Mask
  push();
  clip(mask);
  fill(0, 0, 0, 2);
  rect(((innerWidth / 2) - (width * 0.85)), ((innerHeight / 2) - (height * 0.19)), ((innerWidth / 3) - (width * 0.2)), ((innerHeight / 2 - (height * 0.001))));
  // Draw Shapes
  

  let xPos = random(50, width / 2);
  let yPos = random(300, ((height / 2) + (height / 2)));
  let scale = random(30, 125);
  beginShape();
  noFill();
  strokeWeight(random(5, 15));
  circle(xPos, yPos, scale);
  strokeWeight(random(3, 10));
  circle(xPos, yPos, scale * 3);
  endShape();
  // End Shape
  // End Mask 
  pop();

  
  // Keys
  if  (key === 'a') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(261.63);
  } 
  else if  (key === 's') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(293.66);
  } 
  else if  (key === 'd') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(329.63);
  } 
  else if  (key === 'f') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(349.23);
  } 
  else if  (key === 'g') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(392);
  } 
  else if  (key === 'h') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(440);
  } 
  else if  (key === 'j') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(493.88);
  } 
  else if  (key === 'k') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(523.25);
  }  
  else if  (key === 'l') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(587.33);
  }   
  else if  (key === 'z') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(130.81);
  }   
  else if  (key === 'x') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(146.83);
  }  
  else if  (key === 'c') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(164.81);
  }    
  else if  (key === 'v') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(174.61);
  }   
  else if  (key === 'b') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(196);
  }  
  else if  (key === 'n') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(220);
  }   
  else if  (key === 'm') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(246.94);
  }   
  else if  (key === ',') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(261.63);
  }   
  // Octave Down
  else if  (key === 'A') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(130.81);
  } 
  else if  (key === 'S') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(146.83);
  } 
  else if  (key === 'D') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(164.81);
  } 
  else if  (key === 'F') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(174.61);
  } 
  else if  (key === 'G') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(196);
  } 
  else if  (key === 'H') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(220);
  } 
  else if  (key === 'J') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(246.94);
  } 
  else if  (key === 'K') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(261.63);
  }  
  else if  (key === 'L') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(293.66);
  }   
  else if  (key === 'Z') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(65.41);
  }   
  else if  (key === 'X') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(73.42);
  }  
  else if  (key === 'C') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(82.41);
  }    
  else if  (key === 'V') {
  osc.start();
reverb.process(osc, 10, 20);
  env.triggerAttack();
  osc.freq(87.31);
  }   
  else if  (key === 'B') {
  reverb.process(osc, 10, 20);
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
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(123.47);
  }   
  // Sharps and Flats
  else if  (key === 'w') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(277.18);
  } 
  else if  (key === 'e') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(311.13);
  } 
  else if  (key === 't') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(369.99);
  } 
  else if  (key === 'y') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(415.3);
  } 
  else if  (key === 'u') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(466.16);
  } 
  else if  (key === 'o') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(554.37);
  } 
  else if  (key === 'p') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(622.25);
  } 
  else if  (key === 'W') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(138.59);
  } 
  else if  (key === 'E') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(155.56);
  } 
  else if  (key === 'T') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(185);
  }  
  else if  (key === 'Y') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(207.65);
  }   
  else if  (key === 'U') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(233.08);
  }  
  else if  (key === 'O') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(277.18);
  }  
  else if  (key === 'P') {
  reverb.process(osc, 10, 20);
  osc.start();
  env.triggerAttack();
  osc.freq(311.13);
  } 
  else if (key === '/') {
    window.alert("KEYBOARD LAYOUT: \nCAPS Z - M = Cmaj (Lowest Octave) \nz - ',' = Cmaj (Mid Range) \na - l = Cmaj (Higher Octave) \nw, e, t, y, u, o, p = sharps & flats at respective octaves. \n* CAPS LOCK WILL LOWER ALL NOTES ONE OCTAVE \n* PRESS '?' AT ANY TIME TO RETURN TO THIS KEY");
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
    sliderDist.position((innerWidth * 0.55),(innerHeight * 0.64));
    sliderRev.position((innerWidth * 0.58),(innerHeight * 0.64));
    sliderDelay.position((innerWidth * 0.61),(innerHeight * 0.64));
    sliderDelayTime.position((innerWidth * 0.64),(innerHeight * 0.64));
    sliderFreq.position((innerWidth * 0.54),(innerHeight * 0.83));
    sliderRes.position((innerWidth * 0.54),(innerHeight * 0.77));
    

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




 