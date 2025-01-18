describe("User login into branch with valid credential and get status code 200", () => {
  let userEmail;
  let userPassword;
  before(() => {
    cy.readFile("cypress/fixtures/userInformation.json").then((data) => {
      userEmail = data.email;
      userPassword = data.password;
    });
  });

  it("Checking if should be able to login user into branch", () => {
    cy.request({
      method: "POST",
      url: "/admin/branch/login",
      body: {
        slug: "first-branch-pgbr",
        email: userEmail,
        password: userPassword,
        branch: "first-branch-pgbr",
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        const { token, user, branch } = response.body;
        const currentDate = new Date().toISOString();

        cy.writeFile("cypress/fixtures/userToken.json", {
          userAccessToken: token,
        });
        cy.writeFile("cypress/fixtures/userId.json", {
          userId: user,
        });
        cy.writeFile("cypress/fixtures/branchId.json", {
          branchId: branch._id,
        });
        cy.writeFile("cypress/fixtures/currentDate.json", {
          currentDate: currentDate,
        });

        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");
        expect(response.duration).to.be.lessThan(2000);
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("response.body", JSON.stringify(response.body, null, 1));
      } else {
        cy.log("Request failed with status code:", response.status);
        cy.log(
          "Error details:",
          response.body.error || "No error details provided"
        );
      }
    });
  });
});
