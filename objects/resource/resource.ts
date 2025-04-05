export class Resource {
    name : string
    value : number
    timeToGet : number

    constructor(name : string, value : number, timeToGet : number) {
        this.name = name
        this.value = value
        this.timeToGet = timeToGet
    }
}