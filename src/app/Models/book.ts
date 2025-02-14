export interface Book {
    isbn: string;
    title: string;
    category: string;
    author: string[];
    cover?: string; 
    price: number;
    available: boolean;
  }
  