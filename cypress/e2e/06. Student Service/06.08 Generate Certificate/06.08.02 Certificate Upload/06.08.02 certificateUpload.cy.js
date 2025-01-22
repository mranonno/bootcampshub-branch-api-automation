describe("Certificate upload with status code 201", () => {
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
  it("Checking if should be able to Certificate upload", () => {
    cy.request({
      method: "POST",
      url: "/certificate/upload",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        enrollment: "66c04a3085af4d001abe6cc8",
        results: [
          {
            name: "New Row",
            value: 0,
            referenceValue: 0,
          },
        ],
        user: "66371222546f7b001a63cd2b",
        userData: {
          name: "Shuvajit Maitra",
          program: "first program",
          instructor: "Dr. Md Shimul",
          signature: "Dr. Md Shimul",
          issueDate: "Jan 22, 2025",
          expireDate: "Jan 22, 2027",
        },
        certificateTemplate: {
          templateName: "template1",
          details1: "Has successfully completed the first program",
          details2: "requirements and has achieved her",
        },
        testimonial: "hgjdfkshggfdjsghkjfdhl",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201, "Expected status code is 200");
      if (response.status === 201) {
        const { body, duration } = response;
        cy.writeFile("cypress/fixtures/certificateId.json", {
          certificateId: body.certificate._id,
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
