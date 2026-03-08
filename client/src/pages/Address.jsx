import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Address = () => {
  const [address, setAddress] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const { axios, user, setUser, navigate, setShowUserLogin } =
    useContext(AppContext);
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const submitHanlder = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/address/add", { address });
      console.log("data", data);
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response?.data?.message?.includes("Unauthorized")) {
        toast.error("Session expired. Please login again.");
        setUser(null);
        return;
      }
      toast.error(error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    if (!user) {
      setShowUserLogin(true);
    }
  }, [user]);
  return (
    <div className="mt-12 max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Address Details
      </h2>
      <form
        onSubmit={submitHanlder}
        className="grid grid-cols-1 gap-4"
      >
        <div>
          <label className="block text-gray-600 font-medium">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={address.firstName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={address.lastName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={address.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            value={address.street}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Zip Code</label>
          <input
            type="number"
            id="zipCode"
            name="zipCode"
            value={address.zipCode}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={address.country}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Phone</label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            id="submitAddress"
            name="submitAddress"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-md font-medium transition duration-300"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>

      {/* Right Side: Image */ }
  <div className="flex-1 flex items-center justify-center">
    <img
      src={assets.add_address_iamge}
      alt="Address Illustration"
      className="w-full max-w-xs rounded-lg shadow-md"
    />
  </div>
    </div >
  );
};

export default Address;
