const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/wikis/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki

describe("Wiki", () => {
    beforeEach((done) => {
        this.user;
        sequelize.sync({ force: true })
            .then((res) => {
                User.create({
                    username: "freddie",
                    email: "test@email.com",
                    password: "123456789"
                })
                    .then((user) => {
                        this.user = user
                        request.get({
                            url: "http://localhost:3000/auth/fake",
                            form: {
                                userId: user.id,
                                email: user.email
                            }
                        }, (err, res, body) => {
                            done();
                        }
                        );
                    })
                    .catch((err) => {
                        console.log(err)
                        done()
                    })
            })
            .catch((err) => {
                console.log(err)
                done();
            });
    });
    describe("#Create()", () => {
        it("Should create a wiki", (done) => {
            const newWiki = {
                url: `${base}create`,
                form: {
                    title: "About the stars",
                    body: "stars are cool and bright",
                    private: "Yes",
                    userId: this.user.id
                }
            };
            request.post(newWiki, (err, res, body) => {
                Wiki.findOne({ where: { title: "About the stars" } })
                    .then((wiki) => {
                        expect(wiki).not.toBeNull;
                        done();
                    })
            })
        })
    });
    describe("Edit()", () => {
        it("Should update the wiki", (done) => {
            const updatedWiki = {
                url: `${base}${1}/update`,
                form: {
                    title: "About the stars",
                    body: "stars are cool and bright",
                    private: "No"
                }
            };
            Wiki.create({
                title: "About the moons",
                body: "moons are cool and white",
                private: "Yes",
                userId: this.user.id
            })
                .then((wiki) => {
                    request.post(updatedWiki, (err, res, body) => {
                        expect(res.statusCode).toBe(302)
                        done()
                    })
                })
        })
    });
    describe("POST /topics/:topicId/posts/:id/destroy", () => {

        it("should delete the post with the associated ID", (done) => {
            Wiki.create({
                title: "About the moons",
                body: "moons are cool and white",
                private: true,
                userId: this.user.id
            })
                .then((wiki) => {
                    request.post(`${base}${wiki.id}/delete`, (err, res, body) => {
                        Wiki.findOne({where: {id: 1}})
                            .then((wiki) => {
                                expect(err).toBeNull();
                                expect(wiki).toBeNull();
                                done();
                            })
                    });

                });
        });

    });
})