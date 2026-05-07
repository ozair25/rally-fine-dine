/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // 🍛 Biryani Rice Dishes
  {
    id: 'br1',
    name: { en: 'Qabuli Palau', de: 'Qabuli Palau' },
    description: {
      en: 'Traditional Afghan rice dish with tender lamb, caramelized carrots, and raisins for a sweet and savory experience',
      de: 'Traditionelles afghanisches Reisgericht mit zartem Lammfleisch, karamellisierten Karotten und Rosinen für ein süß-herzhaftes Erlebnis'
    },
    price: 16.90,
    category: 'Biryani Rice Dishes',
    image: '/src/assets/images/qabuli.jpg'
  },
  {
    id: 'br2',
    name: { en: 'Chicken Biryani', de: 'Hähnchen-Biryani' },
    description: {
      en: 'Fragrant basmati rice cooked with succulent chicken, house-made spices, almonds, and raisins',
      de: 'Duftender Basmati-Reis gekocht mit saftigem Hähnchen, hausgemachten Gewürzen, Mandeln und Rosinen'
    },
    price: 14.50,
    category: 'Biryani Rice Dishes',
    image: '/src/assets/images/biyani.jpg'
  },
  {
    id: 'br3',
    name: { en: 'Vegetable Biryani', de: 'Gemüse-Biryani' },
    description: {
      en: 'A colorful medley of fresh vegetables and aromatic basmati rice, served with yogurt sauce',
      de: 'Eine bunte Mischung aus frischem Gemüse und aromatischem Basmati-Reis, serviert mit Joghurtsauce'
    },
    price: 12.90,
    category: 'Biryani Rice Dishes',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800'
  },

  // 🇮🇳 Indian Specialities
  {
    id: 'in1',
    name: { en: 'Butter Chicken', de: 'Butter-Hähnchen' },
    description: {
      en: 'Tender chicken pieces in a silky, creamy tomato sauce with butter and authentic spices',
      de: 'Zarte Hähnchenstücke in einer seidigen, cremigen Tomatensauce mit Butter und authentischen Gewürzen'
    },
    price: 15.90,
    category: 'Indian Specialities',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800'
  },
  {
    id: 'in2',
    name: { en: 'Chicken Curry', de: 'Hähnchen-Curry' },
    description: {
      en: 'Classic chicken curry prepared with a rich blend of traditional Indian spices and herbs',
      de: 'Klassisches Hähnchen-Curry, zubereitet mit einer reichen Mischung aus traditionellen indischen Gewürzen und Kräutern'
    },
    price: 14.50,
    category: 'Indian Specialities',
    image: '/src/assets/images/curry.jpg'
  },
  {
    id: 'in3',
    name: { en: 'Paneer Masala', de: 'Paneer Masala' },
    description: {
      en: 'Soft cottage cheese cubes cooked in a thick, flavorful gravy with fresh ginger and coriander',
      de: 'Weiche Hüttenkäsewürfel in einer dicken, schmackhaften Sauce mit frischem Ingwer und Koriander'
    },
    price: 13.90,
    category: 'Indian Specialities',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800'
  },
  {
    id: 'in4',
    name: { en: 'Dal Tadka', de: 'Dal Tadka' },
    description: {
      en: 'Tempered yellow lentils cooked with garlic, cumin, and dried red chilies for a smoky finish',
      de: 'Gelbe Linsen mit Knoblauch, Kreuzkümmel und getrockneten roten Chilischoten für ein rauchiges Aroma'
    },
    price: 11.50,
    category: 'Indian Specialities',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800'
  },
  {
    id: 'in5',
    name: { en: 'Mixed Vegetable Curry', de: 'Gemischtes Gemüse-Curry' },
    description: {
      en: 'A healthy and vibrant mix of seasonal vegetables cooked in a spicy onion-tomato gravy',
      de: 'Eine gesunde und lebendige Mischung aus saisonalem Gemüse in einer würzigen Zwiebel-Tomaten-Sauce'
    },
    price: 12.50,
    category: 'Indian Specialities',
    image: '/src/assets/images/burger.jpg'
  },
  {
    id: 'in6',
    name: { en: 'Chicken Vindaloo', de: 'Hähnchen Vindaloo' },
    description: {
      en: 'A fiery Goan specialty with chicken and potatoes in a tangy, hot spice paste',
      de: 'Eine feurige Spezialität aus Goa mit Hähnchen und Kartoffeln in einer würzigen, scharfen Gewürzpaste'
    },
    price: 15.50,
    category: 'Indian Specialities',
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800'
  },
  {
    id: 'in7',
    name: { en: 'Lamb Curry', de: 'Lamm-Curry' },
    description: {
      en: 'Succulent chunks of lamb slow-cooked to perfection in a deeply aromatic gravy',
      de: 'Saftige Lammfleischstücke, perfekt geschmort in einer tiefaromatischen Sauce'
    },
    price: 18.90,
    category: 'Indian Specialities',
    image: '/src/assets/images/lamb.jpg'
  },

  // 🍔 Burger Menu
  {
    id: 'bg1',
    name: { en: 'Classic Veg Burger', de: 'Klassischer Veggie-Burger' },
    description: {
      en: 'Crispy vegetable patty with fresh lettuce, tomatoes, and our signature rally sauce',
      de: 'Knuspriges Gemüse-Patty mit frischem Salat, Tomaten und unserer charakteristischen Rally-Sauce'
    },
    price: 8.50,
    category: 'Burger Menu',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800'
  },
  {
    id: 'bg2',
    name: { en: 'Chicken Burger', de: 'Hähnchen-Burger' },
    description: {
      en: 'Succulent grilled chicken breast with caramelized onions and spicy mayo',
      de: 'Saftige gegrillte Hähnchenbrust mit karamellisierten Zwiebeln und scharfer Mayonnaise'
    },
    price: 9.90,
    category: 'Burger Menu',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800'
  },
  {
    id: 'bg3',
    name: { en: 'Cheese Burger', de: 'Cheese-Burger' },
    description: {
      en: 'Classic beef-style patty with a double layer of melted cheddar cheese',
      de: 'Klassisches Patty nach Rindfleisch-Art mit einer doppelten Schicht geschmolzenem Cheddar-Käse'
    },
    price: 10.50,
    category: 'Burger Menu',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800'
  },
  {
    id: 'bg4',
    name: { en: 'Double Patty Burger', de: 'Double Patty Burger' },
    description: {
      en: 'Monster sized burger with two patties, double cheese, and extra toppings',
      de: 'Riesiger Burger mit zwei Patties, doppeltem Käse und extra Belägen'
    },
    price: 13.90,
    category: 'Burger Menu',
    image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=800'
  },
  {
    id: 'bg5',
    name: { en: 'Crispy Burger', de: 'Crispy Burger' },
    description: {
      en: 'Deep-fried crispy patty with a satisfying crunch in every bite',
      de: 'Frittiertes, knuspriges Patty mit einem zufriedenstellenden Crunch in jedem Bissen'
    },
    price: 9.50,
    category: 'Burger Menu',
    image: '/src/assets/images/crispy.jpg'
  },

  // 🍕 Pizza
  {
    id: 'p1',
    name: { en: 'Margherita', de: 'Margherita' },
    description: {
      en: 'Classic pizza with rich tomato sauce, fresh mozzarella, and sweet basil',
      de: 'Klassische Pizza mit reichhaltiger Tomatensauce, frischem Mozzarella und süßem Basilikum'
    },
    price: 8.90,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800'
  },
  {
    id: 'p2',
    name: { en: 'Pepperoni Pizza', de: 'Salami-Pizza' },
    description: {
      en: 'Loaded with spicy beef pepperoni and a generous layer of mozzarella cheese',
      de: 'Belegt mit würziger Rindersalami und einer großzügigen Schicht Mozzarella-Käse'
    },
    price: 11.50,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800'
  },
  {
    id: 'p3',
    name: { en: 'Farmhouse Pizza', de: 'Farmhouse Pizza' },
    description: {
      en: 'Loaded with crunchy capsicum, onions, tomatoes, and mushrooms',
      de: 'Belegt mit knackiger Paprika, Zwiebeln, Tomaten und Pilzen'
    },
    price: 10.90,
    category: 'Pizza',
    image: '/src/assets/images/farmhouse.jpg'
  },
  {
    id: 'p4',
    name: { en: 'Hawaiian Pizza', de: 'Pizza Hawaii' },
    description: {
      en: 'The perfect mix of sweet and savory with ham and fresh pineapple chunks',
      de: 'Die perfekte Mischung aus süß und herzhaft mit Schinken und frischen Ananasstücken'
    },
    price: 11.90,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800'
  },
  {
    id: 'p5',
    name: { en: 'BBQ Chicken Pizza', de: 'BBQ-Hähnchen Pizza' },
    description: {
      en: 'Grilled chicken, red onions, and cilantro with a smoky BBQ sauce base',
      de: 'Gegrilltes Hähnchen, rote Zwiebeln und Koriander auf einer rauchigen BBQ-Saucen-Basis'
    },
    price: 12.90,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800'
  },
  {
    id: 'p6',
    name: { en: 'Cheese Burst Pizza', de: 'Cheese Burst Pizza' },
    description: {
      en: 'Golden crust stuffed with molten cheese that oozes out with every slice',
      de: 'Goldene Kruste, gefüllt mit geschmolzenem Käse, der bei jedem Stück herausfließt'
    },
    price: 13.50,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800'
  },

  // 🥬 Vegetarian Pizza
  {
    id: 'vp1',
    name: { en: 'Veggie Supreme', de: 'Veggie Supreme' },
    description: {
      en: 'Packed with corn, capsicum, olives, mushrooms, and onions',
      de: 'Vollgepackt mit Mais, Paprika, Oliven, Pilzen und Zwiebeln'
    },
    price: 11.90,
    category: 'Vegetarian Pizza',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800'
  },
  {
    id: 'vp2',
    name: { en: 'Corn & Cheese Pizza', de: 'Mais & Käse Pizza' },
    description: {
      en: 'Sweet corn paired with creamy cheese for a soft, comforting bite',
      de: 'Süßer Mais kombiniert mit cremiger Käse füt einen weichen, wohltuenden Bissen'
    },
    price: 10.50,
    category: 'Vegetarian Pizza',
    image: 'https://images.unsplash.com/photo-1605411681720-3136209e9927?w=800'
  },
  {
    id: 'vp3',
    name: { en: 'Paneer Tikka Pizza', de: 'Paneer Tikka Pizza' },
    description: {
      en: 'Marinated paneer cubes with green chilies and onions',
      de: 'Marinierte Paneer-Würfel mit grünen Chilis und Zwiebeln'
    },
    price: 12.50,
    category: 'Vegetarian Pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800'
  },
  {
    id: 'vp4',
    name: { en: 'Mushroom Delight', de: 'Pilz-Traum Pizza' },
    description: {
      en: 'Generous serving of fresh mushrooms with herbs and extra mozzarella',
      de: 'Eine großzügige Portion frischer Pilze mit Kräutern und extra Mozzarella'
    },
    price: 10.90,
    category: 'Vegetarian Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800'
  },

  // 🌱 Vegan Pizza
  {
    id: 'vn1',
    name: { en: 'Vegan Veggie Pizza', de: 'Vegane Gemüse-Pizza' },
    description: {
      en: 'Fresh vegetables with our house-made plant-based cheese',
      de: 'Frisches Gemüse mit unserem hausgemachten pflanzlichen Käse'
    },
    price: 12.50,
    category: 'Vegan Pizza',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=800'
  },
  {
    id: 'vn2',
    name: { en: 'Vegan Spicy Delight', de: 'Vegane Spicy Pizza' },
    description: {
      en: 'Hot peppers, corn, and spicy vegan sauce for a bold kick',
      de: 'Scharfe Paprika, Mais und eine würzige vegane Sauce für einen kräftigen Kick'
    },
    price: 12.90,
    category: 'Vegan Pizza',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800'
  },
  {
    id: 'vn3',
    name: { en: 'Vegan Mushroom Pizza', de: 'Vegane Pilz-Pizza' },
    description: {
      en: 'Earthy mushrooms and caramelized onions with vegan mozzarella',
      de: 'Erdige Pilze und karamellisierte Zwiebeln mit veganem Mozzarella'
    },
    price: 11.90,
    category: 'Vegan Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800'
  },

  // 🍝 Pasta & Casseroles
  {
    id: 'pc1',
    name: { en: 'White Sauce Pasta', de: 'Pasta in weißer Sauce' },
    description: {
      en: 'Silky smooth white sauce blended with veggies — rich, creamy comfort food',
      de: 'Seidig glatte weiße Sauce mit Gemüse – reichhaltiges, cremiges Wohlfühlessen'
    },
    price: 9.50,
    category: 'Pasta & Casseroles',
    image: 'https://images.unsplash.com/photo-1645112481357-190f845d4f3b?w=800'
  },
  {
    id: 'pc2',
    name: { en: 'Red Sauce Pasta', de: 'Pasta in roter Sauce' },
    description: {
      en: 'Zesty tomato sauce with herbs and spices — fresh and flavorful',
      de: 'Pikante Tomatensauce mit Kräutern und Gewürzen – frisch und geschmackvoll'
    },
    price: 8.90,
    category: 'Pasta & Casseroles',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800'
  },
  {
    id: 'pc3',
    name: { en: 'Cheese Pasta Bake', de: 'Käse-Pasta-Auflauf' },
    description: {
      en: 'Penne pasta tossed in sauce, topped with loads of cheese and baked until golden',
      de: 'Penne-Pasta in Sauce, mit viel Käse belegt und goldbraun gebacken'
    },
    price: 10.90,
    category: 'Pasta & Casseroles',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800'
  },
  {
    id: 'pc4',
    name: { en: 'Veg Casserole', de: 'Gemüse-Auflauf' },
    description: {
      en: 'Baked layers of seasonal vegetables, white sauce, and a crispy crust',
      de: 'Gebackene Schichten aus saisonalem Gemüse, weißer Sauce und einer knusprigen Kruste'
    },
    price: 11.50,
    category: 'Pasta & Casseroles',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800'
  },

  // 🍟 Sides
  {
    id: 's1',
    name: { en: 'Garlic Bread (4 pcs)', de: 'Knoblauchbrot (4 Stk.)' },
    description: {
      en: 'Crispy on the outside, buttery and garlicky inside — the perfect starter',
      de: 'Außen knusprig, innen butterig und knoblauchig – der perfekte Starter'
    },
    price: 4.50,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1606850246452-32115f532a87?w=800'
  },
  {
    id: 's2',
    name: { en: 'Cheesy Garlic Bread', de: 'Knoblauchbrot mit Käse' },
    description: {
      en: 'Classic garlic bread loaded with melted cheese — warm, rich, and irresistible',
      de: 'Klassisches Knoblauchbrot mit viel geschmolzenem Käse – warm, reichhaltig und unwiderstehlich'
    },
    price: 5.50,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1502462041640-b3d7e504066a?w=800'
  },
  {
    id: 's3',
    name: { en: 'Classic French Fries', de: 'Klassische Pommes Frites' },
    description: {
      en: 'Golden, crispy fries with a light salt sprinkle — simple and addictive',
      de: 'Goldene, knusprige Fritten mit einer leichten Prise Salz – einfach und süchtig machend'
    },
    price: 3.90,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800'
  },
  {
    id: 's4',
    name: { en: 'Peri Peri Fries', de: 'Peri-Peri Pommes' },
    description: {
      en: 'Crispy fries tossed in spicy peri peri seasoning — bold and fiery',
      de: 'Knusprige Fritten in würzigem Peri-Peri-Gewürz – kräftig und feurig'
    },
    price: 4.50,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1630384066252-19e1ad95ef3d?w=800'
  },

  // 🥗 Salads
  {
    id: 'sl1',
    name: { en: 'Caesar Salad', de: 'Caesar Salad' },
    description: {
      en: 'Crisp romaine lettuce, croutons, and parmesan cheese with Caesar dressing',
      de: 'Knackiger Römersalat, Croutons und Parmesankäse mit Caesar-Dressing'
    },
    price: 8.50,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800'
  },
  {
    id: 'sl2',
    name: { en: 'Greek Salad', de: 'Griechischer Salat' },
    description: {
      en: 'Fresh cucumbers, tomatoes, red onions, feta cheese, and kalamata olives',
      de: 'Frische Gurken, Tomaten, rote Zwiebeln, Fetakäse und Kalamata-Oliven'
    },
    price: 8.90,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800'
  },
  {
    id: 'sl3',
    name: { en: 'Mixed Veg Salad', de: 'Gemischter Gemüsesalat' },
    description: {
      en: 'A crunchy mix of seasonal garden vegetables with a light lemon vinaigrette',
      de: 'Eine knackige Mischung aus saisonalem Gartengemüse mit einer leichten Zitronen-Vinaigrette'
    },
    price: 7.50,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800'
  },
  {
    id: 'sl4',
    name: { en: 'Chicken Salad', de: 'Hähnchen-Salat' },
    description: {
      en: 'Grilled chicken strips on a bed of fresh greens with a balsamic glaze',
      de: 'Gegrillte Hähnchenstreifen auf einem Bett aus frischem Grün mit Balsamico-Glasur'
    },
    price: 9.90,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'
  },

  // 🍔 Burger Deals
  {
    id: 'bd1',
    name: { en: 'Burger + Fries Combo', de: 'Burger + Pommes Kombi' },
    description: {
      en: 'Choose any single burger and get a side of classic french fries',
      de: 'Wähle einen beliebigen Burger und erhalte dazu eine Portion klassische Pommes Frites'
    },
    price: 11.90,
    category: 'Burger Deals',
    image: '/src/assets/images/combo.jpg'
  },
  {
    id: 'bd2',
    name: { en: 'Double Burger Meal', de: 'Double Burger Menü' },
    description: {
      en: 'Double burger, fries, and a chilled soft drink of your choice',
      de: 'Double Burger, Pommes und ein kühles Softgetränk deiner Wahl'
    },
    price: 16.50,
    category: 'Burger Deals',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800'
  },
  {
    id: 'bd3',
    name: { en: 'Family Burger Deal', de: 'Familien-Burger-Deal' },
    description: {
      en: '4 Burgers, 2 Large Fries, and a 1.5L Soft Drink',
      de: '4 Burger, 2 große Pommes und ein 1,5L Softgetränk'
    },
    price: 34.90,
    category: 'Burger Deals',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800'
  },

  // 🌱 Indian Vegan Dishes
  {
    id: 'iv1',
    name: { en: 'Chana Masala', de: 'Chana Masala' },
    description: {
      en: 'Hearty chickpeas cooked in a spicy onion and tomato-based sauce',
      de: 'Herzhafte Kichererbsen, gekocht in einer würzigen Zwiebel-Tomaten-Sauce'
    },
    price: 11.90,
    category: 'Indian Vegan Dishes',
    image: 'https://images.unsplash.com/photo-1542367592-8849eb950fd8?w=800'
  },
  {
    id: 'iv2',
    name: { en: 'Aloo Gobi', de: 'Aloo Gobi' },
    description: {
      en: 'Classic potato and cauliflower dry curry with turmeric and fresh herbs',
      de: 'Klassisches Kartoffel- und Blumenkohl-Curry mit Kurkuma und frischen Kräutern'
    },
    price: 10.90,
    category: 'Indian Vegan Dishes',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800'
  },
  {
    id: 'iv3',
    name: { en: 'Vegan Dal Curry', de: 'Veganes Dal-Curry' },
    description: {
      en: 'Nutritious yellow lentils cooked with mild spices and fresh spinach',
      de: 'Nahrhafte gelbe Linsen, gekocht mit milden Gewürzen und frischem Spinat'
    },
    price: 10.50,
    category: 'Indian Vegan Dishes',
    image: '/src/assets/images/chicken-cuury.jpg'
  },

  // 🍗 Chicken Dishes
  {
    id: 'cd1',
    name: { en: 'Spicy Chicken Masala', de: 'Würziges Hähnchen-Masala' },
    description: {
      en: 'Tender chicken in a bold, spicy gravy hit with peppercorns and dry chilies',
      de: 'Zartes Hähnchen in einer kräftigen, würzigen Sauce mit Pfefferkörnern und getrockneten Chilis'
    },
    price: 15.50,
    category: 'Chicken Dishes',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800'
  },
  {
    id: 'cd2',
    name: { en: 'Tandoori Chicken', de: 'Tandoori-Hähnchen' },
    description: {
      en: 'Chicken marinated in yogurt and spices, roasted to perfection in our clay oven',
      de: 'In Joghurt und Gewürzen mariniertes Hähnchen, perfekt geröstet in unserem Lehmofen'
    },
    price: 16.90,
    category: 'Chicken Dishes',
    image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=800'
  },
  {
    id: 'cd3',
    name: { en: 'Chicken Korma', de: 'Hähnchen Korma' },
    description: {
      en: 'Mildly spiced chicken in a rich, creamy sauce made with crushed nuts',
      de: 'Mild gewürztes Hähnchen in einer reichhaltigen, cremigen Sauce aus gemahlenen Nüssen'
    },
    price: 15.90,
    category: 'Chicken Dishes',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800'
  },

  // 🥦 Vegetarian Dishes
  {
    id: 'vd1',
    name: { en: 'Paneer Butter Masala', de: 'Paneer Butter Masala' },
    description: {
      en: 'Cottage cheese cubes in a rich, velvety tomato and cream-based sauce',
      de: 'Hüttenkäse-Würfel in einer reichhaltigen, samtigen Tomaten-Sahne-Sauce'
    },
    price: 13.90,
    category: 'Vegetarian Dishes',
    image: 'https://images.unsplash.com/photo-1542367592-8849eb950fd8?w=800'
  },
  {
    id: 'vd2',
    name: { en: 'Palak Paneer', de: 'Palak Paneer' },
    description: {
      en: 'Fresh spinach puree with soft paneer cubes and a touch of cream',
      de: 'Frisches Spinatpüree mit weichen Paneer-Würfeln und einem Hauch Sahne'
    },
    price: 13.50,
    category: 'Vegetarian Dishes',
    image: '/src/assets/images/palak.jpg'
  },
  {
    id: 'vd3',
    name: { en: 'Veg Curry', de: 'Gemüse-Curry' },
    description: {
      en: 'Daily selection of fresh seasonal vegetables in an authentic curry base',
      de: 'Tägliche Auswahl an frischem saisonalem Gemüse in einer authentischen Curry-Basis'
    },
    price: 11.90,
    category: 'Vegetarian Dishes',
    image: '/src/assets/images/mix-veg.jpg'
  },

  // ✨ Special
  {
    id: 'sp1',
    name: { en: 'Paneer Wrap', de: 'Paneer-Wrap' },
    description: {
      en: 'Soft wrap packed with spicy paneer and fresh fillings — quick and delicious',
      de: 'Ein weicher Wrap, gefüllt mit würzigem Paneer und frischen Zutaten – schnell und lecker'
    },
    price: 8.90,
    category: 'Special',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800'
  },

  // 🍰 Desserts
  {
    id: 'ds1',
    name: { en: 'Chocolate Cake', de: 'Schokoladenkuchen' },
    description: {
      en: 'Rich, moist dark chocolate cake with a molten ganache center',
      de: 'Reichhaltiger, saftiger Zartbitterschokoladenkuchen mit einem flüssigen Ganache-Kern'
    },
    price: 6.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800'
  },
  {
    id: 'ds2',
    name: { en: 'Gulab Jamun', de: 'Gulab Jamun' },
    description: {
      en: 'Soft milk solids dumplings fried and soaked in rose-flavored sugar syrup',
      de: 'Weiche Bällchen aus Milchfeststoffen, frittiert und in Rosensirup eingelegt'
    },
    price: 4.90,
    category: 'Desserts',
    image: '/src/assets/images/jamun.jpg'
  },
  {
    id: 'ds3',
    name: { en: 'Ice Cream', de: 'Eiscreme' },
    description: {
      en: 'Choose your flavor: Vanilla, Chocolate, or Strawberry',
      de: 'Wähle deine Sorte: Vanille, Schokolade oder Erdbeere'
    },
    price: 4.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800'
  },
  {
    id: 'ds4',
    name: { en: 'Brownie', de: 'Brownie' },
    description: {
      en: 'Classic fudge brownie served warm with a drizzle of chocolate sauce',
      de: 'Klassischer Fudge-Brownie, warm serviert mit einem Schuss Schokoladensauce'
    },
    price: 5.90,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800'
  },

  // 🥤 Drinks
  {
    id: 'd1',
    name: { en: 'Coca Cola', de: 'Coca Cola' },
    description: {
      en: 'Chilled and refreshing classic cola (500ml)',
      de: 'Gekühlte und erfrischende klassische Cola (500ml)'
    },
    price: 3.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800'
  },
  {
    id: 'd2',
    name: { en: 'Pepsi', de: 'Pepsi' },
    description: {
      en: 'Bold cola flavor to complement your meal (500ml)',
      de: 'Kräftiger Cola-Geschmack passend zu deinem Essen (500ml)'
    },
    price: 3.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=800'
  },
  {
    id: 'd3',
    name: { en: 'Sprite', de: 'Sprite' },
    description: {
      en: 'Cool lemon-lime refreshment (500ml)',
      de: 'Kühle Zitronen-Limetten-Erfrischung (500ml)'
    },
    price: 3.50,
    category: 'Drinks',
    image: '/src/assets/images/sprite.jpg'
  },
  {
    id: 'd4',
    name: { en: 'Fanta', de: 'Fanta' },
    description: {
      en: 'Sweet orange-flavored sparkling drink (500ml)',
      de: 'Süßes kohlensäurehaltiges Getränk mit Orangengeschmack (500ml)'
    },
    price: 3.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=800'
  },
  {
    id: 'd5',
    name: { en: 'Mineral Water', de: 'Mineralwasser' },
    description: {
      en: 'Pure and refreshing hydration (500ml)',
      de: 'Pures und erfrischendes Wasser (500ml)'
    },
    price: 2.50,
    category: 'Drinks',
    image: '/src/assets/images/water.jpg'
  },
  {
    id: 'd6',
    name: { en: 'Mango Lassi', de: 'Mango-Lassi' },
    description: {
      en: 'Creamy yogurt-based shake blended with sweet mango pulp',
      de: 'Cremiger Shake auf Joghurtbasis, gemischt mit süßem Mangomark'
    },
    price: 4.90,
    category: 'Drinks',
    image: '/src/assets/images/mango.jpg'
  }
];

export const SERVICEABLE_PINCODES = ['35390', '35392', '35394', '35396', '35398'];
export const RESTAURANT_ADDRESS = 'Frankfurter Str. 128, 35392 Gießen, Germany';
