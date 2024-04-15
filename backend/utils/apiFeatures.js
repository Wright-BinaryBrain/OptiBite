class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  search() {
    console.log("a", this.queryString);

    const keyword = this.queryString.keyword
      ? {
          Name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
          categoryName: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
          productFamilyName: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
          productTypeName: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
          userName: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
          riderName: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryString };
    console.log("b", this.queryString);
    // Removing fields from query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((field) => delete queryCopy[field]);

    //Adding filter for price, ratings, etc.
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
