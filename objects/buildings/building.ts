import { Circle } from "../circle";
import { Planet } from "../planet";
import { Inventory } from "../resource/inventory"
import { Vector } from "../vector";

export class Building {
    level : number;
    resourse1 : number;
    resourse2 : number;
    coordinates: Vector;
    radius: number
    building_draw: Circle;



    constructor(coordinates: Vector, radius: number) {
        this.level = 1;
        this.coordinates = coordinates;
        this.radius = radius;


        const img = new Image();
        //img.decoding = "sync";
        //img.src = "house1";
        
        this.building_draw = new Circle(coordinates, (radius - 1), img);
    }

    tryUpgrade(inventory_resourse1_count: number, inventory_resourse2_count: number, ) {
        // проверка на ресурсы
        if ((inventory_resourse1_count >= this.resourse1) && (inventory_resourse2_count >= this.resourse2)) {
            this.level += 1;

            // TODO добавить оплату ресурсов с планеты

            // обновление картинки
            const img = new Image();
            img.decoding = "sync";
            img.src = "house2";
            
            this.building_draw = new Circle(this.coordinates, (this.radius - 1), img);
            return true;
        }
        else {
            return false;
        }
    }

    draw(dst: CanvasRenderingContext2D){
        // отрисовка строения
        this.building_draw.draw(dst);
    }

    doing(){
        // действие конкретного строения
    }



}