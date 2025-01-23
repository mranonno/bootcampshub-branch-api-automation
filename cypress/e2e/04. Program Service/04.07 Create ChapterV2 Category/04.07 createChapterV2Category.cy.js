describe("Create chapter v2 category with status code 200", () => {
  let accessToken;
  let branchId;
  let programId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
    cy.readFile("cypress/fixtures/programId.json").then((program) => {
      programId = program.programId;
    });
  });
  it("Checking if should be able to create chapter v2 category", () => {
    cy.request({
      method: "POST",
      url: `/course/chapterv2/category/${programId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        categories: [
          {
            isActive: true,
            _id: "65eb5eaff6d7cc3e14e90cd7",
            name: "Module",
            slug: "module",
          },
          {
            isActive: true,
            _id: "65eb5eaff6d7cc3e14e90cd9",
            name: "Interview",
            slug: "interview",
          },
          {
            isActive: true,
            _id: "65eb5eaff6d7cc3e14e90cd8",
            name: "Workshop video",
            slug: "workshop",
          },
          {
            isActive: true,
            _id: "65eb5eaff6d7cc3e14e90cda",
            name: "Lab",
            slug: "lab",
          },
          {
            isActive: true,
            _id: "65eb6a8ff6d7cc3e14e90d25",
            name: "SSD",
          },
          {
            isActive: false,
            _id: "666981cb925a2b0020eed58b",
            name: "testing again",
          },
          {
            isActive: false,
            _id: "65eb80b2a048d99678800cfc",
            name: "Test",
          },
          {
            isActive: true,
            _id: "66f5b98b9f4744b3a08f2045",
            name: "lasttt",
          },
          {
            name: "Add Tab",
            isActive: true,
          },
        ],
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200, "Expected status code is 200");
      if (response.status === 200) {
        const { body, duration } = response;
        cy.writeFile("cypress/fixtures/categoryId.json", {
          categoryId: body.category._id,
        });
        expect(body.success).to.eq(true);
        expect(duration).to.be.lessThan(
          2000,
          "Response time should be less than 2 seconds"
        );
        cy.log("Response body (stringified):", JSON.stringify(body, null, 2));
        console.log(
          "Response body (stringified):",
          JSON.stringify(body, null, 2)
        );
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
