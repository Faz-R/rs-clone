export interface ProductOpts {
  value: string;
  name: string;
  id?: number;
}

export interface ProductOptsArr {
  options: ProductOpts[];
  defaultValue: string;
  value: string | number;
  onChange: (e: string | number) => void;
}
