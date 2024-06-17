import leafIcon from "assets/images/leafIcon.svg";
import paypal from "assets/images/paypal.png";
import phone from "assets/images/phone.png";
import loc from "assets/images/loc.png";

const Footer = () => {
	return (
		<div className="w-full flex flex-col">
			<div className="w-full bg-primary py-8 flex flex-col items-center justify-center gap-8">
				<div className="flex items-center">
					<span className="text-white font-semibold text-[40px]">Le Coupage</span>
					<img
						src={leafIcon}
						alt="leafIcon"
						className="rotate-90"
					/>
				</div>
				{/** <span className="text-center lg:max-w-[450px] max-w-[90%] text-white text-[15px]">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse optio consequatur.
				</span>  */}	
				<div className="flex lg:flex-row flex-col items-center lg:gap-14 gap-8">
					<a
						href="#"
						className="text-white"
					>
						Produse
					</a>
					<a
						href="#"
						className="text-white"
					>
						Despre
					</a>
					<a
						href="#"
						className="text-white"
					>
						Contact
					</a>
				</div>
				<div className="w-full lg:w-[60%] bg-white opacity-10 h-[1px] my-0 mx-auto"></div>
				<div className="flex lg:w-[60%] w-full my-0 mx-auto lg:flex-row flex-col items-center justify-between">
					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-3">
							<img
								src={phone}
								alt="phone"
							/>
							<span className="text-white font-medium text-[15px]">+373 68 720 841</span>
						</div>
						<div className="flex items-center gap-3">
							<img
								src={loc}
								alt="location"
							/>
							<span className="text-white font-medium text-[15px]">
							<a 
							href="https://www.google.com/maps/place/Strada+Var%C8%99ovia+2,+MD-2060,+Chi%C8%99in%C4%83u,+Moldova/@46.9856211,28.8571377,789m/data=!3m2!1e3!4b1!4m10!1m2!2m1!1sStr.+Var%C8%99ovia+2%2F1!3m6!1s0x40c9794ea762dbfd:0xcdb90b51e5d44ac!8m2!3d46.9856175!4d28.8620086!15sChJTdHIuIFZhcsiZb3ZpYSAyLzGSARFjb21wb3VuZF9idWlsZGluZ-ABAA!16s%2Fg%2F11cpjzqtl8?entry=ttu">
																		Moldova , str.Varsoviei 2/1 , Chisinau 
							</a>
							</span>
						</div>
					</div>
					<div className="flex items-center gap-2">
						{/** 	<img
							src={stripe}
							alt="stripe"
							className="w-[150px]"
						/>*/}
						<img
							src={paypal}
							alt="paypal"
							className="w-[200px]"
						/>   	
					</div>
				</div>
			</div>
			<div className="w-full bg-darkFooter h-[57px] flex items-center justify-between lg:px-[100px] px-5">
				<span className="text-white text-[15px] z-50">&copy;
					All rights are reserved by <a href=""> Le Coupage </a> & <a href="#">Bogdan Rusu</a>. 2024
				</span>
				<div className="flex items-center gap-4 z-50">
				</div>
			</div>
		</div>
	);
};

export default Footer;
