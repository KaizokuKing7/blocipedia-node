const request = require("request");
const server = require("../../src/server")
const base = "http://localhost:3000/user/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {

    beforeEach((done) => {

        sequelize.sync({ force: true })
            .then(() => {
                done();
            })
            .catch((err) => {
                done();
            });

    });

    describe("GET /users/sign_up", () => {

        it("should render a view with a sign up form", (done) => {
            request.get(`${base}sign_up`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Sign up");
                done();
            });
        });

    });

    describe("POST /users", () => {
        it("should create a new user with valid values and redirect", (done) => {
            const newuser = {
                url: `${base}sign_up`,
                form: {
                    name: "adam",
                    email: "test@example.com",
                    password: "123456789",
                    password_conf: "123456789"
                }
            }
            request.post(newuser,
                (err, res, body) => {
                    User.findOne({ where: { email: "test@example.com" } })
                        .then((user) => {
                            expect(user).not.toBeNull();
                            expect(user.email).toBe("test@example.com");
                            expect(user.id).toBe(1);
                            done();
                        })
                        .catch((err) => {
                            done();
                        });
                }
            );
        });
        it("should not create a new user with invalid attributes and redirect", (done) => {
            request.post(
                {
                    url: base,
                    form: {
                        email: "no",
                        password: "123456789"
                    }
                },
                (err, res, body) => {
                    User.findOne({ where: { email: "no" } })
                        .then((user) => {
                            expect(user).toBeNull();
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            )
        });

    });

    describe("GET /users/sign_in", () => {

        it("should render a view with a sign in form", (done) => {
            request.get(`${base}sign_in`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Sign in");
                done();
            });
        });
    });


});