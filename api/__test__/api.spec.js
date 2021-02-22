const request = require("supertest");
const app = require('../../config/express')();

test("GET dos Automóveis", async () => {
	await request(app)
		.get("/api/v1/Cars")
		.expect(200)
		.then((response) => {
            expect(response.statusCode).toBe(200);
		})
}, 5000)

test("GET dos Motoristas", async () => {
	await request(app)
		.get("/api/v1/Drivers")
		.expect(200)
		.then((response) => {
            expect(response.statusCode).toBe(200);
		})
}, 5000)

test("GET das Viagens", async () => {
	await request(app)
		.get("/api/v1/carTravel")
		.expect(200)
		.then((response) => {
            expect(response.statusCode).toBe(200);
		})
}, 5000)

test("POST de Automóveis", async () => {
	await request(app)
		.post("/api/v1/Cars")
        .send({
            "licensePlate": "HGT1010",
            "color": "Blue",
            "brand": "Volkswagen"
		})
		.then((response) => {
            expect(response.statusCode).toBe(201);
		})
}, 5000)

test("POST de Motoristas", async () => {
	await request(app)
		.post("/api/v1/Drivers")
        .send({
            "name": "Rainer"
		})
		.then((response) => {
            expect(response.statusCode).toBe(201);
		})
}, 5000)

test("POST de Viagens", async () => {
	await request(app)
		.post("/api/v1/carTravel")
        .send({
            "startDate": "2021-01-15",
            "idDriver": 1,
            "idCar": 2,
            "reasonUse": "Vai dar não"
        })
		.then((response) => {
            expect(response.statusCode).toBe(201);
		})
}, 5000)

test("PUT de Automóveis", async () => {
	await request(app)
		.put("/api/v1/Cars/1")
        .send({
            "color": "blue"
        })
		.then((response) => {
            expect(response.statusCode).toBe(200);
		})
}, 5000)

test("PUT de Motoristas", async () => {
	await request(app)
		.put("/api/v1/Drivers/1")
        .send({
            "name": "Bojack"
        })
		.then((response) => {
            expect(response.statusCode).toBe(200);
		})
}, 5000)

test("PUT de Viagem", async () => {
	await request(app)
		.put("/api/v1/carTravel/1")
        .send({
            "endDate": "2021-01-16"
        })
		.then((response) => {
            expect(response.statusCode).toBe(200);
		})
}, 5000)

test("Delete de Automóveis", async () => {
	await request(app)
		.delete("/api/v1/Cars/1")
		.then((response) => {
            expect(response.statusCode).toBe(200);
		})
}, 5000)

test("Delete de Motoristas", async () => {
	await request(app)
		.delete("/api/v1/Drivers/1")
		.then((response) => {
            expect(response.statusCode).toBe(200);
		})
}, 5000)