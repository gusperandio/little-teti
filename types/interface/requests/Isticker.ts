export interface IStickerRegister {
  name: string;
  imgUrl: string;
  description?: string | null;
  discount: number;
  active: boolean;
}

export interface IStickerUpdate {
  id: string;
  name: string | undefined;
  description: string | undefined;
  discount: number | undefined;
  active: boolean | undefined;
}

export interface IStickerAuth {
  id: number;
  auth: string;
  authUser: String;
}
