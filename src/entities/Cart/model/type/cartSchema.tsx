export interface CartSchema {
  isLoading: boolean;
  error?: string;
  data?: []
  totalAmount?: number;
  totalPrice?: number;
}