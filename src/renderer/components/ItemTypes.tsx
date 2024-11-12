import { _get } from './APIconn';

export interface Product {
  id: string;
  type: string;
  name: string;
  description: string;
  current_stock: number;
  total_stock: number;
}

export const fetchUniqueTypes = async (): Promise<string[]> => {
  try {
    const response = await _get(`devices`);
    const data = response.data;
    const types = [...new Set(data.map((product: Product) => product.type))] as string[];
    return types;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};