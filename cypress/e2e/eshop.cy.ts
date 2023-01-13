describe("Users can shop with us", () => {
	it("loads main page", () => {
		cy.visit("http://localhost:3000");
		cy.get("#id_1").click();
		cy.get("h1").should("have.text", "t-shirt");
	})
})