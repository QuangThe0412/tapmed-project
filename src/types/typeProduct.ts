export interface ProductItemType {
  id: number;
  name: string;
  retail_price: number | null;
  wholesale_price: number | null;
  cost_price: number | null;
  category_id: number | null;
  product_id: number;
  weight: number | null;
  note: string | null;
  unit: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
