const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
describe("User", () => {

  beforeEach((done) => {
// #1
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

  describe("#create()", () => {

// #2
    it("should create a User object with a valid email and password", (done) => {
      User.create({
        username: "adam",
        email: "user@example.com",
        password: "1234567890"
      })
      .then((user) => {
        expect(user.email).toBe("user@example.com");
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

// #3
    it("should not create a user with invalid email or password", (done) => {
      User.create({
        username: "adam",
        email: "It's-a me, Mario!",
        password: "1234567890"
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error: must be a valid email");
        done();
      });
    });
    it("should not create if a email exists", (done) => {
        User.create({
            username: "stanlee",
            password: "123456",
            email: "foo@bar.com",
        })
        .then((user)=>{
            User.create({
                username: "stdsfdsfee",
                password: "123654987",
                email: "foo@bar.com",
            }).then((user)=>{
                
                done()
            })
            .catch((err)=>{
                expect(err).not.toBeNull();
                done()
            })
        })
    })
   

  });

});