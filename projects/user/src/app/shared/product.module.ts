export class Product {
  public id: number;
  public title: string;
  public rate: number;
  public price: number;
  public unit: number;
  public images?: string[];
  public description?: string;
  public category?: {id: number, name: string, image: string };
  constructor(
    id: number,
    title: string,
    price: number,
    unit: number,
    images?: string[],
    description?: string,
    category?: {id: number, name: string, image: string },
  ) {
    this.id = id;
    this.title = title;
    this.rate = 9;
    this.price = price;
    this.unit = unit;
    this.description = description;
    this.category = category;
    this.images = images;
  }
}


