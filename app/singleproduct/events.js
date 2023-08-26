export const events = [
  {
    description:
      "After add the item to cart, and paying, the purchase will first get into review",
    date: new Date(),
    title: "Order",
  },
  {
    description: "The review process takes 2 days",
    date: new Date().addDays(2),
    title: "Review",
  },
  {
    description: "The delivery starts on the 3rd day",
    date: new Date().addDays(3),
    title: "Delivery",
  },
  {
    description: "The item should be delivered 3 days later",
    date: new Date().addDays(6),
    title: "Arrival",
  },
];
