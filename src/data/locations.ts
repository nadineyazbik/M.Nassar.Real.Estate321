// Hierarchical locations and real estate taxonomy for M.Nassar Real Estate
// Based on exact regional divisions: Beirut (3 sectors) & Outside Beirut (Mount Lebanon & others)

export interface BeirutSector {
  id: string;
  name: string;
  subLocations: string[];
}

export const BEIRUT_SECTORS: BeirutSector[] = [
  {
    id: 'mazraa',
    name: 'المزرعة ومحيطها',
    subLocations: [
      'كورنيش المزرعة',
      'طريق الجديدة',
      'البربير',
      'قصقص',
      'راس النبع',
      'بشاره الخوري',
      'السوديكو',
      'العدلية',
      'الكولا',
      'بدارو',
      'المتحف',
      'عين الرمانة',
      'فرن الشباك',
      'الأشرفية',
      'الجناح'
    ]
  },
  {
    id: 'msaytbeh',
    name: 'المصيطبة ومحيطها',
    subLocations: [
      'مار الياس',
      'طلعة يزبك',
      'تلة الخياط',
      'فردان',
      'ساقية الجنزير',
      'عين التينة',
      'عائشة بكار',
      'كركول الدروز',
      'برج ابي حيدر',
      'بربور',
      'الظريف',
      'اونسكو',
      'وطى المصيطبة',
      'الزيدانية',
      'البسطة',
      'الهنداوي',
      'الباشورة',
      'حوض الولاية',
      'النويري',
      'الملا',
      'زقاق البلاط',
      'سليم سلام',
      'البطريركية'
    ]
  },
  {
    id: 'ras_beirut',
    name: 'راس بيروت ومحيطها',
    subLocations: [
      'الحمرا',
      'كراكاس',
      'القنطاري',
      'كليمنصو',
      'الروشة',
      'المنارة',
      'عين المريسة',
      'الرملة البيضاء',
      'قريطم',
      'الصنايع'
    ]
  }
];

export const OUTSIDE_BEIRUT_AREAS = [
  {
    id: 'mount_lebanon',
    name: 'جبل لبنان',
    subLocations: [
      'المتن (برمانا، بعبدات، بكفيا، ضبيه، أنطلياس)',
      'كسروان (جونيه، كفردبيان، طبرجا، ذوق مكايل)',
      'بعبدا (الحازمية، الفياضية، بعبدا، الحدث)',
      'عاليه وسوق الغرب',
      'الشوف (الدامور، الجية، دير القمر، بيت الدين)'
    ]
  },
  {
    id: 'other_regions',
    name: 'محافظات ومناطق أخرى',
    subLocations: [
      'الشمال وطرابلس',
      'الجنوب وصيدا وصور',
      'البقاع وزحلة'
    ]
  }
];

export const PROPERTY_TYPE_CATEGORIES = [
  {
    group: 'شقق سكنية',
    types: [
      { id: 'apartment', label: 'شقة سكنية' },
      { id: 'furnished_apartment', label: 'شقة مفروشة' },
      { id: 'duplex', label: 'دوبلكس / بنتهاوس' },
      { id: 'villa', label: 'فيلا مستقلة' },
      { id: 'chalet', label: 'شاليه بحري / جبلي' }
    ]
  },
  {
    group: 'عقار تجاري',
    types: [
      { id: 'shop', label: 'محل تجاري' },
      { id: 'warehouse', label: 'مستودع' },
      { id: 'office', label: 'مكتب تجاري' },
      { id: 'building', label: 'مبنى / عمارة كاملة' },
      { id: 'land', label: 'أرض استثمارية / بناء' }
    ]
  }
];

export const ALL_SUB_LOCATIONS = [
  ...BEIRUT_SECTORS.flatMap(s => s.subLocations),
  'برمانا', 'جونيه', 'الجية', 'الحازمية', 'الدامور', 'كفردبيان', 'المنصورية'
];
