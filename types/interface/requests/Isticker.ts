export interface IStickerRequest { 
  name: string;
  imgUrl: string;
  description?: string | null;    
  discount : number   
  active : boolean
}