const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;
const collab = require("../../src/db/models").Collaborator;
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
                private: true
            })
                .then((wiki) => {
                    collab.create({
                        wikiId: 1,
                        userId: 1,
                    })
                        .then(collab.create({
                            wikiId: 1,
                            userId: 2,
                        })).then(wiki.countCollaborators().then(x => console.log(x)))



                    for (let assoc of Object.keys(Wiki.associations)) {
                        for (let accessor of Object.keys(Wiki.associations[assoc].accessors)) {
                            console.log(Wiki.name + '.' + Wiki.associations[assoc].accessors[accessor] + '()');
                        }
                    }
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
                    wiki.getOwner()
                        .then((associatedUser) => {
                            expect(associatedUser.email).toBe("bob@example.com");
                            done();
                        });
                })
        });
    });
})