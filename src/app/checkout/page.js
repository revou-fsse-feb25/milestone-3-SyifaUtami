import Highlighted from "@/app/components/Textstyle";

export default function Checkout() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-md">
          <h1 className="font-bold mb-6 text-center"> <Highlighted>Checkout</Highlighted></h1>
          <form action="/api/submit-checkout" method="POST" className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#1ceff4]"
              />
            </div>
  
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 ">Phone Number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#1ceff4]"
              />
            </div>
  
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#1ceff4]"
              />
            </div>
  
            {/* Bank Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Details</label>
              <div className="space-y-3">
                <div>
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Account Number"
                    required
                    className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#1ceff4]"
                  />
                </div>
                <div className="flex gap-4">
                  <input
                    type="date"
                    name="expiry"
                    placeholder="MM/YY"
                    required
                    className="w-1/2 rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#1ceff4]"
                  />
                  <input
                    type="text"
                    name="cvc"
                    placeholder="CVC"
                    required
                    className="w-1/2 rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#1ceff4]"
                  />
                </div>
              </div>
            </div>
  
            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#1C1C1C] text-white py-2 px-4 rounded-lg hover:text-black hover:bg-[#1ceff4] transition"
            >
              Submit Checkout
            </button>
          </form>
        </div>
      </div>
    );
  }
  