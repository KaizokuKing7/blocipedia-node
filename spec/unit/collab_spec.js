const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Wiki = require("../../src/db/models").Wiki;
const Collaborator = require("../../src/db/models").Collaborator;

describe("Collaborator", () => {
    beforeEach((done) => {
        this.user;
        this.user2;
        this.wiki;
        this.collaborator;
        sequelize.sync({ force: true }).then((res) => {
            User.create({
                username: "adamSmith",
                email: "bob@example.com",
                password: "password"
            }).then((user) => {
                User.create({
                    username: "jamsSmith",
                    email: "james@example.com",
                    password: "password"
                }).then(user=>this.user2 = user)
                this.user = user;
            }).then(
                Wiki.create({
                    title: "The galaxy",
                    body: "From eath to the stars",
                    userId: 1,
                    private: true
                }).then((wiki) => {
                    this.wiki = wiki;
                    done()
                })
            ).catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("test", () => {
        it("shoud test", (done) => {
            this.user.addCollaborator(1).then(this.user.getCollaborators().then(x=> {console.log(x)
                done()}))
            
            for (let assoc of Object.keys(User.associations)) {
                for (let accessor of Object.keys(User.associations[assoc].accessors)) {
                    console.log(User.name + '.' + User.associations[assoc].accessors[accessor] + '()');
                }
            }
            
        })
    })
    /*describe("#create", () => {
        it("should create a Collaborator object with a name and an assigned wiki and user id's", (done) => {
            Collaborator.create({
                wikiId: this.wiki.id,
                userId: this.user.id
            })
                .then((collaborator) => {
                    expect(collaborator.wikiId).toBe(this.wiki.id);
                    expect(collaborator.userId).toBe(this.user.id);
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
        })


    })*/
    /*
    describe("#getWiki()", () => {
        it("should return the associated wiki", (done) => {
            Collaborator.create({
                wikiId: this.wiki.id,
                userId: this.collaborator.userId
            })
                .then((collaborator) => {
                    this.collaborator.getWiki()
                        .then((associatedWiki) => {
                            expect(associatedWiki.title).toBe("The galaxy");
                            done();
                        })
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
    });*/








    /*
      describe("#setUser()", () => {
        it("should associate a collaborator and a user together", (done) => {
          Collaborator.create({
            name: this.user.name,
            wikiId: this.wiki.id,
            userId: this.user.id
          })
          .then((collaborator) => {
            this.collaborator = collaborator; //storing collaborator
            expect(collaborator.userId).toBe(this.user.id);
            User.create({   //create a new user
              email: "ktmeehan@gmail.com",
              password: "bigsister"
            })
            .then((newUser) => {
              this.collaborator.setUser(newUser)
              .then((collaborator) => {
                expect(collaborator.userId).toBe(newUser.id); //confirm it was updated
                done();
              });
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          });
        });
      });
      describe("#getUser()", () => {
        it("should return the associated user", (done) => {
          Collaborator.create({
            name: this.user.name,
            wikiId: this.wiki.id,
            userId: this.user.id
          })
          .then((collaborator) => {
            collaborator.getUser()
            .then((user) => {
              expect(user.id).toBe(this.user.id);
              done();
            })
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
      });
    
    describe("#setWiki()", () => {
        it("should associate a wiki and a collaborator together", (done) => {
            Wiki.create({
                title: "Planning seester birthday partay",
                body: "Cake or no cake?",
                wikiId: this.wiki.id,
                userId: this.user.id
            })
                .then((newWiki) => {
                    expect(this.collaborator.wiki.id).toBe(this.wiki.id);
                    this.collaborator.setWiki(newWiki)
                        .then((collaborator) => {
                            expect(collaborator.wikiId).toBe(newWiki.id); //ensure it was updated
                            done();
                        })
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
    });
    */

});