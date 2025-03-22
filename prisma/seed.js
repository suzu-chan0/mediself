const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
        id: 'test-user-1',
        email: 'test@example.com',
        name: 'テストユーザー',
        age: 25,
        gender: 'female',
        skinType: 'オイリー',
        concerns: '赤ニキビ',
        sensitivity: '中程度',
        allergies: 'なし',
        },
    })
  const acneProduct1 = await prisma.product.upsert({
    where: { id: 'prod-acne-1' },
    update: {},
    create: {
      id: 'prod-acne-1',
      name: 'ニキビ治療薬A',
      category: 'acne',
      description: '炎症を抑え、ニキビを効果的に治療する医薬品です。',
      ingredients: 'イブプロフェンピコノール、イソプロピルメチルフェノール',
      price: 1200,
      imageUrl: '/images/acne-medicine-a.jpg',
      taxEligible: true,
      stock: 100,
    },
  })

  const acneProduct2 = await prisma.product.upsert({
    where: { id: 'prod-acne-2' },
    update: {},
    create: {
      id: 'prod-acne-2',
      name: 'ニキビ予防洗顔料',
      category: 'acne',
      description: 'ニキビの原因となる余分な皮脂や汚れを落とし、肌を清潔に保ちます。',
      ingredients: 'グリチルリチン酸、サリチル酸、アラントイン',
      price: 980,
      imageUrl: '/images/acne-face-wash.jpg',
      taxEligible: false,
      stock: 150,
    },
  })

  await prisma.symptomProduct.createMany({
    data: [
      {
        symptom: 'acne',
        symptomType: 'red',
        symptomLocation: 'face',
        symptomSeverity: 'moderate',
        productId: acneProduct1.id,
        recommendationScore: 90,
      },
      {
        symptom: 'acne',
        symptomType: 'white',
        symptomLocation: 'face',
        symptomSeverity: 'mild',
        productId: acneProduct1.id,
        recommendationScore: 70,
      },
      {
        symptom: 'acne',
        symptomType: 'prevention',
        symptomLocation: 'face',
        symptomSeverity: 'mild',
        productId: acneProduct2.id,
        recommendationScore: 85,
      },
    ],
  })

  // Order 追加
  await prisma.order.create({
    data: {
      userId: 'test-user-1',
      totalAmount: 2180,
      taxEligibleAmount: 1200,
      orderDate: new Date(),
      status: 'completed',
    },
  })

  // SkinLog 追加
  await prisma.skinLog.create({
    data: {
      userId: 'test-user-1',
      conditionRating: 3,
      description: '赤ニキビ少し改善した',
      imageUrl: '',
      location: '頬',
      symptoms: '赤ニキビ',
      logDate: new Date(),
    },
  })

  console.log('Seed data inserted successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
