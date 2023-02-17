/// <reference path="../../../typings/shared.d.ts" />

import { Usage } from "./Usage";
import { costLitre } from "./constants";

export class Dispenser {
  private _id: UniqueId;
  private _status: DispenserStatus;
  private _usages: Usage[] = [];

  private constructor(
    private _flowLitresPerSecond: number,
    private _costPerLitre: number
  ) {
    this._id = crypto.randomUUID();
    this._status = "closed";
  }

  static create(
    flowLitresPerSecond: number,
    costPerLitre = costLitre
  ): Dispenser {
    return new Dispenser(flowLitresPerSecond, costPerLitre);
  }

  open(dateTime: DateTimeString): void {
    const usage = new Usage(dateTime, this._flowLitresPerSecond);
    this._usages.push(usage);
    this._status = "open";
  }

  close(dateTime: DateTimeString): void {
    const lastUsageIndex = this.usages.length - 1;
    
    this.usages[lastUsageIndex].close(dateTime);
    this.usages[lastUsageIndex].calculateVolume(this._flowLitresPerSecond);
    this.usages[lastUsageIndex].calculateCost(this._costPerLitre);
    this._status = "closed";
  }

  totalAmount(): number {
    return this._usages.reduce((amount, usage) => {
      return amount + usage.spent;
    }, 0.0);
  }

  get id(): UniqueId {
    return this._id;
  }

  get status(): DispenserStatus {
    return this._status;
  }

  get flowVolume(): number {
    return this._flowLitresPerSecond;
  }

  get costPerLitre(): number {
    return this._costPerLitre;
  }

  get usages(): Usage[] {
    return this._usages;
  }
}
