class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                title: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            : {};
        console.log(keyword)
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        this.query = this.query.find({
            $and: [{ brand: this.queryStr.brand },
            { type: this.queryStr.type },
            { price: { $gte: this.queryStr.priceL } },
            { price: { $lte: this.queryStr.priceH } }]
        })

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;