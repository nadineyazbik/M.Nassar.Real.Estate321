import { Property, BannerAd, PropertyComment } from '../types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-101',
    title: 'شقة فاخرة 3 نوم مع إطلالة بحرية بانورامية في الحمرا',
    price: 320000,
    location: 'الحمرا - راس بيروت',
    regionCategory: 'inside_beirut',
    sector: 'ras_beirut',
    propertyType: 'apartment',
    bedrooms: 3,
    bathrooms: 3,
    areaSqM: 220,
    status: 'active',
    transactionType: 'sale',
    description: 'شقة فاخرة جداً في قلب الحمرا بالقرب من الجامعة الأمريكية والشارع الرئيسي. تشطيب مودرن سوبر ديلوكس، صالون وسفرة واسعة، مطبخ مجهز، مولد كهربائي 24/7 وموقف سيارة مسجل بالسند.',
    features: ['إطلالة بحرية', 'مولد كهرباء 24/7', 'موقف سيارة مسجل', 'مصعدين', 'تكييف مركزي', 'سند تمليك 2400 سهم'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    createdAt: '2026-07-25',
    featured: true
  },
  {
    id: 'prop-102',
    title: 'شقة واسعة 4 نوم مع شرفات كبيرة في المصيطبة - تلة الخياط',
    price: 240000,
    location: 'تلة الخياط - المصيطبة',
    regionCategory: 'inside_beirut',
    sector: 'msaytbeh',
    propertyType: 'apartment',
    bedrooms: 4,
    bathrooms: 3,
    areaSqM: 260,
    status: 'active',
    transactionType: 'sale',
    description: 'فرصة ممتازة في منطقة المصيطبة وتلة الخياط الراقية. شقة مساحة 260 م² تضم 4 غرف نوم، 3 حمامات، سفرة وصالون واسع، وموقفين للسيارات. بقعة ممتازة وقريبة من كافة الخدمات والمدارس.',
    features: ['موقفين سيارة', 'خزان ماء مستقل', 'بناء حديث', 'سند تمليك جاهز', 'موقع هادئ'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    createdAt: '2026-07-28',
    featured: true
  },
  {
    id: 'prop-103',
    title: 'محل تجاري واجهة عريضة على الشارع العام في كورنيش المزرعة',
    price: 180000,
    location: 'كورنيش المزرعة - المزرعة',
    regionCategory: 'inside_beirut',
    sector: 'mazraa',
    propertyType: 'shop',
    bedrooms: 0,
    bathrooms: 1,
    areaSqM: 85,
    status: 'active',
    transactionType: 'sale',
    description: 'محل تجاري استثماري مميز مع سدة على كورنيش المزرعة الرئيسي مباشرة. واجهة زجاجية عريضة موقع حيوي جداً ومناسب لكافة الأنشطة التجارية والمطاعم أو الصيدليات.',
    features: ['واجهة شارع رئيسي', 'سدة تجارية', 'موقع حيوي كثافة سكانية', 'سند ملكية تجاري'],
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
    ],
    createdAt: '2026-08-05',
    featured: true
  },
  {
    id: 'prop-104',
    title: 'مكتب تجاري فخم للإيجار مجهز بالكامل في السوديكو - المزرعة',
    price: 1200,
    location: 'السوديكو - المزرعة',
    regionCategory: 'inside_beirut',
    sector: 'mazraa',
    propertyType: 'office',
    bedrooms: 3,
    bathrooms: 2,
    areaSqM: 130,
    status: 'active',
    transactionType: 'rent',
    description: 'مكتب تجاري مؤثث ومجهز لشركات وعيادات في مجمع تجاري راقٍ في السوديكو. استقبال فخم، 3 غرف إدارية، مصاعد، أمن 24 ساعة، ومولد كهرباء متواصل.',
    features: ['مجهز بالكامل', 'أمن 24/7', 'مولد كهرباء', 'مواقف خاصة', 'قرب المحكمة والمتحف'],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    createdAt: '2026-08-08',
    featured: false
  },
  {
    id: 'prop-105',
    title: 'مستودع تجاري واسع للإيجار أو البيع في قصقص - طريق الجديدة',
    price: 1400,
    location: 'قصقص - طريق الجديدة',
    regionCategory: 'inside_beirut',
    sector: 'mazraa',
    propertyType: 'warehouse',
    bedrooms: 0,
    bathrooms: 1,
    areaSqM: 320,
    status: 'active',
    transactionType: 'rent',
    description: 'مستودع أرضي مساحة 320 م² سقف مرتفع مع مدخل شاحنات وتفريغ بضائع مريح في قصقص قرب طريق الجديدة. تهوية جيدة، إنارة كاملة ووصلات كهرباء 3 فاز.',
    features: ['مدخل شاحنات', 'سقف مرتفع 4.5م', 'كهرباء 3 فاز', 'أرضية خرسانية صناعية'],
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
    ],
    createdAt: '2026-08-10',
    featured: false
  },
  {
    id: 'prop-106',
    title: 'شقة للإيجار الشهري مفروشة مودرن في فردان - مار الياس',
    price: 1500,
    location: 'فردان - المصيطبة',
    regionCategory: 'inside_beirut',
    sector: 'msaytbeh',
    propertyType: 'furnished_apartment',
    bedrooms: 2,
    bathrooms: 2,
    areaSqM: 145,
    status: 'active',
    transactionType: 'rent',
    description: 'شقة مودرن مفروشة بالكامل أثاث جديد في فردان قرب المول والشارع التجاري. تكييف كامل، شرفة زجاجية، مولد، إنترنت سريع وموقف مخصص.',
    features: ['مفروشة بالكامل', 'موقف خاص', 'إنترنت سريع ومولد', 'موقع تسوق مميز'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    createdAt: '2026-08-12',
    featured: true
  },
  {
    id: 'prop-107',
    title: 'فيلا راقية دورين مع حديقة ومسبح في برمانا - المتن',
    price: 580000,
    location: 'برمانا - المتن',
    regionCategory: 'outside_beirut',
    sector: 'mount_lebanon',
    propertyType: 'villa',
    bedrooms: 5,
    bathrooms: 5,
    areaSqM: 480,
    status: 'active',
    transactionType: 'sale',
    description: 'فيلا فخمة ومستقلة إطلالة جبلية وبحرية ساحرة في برمانا. حديقة خاصة 300م²، مسبح خاص، كراج يسع 3 سيارات، تدفئة مركزية وحجر صخر لبناني أصيل.',
    features: ['حديقة خاصة', 'مسبح خاص', 'إطلالة كاشفة', 'تدفئة مركزية', 'حجر صخر لبناني', 'كراج 3 سيارات'],
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
    ],
    createdAt: '2026-07-20',
    featured: true
  },
  {
    id: 'prop-108',
    title: 'أرض استثمارية ممتازة للبيع في كفردبيان - كسروان',
    price: 450000,
    location: 'كفردبيان - كسروان',
    regionCategory: 'outside_beirut',
    sector: 'mount_lebanon',
    propertyType: 'land',
    bedrooms: 0,
    bathrooms: 0,
    areaSqM: 1200,
    status: 'active',
    transactionType: 'sale',
    description: 'قطعة أرض استثمارية مساحتها 1200 م² واجهة مطلة على المروج ومراكز التزلج. تصنيف إعمار ممتاز ومناسبة لبناء شاليهات أو مشروع سياحي.',
    features: ['تصنيف إعمار ممتاز', 'واجهة على الطريق العام', 'واصل كهرباء وماء', 'سند جاهز'],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    createdAt: '2026-07-15',
    featured: false
  },
  {
    id: 'prop-109',
    title: 'شقة لقطة 3 نوم في الروشة مع إطلالة بحرية صخرية',
    price: 290000,
    location: 'الروشة - راس بيروت',
    regionCategory: 'inside_beirut',
    sector: 'ras_beirut',
    propertyType: 'apartment',
    bedrooms: 3,
    bathrooms: 3,
    areaSqM: 185,
    status: 'active',
    transactionType: 'sale',
    description: 'شقة فاخرة خطوات من صخرة الروشة وكورنيش المنارة. طابق خامس، إطلالة مفتوحة، مصعد، حارس وموقف سيارة.',
    features: ['خطوات من كورنيش الروشة', 'مصعد إلكتروني', 'مولد للبناء', 'موقف مسجل'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80'
    ],
    createdAt: '2026-08-01',
    featured: false
  },
  {
    id: 'prop-110',
    title: 'مبنى تجاري واستثماري للبيع في البسطة - المصيطبة',
    price: 850000,
    location: 'البسطة - المصيطبة',
    regionCategory: 'inside_beirut',
    sector: 'msaytbeh',
    propertyType: 'building',
    bedrooms: 12,
    bathrooms: 8,
    areaSqM: 750,
    status: 'archived',
    transactionType: 'sale',
    description: 'عمارة استثمارية تتألف من 4 طوابق ومحلات تجارية على الشارع العام. تم بيع العقار وأرشفته.',
    features: ['محلات تجارية', 'شارع رئيسي', 'سند جاهز', 'عقار مؤرشف'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
    ],
    createdAt: '2026-06-10',
    featured: false
  }
];

