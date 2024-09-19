export class Product {
  public _id: string;
  public title: string;
  public rating: number;
  public price: number;
  public unit: number;
  public images: string[];
  public description: string;
  public category: string;
  public stockQuantity?: number;
  constructor(
    _id: string,
    title: string,
    rating: number,
    price: number,
    images: string[],
    description: string,
    category: string,
    stockQuantity?: number
  ) {
    this._id = _id;
    this.title = title;
    this.rating = rating;
    this.price = price;
    this.unit = 1;
    this.description = description;
    this.category = category;
    this.stockQuantity = stockQuantity;
    this.images = images;
  }
}


// export class Product {
//   public id: number;
//   public title: string;
//   public rate: number;
//   public price: number;
//   public unit: number;
//   public images?: string[];
//   public description?: string;
//   public category?: {id: number, name: string, image: string };
//   constructor(
//     id: number,
//     title: string,
//     price: number,
//     unit: number,
//     images?: string[],
//     description?: string,
//     category?: {id: number, name: string, image: string },
//   ) {
//     this.id = id;
//     this.title = title;
//     this.rate = 9;
//     this.price = price;
//     this.unit = unit;
//     this.description = description;
//     this.category = category;
//     this.images = images;
//   }
// }


