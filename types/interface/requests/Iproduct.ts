import { IProductSize } from "./IproductSize";
import { ITags } from "./Itags";

export interface IProduct { 
  name: string;
  description?: string | null;
  price: number;
  fakePrice: number;
  active: boolean;
  color: string;
  girl: boolean;
  sizes: IProductSize[];      
  tags: ITags[];   
  category: number;            
}