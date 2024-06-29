import request from "supertest";
import app from "../src/app/app.js";
import { describe, it, expect } from "@jest/globals";

describe("Express App", () => {
    it("responds to /health endpoint with status 200 and message", async () => {
        const response = await request(app).get("/health");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Server Health is Okay" });
    });

    it("responds to undefined routes with status 404 and message", async () => {
        const response = await request(app).get("/undefined-route");
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "Not Found" });
    });
});
