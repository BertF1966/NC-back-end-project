const request = require("supertest");
const app = require("../app");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");

afterAll(() => db.end());

beforeEach(() => seed(data));

describe("GET api/topics", () => {
  test("status 200 - responds with an array of test objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        expect(topics).toHaveLength(3);
      });
  });
  test("status 404 - responds with path not found for incorrect path", () => {
    return request(app)
      .get("/api/topic")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Path not found");
      });
  });
  test("correct path returns array of objects with properties of slug and description ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET api/articles/:article_id", () => {
  test("status 200 - responds with an array of objects", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toEqual(
          expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            article_id: 3,
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
          })
        );
      });
  });
  test("status 404 - responds with path not found for incorrect path", () => {
    return request(app)
      .get("/api/articlez")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Path not found");
      });
  });
  test("status 400 - responds with bad request for invalid article ID", () => {
    return request(app)
      .get("/api/articles/q")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("bad request");
      });
  });
  test("status 404 - for valid search but non existent article", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Article not found");
      });
  });
});

describe("PATCH api/articles/article_id", () => {
  test("status 200 - responds with Patch accepted", () => {
    return request(app)
      .patch("/api/articles/3")
      .send({ inc_votes: 50 })
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toEqual(
          expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            article_id: 3,
            body: expect.any(String),
            created_at: expect.any(String),
            votes: 50,
          })
        );
      });
  });
  test("status 400 - responds with bad request when not receiving correctly formatted object", () => {
    return request(app)
      .patch("/api/articles/3")
      .send({ inc_votes: "q" })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("bad request");
      });
  });
  test("status 400 - responds with bad request when not receiving correctly formatted object", () => {
    return request(app)
      .patch("/api/articles/3")
      .send({ test: "test" })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("bad request");
      });
  });
  test("status 404 - responds with not found if article doesnt exist", () => {
    return request(app)
      .patch("/api/articles/9999")
      .send({ inc_votes: 30 })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Article not found");
      });
  });
});
test("status 404 - responds with path not found for incorrect path", () => {
  return request(app)
    .get("/api/articlez")
    .expect(404)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("Path not found");
    });
});
test("status 400 - responds with bad request for invalid article ID", () => {
  return request(app)
    .get("/api/articles/q")
    .expect(400)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("bad request");
    });
});
test("status 404 - for valid search but non existent article", () => {
  return request(app)
    .get("/api/articles/9999")
    .expect(404)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("Article not found");
    });
});

describe("GET api/users", () => {
  test("status 200 - responds with an array of test objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toHaveLength(4);
      });
  });
  test("status 404 - responds with path not found for incorrect path", () => {
    return request(app)
      .get("/api/user")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Path not found");
      });
  });
  test("correct path returns array of objects with properties of username,name and avatar_url ", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET api/articles", () => {
  test("status 200 - responds with an array of test objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toHaveLength(12);
      });
  });
  test("status 404 - responds with path not found for incorrect path", () => {
    return request(app)
      .get("/api/article")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Path not found");
      });
  });
  test("correct path returns array of objects with properties of title, topic, author, body, created_at and votes ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
            })
          );
        });
      });
  });
});

describe("GET api/articles/:article_id (comment count)", () => {
  test("status 200 - responds with an array of objects", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toEqual(
          expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            article_id: 1,
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            topic: expect.any(String),
            comment_count: expect.any(String),
          })
        );
      });
  });
});

describe("GET api/articles/article_id/comments", () => {
  test("status 200 - responds with an array of objects", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            })
          );
        });
      });
  });
});
