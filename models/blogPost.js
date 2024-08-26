const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: [
        {
            type: String,
        },
    ],
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
});

BlogPostSchema.virtual("dto").get(function () {
    return {
        id: this._id,
        title: this.title,
        content: this.content,
        category: this.category,
        tags: this.tags,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);
