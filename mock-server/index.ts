import express from "express";
import path from "path";
import { Product, CartItem, AddItem } from "../src/api";

const app = express()
const port = 3000

app.use("/dist", express.static(path.join(__dirname, "..", "dist")));
app.use(express.static(path.join(__dirname, "public")));

const products: Product[] = [
	{
		id: 1,
		price: 500,
		title: "t-shirt",
		category: "clothes",
		description: "Male t-shirt, M size",
		image: "https://img.freepik.com/free-photo/serious-athletic-young-african-american-model-with-hands-pockets-his-tight-blue-jeans-wearing-white-t-shirt_346278-999.jpg?w=2000",
		rate: {
			count: 5,
			rate: 10,
		},
	},
	{
		id: 2,
		price: 1500,
		title: "big t-shirt",
		category: "clothes",
		description: "Male t-shirt, L size",
		image: "https://img.freepik.com/free-photo/serious-athletic-young-african-american-model-with-hands-pockets-his-tight-blue-jeans-wearing-white-t-shirt_346278-999.jpg?w=2000",
		rate: {
			count: 7,
			rate: 7,
		},
	},
	{
		id: 2,
		price: 1500,
		title: "smart watch",
		category: "electronics",
		description: "A small smart watch",
		image: "",
		rate: {
			count: 2500,
			rate: 9,
		},
	},
];

/**
 * Map of users and carts, containing various cart items
 */
const carts: Record<number, Record<number, CartItem[]>> = {};

app.get("/products", (_, res) => {
	res.status(200).json(products);
});
app.get("/products/:productId", (req, res) => {
	const id = parseInt(req.params.productId);
	if (isNaN(id)) {
		res.status(400).send("Invalid ID in path");
	} else {
		const product = products.find((product) => product.id === id);
		if (product) {
			res.status(200).json(product);
		} else {
			res.status(404).send("Could not find product by id");
		}
	}
});
app.get("/product/categories", (_, res) => {
	res.status(200).send(products.map((product) => product.category));
});
app.get("/products/categories/:category", (req, res) => {
	const category = req.params.category;
	const productsInCategory = products.filter((product) => product.category === category);
	if (!productsInCategory.length) {
		res.status(404).send("No products were found for selected category");
	} else {
		res.status(200).json(productsInCategory);
	}
});
app.get("/carts/user/:userId", (req, res) => {
	const userId = parseInt(req.params.userId);
	if (isNaN(userId)) {
		res.status(400).send("Request contains invalid user id");
	} else {
		const cartList = Object.values(carts[userId] || {});
		if (!cartList.length) {
			res.status(404).send("Cart not found");
		} else {
			res.status(200).json(cartList);
		}
	}
});
app.post("/carts", (req, res) => {
	const body: AddItem = req.body;
	const userId = body.userId;
	const takenCarts = Object.keys(carts[userId] || {});
	const nextCartId = takenCarts.length === 0 ? 1 : Math.max(...takenCarts.map((id) => parseInt(id))) + 1;
	carts[userId] ||= {};
	carts[userId][nextCartId] = body.products;
	res.status(201).json({
		id: nextCartId,
	});
});
app.put("/carts/:cartId", (req, res) => {
	const cartId = parseInt(req.params.cartId);
	if (isNaN(cartId)) {
		res.status(400).send("Invalid cart id in path");
	} else {
		const body: AddItem = req.body;
		const userCarts = carts[body.userId];
		const specificCart = userCarts?.[cartId];
		if (!specificCart) {
			res.status(404).send("Specified cart not found");
		} else {
			specificCart.push(...body.products);
			res.status(201).json({
				id: cartId,
			});
		}
	}
});

app.listen(port, () => {
	console.log(`E-shop listening on port: ${port}`);
})
