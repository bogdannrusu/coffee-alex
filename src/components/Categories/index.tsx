import { categories } from "@/data";
import goldBean from "assets/images/goldBean.png";
import { useLanguage } from "../Language/LanguageContext";

const Categories = () => {
	const { t } = useLanguage();
	return (
		<div className="w-full lg:px-[100px] px-5 flex flex-col pt-[70px] gap-8">
			<div className="flex items-center justify-between w-full">
				<div className="flex items-center gap-2">
					<img
						src={goldBean}
						alt="goldBean"
					/>
					<div className="flex flex-col gap-1">
						<span className="text-primary font-semibold text-[20px]">
							{t("Categories")}
							</span>
						<span className="text-primary font-medium">
							{t("We chose the best of the best!")}	
						</span>
					</div>
				</div>
			</div>
			<div className="w-full flex items-center justify-between gap-8 overflow-x-auto pb-6 z-50">
				{categories.map((cat) => (
					<div
						key={cat.title}
						className="flex flex-col items-center gap-3 cursor-pointer z-50"
					>
						<div className="flex flex-col items-center justify-center border border-catBorder rounded-[10px] w-[85px] h-[105px]">
							<img
								src={cat.image}
								alt={cat.title}
							/>
						</div>
						<span className="text-primary font-medium text-center text-[15px]">
							{cat.title}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Categories;
