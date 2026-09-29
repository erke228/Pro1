import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aetheria.com' },
    update: {},
    create: {
      email: 'admin@aetheria.com',
      name: 'Admin',
      passwordHash,
      role: 'ADMIN',
    },
  });

  const products = [
    {
      title: 'Нейро-интерфейс Aetheria',
      slug: 'neural-link-x1',
      subtitle: 'Квантовый интерфейс для мозга',
      description: 'Испытайте бесшовное подключение к метавселенной с нашим нейро-интерфейсом нового поколения. Сверхнизкая задержка и квантовое шифрование.',
      price: 1299.00,
      stock: 50,
      category: 'Носимые Устройства',
      images: JSON.stringify(['https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop']),
      specs: JSON.stringify({ 'Батарея': '72 часа', 'Вес': '12 г', 'Подключение': 'Квантовое' }),
    },
    {
      title: 'Стелс-дрон Luxe Pro',
      slug: 'stealth-drone-pro',
      subtitle: 'Бесшумный, невидимый, вездесущий',
      description: 'Снимайте мир сверху с нулевым уровнем шума. Оснащен активным камуфляжем и режимами кинематографии на базе ИИ.',
      price: 2499.00,
      stock: 15,
      category: 'Аксессуары Дронов',
      images: JSON.stringify(['https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=1000&auto=format&fit=crop']),
      specs: JSON.stringify({ 'Дальность': '50 км', 'Скорость': '120 км/ч', 'Камера': '8K' }),
    },
    {
      title: 'Наушники Cyber Buds',
      slug: 'cyber-buds-omega',
      subtitle: 'Иммерсивное пространственное аудио',
      description: 'Наушники с настоящим пространственным звуком и активным шумоподавлением, которые идеально изолируют вас от физического мира.',
      price: 249.00,
      stock: 200,
      category: 'Наушники',
      images: JSON.stringify(['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop']),
      specs: JSON.stringify({ 'Батарея': '24 часа', 'Вес': '4 г', 'Защита': 'IP68' }),
    },
    {
      title: 'Умное Кольцо Aurora',
      slug: 'aurora-smart-ring',
      subtitle: 'Биометрический трекер в титановом корпусе',
      description: 'Идеальное носимое устройство для отслеживания жизненных показателей. Создано из аэрокосмического титана с неоновым LED-индикатором.',
      price: 450.00,
      stock: 100,
      category: 'Умные Кольца',
      images: JSON.stringify(['https://images.unsplash.com/photo-1610488663805-467618210332?q=80&w=1000&auto=format&fit=crop']),
      specs: JSON.stringify({ 'Материал': 'Титан', 'Датчики': 'Пульс, SpO2', 'Батарея': '7 дней' }),
    },
    {
      title: 'Наушники Chronos Elite',
      slug: 'chronos-elite',
      subtitle: 'Адаптивное гипер-шумоподавление',
      description: 'Полноразмерные наушники с двухрежимным подключением и ИИ-адаптацией к окружению для чистейшей звуковой изоляции.',
      price: 349.00,
      stock: 80,
      category: 'Наушники',
      images: JSON.stringify(['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop']),
      specs: JSON.stringify({ 'Динамики': '40мм Неодим', 'Батарея': '30 часов', 'Вес': '250 г' }),
    },
    {
      title: 'Подвес Gimbal Mod X',
      slug: 'gimbal-mod-pro',
      subtitle: 'Абсолютная стабилизация для камер',
      description: 'Модульный 3-осевой подвес, разработанный для идеальной кинематографической стабилизации.',
      price: 199.00,
      stock: 40,
      category: 'Аксессуары Дронов',
      images: JSON.stringify(['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop']), // Changed to a photo of a camera/lens/gimbal setup
      specs: JSON.stringify({ 'Оси': '3-Осевой', 'Совместимость': 'Универсальное крепление', 'Вес': '120 г' }),
    },
    {
      title: 'Кибер-рукав Armor',
      slug: 'cyber-armor-sleeve',
      subtitle: 'Компрессионная одежда с тактильной отдачей',
      description: 'Почувствуйте цифровой мир. Сплетен из синтетической бионики для обеспечения локализованной тактильной отдачи в VR-среде.',
      price: 450.00,
      stock: 60,
      category: 'Носимые Устройства',
      images: JSON.stringify(['https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1000&auto=format&fit=crop']),
      specs: JSON.stringify({ 'Моторы': '32 микро-гаптика', 'Материал': 'Графеновое плетение', 'Связь': 'Bluetooth 6.0' }),
    },
    {
      title: 'VR Перчатки Haptic',
      slug: 'haptic-vr-gloves',
      subtitle: 'Прикоснитесь к метавселенной',
      description: 'Взаимодействуйте с цифровыми объектами так, словно они реальны. Механизмы сопротивления имитируют вес и текстуру.',
      price: 599.00,
      stock: 30,
      category: 'Носимые Устройства',
      images: JSON.stringify(['https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=1000&auto=format&fit=crop']),
      specs: JSON.stringify({ 'Трекинг': 'Субмиллиметровый', 'Батарея': '12 часов', 'Отдача': 'Силовое сопротивление' }),
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
