import {
  ProductImage,
  ProductInfo,
  ProductInput,
  ProductPrice,
  ProductQuestion,
  ProductSeo,
} from "./Dashboard";

export interface CurrentUser {
  name?: string;
  email?: string;
  social_status?: boolean;
  balance?: number;
  role?: string;
  status?: boolean;
}

export interface DefaultState {
  currentUser: CurrentUser;
  setCurrentUser: (user: CurrentUser) => void;
  userToken: string | null;
  userEmail: string | null;
  setUserToken: (token: string) => void;
  setUserEmail: (email: string) => void;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

export interface Order {
  id: number | string;
  order_id: string;
  date: string;
  payment_status: string;
  payment_method: string;
  total_amount: string;
  currency: string;
}

export interface Category {
  id: number | string;
  category_en: string;
  category_fr: string;
  category_ar: string;
  image: string;
}

export interface Product {
  id: number | string;
  slug: string;
  title_en: string;
  title_ar: string;
  title_fr: string;
  description_en: string;
  description_fr: string;
  description_ar: string;
  image: string;
  availability: string;
  prices: ProductPrice;
}

export interface ProductDetails extends ProductInfo {
  images: ProductImage[];
  inputs: ProductInput[];
  seo: ProductSeo;
  questions: ProductQuestion[];
  prices: ProductPrice;
  comments: number;
  category: Category;
  rate: number;
  reviews: ProductReviews[];
}

export interface CartProduct {
  id: number | string;
  slug: string;
  title_en: string;
  title_ar: string;
  title_fr: string;
  image: string;
  prices: ProductPrice;
  data?: any;
}

export interface Wishlist {
  id: string | number;
  slug: string;
  title_en: string;
  title_ar: string;
  title_fr: string;
  image: string;
  prices: ProductPrice;
  category: Category;
}

export interface ProductReviews {
  id: string | number;
  review: string;
  username: string;
  email?: string;
  rate: number;
  averageRating?: number;
  date: string;
  title_product: {
    title_en: string;
    title_ar: string;
    title_fr: string;
  };
  publish?: boolean;
}

export interface Notification {
  id: string | number;
  title: string;
  message: string;
  date: string;
  read: any;
  user_name: string;
}
