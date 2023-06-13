const productData = [
  {
    id: 1,
    image: "https://tse4.mm.bing.net/th?id=OIP.EzuYQ-VCDCNCEm8tgqnpPAHaHa&pid=Api&P=0&h=180",
    name: "Mesin Baja",
    sizes: ["100kg", "200kg", "300kg"],
    color: ["blue", "black", "maroon"],
    price: 100000,
  },
  {
    id: 2,
    image:
      "https://tse2.mm.bing.net/th?id=OIP.XP0zyOCQrrLJfHYEW-nysgAAAA&pid=Api&P=0&h=180",
    name: "Mesin Pembersih diesel",
    sizes: ["200kg", "100kg", "300kg"],
    color: ["blue", "black", "maroon"],
    price: 90000,
  },

];
const cartData = [
  {
    id: 1,
    product_id: 1,
    //JUMLAH
    amount: 1,
    total: 100000,
  },
  {
    id: 2,
    product_id: 2,
    //JUMLAH
    amount: 1,
    total: 90000,
  },
];
export { productData, cartData };
