"use client";
import { useState } from "react";
import Image from "next/image";
import ShippingAddressPopup from "@/components/popup/ShippingAddressPopup";
import { comments } from "@/utils/comments";

export default function AuctionRegisterSlider({ onClose }) {
  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showShippingPopup, setShowShippingPopup] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      type: "Home",
      address:
        "123 Imaginary Street, Fictitious City, Makebelieve County, Dreamland 56789",
    },
    {
      type: "Office",
      address:
        "456 Enchanted Avenue, Fantasiaville, Wonderland State, Dreamland 98765",
    },
  ]);

  const addNewAddress = (newAddress) => {
    const newAddressObj = {
      type: newAddress.name,
      address: newAddress.address,
    };
    setAddresses([...addresses, newAddressObj]);
    setSelectedAddress(addresses.length);
    setShowShippingPopup(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black bg-opacity-40">
      <div className="absolute bottom-0 right-0 flex h-[90vh] w-[500px] flex-col overflow-hidden rounded-tl-3xl bg-white shadow-lg">
        <div className={`flex items-center justify-between p-4 ${step !== 2 && "border-b" }`}>
          <button onClick={onClose} className="text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="flex-grow text-center text-xl font-semibold">
            {step === 1 && "Auction Registration"}
            {step === 3 && "Q&A Section"}
          </h2>
          {step !== 2 && <div className="w-6"></div>}
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-4">
          {step === 1 && (
            <div className="space-y-4">
              <div
                onClick={() => setStep(2)}
                className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-100 p-4"
              >
                <div>
                  <p className="flex items-center gap-2 font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-teal-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Ship To
                  </p>
                  {selectedAddress !== null ? (
                    <p className="text-gray-600">
                      {addresses[selectedAddress].type} -{" "}
                      {addresses[selectedAddress].address}
                    </p>
                  ) : (
                    <p className="text-gray-500 w-full text-center">Select Shipping Address</p>
                  )}
                </div>
                <span className="text-teal-500">+</span>
              </div>
              <div className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-100 p-4">
                <div>
                  <p className="flex items-center gap-2 font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-teal-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path
                        fillRule="evenodd"
                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Payment Method
                  </p>
                  <p className="text-gray-500">Add Payment Method</p>
                </div>
                <span className="text-teal-500">+</span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col h-full">
                <div className="flex-grow overflow-y-auto">
                    <div className="flex items-center gap-4 mb-4 px-4 border-b pb-3">
                        <button 
                            onClick={() => setStep(1)} 
                            className="text-gray-600"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-6 w-6" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M15 19l-7-7 7-7" 
                                />
                            </svg>
                        </button>
                        <h2 className="text-xl font-semibold flex-grow">Select Shipping Address</h2>
                    </div>

                    <div className="space-y-4 px-4">
                        {addresses.map((addr, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setSelectedAddress(index);
                                    setStep(1);
                                }}
                                className={`cursor-pointer rounded-lg border p-4 ${
                                    selectedAddress === index
                                    ? "border-teal-500 bg-teal-50" 
                                    : "border-gray-200 bg-white"
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">{addr.type}</p>
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="h-4 w-4 text-teal-500" 
                                                viewBox="0 0 20 20" 
                                                fill="currentColor"
                                            >
                                                <path 
                                                    fillRule="evenodd" 
                                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
                                                    clipRule="evenodd" 
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-gray-600">{addr.address}</p>
                                    </div>
                                    {selectedAddress === index && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-teal-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t flex justify-center w-full p-4">
                    <button
                        onClick={() => setShowShippingPopup(true)}
                        className="px-20 py-3 rounded-full bg-moonstone text-white"
                    >
                        + New Address
                    </button>
                </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-davyGray font-medium">22 Comments</span>
                </div>
                <div className="relative">
                  <select className="text-eerieBlack font-medium text-xs appearance-none border-none focus:outline-none outline-none bg-white rounded-full px-3 py-1">
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Most Relevant</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center px-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex-grow space-y-4 overflow-y-auto p-4 pb-20">
                {comments.map((comment, index) => (
                  <div key={index} className="space-y-2">
                    {/* Original Question */}
                    <div className="flex items-start space-x-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={comment.image || "/default-avatar.png"}
                          alt={comment.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{comment.name}</p>
                        <p className="text-sm text-gray-600">
                          {comment.question}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">4 hours ago</p>
                      </div>
                    </div>

                    {/* Replies */}
                    {comment.replies.map((reply, replyIndex) => (
                      <div key={replyIndex} className="pl-10 relative">
                        {/* Vertical dotted line */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-gray-300"></div>
                        
                        <div className="flex items-start space-x-3 ml-4">
                          <div className="h-8 w-8 overflow-hidden rounded-full">
                            <Image
                              src={reply.image || "/default-avatar.png"}
                              alt={reply.name}
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">
                              {reply.name} 
                              <span className="text-gray-500 text-sm ml-1">{reply.role}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                              {reply.response}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">2 min ago</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t bg-white p-4">
                <div className="relative">
                  <input
                    className="w-full rounded-full bg-gray-300 border p-2 pl-4 pr-10"
                    placeholder="Type your message..."
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 transform text-teal-500">
                    <Image src="arrow.svg" alt="Send button" width={20} height={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {step === 1 && (
          <div className="border-t p-4 flex justify-center">
            <button
              className="px-20 py-3 rounded-full bg-gray-400 text-white"
              onClick={() => {
                // Only proceed if an address is selected
                if (selectedAddress !== null) {
                  setStep(3);
                }
              }}
              disabled={selectedAddress === null}
            >
              Submit Registration
            </button>
          </div>
        )}
      </div>

      {/* Shipping Address Popup */}
      {showShippingPopup && (
        <ShippingAddressPopup
          onClose={() => setShowShippingPopup(false)}
          onSave={addNewAddress}
        />
      )}
    </div>
  );
}
