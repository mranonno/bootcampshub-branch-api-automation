describe("Add new media with status code 200", () => {
  let accessToken;
  let branchId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
  });
  it("Checking if should be able to Add new media", () => {
    cy.request({
      method: "POST",
      url: "/media/send",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        title: "Test for automation",
        attachments: [],
        description: "hhhhhfhsfddafsah",
        mediaType: "video",
        thumbnail: "",
        users: [],
        program: "64fcb957b0cf6e9ae43d126d",
        session: "66491689e44f020019e08e4f",
        url: "https://player.vimeo.com/video/1010724906?h=e29f2e9074",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201, "Expected status code is 200");
      if (response.status === 201) {
        const { body, duration } = response;
        cy.writeFile("cypress/fixtures/mediaId.json", {
          mediaId: body.media._id,
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
