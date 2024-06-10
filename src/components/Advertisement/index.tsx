const Advertisement = () => {
	return (
		<div className="w-full flex lg:flex-row flex-col justify-between lg:px-[180px] px-5 gap-5 mt-[100px] lg:mb-[120px] mb-16">
			{[...Array(4)].map(() => (
				<div className="grid place-items-center w-full rounded-[24px]">
		
				</div>
			))}
		</div>
	);
};

export default Advertisement;
