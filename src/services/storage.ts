import { Property, BannerAd, PropertyComment } from '../types';
import { INITIAL_PROPERTIES, INITIAL_BANNERS, INITIAL_COMMENTS } from '../data/initialData';

const PROPERTIES_KEY = 'm_nassar_properties_v1';
const BANNERS_KEY = 'm_nassar_banners_v1';
const COMMENTS_KEY = 'm_nassar_comments_v1';

export const WHATSAPP_NUMBER = '96176743414';
export const DISPLAY_PHONE = '76/743414';

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/m_nassar_real_estate?igsh=d2Q3cWFkajg3YXkx',
  facebook: 'https://www.facebook.com/share/1EodiJ6aNv/',
  tiktok: 'https://www.tiktok.com/@m_nassar_real_estate?_r=1&_t=ZS-987TzADVDMr',
  whatsapp: `https://wa.me/96176743414`
};

export const StorageService = {
  getProperties(): Property[] {
    const data = localStorage.getItem(PROPERTIES_KEY);
    if (!data) {
      localStorage.setItem(PROPERTIES_KEY, JSON.stringify(INITIAL_PROPERTIES));
      return INITIAL_PROPERTIES;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_PROPERTIES;
    }
  },

  saveProperties(properties: Property[]) {
    localStorage.setItem(PROPERTIES_KEY, JSON.stringify(properties));
  },

  addProperty(newProp: Omit<Property, 'id' | 'createdAt'>): Property {
    const properties = this.getProperties();
    const created: Property = {
      ...newProp,
      id: 'prop-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [created, ...properties];
    this.saveProperties(updated);
    return created;
  },

  updateProperty(id: string, updatedFields: Partial<Property>): Property[] {
    const properties = this.getProperties();
    const updated = properties.map(p => p.id === id ? { ...p, ...updatedFields } : p);
    this.saveProperties(updated);
    return updated;
  },

  deleteProperty(id: string): Property[] {
    const properties = this.getProperties();
    const updated = properties.filter(p => p.id !== id);
    this.saveProperties(updated);
    return updated;
  },

  getBanners(): BannerAd[] {
    const data = localStorage.getItem(BANNERS_KEY);
    if (!data) {
      localStorage.setItem(BANNERS_KEY, JSON.stringify(INITIAL_BANNERS));
      return INITIAL_BANNERS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_BANNERS;
    }
  },

  saveBanners(banners: BannerAd[]) {
    localStorage.setItem(BANNERS_KEY, JSON.stringify(banners));
  },

  getComments(): PropertyComment[] {
    const data = localStorage.getItem(COMMENTS_KEY);
    if (!data) {
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(INITIAL_COMMENTS));
      return INITIAL_COMMENTS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_COMMENTS;
    }
  },

  saveComments(comments: PropertyComment[]) {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  },

  addComment(comment: Omit<PropertyComment, 'id' | 'createdAt' | 'status'>): PropertyComment {
    const comments = this.getComments();
    const newComment: PropertyComment = {
      ...comment,
      id: 'c-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending' // requires admin approval or auto-approved
    };
    const updated = [newComment, ...comments];
    this.saveComments(updated);
    return newComment;
  },

  updateCommentStatus(id: string, status: 'approved' | 'rejected'): PropertyComment[] {
    const comments = this.getComments();
    const updated = comments.map(c => c.id === id ? { ...c, status } : c);
    this.saveComments(updated);
    return updated;
  },

  deleteComment(id: string): PropertyComment[] {
    const comments = this.getComments();
    const updated = comments.filter(c => c.id !== id);
    this.saveComments(updated);
    return updated;
  },

  getFavorites(): string[] {
    const data = localStorage.getItem('m_nassar_favorites_v1');
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  toggleFavorite(propertyId: string): string[] {
    const favorites = this.getFavorites();
    const exists = favorites.includes(propertyId);
    let updated: string[];
    if (exists) {
      updated = favorites.filter(id => id !== propertyId);
    } else {
      updated = [...favorites, propertyId];
    }
    localStorage.setItem('m_nassar_favorites_v1', JSON.stringify(updated));
    return updated;
  },

  isFavorite(propertyId: string): boolean {
    return this.getFavorites().includes(propertyId);
  },

  getAlerts(): any[] {
    const data = localStorage.getItem('m_nassar_alerts_v1');
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveAlert(alertData: { name: string; phone: string; region: string; propertyType: string; maxPrice?: string }): void {
    const alerts = this.getAlerts();
    const newAlert = {
      id: 'alert-' + Date.now(),
      ...alertData,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('m_nassar_alerts_v1', JSON.stringify([newAlert, ...alerts]));
  },

  getWhatsAppLink(property?: { id: string; title: string; price: number; location: string }): string {
    if (!property) {
      const msg = encodeURIComponent("مرحباً م. نصار العقارية، أود الاستفسار عن الخدمات والعقارات المتاحة لديكم.");
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    }
    const text = `مرحباً م. نصار العقارية 🌲\nأنا مهتم بالعقار التالي:\n- *العنوان:* ${property.title}\n- *الموقع:* ${property.location}\n- *السعر:* $${property.price.toLocaleString()}\n- *رمز العقار:* ${property.id}\nالرجاء تزويدي بمزيد من التفاصيل أو تحديد موعد للمعاينة.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }
};
