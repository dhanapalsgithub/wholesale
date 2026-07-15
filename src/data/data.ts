import type { Category, Customer, Order, Owner, Product } from '../types';

const fallbackImage = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80';

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'grocery';

const excelProductRows = [
  { sourceId: "PROD1772350810979", name: "kali pakku-களிபாக்கு-", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 251, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTxwsLd3LlYrAWU9WmEnWIdhhKVp-GvC9LeOsOw23IBgE27b6qxqVF5SAjvmx7", status: "Active" },
  { sourceId: "PROD1772097185833", name: "Pepper bold size-மிளகு", category: "அட்டை", wholesalePrice: 780.0, retailPrice: 800.0, unit: "1 கி", stock: 210, salesCount: 0, image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQiyyje6mXDVf79dCiSkvPz0fxlQXu_YNkO_e-abSkF4NBzoGXVUYge_eFlC50v", status: "Active" },
  { sourceId: "PROD1772350810978", name: "Poppy Seeds – கசகசா", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://organicmandya.com/cdn/shop/files/BansiRava.jpg?v=1757077087", status: "Active" },
  { sourceId: "PROD1772194223929", name: "Cumin seeds-சீரகம்", category: "அட்டை", wholesalePrice: 290.0, retailPrice: 300.0, unit: "1 கி", stock: 96, salesCount: 0, image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQWwuVTr9ZXW8h2FouGereHskHLO0tWyNYNPxbxKdl2svcT2qEa7IWwgfxFUO-6", status: "Active" },
  { sourceId: "PROD1772350810977", name: "Masala-மசாலா", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://polkapuffs.wordpress.com/wp-content/uploads/2015/02/image13.jpg", status: "Active" },
  { sourceId: "PROD1772199024685", name: "Fennel Seed-சோம்பு", category: "Loose package", wholesalePrice: 190.0, retailPrice: 220.0, unit: "1 கி", stock: 9999, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnsiZd_IE6zX7n8JbyPLDUL2BwRQhJfBTAiXFDK5y2Uojbi68cibht7ySpYw_H", status: "Active" },
  { sourceId: "PROD1772199059434", name: "3 star tea powder Premium quality-தேயிலைதூள்", category: "Loose package", wholesalePrice: 480.0, retailPrice: 500.0, unit: "1 கி", stock: 750, salesCount: 0, image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRDaRzDNj2YYTymvrL5xezmhiJS8g0uXhzEENnM2lNrfciRgeeSHFwV3RzXnk_", status: "Active" },
  { sourceId: "PROD1772199238997", name: "black yellu-கருப்பு எள்", category: "Loose package", wholesalePrice: 210.0, retailPrice: 260.0, unit: "1 கி", stock: 500, salesCount: 0, image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTQzXYX8tsnJsX3WDxlhmaxoeMu14tzQSpKz9JOh8kJLVtxHhZXRasE9rwPvk5z", status: "Active" },
  { sourceId: "PROD1772199323356", name: "white yellu-வெள்ளைஎள்", category: "Loose package", wholesalePrice: 300.0, retailPrice: 320.0, unit: "1 கி", stock: 9999, salesCount: 0, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSVzuQgGJvFPqrvRWR05ytrYGiDazYrcwiMXn8EVHIqg61jFxvcZeKKhE9X4pvW", status: "Active" },
  { sourceId: "PROD1772199384192", name: "BADAM -பாதாம்", category: "Nuts", wholesalePrice: 780.0, retailPrice: 800.0, unit: "1 கி", stock: 497, salesCount: 0, image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRyX-dDWjERWga08cURwv6o1qST0ZRFsD_yzkAbGUkAerAeWdAIvCC-vq9Rmd-", status: "Active" },
  { sourceId: "PROD1772199429936", name: "பொரி -poori", category: "Loose package", wholesalePrice: 7.0, retailPrice: 10.0, unit: "1 கி", stock: 499, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgVFfLrzLdxVZJzaXT4gz8mVuFKcSKSSz8CEG7VGtDWVrhnAyBlryvcMPiYYb", status: "Active" },
  { sourceId: "PROD1772199472765", name: "Grape Yellow-ம திராட்சை", category: "Loose package", wholesalePrice: 500.0, retailPrice: 600.0, unit: "1 கி", stock: 499, salesCount: 0, image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQJXdVKcaion3RNnLNADxXuNSgbrlw0PYRRWMMmoqLq2TiWqO6x9n71LCIrVL9v", status: "Active" },
  { sourceId: "PROD1772199513128", name: "Black grape-க திராட்சை", category: "Loose package", wholesalePrice: 480.0, retailPrice: 550.0, unit: "1 கி", stock: 500, salesCount: 0, image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS8YFgx5-Ziedj5xJV1l4WTTgS3Po80yBGhU64v-OZOKw2DUaIbX3NYsiA_hqWL", status: "Active" },
  { sourceId: "PROD1772199572771", name: "Cashew Seed-முந்திரி", category: "Nuts", wholesalePrice: 770.0, retailPrice: 800.0, unit: "1 கி", stock: 500, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf5gRRhUDm5MCqKyb2FoduBPUi5pav5ENw1NyM-0xftmrKZWFBT3freu6Uc-fh", status: "Active" },
  { sourceId: "PROD1772199608850", name: "Star Anise -அன்னாசிப்பூ", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 500, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.73830efa-8142-4a35-8ded-440578623e20.png", status: "Active" },
  { sourceId: "PROD1772199663379", name: "Rs.10 atta-கோதுமை மாவு(10pcs)", category: "Loose package", wholesalePrice: 75.0, retailPrice: 80.0, unit: "1 கி", stock: 500, salesCount: 0, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTUF9MbssCfZRtkWsWBfHMCMoCEvYSGGHIgGeZhGRwR3tSaiFG1CRdYhnhsBU9o", status: "Active" },
  { sourceId: "PROD1772199709026", name: "Bay leaf-பிரியாணிஇலை", category: "அட்டை", wholesalePrice: 1, retailPrice: 20.0, unit: "100 gm", stock: 500, salesCount: 0, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR35bwjeJTn5nGMffnb0dwqbRdQBQe1SDgRyqLgSjpz66LJo_cbVOhAXewgloY3", status: "Active" },
  { sourceId: "PROD1772199737122", name: "lavangam-கிராம்பு", category: "Spices(100gm)", wholesalePrice: 1, retailPrice: 100.0, unit: "100gm", stock: 499, salesCount: 0, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSsmHK882PPy5U782bDXMvMS0OkixYs4cmJWxz4UAV4nstz_nKi5881CqYuU8_O", status: "Active" },
  { sourceId: "PROD1772199784007", name: "Star anise-அன்னாசி பூ", category: "Spices(100gm)", wholesalePrice: 1, retailPrice: 65.0, unit: "100gm", stock: 496, salesCount: 0, image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRXv8vZB2Egu5kcBgW1x6_krJyrX_fhyIz0p6POfSSL_YEhe6Il_gcbctLiEVGJ", status: "Active" },
  { sourceId: "PROD1772199823502", name: "elachi-ஏலக்காய்", category: "Spices(100gm)", wholesalePrice: 1, retailPrice: 300.0, unit: "100gm", stock: 491, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJsgZKqKhT-R7zGfKu5BHOFflt5qkL2SNVJA&s", status: "Active" },
  { sourceId: "PROD1772199864816", name: "marati-மராட்டிமொக்கு", category: "Spices(100gm)", wholesalePrice: 1, retailPrice: 35.0, unit: "100gm", stock: 492, salesCount: 0, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR2S8E6JZNBcvZAapBebP4DnwrQM6N8eWPDmndfhQ7A4e8mRrtyv3DhjKvbABmV", status: "Active" },
  { sourceId: "PROD1772199907726", name: "kal pasi-கல்பாசி", category: "Spices(100gm)", wholesalePrice: 1, retailPrice: 70.0, unit: "100gm", stock: 500, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTIB8t9iLFddSjfj5J3jd9AoGVm3YnKpRmJnin7Zn4Q1Fnu2H6Kv4Jgx1greiq", status: "Active" },
  { sourceId: "PROD1772199951738", name: "athee-அத்திப்பழம்", category: "Nuts", wholesalePrice: 1, retailPrice: 150.0, unit: "100gm", stock: 2999, salesCount: 0, image: "https://keralamherbsandspices.com/wp-content/uploads/2025/10/freepik__a-studio-shot-features-a-wooden-bowl-filled-with-f__17363.jpeg", status: "Active" },
  { sourceId: "PROD1772199985978", name: "walnut-வாதுமை", category: "Nuts", wholesalePrice: 1, retailPrice: 150.0, unit: "100gm", stock: 499, salesCount: 0, image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRicvkGUf7_XWPh58r5Kno37EAMbgSuWk8JLLNeJUG3KnphxgZVfdkYGiJs5LPu", status: "Active" },
  { sourceId: "PROD1772200026293", name: "pistha-பிஸ்தா", category: "Nuts", wholesalePrice: 1, retailPrice: 150.0, unit: "100gm", stock: 500, salesCount: 0, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQDvjM9azR-3-8VhsQG9IUeNyGXDQyCfPQohVU0_ayRvjBytHK2st-f-GFwRQ5y", status: "Active" },
  { sourceId: "PROD1772200059443", name: "coconut-தேங்காய்", category: "Loose package", wholesalePrice: 56.0, retailPrice: 65.0, unit: "1 கி", stock: 500, salesCount: 0, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRz-kTTkfWQNn7fmHp9YMehZY-8QSxZfP1CDIa_gNzUlqialbAIdXMKDi7A8Lt1", status: "Active" },
  { sourceId: "PROD1772200090124", name: "Onion big size -வெங்காயம்", category: "Loose package", wholesalePrice: 1050.0, retailPrice: 1100.0, unit: "1 கி", stock: 500, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlueluqYMz9HFko0seeYLemK62DM4u5nbjTg&s", status: "Active" },
  { sourceId: "PROD1772200120259", name: "Garlic-பூண்டு", category: "Loose package", wholesalePrice: 130.0, retailPrice: 140.0, unit: "1 கி", stock: 500, salesCount: 0, image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRiL0_c1F-NgsJ4HZUrGrDgR57_GJM9j2_WZKRW1HMrvE5lHwYZl6czTu4Ig3ib", status: "Active" },
  { sourceId: "PROD1772200183635", name: "Dry  chilli-மிளகாய்", category: "Loose package", wholesalePrice: 250.0, retailPrice: 260.0, unit: "1 கி", stock: 1000, salesCount: 0, image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSCqQvOl4z_e_wqezp-zQC6-a-4K_dVWJ4a78tccakZI26bJYNbz1Zv5KeVysZN", status: "Active" },
  { sourceId: "PROD1772200250100", name: "coriander Seed-மல்லி", category: "Loose package", wholesalePrice: 140.0, retailPrice: 160.0, unit: "1 கி", stock: 1000, salesCount: 0, image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQFOrADZ5IBQcYYx4Nhh_aHDwGdill01zj4d07UBySpD08MN7PTp71SOOrh6BDp", status: "Active" },
  { sourceId: "PROD1772200283634", name: "Black Gram-உளுந்து", category: "Loose package", wholesalePrice: 125.0, retailPrice: 135.0, unit: "1 கி", stock: 500, salesCount: 0, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSNxykR0BpUKWBWVKvSj47Bx0URZ4xUKMYcth_gQAYe6_20yVL-zY0oegmVNv0z", status: "Active" },
  { sourceId: "PROD1772200312719", name: "siruparupu-சி பருப்பு", category: "Loose package", wholesalePrice: 120.0, retailPrice: 130.0, unit: "1 கி", stock: 500, salesCount: 0, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS9naBRQz34xP7pW9vRn4YrIglkOnNkG4MsPerr826cqFzq1IwsSdnCVtP8N-pf", status: "Active" },
  { sourceId: "PROD1772200346350", name: "toor dal-து பருப்பு", category: "Loose package", wholesalePrice: 125.0, retailPrice: 135.0, unit: "1 கி", stock: 500, salesCount: 0, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS2BmPpJl8KggBOP5mwNc7SUjeI0OohMuJ_g12mXAkH_hCnojwYJ3y0tZF_MYN-", status: "Active" },
  { sourceId: "PROD1772200382441", name: "kadala dal-க பருப்பு", category: "Loose package", wholesalePrice: 85.0, retailPrice: 100.0, unit: "1 கி", stock: 500, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF8PT95XvHp2hPdXGXLMjaOhSmrYk9W4u4rFevTpp8vD-MszVR4gsKwVo9ige6", status: "Active" },
  { sourceId: "PROD1772209612739", name: "Appalam / Papad-அப்பளம்", category: "Loose package", wholesalePrice: 180.0, retailPrice: 200.0, unit: "1 கி", stock: 249, salesCount: 0, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSJfuF2fsI4pnMEofHAh7qDaUfLtwmnCpsntdzkp8E1ftnyx11_bLMzE-wIcd9N", status: "Active" },
  { sourceId: "PROD1772211275358", name: "Seedless Tamarind--புளி", category: "Loose package", wholesalePrice: 150.0, retailPrice: 180.0, unit: "1 கி", stock: 199, salesCount: 0, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcToy_Q2i5Kx2Wya4JryhCvho3hq_i-ZZ-JbJ1AHg2uIB2hZRdbvaSoH315hynsE", status: "Active" },
  { sourceId: "PROD1772200312719", name: "siruparupu-சி பருப்பு", category: "Loose package", wholesalePrice: 120.0, retailPrice: 130.0, unit: "1 கி", stock: 500, salesCount: 0, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS9naBRQz34xP7pW9vRn4YrIglkOnNkG4MsPerr826cqFzq1IwsSdnCVtP8N-pf", status: "Active" },
  { sourceId: "PROD1772338386031", name: "kali pakku-களிபாக்கு", category: "Loose package", wholesalePrice: 980.0, retailPrice: 1000.0, unit: "1 கி", stock: 499, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTxwsLd3LlYrAWU9WmEnWIdhhKVp-GvC9LeOsOw23IBgE27b6qxqVF5SAjvmx7", status: "Active" },
  { sourceId: "PROD1772350810922", name: "பேரீச்சம்பழம்", category: "Loose package", wholesalePrice: 150.0, retailPrice: 170.0, unit: "1 கி", stock: 1199, salesCount: 0, image: "https://cpimg.tistatic.com/08527497/b/4/Premium-Mazafati-Iran-Dates.jpg", status: "Active" },
  { sourceId: "PROD1772350810923", name: "kali pakku-களிப்பாக்கு(1kg),omam-ஓமம்(100gram)", category: "combo", wholesalePrice: 1, retailPrice: 1, unit: "1 கி", stock: 2000, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTxwsLd3LlYrAWU9WmEnWIdhhKVp-GvC9LeOsOw23IBgE27b6qxqVF5SAjvmx7", status: "Active" },
  { sourceId: "PROD1772350810923", name: "Fried gram-பொ கடலை", category: "Spices(50gm)", wholesalePrice: 100.0, retailPrice: 110.0, unit: "50 gm", stock: 2000, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7aBaNM-xu9AUyVPrHfK7MGhajQ3GwO1Me-hPG6q_eCPbwks4RmjqfqUg0oNo8", status: "Active" },
  { sourceId: "PROD1772350810923", name: "Fried gram-பொ கடலை", category: "Spices(100gm)", wholesalePrice: 100.0, retailPrice: 110.0, unit: "100gm", stock: 2000, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7aBaNM-xu9AUyVPrHfK7MGhajQ3GwO1Me-hPG6q_eCPbwks4RmjqfqUg0oNo8", status: "Active" },
  { sourceId: "PROD1772350810923", name: "Fried gram-பொ கடலை", category: "Loose package", wholesalePrice: 100.0, retailPrice: 110.0, unit: "500gm", stock: 2000, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7aBaNM-xu9AUyVPrHfK7MGhajQ3GwO1Me-hPG6q_eCPbwks4RmjqfqUg0oNo8", status: "Active" },
  { sourceId: "PROD1772350810923", name: "Fried gram-பொ கடலை", category: "Loose package", wholesalePrice: 100.0, retailPrice: 110.0, unit: "500gm", stock: 2000, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7aBaNM-xu9AUyVPrHfK7MGhajQ3GwO1Me-hPG6q_eCPbwks4RmjqfqUg0oNo8", status: "Active" },
  { sourceId: "PROD1772350810924", name: "Mustard-கடுகு", category: "Spices(50gm)", wholesalePrice: 110.0, retailPrice: 130.0, unit: "50gm", stock: 2000, salesCount: 0, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ-5-XBh3vluYY2RV3qfHJ6_WQrFMmaAxA-KdA0iPhRJMxrnN4TqU3xgwDL7Tq-", status: "Active" },
  { sourceId: "PROD1772350810925", name: "Mustard-கடுகு", category: "Spices(100gm)", wholesalePrice: 110.0, retailPrice: 130.0, unit: "100gm", stock: 2000, salesCount: 0, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ-5-XBh3vluYY2RV3qfHJ6_WQrFMmaAxA-KdA0iPhRJMxrnN4TqU3xgwDL7Tq-", status: "Active" },
  { sourceId: "PROD1772350810926", name: "Fenugreek -வெந்தயம்", category: "Spices(50gm)", wholesalePrice: 96.0, retailPrice: 110.0, unit: "50gm", stock: 2000, salesCount: 0, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTdrYFIodO7UUJXKqC5DoMad1D0DYZ3ipGfALjyHjtNWfOyTi8wh-HW3My6ZwtW", status: "Active" },
  { sourceId: "PROD1772350810927", name: "Fenugreek -வெந்தயம்", category: "Spices(100gm)", wholesalePrice: 96.0, retailPrice: 110.0, unit: "100gm", stock: 2000, salesCount: 0, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTdrYFIodO7UUJXKqC5DoMad1D0DYZ3ipGfALjyHjtNWfOyTi8wh-HW3My6ZwtW", status: "Active" },
  { sourceId: "PROD1772350810928", name: "Black Pepper-மிளகு", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.73830efa-8142-4a35-8ded-440578623e20.png", status: "Active" },
  { sourceId: "PROD1772350810929", name: "Fennel Seeds-சோம்பு", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.ab967d77-577e-4ab5-b9c9-6cf430235a41.png", status: "Active" },
  { sourceId: "PROD1772350810930", name: "Sandalwood Tablets-சந்தனம்", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.3be7b01d-cbe2-4159-9dca-56d3b00f5ed7.png", status: "Active" },
  { sourceId: "PROD1772350810931", name: "Cumin Seeds-சீரகம்", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.f96174a9-bb5e-4040-ab38-0f2db0aef26e.png", status: "Active" },
  { sourceId: "PROD1772350810932", name: "Cashew-முந்திரி", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.d06836d9-9a84-4375-85ef-3c78f5bd69cb.png", status: "Active" },
  { sourceId: "PROD1772350810933", name: "grap-திராட்சை", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.2beee868-008b-416f-bc38-188fc6750ca6.png", status: "Active" },
  { sourceId: "PROD1772350810934", name: "Almond-பாதாம்", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.8fd9cf1c-408d-4d8a-919f-f22cce5b3f81.png", status: "Active" },
  { sourceId: "PROD1772350810935", name: "Cardamom-ஏலக்காய்", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcShURoevZS6ZFn_e2gj7WoK4Bg1DS_PDyTVp-rQ9A9YvIm82hg9psbVpewrLVuu", status: "Active" },
  { sourceId: "PROD1772350810936", name: "Cloves-கிராம்பு", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.e3d1478c-a839-416a-b33a-0fbe1277654a.png", status: "Active" },
  { sourceId: "PROD1772350810937", name: "Dry Red Chilli-மிளகாய்", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.23648b39-dd92-4db4-b896-ac981cdc09f3.png", status: "Active" },
  { sourceId: "PROD1772350810938", name: "Kapok Buds-மராட்டிமொக்கு", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR2S8E6JZNBcvZAapBebP4DnwrQM6N8eWPDmndfhQ7A4e8mRrtyv3DhjKvbABmV", status: "Active" },
  { sourceId: "PROD1772350810939", name: "Black Grap-க. திராட்சை", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.d67c8302-f5d1-4c5d-bad7-3e7ea88604f3.png", status: "Active" },
  { sourceId: "PROD1772350810940", name: "Baking Soda-அப்பா சோடா", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://m.media-amazon.com/images/I/81BeTMjjTtL.jpg", status: "Active" },
  { sourceId: "PROD1772350810941", name: "Sambrani Powder-சாம்பிராணிதூள்", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.f96174a9-bb5e-4040-ab38-0f2db0aef26e.png", status: "Active" },
  { sourceId: "PROD1772350810942", name: "பிரியாணிஇலை", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR35bwjeJTn5nGMffnb0dwqbRdQBQe1SDgRyqLgSjpz66LJo_cbVOhAXewgloY3", status: "Active" },
  { sourceId: "PROD1772350810943", name: "Appalam  அப்பளம்", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSJfuF2fsI4pnMEofHAh7qDaUfLtwmnCpsntdzkp8E1ftnyx11_bLMzE-wIcd9N", status: "Active" },
  { sourceId: "PROD1772350810944", name: "Stone Flower-கல்பாசி", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTIB8t9iLFddSjfj5J3jd9AoGVm3YnKpRmJnin7Zn4Q1Fnu2H6Kv4Jgx1greiq", status: "Active" },
  { sourceId: "PROD1772350810945", name: "Dry Ginger-சுக்கு", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://media.istockphoto.com/id/685872798/photo/zingiber-background.jpg?s=1024x1024&w=is&k=20&c=qPEeioK8eRV9N1cbYG9JSFXr_neAh52dE7WnerGqTyA=", status: "Active" },
  { sourceId: "PROD1772350810946", name: "Fresh Cherry-செர்ரிபழம்", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7z-aPbZWYmHeYJv0b0sKoVMpuZEb4mzHrYg&s", status: "Active" },
  { sourceId: "PROD1772350810947", name: "பேரீச்சம்பழம்", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://cpimg.tistatic.com/08527497/b/4/Premium-Mazafati-Iran-Dates.jpg", status: "Active" },
  { sourceId: "PROD1772350810948", name: "mixed fruit-கலவைப்பழம்", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSuIdJH5EvP13Mx7kdijLTXegFVqDieR7SFg&s", status: "Active" },
  { sourceId: "PROD1772350810949", name: "Fenugreek -வெந்தயம்", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTdrYFIodO7UUJXKqC5DoMad1D0DYZ3ipGfALjyHjtNWfOyTi8wh-HW3My6ZwtW", status: "Active" },
  { sourceId: "PROD1772350810950", name: "அஜினமோட்டோ", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://media.istockphoto.com/id/1224308319/photo/msg-on-table.jpg?s=1024x1024&w=is&k=20&c=OJn0ncv1604bG1xVLFkq134KZhfrojpaib6GMzVfQiA=", status: "Active" },
  { sourceId: "PROD1772350810951", name: "மசாலா (Masala)", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://polkapuffs.wordpress.com/wp-content/uploads/2015/02/image13.jpg", status: "Active" },
  { sourceId: "PROD1772350810952", name: "Poppy Seeds-kaza kaza", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://organicmandya.com/cdn/shop/files/BansiRava.jpg?v=1757077087", status: "Active" },
  { sourceId: "PROD1772350810953", name: "kali pakku-களிபாக்கு", category: "அட்டை", wholesalePrice: 40.0, retailPrice: 50.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTxwsLd3LlYrAWU9WmEnWIdhhKVp-GvC9LeOsOw23IBgE27b6qxqVF5SAjvmx7", status: "Active" },
  { sourceId: "PROD1772350810954", name: "Black Pepper-மிளகு", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.73830efa-8142-4a35-8ded-440578623e20.png", status: "Active" },
  { sourceId: "PROD1772350810955", name: "Fennel Seeds-சோம்பு", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.ab967d77-577e-4ab5-b9c9-6cf430235a41.png", status: "Active" },
  { sourceId: "PROD1772350810956", name: "Sandalwood Tablets-சந்தனம்-", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.3be7b01d-cbe2-4159-9dca-56d3b00f5ed7.png", status: "Active" },
  { sourceId: "PROD1772350810957", name: "Cumin Seeds-சீரகம்", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.f96174a9-bb5e-4040-ab38-0f2db0aef26e.png", status: "Active" },
  { sourceId: "PROD1772350810958", name: "Cashew-முந்திரி", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.d06836d9-9a84-4375-85ef-3c78f5bd69cb.png", status: "Active" },
  { sourceId: "PROD1772350810959", name: "grap-திராட்சை", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.2beee868-008b-416f-bc38-188fc6750ca6.png", status: "Active" },
  { sourceId: "PROD1772350810960", name: "Almond-பாதாம்", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.8fd9cf1c-408d-4d8a-919f-f22cce5b3f81.png", status: "Active" },
  { sourceId: "PROD1772350810961", name: "Cardamom-ஏலக்காய்", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcShURoevZS6ZFn_e2gj7WoK4Bg1DS_PDyTVp-rQ9A9YvIm82hg9psbVpewrLVuu", status: "Active" },
  { sourceId: "PROD1772350810962", name: "Cloves-கிராம்பு", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.e3d1478c-a839-416a-b33a-0fbe1277654a.png", status: "Active" },
  { sourceId: "PROD1772350810963", name: "Dry Red Chilli-மிளகாய்", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.23648b39-dd92-4db4-b896-ac981cdc09f3.png", status: "Active" },
  { sourceId: "PROD1772350810964", name: "Kapok Buds-மராட்டிமொக்கு", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR2S8E6JZNBcvZAapBebP4DnwrQM6N8eWPDmndfhQ7A4e8mRrtyv3DhjKvbABmV", status: "Active" },
  { sourceId: "PROD1772350810965", name: "Black Grap-க.திராட்சை", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.d67c8302-f5d1-4c5d-bad7-3e7ea88604f3.png", status: "Active" },
  { sourceId: "PROD1772350810966", name: "Baking Soda-அப்பாசோடா", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://m.media-amazon.com/images/I/81BeTMjjTtL.jpg", status: "Active" },
  { sourceId: "PROD1772350810967", name: "Sambrani Powder-சாம்பிராணிதூள்", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://copilot.microsoft.com/th/id/BCO.f96174a9-bb5e-4040-ab38-0f2db0aef26e.png", status: "Active" },
  { sourceId: "PROD1772350810968", name: "பிரியாணிஇலை", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR35bwjeJTn5nGMffnb0dwqbRdQBQe1SDgRyqLgSjpz66LJo_cbVOhAXewgloY3", status: "Active" },
  { sourceId: "PROD1772350810969", name: "Appalam -அப்பளம்", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSJfuF2fsI4pnMEofHAh7qDaUfLtwmnCpsntdzkp8E1ftnyx11_bLMzE-wIcd9N", status: "Active" },
  { sourceId: "PROD1772350810970", name: "Stone Flower-கல்பாசி", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTIB8t9iLFddSjfj5J3jd9AoGVm3YnKpRmJnin7Zn4Q1Fnu2H6Kv4Jgx1greiq", status: "Active" },
  { sourceId: "PROD1772350810971", name: "Dry Ginger-சுக்கு", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://media.istockphoto.com/id/685872798/photo/zingiber-background.jpg?s=1024x1024&w=is&k=20&c=qPEeioK8eRV9N1cbYG9JSFXr_neAh52dE7WnerGqTyA=", status: "Active" },
  { sourceId: "PROD1772350810972", name: "Fresh Cherry-செர்ரிபழம்", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7z-aPbZWYmHeYJv0b0sKoVMpuZEb4mzHrYg&s", status: "Active" },
  { sourceId: "PROD1772350810973", name: "dates-பேரீச்சம்பழம்", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://cpimg.tistatic.com/08527497/b/4/Premium-Mazafati-Iran-Dates.jpg", status: "Active" },
  { sourceId: "PROD1772350810974", name: "mixed fruit-கலவைப்பழம்", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSuIdJH5EvP13Mx7kdijLTXegFVqDieR7SFg&s", status: "Active" },
  { sourceId: "PROD1772350810975", name: "Fenugreek -வெந்தயம்", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTdrYFIodO7UUJXKqC5DoMad1D0DYZ3ipGfALjyHjtNWfOyTi8wh-HW3My6ZwtW", status: "Active" },
  { sourceId: "PROD1772350810976", name: "அஜினமோட்டோ", category: "அட்டை", wholesalePrice: 75.0, retailPrice: 80.0, unit: "அட்டை", stock: 9999, salesCount: 0, image: "https://media.istockphoto.com/id/1224308319/photo/msg-on-table.jpg?s=1024x1024&w=is&k=20&c=OJn0ncv1604bG1xVLFkq134KZhfrojpaib6GMzVfQiA=", status: "Active" },
] as const;

export const categories: Category[] = Array.from(
  new Map(
    excelProductRows.map((product) => [
      slugify(product.category),
      {
        id: slugify(product.category),
        name: product.category,
        image: product.image || fallbackImage,
      },
    ]),
  ).values(),
);

export const products: Product[] = excelProductRows.map((product, index) => {
  const category = slugify(product.category);
  return {
    id: product.sourceId || `excel-${index + 1}`,
    name: product.name,
    category,
    brand: '3 Star Grocery',
    description: `${product.name} from 3 Star Grocery, Kovur Chennai.`,
    price: product.retailPrice,
    discount: 0,
    offerPrice: product.retailPrice,
    stock: product.stock,
    rating: 4.5,
    reviews: 20 + index,
    unit: product.unit,
    weight: product.unit,
    images: [product.image || fallbackImage],
    featured: index % 2 === 0,
    popular: product.salesCount > 0 || index % 3 === 0,
    newArrival: index % 5 === 0,
    organic: product.category.toLowerCase().includes('organic'),
    deliveryTime: 'Today',
    nutrition: ['Fresh stock', 'Quality checked', 'Packed by 3 Star Grocery'],
    highlights: ['Rate imported from Excel', 'Image imported from Excel', product.status === 'Active' ? 'Available now' : product.status],
    specifications: {
      Category: product.category,
      Unit: product.unit,
      WholesalePrice: `₹${product.wholesalePrice}`,
      RetailPrice: `₹${product.retailPrice}`,
      SourceProductId: product.sourceId,
    },
  };
});

export const owner: Owner = {
  email: 'owner@grocery.test',
  password: 'owner123',
  name: '3 Star Grocery Owner',
  role: 'owner',
};

const makeAddress = (index: number) => ({
  id: `addr-${index}`,
  label: index % 2 ? 'Home' : 'Work',
  line1: `${100 + index}, Green Avenue, Market Street`,
  city: ['Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai'][index % 5],
  state: ['Karnataka', 'Telangana', 'Tamil Nadu', 'Maharashtra', 'Maharashtra'][index % 5],
  pincode: `${560000 + index}`,
});

export const customers: Customer[] = Array.from({ length: 20 }, (_, index) => {
  const id = `cust-${index + 1}`;
  const addresses = [makeAddress(index + 1), makeAddress(index + 41)];
  return {
    id,
    name: `Customer ${index + 1}`,
    email: `customer${index + 1}@grocery.test`,
    password: 'customer123',
    mobile: `98765${String(10000 + index).slice(1)}`,
    address: addresses[0].line1,
    city: addresses[0].city,
    state: addresses[0].state,
    pincode: addresses[0].pincode,
    wallet: 250 + index * 75,
    rewardPoints: 120 + index * 14,
    favoriteProducts: products.slice(index, index + 6).map((product) => product.id),
    cartItems: products.slice(index + 10, index + 13).map((product, itemIndex) => ({ productId: product.id, quantity: itemIndex + 1 })),
    orders: [],
    addresses,
  };
});

const statuses = ['Pending', 'Accepted', 'Packed', 'Shipped', 'Delivered', 'Cancelled'] as const;
export const previousOrders: Order[] = Array.from({ length: 500 }, (_, index) => {
  const customer = customers[index % customers.length];
  const items = Array.from({ length: 2 + (index % 4) }, (_, itemIndex) => {
    const product = products[(index * 7 + itemIndex * 11) % products.length];
    return { productId: product.id, quantity: 1 + ((index + itemIndex) % 3), price: product.offerPrice };
  });
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05);
  const delivery = subtotal > 599 ? 0 : 35;
  const grandTotal = subtotal + gst + delivery;
  return {
    id: `ORD-${String(index + 1).padStart(5, '0')}`,
    customerId: customer.id,
    items,
    address: customer.addresses[index % customer.addresses.length],
    status: statuses[index % statuses.length],
    paymentMethod: ['Cash on Delivery', 'Google Pay', 'PhonePe', 'Paytm', 'UPI', 'Card'][index % 6],
    placedAt: new Date(2026, 6, 8 - (index % 90)).toISOString(),
    subtotal,
    gst,
    delivery,
    grandTotal,
  };
});

export const popularSearches = ['milk', 'tomato', 'rice', 'paneer', 'chips', 'detergent'];
export const coupons = [{ code: 'LIQUID20', discount: 20 }];
