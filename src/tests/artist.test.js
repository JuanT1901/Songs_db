require("../models")
const request = require("supertest");
const app = require("../app");

let artistId;
const BASE_URL = "/api/v1/artists";
const artist = {
  name: "Feid",
  country: "Colombia",
  formationYear: 1992,
  image: "https://yt3.googleusercontent.com/GUW78kIdMM2mVjl-c1rkSD8DqNYSRZAfTUTie3j4xKFN6agTpdb9UiMDGwQB2yuoDpKB1a8QNn8=s900-c-k-c0x00ffffff-no-rj"
}

test("Post -> '/artists', should return status code 201 and res.body === artist", async() => {
  const res = await request(app).post(BASE_URL).send(artist);
  artistId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(artist.name);
  expect(res.body.country).toBe(artist.country);
  expect(res.body.formationYear).toBe(artist.formationYear);
});

test("Get -> '/artists', should return status code 200 and res.body to have length = 1", async() => {
  const res = await request(app).get(BASE_URL);
  
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("Get -> '/artists/:id', should return status code 200, res.body.name === artist.name, res.body.country === artist.country, res.body.formationYear === artist.formationYear and res.body.image === artist.image", async() => {
  const res = await request(app).get(`${BASE_URL}/${artistId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(artist.name);
  expect(res.body.country).toBe(artist.country);
  expect(res.body.formationYear).toBe(artist.formationYear);
  expect(res.body.image).toBe(artist.image);
});

test("Update -> '/artists/:id'm should return status code 200, res.body.name = artistUpdate.name, res.body.country = artistUpdate.country", async() => {
  const artistUpdate = {
    name: "Foo Fighters",
    country: "USA",
  }
  const res = await request(app).put(`${BASE_URL}/${artistId}`).send(artistUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(artistUpdate.name);
  expect(res.body.country).toBe(artistUpdate.country);
});

test("Delete -> '/artists/:id', should return status code 204", async() => {
  const res = await request(app).delete(`${BASE_URL}/${artistId}`);

  expect(res.status).toBe(204);
});