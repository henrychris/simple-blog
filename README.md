# simple-blog

To install dependencies:

```bash
bun install
```

To run:

```bash
# runs the application with nodemon watching for changes
bun run dev 
```

This project was created using `bun init` in bun v1.1.21. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Description

This is a very basic blog API built to satisfy requirements of this project: [roadmap-blog-api](https://roadmap.sh/projects/blogging-platform-api).

## Endpoints

The base URL for all endpoints is /posts.

- Create a Blog Post: `POST /posts`

 Request

 ```json
 {
    "title": "My First Blog Post",
    "category": "Technology",
    "content": "This is the content of the blog post.",
    "tags": ["Tech", "Programming", "NodeJS"]
 }
 ```

 Response

 ```json
 {
    "id": "60d5f60f9c1b8d04b2d0d9a2",
    "title": "My First Blog Post",
    "content": "This is the content of the blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming", "NodeJS"],
    "createdAt": "2024-08-26T10:32:47.000Z",
    "updatedAt": "2024-08-26T10:32:47.000Z"
 }
 ```

 Will return a `422` status code if the input is invalid.

- Get a Blog Post by ID: `GET /posts/:postId`

 Response

 ```json
 {
    "id": "60d5f60f9c1b8d04b2d0d9a2",
    "title": "My First Blog Post",
    "content": "This is the content of the blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming", "NodeJS"],
    "createdAt": "2024-08-26T10:32:47.000Z",
    "updatedAt": "2024-08-26T10:32:47.000Z"
 }

 ```

- Update a Blog Post: `PUT /posts/:postId`

 Request

 Send only the fields you wish to update. E.g:

 ```json
 {
    "title": "Updated Blog Post Title",
    "tags": ["UpdatedTag1", "UpdatedTag2"]
 }
 ```

 Response

 ```json
 {
    "id": "60d5f60f9c1b8d04b2d0d9a2",
    "title": "Updated Blog Post Title",
    "content": "This is the content of the blog post.",
    "category": "Technology",
    "tags": ["UpdatedTag1", "UpdatedTag2"],
    "createdAt": "2024-08-26T10:32:47.000Z",
    "updatedAt": "2024-08-26T11:32:47.000Z"
 }
 ```

- Delete a Blog Post by ID `DELETE /posts`

 Always Returns a `204` status code

- Get All Blog Posts `GET /posts`

 Can search across title, content, category and tags using the `term` query parameter.

 Response

 ```json
 [
    {
        "id": "60d5f60f9c1b8d04b2d0d9a2",
        "title": "First Blog Post",
        "content": "This is the content of the first blog post.",
        "category": "Technology",
        "tags": ["Tech", "Programming"],
        "createdAt": "2024-08-26T10:32:47.000Z",
        "updatedAt": "2024-08-26T10:32:47.000Z"
    },
    {
        "id": "60d5f60f9c1b8d04b2d0d9a3",
        "title": "Second Blog Post",
        "content": "This is the content of the second blog post.",
        "category": "Lifestyle",
        "tags": ["Life", "Health"],
        "createdAt": "2024-08-26T11:32:47.000Z",
        "updatedAt": "2024-08-26T11:32:47.000Z"
    }
 ]
 ```
