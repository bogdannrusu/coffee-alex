import bean from "assets/images/bean.svg";
import logo from "assets/images/logo.png";
import menu from "assets/images/menu.svg";
import shopping from "assets/images/shopping.svg";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
	const navigate = useNavigate();

	const handleGoodsView = () => {
		navigate("/goods");
	}
	return (
		<div className="w-full flex items-center justify-between">
			<div className="flex items-center gap-3">
				<img
					src={ shopping }
					alt="shopping-button"
					className="cursor-pointer"
				/>
				<button onClick={ handleGoodsView } className="rounded-full outline-none shadow-none border border-primary text-primary font-medium px-3 py-2 lg:block hidden">
					Login
				</button>
			</div>
			<div className="flex flex-col">
				<div className="flex items-center gap-12">
					<img
						src={ logo }
						alt="shopping-button"/
						className="cursor-pointer"
					/>
					<span className="text-primary font-medium text-[18px]">Le Coupage</span>
				</div>
				<span className="text-primary text-sm">Coffe & alte senzatii nemaiîntâlnite
			</span>
			</div>
			<div className="flex items-center gap-3">
				<img
					src={bean}
					alt="shopping-button"
					className="cursor-pointer lg:block hidden"
				/>
				<img
					src={menu}
					alt="shopping-button"
					className="cursor-pointer lg:hidden block w-[53px]"
				/>
				<div className="lg:flex hidden flex-col">
					<span className="font-semibold text-secondary">+373</span>
					<span className="font-semibold text-primary">68720841</span>
				</div>
			</div>
		</div>
	);
};

export default TopNav;
