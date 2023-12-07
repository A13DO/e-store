export class Product {
  public id: number;
  public name: string;
  public rate: number;
  public price: number;
  public unit: number;
  constructor(
    id: number,
    name: string,
    rate: number,
    price: number,
    unit: number
  ) {
    this.id = id;
    this.name = name;
    this.rate = rate;
    this.price = price;
    this.unit = unit;
  }
}


