import one from "assets/images/one.png";
import two from "assets/images/two.png";
import three from "assets/images/three.png";
import four from "assets/images/four.png";
import five from "assets/images/five.png";
import six from "assets/images/six.png";
import seven from "assets/images/seven.png";
import eight from "assets/images/eight.png";
import nine from "assets/images/nine.png";
import dp3 from "assets/images/dp3.png";
import t1 from "assets/images/t1.png";
import t2 from "assets/images/t2.png";
import t3 from "assets/images/t3.png";

export const categories = [
	{ title: "Americano", image: one },
	{ title: "Espresso", image: two },
	{ title: "Latte", image: three },
	{ title: "Cappuccino", image: four },
	{ title: "Ice Latte", image: five },
	{ title: "Crepe Maker", image: six },
	{ title: "Water Boiler", image: seven },
	{ title: "Steam Equipments", image: eight },
	{ title: "Cakes & Candies", image: nine },
];

export const navItems = [
	{ title: "Home", path: "/" },
	{ title: "Products", path: "/" },
	{ title: "Trainings", path: "/" },
	{ title: "About", path: "/" },
	{ title: "Contacts", path: "/" },
];

export const initialOffersNav = [
	{ title: "Coffee beans", active: true },
	{ title: "Coffee beans", active: false },
	{ title: "Coffee beans", active: true },
	{ title: "Coffee beans", active: true },
	{ title: "Coffee beans", active: true },

];

export const offerProducts = [
	{
		title: "Boxilian Coffee Beans",
		cat: "Coffee beans",
		oldPrice: "$290",
		price: "$240",
		discount: "10%",
		image: dp3,
	},
	{
		title: "Boxilian Coffee Beans",
		cat: "Coffee beans",
		oldPrice: "$290",
		price: "$240",
		discount: "15%",
		image: dp3,
	},
	{
		title: "Boxilian Coffee Beans",
		cat: "Coffee beans",
		oldPrice: "$290",
		price: "$240",
		discount: "20%",
		image: dp3,
	},
];

export const initialTopSellers = [
	{ title: "Toate Categoriile", active: true },
	{ title: "Americano", active: false },
	{ title: "Espresso", active: false },
	{ title: "Latte", active: false },
	{ title: "Milkshake", active: false },
	{ title: "Cold Tea's", active: false },
];

export const tutorialsList = [
	{
		title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		image: t1,
		date: "May 2024",
	},
	{
		title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		image: t2,
		date: "Oct 2023",
	},
	{
		title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		image: t3,
		date: "April 2023",
	},
];
