const express = require("express");
const BlogPost = require("../models/blogPost.js");

const router = express.Router();

// POST /posts
router.post("/", async function (req, res) {
    let blogPost = new BlogPost({
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        tags: req.body.tags,
    });

    let error = await blogPost.validate();
    if (error) {
        console.error("Validation failed:", error.message);
        res.send(error.message).status(422);
    } else {
        await blogPost.save();
        console.log("Validation succeeded. Document saved.");
        res.send(await blogPost.dto);
    }
});

// GET /posts/:postId
router.get("/:postId", async function (req, res) {
    const blogPost = await BlogPost.findById(req.params.postId);

    if (!blogPost) {
        res.send("Not found").status(404);
    } else {
        res.send(await blogPost.dto);
    }
});

// PUT /posts/:postId
router.put("/:postId", async function (req, res) {
    const blogPost = await BlogPost.findById(req.params.postId);

    if (!blogPost) {
        res.send("Not found").status(404);
    } else {
        blogPost.title = req.body.title ? req.body.title : blogPost.title;
        blogPost.content = req.body.content
            ? req.body.content
            : blogPost.content;
        blogPost.category = req.body.category
            ? req.body.category
            : blogPost.category;
        blogPost.tags = req.body.tags ? req.body.tags : blogPost.tags;
        blogPost.updatedAt = new Date();

        const err = await blogPost.validate();
        if (err) {
            console.error("Validation failed:", err.message);
            res.send(err.message);
        } else {
            await blogPost.save();
            res.send(blogPost.dto);
        }
    }
});

// DELETE /posts/:postId
router.delete("/:postId", async function (req, res) {
    await BlogPost.deleteOne({ _id: req.params.postId });
    res.sendStatus(204);
});

// GET /posts - get all posts
router.get("/", async function (req, res) {
    const term = req.query.term; // use req.query instead of req.params for query strings

    let all;

    if (term && term.length !== 0) {
        all = await BlogPost.find({
            $or: [
                { title: { $regex: term, $options: "i" } }, // i = case-insensitive
                { content: { $regex: term, $options: "i" } },
                { category: { $regex: term, $options: "i" } },
                { tags: { $regex: term, $options: "i" } },
            ],
        });
    } else {
        all = await BlogPost.find({});
    }

    res.send(all.map((x) => x.dto));
});

module.exports = router;
