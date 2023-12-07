export interface MyOrder {
  id: number;
  totalPrice: number;
  items: {
    name: string;
    material: string;
    color: string;
    img: string;
    price: number;
    size: string;
  }[];
  services: {
    name: string;
    price: number;
  }[];
}
