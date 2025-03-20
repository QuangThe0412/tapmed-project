export interface ReviewType {
  id: number;
  productId: number;
  blogId: number;
  name: string;
  address?: string;
  avatar?: string;
  content?: string;
}
