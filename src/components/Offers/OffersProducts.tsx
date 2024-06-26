import { offerProducts } from "@/data";
import { useLanguage } from "../Language/LanguageContext";

const OffersProducts = () => {
	const { t } = useLanguage();
	return (
		<div className="w-full flex items-center justify-between gap-[30px]">
			{offerProducts.map((product, index: number) => (
				<div
					key={index}
					className={`w-full rounded-[20px] border-[1.5px] border-catBorder flex flex-col px-8 pt-8 pb-4 relative cursor-pointer ${
						index !== 0 ? "hidden lg:flex" : "flex"
					}`}
				>
					<div className="absolute text-[15px] font-medium top-4 left-4 text-white rounded-[30px] py-[2px] px-3 items-center justify-center bg-primary">
						{t(product.discount)}
					</div>
					<img
						src={t(product.image)}
						alt={t(product.title)}
						className="w-[47%] my-0 mx-auto"
					/>
					<div className="flex items-center justify-between w-full mt-8">
						<div className="flex flex-col">
							<span className="text-primary font-medium text-[17px]">{t(product.title)}</span>
							<span className="text-disabledText text-[15px]">{t(product.cat)}</span>
						</div>
						<div className="flex flex-col">
							<span className="text-disabledText font-semibold line-through">
								{t(product.oldPrice)}
							</span>
							<span className="text-secondary font-semibold">{t(product.price)}</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default OffersProducts;
