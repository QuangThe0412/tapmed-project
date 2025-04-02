export interface ProductItemType {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  categoryId: number | null;
  imageUrls: string[] | null;
  producerId: number | null;
  weight: number | null;
  note: string | null;
  unit: string | null;
  createdAt: string;
  updatedAt: string;
}
