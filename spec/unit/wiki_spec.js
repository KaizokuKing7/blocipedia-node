const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;

describe("Wiki", () => {
    beforeEach((done) => {
        this.user;
        this.wiki;

        sequelize.sync({ force: true })
            .then((res) => {
                User.create({
                    username: "adamSmith",
                    email: "bob@example.com",
                    password: "password"
                }).then((user) => {
                    this.user = user;
                    done();
                })
                    .catch((err) => {
                        console.log(err)
                        done()
                    })
            })
    })
    describe("#create()", () => {
        it("should create a wiki object with a title, body, assigned user and if its private or not", (done) => {
            Wiki.create({
                title: "The galaxy",
                body: "From eath to the stars",
                userId: this.user.id,
                private: true,
            })
                .then((wiki) => {
                    expect(wiki.body).toBe("From eath to the stars");
                    expect(wiki.title).toBe("The galaxy");
                    expect(wiki.userId).toBe(this.user.id);
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
    });
    describe("#getUser()", () => {
        it("should return the associated user", (done) => {
            Wiki.create({
                title: "The galaxy",
                body: "From eath to the stars",
                userId: this.user.id,
                private: true
            })
                .then((wiki) => {
                    wiki.getUser()
                        .then((associatedUser) => {
                            expect(associatedUser.email).toBe("bob@example.com");
                            done();
                        });
                })
        });
    });
})