import _ from "lodash";

const CategoriesList = [
  { name: "Vegetables and Fruits" },
  { name: "Meats & Seafood" },
  { name: "Grocery & Staples" },
  { name: "Breads & Bakery" },
  { name: "Frozen Foods" }
];

const category2 = [
  [{ name: "Fresh Fruits", description: "" }, { name: "Fresh Vegetables" }]
];

const categories = [
  { categoryName: "", edibleType: "", productFamily: "" },
  { categoryName: "", edibleType: "", productFamily: "" }
];

const category3 = [{ name: "Apple" }, { name: "Banana" }];

// var layer_count = 3;
// var layers = [];
// for (let i = 0; i < layer_count; i++) {
//   layers.push("category" + String(i + 2));
// }
// var object = {};
// for (let i = 0; i < layers.length; i++) {
//   _.set(object, layers[i], "hello");
// }

// console.log(object.category4);

export default CategoriesList;
export { category2, category3 };
