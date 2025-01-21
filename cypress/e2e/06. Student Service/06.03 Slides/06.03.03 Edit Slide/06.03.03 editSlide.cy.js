describe("Edit slide with status code 200", () => {
  let accessToken;
  let branchId;
  let slideId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
    cy.readFile("cypress/fixtures/slideId.json").then((slide) => {
      slideId = slide.slideId;
    });
  });
  it("Checking if should be able to edit slide", () => {
    cy.request({
      method: "PATCH",
      url: `/slide/edit/${slideId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        title: "Api testing by cypress Update",
        slides: [
          {
            _id: "678f5cb3a1c65d001940ad4a",
            content: "<p>Slide description update</p>",
            title: "",
          },
        ],
        programs: ["6518fcfa8e86b35c04b6625d"],
        sessions: ["66491689e44f020019e08e4f"],
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200, "Expected status code is 200");
      if (response.status === 200) {
        const { body, duration } = response;
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
