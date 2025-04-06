import { ResourceType } from "./resource";

export class Inventory {
  countOfResources: Record<ResourceType, number> = {
    [ResourceType.gold]: 100,
    [ResourceType.iron]: 100,
  }

  addResource(res: ResourceType, count: number): void {
    let curValue = this.countOfResources[res] || 0;
    this.countOfResources[res] = curValue + count;
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
}