export const INITIAL_BANNERS: BannerAd[] = [
  {
    id: 'banner-1',
    title: 'عقارات M.Nassar - اختيارك الأول في بيروت (المزرعة، المصيطبة، راس بيروت) والجبل',
    subtitle: 'نقدم لك أفضل الشقق السكنية والعقارات التجارية (محلات، مكاتب، مستودعات) بالسند الأخضر والتسهيلات المباشرة',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    active: true,
    badgeText: 'العرض الحصري'
  },
  {
    id: 'banner-2',
    title: 'شقق سكنية ومحلات ومكاتب للبيع وللإيجار بأسعار لقطة',
    subtitle: 'اتصل بنا مباشرة عبر واتساب للحصول على قائمة العروض والاستشارات المجانية',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    active: true,
    badgeText: 'فرص استثمارية'
  }
];

export const INITIAL_COMMENTS: PropertyComment[] = [
  {
    id: 'c-1',
    propertyId: 'prop-101',
    propertyTitle: 'شقة فاخرة 3 نوم مع إطلالة بحرية بانورامية في الحمرا',
    userName: 'أحمد الحسامي',
    userPhone: '+961 70 123 456',
    content: 'هل الشقة متوفرة للمعاينة يوم السبت القادم؟ وما هي قيمة الصيانة الشهرية للبناء؟',
    createdAt: '2026-07-28',
    status: 'approved'
  },
  {
    id: 'c-2',
    propertyId: 'prop-103',
    propertyTitle: 'محل تجاري واجهة عريضة على الشارع العام في كورنيش المزرعة',
    userName: 'طارق نصار',
    userPhone: '+961 71 889 900',
    content: 'هل المحل يتضمن رخصة تجارية مسبقة وهل السدة مرخصة بالسند؟',
    createdAt: '2026-08-06',
    status: 'approved'
  }
];
