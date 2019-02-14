let pixel = 3;

let width = 300;
let height = 150;

let income_min = 1000;
let income_max = 1000000;

let rates = [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];
let single_brackets = [9525, 38700, 82500, 157500, 200000, 500000];
let married_brackets = [19050, 77400, 165000, 315000, 400000, 600000];

let income_data = [];
let bonus_data = [];

function setup() {
    createCanvas(pixel * width, pixel * height);

    single_brackets = adjust(single_brackets);
    married_brackets = adjust(married_brackets);

    for (let x = 0; x < width; x++) {

        income_data[x] = [];
        bonus_data[x] = [];

        for (let y = 0; y < height; y++) {
            drawPixel(x, y);
        }
    }
}

function adjust(brackets) {
    adjusted = []
    for (let i = 0; i < brackets.length; i++) {
        if (i === 0) {
            adjusted.push(brackets[i]);
        } else {
            adjusted.push(brackets[i] - brackets[i - 1]);
        }
    }
    return adjusted;
}

function drawPixel(x, y) {
    let joint_income = income_min + (income_max - income_min) * x / (width - 1);
    let married_tax = getMarriedTax(joint_income);

    let split = 100 - 50 * y / (height - 1);
    let income1 = joint_income * split / 100;
    let income2 = joint_income * (1 - split / 100);
    let tax1 = getSingleTax(income1);
    let tax2 = getSingleTax(income2);

    let bonus = (tax1 + tax2) - married_tax;
    bonus = Math.round(bonus);

    let r = 0;
    let g = 0;
    let b = 0;

    if (bonus > 0) {
        g = 100 + Math.ceil(bonus / 3000) * 20;
    } else if (bonus < 0) {
        r = 100 + Math.ceil(bonus / -1000) * 20;
    }

    let c = color(r, g, b);
    stroke(c);
    fill(c);

    rect(x * pixel, y * pixel, pixel, pixel);

    income_data[x][y] = Math.round(joint_income);
    bonus_data[x][y] = bonus;
}

function getSingleTax(income) {
    return getIncomeTax(income, single_brackets);
}

function getMarriedTax(income) {
    return getIncomeTax(income, married_brackets);
}

function getIncomeTax(income, brackets) {
    let tax = 0;
    for (const [i, bracket] of brackets.entries()) {
        let rate = rates[i];
        if (income <= bracket) {
            return tax + income * rate;
        }
        tax += bracket * rate;
        income -= bracket;
    }
    return tax + income * rates[rates.length - 1];
}

function draw() {
    stroke(255);
    fill(255);
    rect(0, 0, 45 * pixel, 12 * pixel);

    fill(0);
    textSize(5 * pixel);

    let x = Math.round(mouseX / pixel);
    let y = Math.round(mouseY / pixel);

    if (income_data[x] && income_data[x][y]) {
        text('income: $' + income_data[x][y], pixel, 5 * pixel);
    }
    if (bonus_data[x] && bonus_data[x][y]) {
        text('bonus: $' + bonus_data[x][y], pixel, 10 * pixel);
    }
}
