/* eslint-disable react/prop-types */
const ServiceCard = ({ img, title, desc }) => {
  return (
    <div className="flex flex-col justify-between items-center bg-[#F5F7F8] p-5 rounded-lg">
      <div>
        <img className="rounded w-full h-40" src={img} alt="blood-bank" />
        <h1 className="text-2xl py-2 font-medium">{title}</h1>
        <p className="text-base pb-3">{desc}</p>
      </div>
      <button className="text-lg font-medium bg-[#1a1a1a] text-white rounded py-2 w-full">
        Contact Us
      </button>
    </div>
  );
};

export default ServiceCard;
