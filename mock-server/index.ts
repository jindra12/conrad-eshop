import express from "express";
import path from "path";
import { Product, CartItem, AddItem, CartResult } from "../src/api";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const jsonParser = bodyParser.json()

const index = express.static(path.join(__dirname, "public"));
app.use("/dist", express.static(path.join(__dirname, "..", "dist")));
app.use(index);
app.use("/products", index);
app.use("/products/:productId", index);
app.use("/cart", index);

const products: Product[] = [
	{
		id: 1,
		price: 500,
		title: "t-shirt",
		category: "clothes",
		description: "Male t-shirt, M size",
		image: "https://img.freepik.com/free-photo/serious-athletic-young-african-american-model-with-hands-pockets-his-tight-blue-jeans-wearing-white-t-shirt_346278-999.jpg?w=2000",
		rating: {
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
		rating: {
			count: 7,
			rate: 7,
		},
	},
	{
		id: 3,
		price: 1500,
		title: "smart watch",
		category: "electronics",
		description: "A small smart watch",
		image: "",
		rating: {
			count: 2500,
			rate: 9,
		},
	},
];

/**
 * Map of users and carts, containing various cart items
 */
const carts: Record<number, Record<number, CartItem[]>> = {};

app.get("/api/products", (_, res) => {
	res.status(200).json(products);
});
app.get("/api/products/:productId", (req, res) => {
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
app.get("/api/product/categories", (_, res) => {
	res.status(200).send(products.map((product) => product.category));
});
app.get("/api/products/categories/:category", (req, res) => {
	const category = req.params.category;
	const productsInCategory = products.filter((product) => product.category === category);
	if (!productsInCategory.length) {
		res.status(404).send("No products were found for selected category");
	} else {
		res.status(200).json(productsInCategory);
	}
});
app.get("/api/carts/user/:userId", (req, res) => {
	const userId = parseInt(req.params.userId);
	if (isNaN(userId)) {
		res.status(400).send("Request contains invalid user id");
	} else {
		const cartList = Object.entries(carts[userId] || {}).reduce((p: CartResult[], [key, cartItems]) => {
			const date = new Date();
			const month = date.getMonth() + 1;
			const day = date.getDate();
			const stringify = `${date.getFullYear()}-${month <= 9 ? `0${month}` : month}-${day <= 9 ? `0${day}` : day}`;
			p.push({
				userId: userId,
				id: parseInt(key),
				products: cartItems,
				date: stringify,
			});
			return p;
		}, []);
		res.status(200).json(cartList);
	}
});
app.post("/api/carts", jsonParser, (req, res) => {
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
app.put("/api/carts/:cartId", jsonParser, (req, res) => {
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
			userCarts[cartId] = body.products;
			res.status(201).json({
				id: cartId,
			});
		}
	}
});

app.listen(port, () => {
	console.log(`E-shop listening on port: ${port}`);
})
