describe("Edit diagram with status code 200", () => {
  let accessToken;
  let branchId;
  let diagramId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
    cy.readFile("cypress/fixtures/diagramId.json").then((diagram) => {
      diagramId = diagram.diagramId;
    });
  });
  it("Checking if should be able to edit diagram", () => {
    cy.request({
      method: "PATCH",
      url: `/diagram/edit/${diagramId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        title: "Create Diagram for api test update",
        users: ["66371222546f7b001a63cd2b"],
        category: "new",
        isActive: true,
        attachments:
          '{"diagram":[{"id":"I8Y3kKxhEC3Wm4CDnnWdv","type":"rectangle","x":380,"y":200,"width":160,"height":120,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":{"type":3},"seed":1232301059,"version":11,"versionNonce":1287087277,"isDeleted":false,"boundElements":[{"id":"IAwjygWyemoeylXxjt2Pp","type":"arrow"}],"updated":1737458808953,"link":null,"locked":false},{"id":"jrPlPFdNzKMfp4ngC5SnO","type":"rectangle","x":600,"y":200,"width":100,"height":100,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":{"type":3},"seed":1048138723,"version":9,"versionNonce":1516264355,"isDeleted":false,"boundElements":[],"updated":1737458803750,"link":null,"locked":false},{"id":"xb76ACKWveGP8NUUduubr","type":"text","x":400,"y":240,"width":129.05990600585938,"height":25,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":1992040771,"version":26,"versionNonce":1963267555,"isDeleted":false,"boundElements":null,"updated":1737458821078,"link":null,"locked":false,"text":"Tahsin Pagla","fontSize":20,"fontFamily":1,"textAlign":"left","verticalAlign":"top","baseline":18,"containerId":null,"originalText":"Tahsin Pagla","lineHeight":1.25},{"id":"IAwjygWyemoeylXxjt2Pp","type":"arrow","x":540,"y":260,"width":61.786949530206584,"height":1.2153261911969366,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":{"type":2},"seed":887193187,"version":27,"versionNonce":1003907299,"isDeleted":false,"boundElements":null,"updated":1737458814390,"link":null,"locked":false,"points":[[0,0],[61.786949530206584,1.2153261911969366]],"lastCommittedPoint":null,"startBinding":{"elementId":"I8Y3kKxhEC3Wm4CDnnWdv","focus":-0.02555593383334788,"gap":1},"endBinding":null,"startArrowhead":null,"endArrowhead":"arrow"}],"appState":{"showWelcomeScreen":true,"theme":"light","collaborators":{},"currentChartType":"bar","currentItemBackgroundColor":"transparent","currentItemEndArrowhead":"arrow","currentItemFillStyle":"solid","currentItemFontFamily":1,"currentItemFontSize":20,"currentItemOpacity":100,"currentItemRoughness":1,"currentItemStartArrowhead":null,"currentItemStrokeColor":"#1e1e1e","currentItemRoundness":"round","currentItemStrokeStyle":"solid","currentItemStrokeWidth":2,"currentItemTextAlign":"left","cursorButton":"up","activeEmbeddable":null,"draggingElement":null,"editingElement":null,"editingGroupId":null,"editingLinearElement":null,"activeTool":{"type":"selection","customType":null,"locked":false,"lastActiveTool":null},"penMode":false,"penDetected":false,"errorMessage":null,"exportBackground":true,"exportScale":1,"exportEmbedScene":false,"exportWithDarkMode":false,"fileHandle":null,"gridSize":20,"isBindingEnabled":true,"defaultSidebarDockedPreference":false,"isLoading":false,"isResizing":false,"isRotating":false,"lastPointerDownWith":"mouse","multiElement":null,"name":"Untitled-2025-01-21-1722","contextMenu":null,"openMenu":null,"openPopup":null,"openSidebar":null,"openDialog":null,"pasteDialog":{"shown":false,"data":null},"previousSelectedElementIds":{"xb76ACKWveGP8NUUduubr":true},"resizingElement":null,"scrolledOutside":true,"scrollX":0,"scrollY":4345.2276611328125,"selectedElementIds":{},"selectedGroupIds":{},"selectedElementsAreBeingDragged":false,"selectionElement":null,"shouldCacheIgnoreZoom":false,"showStats":false,"startBoundElement":null,"suggestedBindings":[],"frameRendering":{"enabled":true,"clip":true,"name":true,"outline":true},"frameToHighlight":null,"editingFrame":null,"elementsToHighlight":null,"toast":null,"viewBackgroundColor":"#ffffff","zenModeEnabled":false,"zoom":{"value":1},"viewModeEnabled":false,"pendingImageElementId":null,"showHyperlinkPopup":false,"selectedLinearElement":null,"snapLines":[],"originSnapOffset":null,"objectsSnapModeEnabled":false,"offsetLeft":483,"offsetTop":-216.609375,"width":954,"height":800}}',
        programs: ["64fcb957b0cf6e9ae43d126d"],
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
