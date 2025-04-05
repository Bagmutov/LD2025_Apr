import { Inventory } from "../resource/inventory"

export class Building {
    level : number

    constructor() {
        this.level = 0
    }

    upgrade(inventory : Inventory) {
        this.level++
    }
}