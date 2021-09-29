function Point(x,y,weight,color,dist)
{
    this.x=x;
    this.y=y;
    this.weight=weight;
    this.distance=dist;
    this.display=function()
    {
        stroke(color); 
        strokeWeight(this.weight);
        stroke(color);        
        point(this.x,this.y);
    }
    this.move=function(x,y)
    {
        this.x=x;
        this.y=y;
    }
}
let points=[];

//Функция для получения значений с полей ввода
function getInputValue(first_id,second_id)
{
    let angle=document.getElementById(first_id).value;
    let distance=document.getElementById(second_id).value;
    return [angle,distance];
}

//Перевод из Декартовой системы координат в текстовую систему координат
function convert_to_text_coord(angle,dist,width,height)
{
    let deg_to_rad=0.0174533;
    let x=width/2+(Math.cos((90-angle)*deg_to_rad)*dist);
    let y=height/2-(Math.cos(angle*deg_to_rad)*dist);
    return [x,y];
}

// Настройка проекта
let scale=1;
let axis_weight=2;
let point_weight=5;
let angle;
let distance;
//absolute distance
let abs_distance;

let scale_to_compare;
function setup()
{
    // Кнопка для отрисовки новых точек
    let button=createButton("Enter");

    //Кнопки для масштаба
    let btn_minus=createButton("–");
    let btn_plus=createButton("+");
    
    // Поместил кнопку внутрь контейнера
    button.parent('btn_container');

    btn_minus.parent('scale_btn_containers'); 
    btn_plus.parent('scale_btn_containers');
    btn_plus.class('scale_buttons');
    btn_minus.class('scale_buttons');

    btn_minus.mousePressed(function(){
        if((scale<=5)&&(scale>1))
        {
             scale-=1;
             axis_weight-=2;
             point_weight-=5;
             redraw();
        }
        console.log(scale);
    
     });
    
     btn_plus.mousePressed(function(){
        if((scale<5)&&(scale>0))
        {
            scale+=1;
            axis_weight+=2;
            point_weight+=5;
            abs_distance=distance/80+(scale-1)*100;
            let x=convert_to_text_coord(angle,abs_distance,width,height)[0];
            let y=convert_to_text_coord(angle,abs_distance,width,height)[1];
            for(let i=0;i<points.length;i++)
            {
                points[i].distance+=100;
                points[i].weight=point_weight;
                x=convert_to_text_coord(angle,points[i].distance,width,height)[0];
                y=convert_to_text_coord(angle,points[i].distance,width,height)[1];
                points[i].move(x,y)
                points[i].weight=point_weight;            
            }
            redraw();
        }
        console.log(scale);
    });
    
    // Аналог Event Listener
    button.mousePressed(function(){
        angle=getInputValue("angle-input","distance-input")[0];
        distance=getInputValue("angle-input","distance-input")[1];
        abs_distance=distance/80+(scale-1)*100;
        let x=convert_to_text_coord(angle,abs_distance,width,height)[0];
        let y=convert_to_text_coord(angle,abs_distance,width,height)[1];
        points.push(new Point(x,y,point_weight,'white',abs_distance));
        redraw();
    });

    //Холст
    let myCanvas=createCanvas(500,500);

    //Поместил холст внутрь контейнера
    myCanvas.parent('canvas_container');
    background(0);

    //Отключение бесконечного цикла отрисовки 
    noLoop();
}  


function draw()
{
     //Толщина, цвет и координаты двух осей(х и у)
    strokeWeight(axis_weight);
    stroke(255, 255, 255);
    line(0,height/2,width,height/2); 
    line(width/2,0,width/2,height);
    for(let i=0;i<points.length;i++)
    {
        points[i].display();
    }
}



