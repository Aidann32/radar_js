// Класс точки описывающий точку отображаемую на радаре
function Point(x, y, distance) {
    this.x = x;
    this.y = y;
    this.distance = distance;
    this.display = function() {
        stroke("white");
        point(this.x, this.y);
    }

    //xm- x to move
    //ym- y to move
    this.move = function(xm, ym) {
        this.x = xm;
        this.y = ym;
    }
}


// ФУНКЦИИ
//////////////////////////////////////////////

//Функция для получения значений с полей ввода
function getInputValue(first_id, second_id) {
    let angle = document.getElementById(first_id).value;
    let distance = document.getElementById(second_id).value;
    return [angle, distance];
}

//Перевод из Декартовой системы координат в текстовую систему координат
function convertToTextCoord(angle, dist, width, height) {
    let deg_to_rad = 0.0174533;
    let x = width / 2 + (Math.cos((90 - angle) * deg_to_rad) * dist);
    let y = height / 2 - (Math.cos(angle * deg_to_rad) * dist);
    return [x, y];
}

//Перерисовка холста
function clearCanvas(axis_weight) {
    clear();
    background(0);
    strokeWeight(axis_weight);
    stroke(255, 255, 255);
    line(0, height / 2, width, height / 2);
    line(width / 2, 0, width / 2, height);
}


//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
////////////////////////////////////////
let scale = 1;
let axis_weight = 2;
let point_weight = 5;
let angle;
let distance;
let abs_distance;
let radius = 20000;

//Массив с точками на холсте
let points = [];

// ЗАПУСК СТРАНИЧКИ(Начальная настройка проекта)
//////////////////////////////////////////////
window.onload = function() {
    document.getElementById('radius').innerHTML = `Radius is ${radius}`;
};

function setup() {
    //Холст
    let myCanvas = createCanvas(500, 500);
    background(0);

    // Кнопка для отрисовки новых точек
    let button = createButton("Enter");

    //Кнопки для масштаба
    let btn_minus = createButton("–");
    let btn_plus = createButton("+");

    // Поместил элементы внутрь контейнеров
    button.parent('btn_container');
    btn_minus.parent('scale_btn_containers');
    btn_plus.parent('scale_btn_containers');
    myCanvas.parent('canvas_container');

    // Задание кнопкам масштабирования классов для применения стилей
    btn_plus.class('scale_buttons');
    btn_minus.class('scale_buttons');

    // ОБРАБОТЧИКИ СОБЫТИЙ
    btn_minus.mousePressed(function() {
        if ((scale <= 5) && (scale > 1)) {
            scale -= 1;
            axis_weight -= 2;
            point_weight -= 5;
            radius += 4000;
            document.getElementById('radius').innerHTML = `Radius is ${radius}`;
            let x, y;
            clearCanvas(axis_weight);
            for (let i = 0; i < points.length; i++) {
                clearCanvas(axis_weight);
                points[i].weight = point_weight;
                points[i].distance /= 1.497;
                x = convertToTextCoord(angle, points[i].distance, width, height)[0];
                y = convertToTextCoord(angle, points[i].distance, width, height)[1];
                points[i].move(x, y);
            }
        }
        console.log(scale);

    });

    btn_plus.mousePressed(function() {
        if ((scale < 5) && (scale > 0)) {
            scale += 1;
            axis_weight += 2;
            point_weight += 5;
            radius -= 4000;
            document.getElementById('radius').innerHTML = `Radius is ${radius}`;
            let x, y;
            for (let i = 0; i < points.length; i++) {
                clearCanvas(axis_weight);
                points[i].weight = point_weight;
                points[i].distance *= 1.497;
                x = convertToTextCoord(angle, points[i].distance, width, height)[0];
                y = convertToTextCoord(angle, points[i].distance, width, height)[1];
                points[i].move(x, y);
            }
        }
    });

    button.mousePressed(function() {
        angle = getInputValue("angle-input", "distance-input")[0];
        distance = getInputValue("angle-input", "distance-input")[1];
        abs_distance = distance / 80;
        let x = convertToTextCoord(angle, abs_distance, width, height)[0];
        let y = convertToTextCoord(angle, abs_distance, width, height)[1];
        points = [];
        points.push(new Point(x, y, abs_distance));
        console.log(points);
        redraw();
    });
}


// ГЛАВНАЯ ФУНКЦИЯ(ФУНКЦИЯ ОТРИСОВКИ)
/////////////////////////////////////////////
function draw() {
    //Толщина, цвет и координаты двух осей(х и у)
    strokeWeight(axis_weight);
    stroke(255, 255, 255);
    line(0, height / 2, width, height / 2);
    line(width / 2, 0, width / 2, height);
    for (let i = 0; i < points.length; i++) {
        points[i].display();
    }
}