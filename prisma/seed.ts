import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DIRECT_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  await prisma.category.create({
    data: {
      name: "Coffee",
      products: {
        createMany: {
          data: [
            {
              name: "Caramel Chocolate Coffee",
              price: 5.99,
              image: "caramel_chocolate_coffee.jpg",
            },
            {
              name: "Iced Chocolate Coffee",
              price: 4.99,
              image: "iced_chocolate_coffee.jpg",
            },
            {
              name: "Iced Chocolate Latte",
              price: 5.49,
              image: "iced_chocolate_latte.jpg",
            },
            {
              name: "Large Iced Chocolate Latte",
              price: 5.49,
              image: "iced_chocolate_latte_large.jpg",
            },
            {
              name: "Chocolate Milkshake",
              price: 5.49,
              image: "chocolate_milkshake.jpg",
            },
            {
              name: "Small Hot Mocha",
              price: 3.99,
              image: "small_hot_mocha.jpg",
            },
            {
              name: "Large Hot Chocolate Mocha",
              price: 5.99,
              image: "large_hot_chocolate_mocha.jpg",
            },
            {
              name: "Large Hot Cappuccino",
              price: 5.99,
              image: "large_hot_cappuccino.jpg",
            },
            {
              name: "Medium Hot Mocha",
              price: 4.99,
              image: "medium_hot_mocha.jpg",
            },
            {
              name: "Medium Iced Caramel Mocha",
              price: 4.99,
              image: "medium_iced_caramel_mocha.jpg",
            },
            {
              name: "Medium Iced Chocolate Mocha",
              price: 4.99,
              image: "medium_iced_chocolate_mocha.jpg",
            },
            { name: "Espresso", price: 2.99, image: "espresso.jpg" },
            {
              name: "Large Caramel Cappuccino",
              price: 5.99,
              image: "large_caramel_cappuccino.jpg",
            },
            {
              name: "Large Caramel Coffee",
              price: 5.99,
              image: "large_caramel_coffee.jpg",
            },
          ],
        },
      },
    },
  });

  await prisma.category.create({
    data: {
      name: "Burgers",
      products: {
        createMany: {
          data: [
            {
              name: "Classic Burger",
              price: 8.99,
              image: "classic_burger.jpg",
            },
            {
              name: "Chicken Burger",
              price: 8.99,
              image: "chicken_burger.jpg",
            },
            {
              name: "Chicken Chili Burger",
              price: 9.99,
              image: "chicken_chili_burger.jpg",
            },
            {
              name: "Cheese & Pickle Burger",
              price: 8.99,
              image: "cheese_pickle_burger.jpg",
            },
            {
              name: "Quarter Pounder",
              price: 9.99,
              image: "quarter_pounder.jpg",
            },
            {
              name: "Double Cheeseburger",
              price: 10.99,
              image: "double_cheeseburger.jpg",
            },
            {
              name: "Special Hot Dog",
              price: 6.99,
              image: "special_hot_dog.jpg",
            },
            {
              name: "2-Pack Hot Dogs",
              price: 10.99,
              image: "hot_dogs_2pack.jpg",
            },
          ],
        },
      },
    },
  });

  await prisma.category.create({
    data: {
      name: "Pizzas",
      products: {
        createMany: {
          data: [
            {
              name: "Spicy Double Cheese Pizza",
              price: 12.99,
              image: "spicy_double_cheese_pizza.jpg",
            },
            {
              name: "Ham & Cheese Pizza",
              price: 12.99,
              image: "ham_cheese_pizza.jpg",
            },
            {
              name: "Double Cheese Pizza",
              price: 11.99,
              image: "double_cheese_pizza.jpg",
            },
            {
              name: "House Special Pizza",
              price: 13.99,
              image: "house_special_pizza.jpg",
            },
            {
              name: "Chorizo Pizza",
              price: 12.99,
              image: "chorizo_pizza.jpg",
            },
            {
              name: "Hawaiian Pizza",
              price: 12.99,
              image: "hawaiian_pizza.jpg",
            },
            { name: "Bacon Pizza", price: 12.99, image: "bacon_pizza.jpg" },
            {
              name: "Veggie & Cheese Pizza",
              price: 11.99,
              image: "veggie_cheese_pizza.jpg",
            },
            {
              name: "Pepperoni & Cheese Pizza",
              price: 12.99,
              image: "pepperoni_cheese_pizza.jpg",
            },
            {
              name: "Olive & Cheese Pizza",
              price: 11.99,
              image: "olive_cheese_pizza.jpg",
            },
            {
              name: "Cheese, Ham & Mushroom Pizza",
              price: 13.99,
              image: "cheese_ham_mushroom_pizza.jpg",
            },
          ],
        },
      },
    },
  });

  await prisma.category.create({
    data: {
      name: "Donuts",
      products: {
        createMany: {
          data: [
            {
              name: "3-Pack Chocolate Donuts",
              price: 5.99,
              image: "chocolate_donuts_3pack.jpg",
            },
            {
              name: "3-Pack Glazed Donuts",
              price: 5.99,
              image: "glazed_donuts_3pack.jpg",
            },
            {
              name: "Strawberry Donut",
              price: 2.99,
              image: "strawberry_donut.jpg",
            },
            {
              name: "Chocolate Cookie Donut",
              price: 2.99,
              image: "chocolate_cookie_donut.jpg",
            },
            {
              name: "Strawberry Sprinkle Donut",
              price: 2.99,
              image: "strawberry_sprinkle_donut.jpg",
            },
            {
              name: "Chocolate Glazed Donut",
              price: 2.99,
              image: "chocolate_glazed_donut.jpg",
            },
            {
              name: "Double Chocolate Donut",
              price: 2.99,
              image: "double_chocolate_donut.jpg",
            },
            {
              name: "3-Pack Chocolate Donuts (Assorted)",
              price: 5.99,
              image: "chocolate_donuts_3pack_2.jpg",
            },
            {
              name: "3-Pack Vanilla & Chocolate Donuts",
              price: 5.99,
              image: "vanilla_chocolate_donuts_3pack.jpg",
            },
            { name: "6-Pack Donuts", price: 9.99, image: "donuts_6pack.jpg" },
            {
              name: "3-Pack Assorted Donuts",
              price: 5.99,
              image: "assorted_donuts_3pack.jpg",
            },
            {
              name: "Plain Chocolate Donut",
              price: 2.99,
              image: "plain_chocolate_donut.jpg",
            },
            {
              name: "3-Pack Chocolate Chip Donuts",
              price: 5.99,
              image: "chocolate_chip_donuts_3pack.jpg",
            },
            {
              name: "Chocolate & Coconut Donut",
              price: 2.99,
              image: "chocolate_coconut_donut.jpg",
            },
          ],
        },
      },
    },
  });

  await prisma.category.create({
    data: {
      name: "Desserts",
      products: {
        createMany: {
          data: [
            {
              name: "4 Slices of Cheesecake",
              price: 11.99,
              image: "cheesecake_4slices.jpg",
            },
            {
              name: "Special Waffle",
              price: 7.99,
              image: "special_waffle.jpg",
            },
            {
              name: "House Croissants",
              price: 5.99,
              image: "house_croissants.jpg",
            },
            {
              name: "Cheesecake Slice",
              price: 3.99,
              image: "cheesecake_slice.jpg",
            },
            {
              name: "Chocolate Cake",
              price: 4.99,
              image: "chocolate_cake.jpg",
            },
            {
              name: "Chocolate Cake Slice",
              price: 4.99,
              image: "chocolate_cake_slice.jpg",
            },
          ],
        },
      },
    },
  });

  await prisma.category.create({
    data: {
      name: "Cookies",
      products: {
        createMany: {
          data: [
            {
              name: "Chocolate Cookie Pack",
              price: 4.99,
              image: "chocolate_cookie_pack.jpg",
            },
            {
              name: "Chocolate & Oat Cookie Pack",
              price: 5.99,
              image: "chocolate_oat_cookie_pack.jpg",
            },
            {
              name: "Vanilla Muffin Pack",
              price: 5.99,
              image: "vanilla_muffin_pack.jpg",
            },
            {
              name: "4-Pack Oatmeal Cookies",
              price: 3.99,
              image: "oatmeal_cookies_4pack.jpg",
            },
            {
              name: "Assorted Butter Cookies",
              price: 5.99,
              image: "assorted_butter_cookies.jpg",
            },
            {
              name: "Fruit Flavor Cookies",
              price: 5.99,
              image: "fruit_flavor_cookies.jpg",
            },
          ],
        },
      },
    },
  });

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
