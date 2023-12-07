import {Product, Service} from "./cardCart";

export interface Cart {
  products: Product[];
  services: Service[];
}
