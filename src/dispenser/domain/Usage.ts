export class Usage {
  private _openedAt: DateTimeString;
  private _closedAt: null | DateTimeString;
  private _flowLitresPerSecond: number;
  private _volume = 0;
  private _spent = 0;

  constructor(dateTime: DateTimeString, flowLitresPerSecond: number) {
    this._openedAt = dateTime;
    this._closedAt = null;
    this._flowLitresPerSecond = flowLitresPerSecond;
  }

  private getTimeDiff(): number {
    const openedAtSeconds = new Date(this._openedAt).getTime() / 1000;
    const closedAtSeconds =
      this._closedAt == null
        ? new Date().getTime() / 1000
        : new Date(this._closedAt).getTime() / 1000;

    return closedAtSeconds - openedAtSeconds;
  }

  calculateVolume(flowLitresPerSecond: number): void {
    this._volume = flowLitresPerSecond * this.getTimeDiff();
  }

  calculateCost(costPerLitre: number): void {
    this._spent = this._volume * costPerLitre;
  }

  close(dateTime: DateTimeString): void {
    this._closedAt = dateTime;
  }

  get spent(): number {
    return this._spent;
  }

  get flowVolume(): number {
    return this._flowLitresPerSecond;
  }

  get openedAt(): DateTimeString {
    return this._openedAt;
  }

  get closedAt(): null | DateTimeString {
    return this._closedAt;
  }
}
