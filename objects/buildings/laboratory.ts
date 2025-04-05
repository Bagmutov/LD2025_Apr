import { Building } from "./building";
import { Upgrades } from "./upgrades";

export class Laboratory extends Building {
  UpgradesList = new Map<String, Upgrades>();

  constructor() {
    super();
  }

  draw() {
    // что-то рисует, если будем это делать
  }
}
