let sketch = function (p) {
  let r1 = 70;
  let r2 = 85;
  let m1 = 7.5;
  let m2 = 13.3;
  let a1 = 0;
  let a2 = 0;
  let a1_v = 0;
  let a2_v = 0;
  let g = 1;

  let px2 = -1;
  let py2 = -1;
  let cx, cy;

  let buffer;
  let newWidth, newHeight, wrapper;

  p.setup = function () {
    wrapper = document.getElementById("wrapper");

    // window.addEventListener("resize", handleResize, false);

    newWidth = wrapper.getBoundingClientRect().width; // save initial values of width,height
    newHeight = wrapper.getBoundingClientRect().height;

    cnv = p.createCanvas(newWidth, newHeight);

    p.pixelDensity(1);
    a1 = p.PI / 2;
    a2 = p.PI / 2;
    cx = p.width / 2;
    cy = p.height / 2;
    buffer = p.createGraphics(p.width, p.height);
    buffer.background(175);
    buffer.translate(cx, cy);
  };

  p.draw = function () {
    p.background(175);

    p.imageMode(p.CORNER);
    p.image(buffer, 0, 0);

    let num1 = -g * (2 * m1 + m2) * Math.sin(a1);
    let num2 = -m2 * g * Math.sin(a1 - 2 * a2);
    let num3 = -2 * Math.sin(a1 - a2) * m2;
    let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1 - a2);
    let den = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
    let a1_a = (num1 + num2 + num3 * num4) / den;

    num1 = 2 * Math.sin(a1 - a2);
    num2 = a1_v * a1_v * r1 * (m1 + m2);
    num3 = g * (m1 + m2) * Math.cos(a1);
    num4 = a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2);
    den = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
    let a2_a = (num1 * (num2 + num3 + num4)) / den;

    p.translate(cx, cy);

    let x1 = r1 * Math.sin(a1);
    let y1 = r1 * Math.cos(a1);

    let x2 = x1 + r2 * Math.sin(a2);
    let y2 = y1 + r2 * Math.cos(a2);

    p.stroke("#A3E4D7 ");
    p.strokeWeight(1.5); // stroke for white lines
    p.line(0, 0, x1, y1);

    p.fill(0);
    p.ellipse(0, 0, 10, 10);
    p.ellipse(x1, y1, m1, m1);

    p.line(x1, y1, x2, y2);
    p.fill(0);
    p.ellipse(x2, y2, m2, m2);

    a1_v += a1_a;
    a2_v += a2_a;
    a1 += a1_v;
    a2 += a2_v;

    //a1_v *= 0.99
    //a2_v *= 0.99

    buffer.stroke(0);
    buffer.strokeWeight(0.6);
    if (p.frameCount > 1) {
      buffer.line(px2, py2, x2, y2);
    }

    px2 = x2;
    py2 = y2;
  };

  //----------------REACTIVITY----------------------------------------------------;

  p.windowResized = function () {
    // let wrapper = document.getElementById("wrapper");
    newWidth = wrapper.getBoundingClientRect().width; // save initial values of width,height
    newHeight = wrapper.getBoundingClientRect().height;

    console.log(newHeight);

    cx = newWidth / 2;
    cy = newHeight / 2;
    buffer.size(newWidth, newHeight).hide();
    buffer.translate(cx, cy);
    p.resizeCanvas(newWidth, newHeight);
  };

  //---------------------------------END REACTIVITY ----------------------------------------------
};
