export type RegionCategory = 'inside_beirut' | 'outside_beirut';

export type PropertyType = 
  | 'apartment'           // شقة سكنية
  | 'furnished_apartment' // شقة مفروشة
  | 'duplex'              // دوبلكس / بنتهاوس
  | 'villa'               // فيلا
  | 'shop'                // محل تجاري
  | 'warehouse'           // مستودع
  | 'office'              // مكتب
  | 'commercial'          // عقار تجاري عام
  | 'land'                // أرض
  | 'house'               // بيت مستقل
  | 'chalet'              // شاليه
  | 'building';           // مبنى / عمارة

export type TransactionType = 'sale' | 'rent';

export type PropertyStatus = 'active' | 'archived' | 'sold';

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string; // e.g. "الحمرا", "المصيطبة", "تلة الخياط", "طريق الجديدة", "المتن", etc.
  regionCategory: RegionCategory;
  sector?: string; // e.g. "msaytbeh", "mazraa", "ras_beirut", "mount_lebanon", "other"
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  areaSqM: number;
  status: PropertyStatus;
  transactionType: TransactionType;
  description: string;
  features: string[];
  images: string[];
  createdAt: string;
  featured?: boolean;
}

export interface PropertyComment {
  id: string;
  propertyId: string;
  propertyTitle?: string;
  userName: string;
  userPhone?: string;
  content: string;
  createdAt: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface BannerAd {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  active: boolean;
  badgeText?: string;
}

export interface FilterOptions {
  searchTerm: string;
  location: string;
  regionCategory: 'all' | RegionCategory;
  sector?: string; // 'all' | 'mazraa' | 'msaytbeh' | 'ras_beirut' | 'mount_lebanon'
  propertyType: string;
  transactionType: 'all' | TransactionType;
  minPrice: number | null;
  maxPrice: number | null;
  bedrooms: number | 'all';
  showArchivedOnly: boolean;
}
