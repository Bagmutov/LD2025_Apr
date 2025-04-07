import { ResourceType } from "./resource";

export class Inventory {
  countOfResources: Record<ResourceType, number> = {
    [ResourceType.gold]: 0,
    [ResourceType.iron]: 0,
  };

  addResource(res: ResourceType, count: number): void {
    let curValue = this.countOfResources[res] || 0;
    this.countOfResources[res] = curValue + count;
  }

  moveResourceFromOtherInventory(other: Inventory, persent: number = 1): void {
    for (const res of Object.keys(this.countOfResources)) {
      let curValue = this.countOfResources[res];
      this.countOfResources[res] = curValue + Math.ceil(other.countOfResources[res]*persent);
      other.countOfResources[res] = Math.floor(other.countOfResources[res] * (1 - persent));
    }
  }

  canPay(reqResources: Map<ResourceType, number>): boolean {
    let result = true;
    for (const keyVal of reqResources) {
      let resource = keyVal[0];
      let reqNumber = keyVal[1];
      let availableNumber = this.countOfResources[resource] || 0;
      result = result && availableNumber >= reqNumber;
    }
    return result;
  }

  pay(reqResources: Map<ResourceType, number>): void {
    for (const keyVal of reqResources) {
      let resource = keyVal[0];
      let reqNumber = keyVal[1];
      this.addResource(resource, -reqNumber);
    }
  }
  addResoursesMap(reqResources: Map<ResourceType, number>): void {
    for (const keyVal of reqResources) {
      let resource = keyVal[0];
      let count = keyVal[1];
      this.addResource(resource, count);
    }
  }
}