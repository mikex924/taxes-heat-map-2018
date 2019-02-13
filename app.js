let pixel = 3;

let width = 200;
let height = 120;

let income_min = 1000;
let income_max = 1000000;

function setup() {
    createCanvas(pixel * width, pixel * height);

    background(220);

    drawPixel(50, 20);
}

function drawPixel(x, y) {
    let joint_income = income_min + (income_max - income_min) * x / (width - 1);
    let split = 100 - 50 * y / (height - 1);
    let income1 = joint_income * split / 100;
    let income2 = joint_income * (1 - split / 100);

    console.log(getSingleTax(1000));

    let c = color(255, 0, 0);
    stroke(c);
    fill(c);

    rect(x * pixel, y * pixel, pixel, pixel);
}

let rates = [10, 12, 22, 24, 32, 35, 37];
let single_brackets = [];
let married_brackets = [];

function getSingleTax(income) {
}

function getMarriedTax(income) {
}

function draw() {
}
