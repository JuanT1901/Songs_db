require("../models");
const request = require("supertest");
const app = require("../app");

let songId;
const BASE_URL = "/api/v1/songs";
const song = {
  name: "La buena fai",
};

test("Post -> '/songs', should return status code 201 and res.body.name === song.name", async () => {
  const res = await request(app).post(BASE_URL).send(song);
  songId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(song.name);
});

test("Get -> '/songs', should return status code 200 and res.body to have length = 1", async () => {
  const res = await request(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.length).toBe(1);
});

test("Get -> '/songs/:id', should return status code 200 and res.body.name === song.name", async () => {
  const res = await request(app).get(`${BASE_URL}/${songId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(song.name);
});

test("Put -> '/songs/:id', should return status code 200 and res.body.name === songUpdate.name", async () => {
  const songUpdate = { name: "SORRY 4 THAT MUCH" };
  const res = await request(app).put(`${BASE_URL}/${songId}`).send(songUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(songUpdate.name);
});

test("Delete -> '/songs/id', should return status code 204", async() => {
  const res = await request(app).delete(`${BASE_URL}/${songId}`);

  expect(res.status).toBe(204);
})