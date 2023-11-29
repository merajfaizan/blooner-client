/* eslint-disable react/prop-types */

const DonorCard = ({ donor }) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden w-full sm:w-96 md:w-80 lg:w-96 xl:w-80 mx-auto">
      {/* User Photo */}
      <div className="overflow-hidden h-48">
        <img
          className="w-full h-full object-cover object-top"
          src={donor.avatarUrl}
          alt="User"
        />
      </div>

      {/* User Information */}
      <div className="p-4">
        <h2 className="text-xl font-bold">Name: {donor.name}</h2>
        <h2 className="text-xl font-bold  mb-2">
          Blood Group: {donor.bloodGroup}
        </h2>
        <p className="text-gray-600 mb-2">Email: {donor.email}</p>
        <p className="text-gray-600 mb-2">District: {donor.district}</p>
        <p className="text-gray-600 mb-2">Upazila: {donor.upazila}</p>
      </div>
    </div>
  );
};

export default DonorCard;
