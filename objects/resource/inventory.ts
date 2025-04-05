import { Resource } from "./resource";

export class Inventory {
    countOfResources = new Map<Resource, number>();

    constructor() {
        let stone = new Resource("stone", 1, 2)
        let wood = new Resource("wood", 1, 1)
        let iron = new Resource("iron", 3, 5)
        this.countOfResources.set(stone, 0)
        this.countOfResources.set(wood, 0)
        this.countOfResources.set(iron, 0)
    }

    addResource(res : Resource, count : number) {
        let curValue = this.countOfResources.get(res) || 0;
        this.countOfResources.set(res, curValue + count);
    }

    canPay(reqResources : Map<Resource, number>) {
        let result = true;
        for (const keyVal of reqResources) {
            let resource = keyVal[0];
            let reqNumber = keyVal[1];
            let availableNumber = this.countOfResources.get(resource);
            result = result && (availableNumber >= reqNumber);
        }
        return result;
    }

    raise(reqResources : Map<Resource, number>) {
        for (const keyVal of reqResources) {
            let resource = keyVal[0];
            let reqNumber = keyVal[1];
            this.addResource(resource, -reqNumber)
        }
    }
}