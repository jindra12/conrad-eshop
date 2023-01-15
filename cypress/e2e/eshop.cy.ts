describe("Users can shop with us", () => {
	it("allows user to visit a link", () => {
		cy.visit("http://localhost:3000");
		cy.get("#link_1").click();
		cy.get(".ant-card-meta-title").should("have.text", "t-shirt");
	});
	it("allows user to purchase items", () => {
		cy.visit("http://localhost:3000");
		cy.get("#buy_1").click();
		cy.get("#buy_1").click();
		cy.get("#buy_2").click();
		cy.get("#buy_3").click();
		cy.get("#link_1").click();
		cy.get("#count_1").should("have.value", "2");
		cy.get("#count_1").clear().type("3");
		cy.get("#buy_1").click();
		cy.visit("http://localhost:3000/cart");
		cy.get("#count_1").should("have.value", "3");
		cy.get("#count_2").should("have.value", "1");
		cy.get("#count_3").should("have.value", "1");
		cy.get("#remove_3").click();
		cy.get("#count_3").should("not.exist");
		cy.reload();
		cy.get("#count_1").should("have.value", "3");
		cy.get("#count_2").should("have.value", "1");
		cy.get("#count_3").should("not.exist");
	});
})