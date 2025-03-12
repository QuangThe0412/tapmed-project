const fetchCategories = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const categories = await import("@dataMockup/categoryData.json");
  return categories.default;
};

export default fetchCategories;
