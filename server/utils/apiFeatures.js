class apiFeatures {
  constructor(model, query) {
    this.model = model;
    this.query = query;
  }
  filter() {
    const Obj = { ...this.query };
    const excludedFields = ["sort", "limit", "page", "fields"];
    excludedFields.forEach((ele) => delete Obj[ele]);
    const queryStr = JSON.parse(
      JSON.stringify(Obj).replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
      )
    );
    this.model = this.model.find(queryStr);
    return this;
  }
  select() {
    if (this.query.fields) {
      const selecting = this.query.fields.replace(/,/g, " ");
      this.model = this.model.select(selecting);
    }
    return this;
  }
  sort() {
    if (this.query.sort) {
      const sorting = this.query.sort.replace(/,/g, " ");
      this.model = this.model.sort(sorting);
    }
    return this;
  }
  paginate() {
    const page = this.query.page;
    const limit = this.query.limit;
    const skip = (page - 1) * limit;
    console.log(this.model);
    this.model = this.model.skip(skip).limit(limit);
    return this;
  }
}

module.exports = apiFeatures;
