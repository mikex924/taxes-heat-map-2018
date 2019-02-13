let pixel = 3;

let width = 200;
let height = 120;

let income_min = 1000;
let income_max = 1000000;

function setup() {
    createCanvas(pixel * width, pixel * height);

    background(220);

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            drawPixel(x, y);
        }
    }
}

function drawPixel(x, y) {
    let joint_income = income_min + (income_max - income_min) * x / (width - 1);
    let married_tax = getMarriedTax(joint_income);

    let split = 100 - 50 * y / (height - 1);
    let income1 = joint_income * split / 100;
    let income2 = joint_income * (1 - split / 100);
    let tax1 = getSingleTax(income1);
    let tax2 = getSingleTax(income2);

    let diff = married_tax - (tax1 + tax2);

    let c = color(255, 0, 0);
    stroke(c);
    fill(c);

    rect(x * pixel, y * pixel, pixel, pixel);
}

let rates = [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];
let single_brackets = [9525, 38700, 82500, 157500, 200000, 500000];
let married_brackets = [19050, 77400, 165000, 315000, 400000, 600000];

function getSingleTax(income) {
    return getIncomeTax(income, single_brackets);
}

function getMarriedTax(income) {
    return getIncomeTax(income, married_brackets);
}

function getIncomeTax(income, brackets) {
    let tax = 0;
    let leftover = income;
    let previous_bracket = 0;
    for (const [i, bracket] of brackets.entries()) {
        let rate = rates[i];
        if (leftover + previous_bracket <= bracket) {
            return tax + leftover * rate;
        }
        tax += bracket * rate;
        leftover -= bracket;
        previous_bracket = bracket;
    }
    return tax + leftover * rates[rates.length - 1];
}

function draw() {
}
