import React, { useState } from "react";
import Image from "next/image";

const NFTCatalog = () => {
  const [nfts, setNfts] = useState([
    {
      id: 1,
      price: "0.5 ETH",
      title: "NFT 1",
    },
    {
      id: 2,
      price: "1.0 ETH",
      title: "NFT 2",
    },
    {
      id: 3,
      price: "0.75 ETH",
      title: "NFT 3",
    },
    {
      id: 4,
      price: "0.75 ETH",
      title: "NFT 4",
    },
    {
      id: 5,
      price: "0.75 ETH",
      title: "NFT 5",
    },
    {
      id: 6,
      price: "0.75 ETH",
      title: "NFT 6",
    },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  const handleEditClick = (index) => {
    setEditIndex(index);
    setNewPrice(nfts[index].price);
  };

  const handlePriceChange = (e) => {
    setNewPrice(e.target.value);
  };

  const handleSaveClick = (index) => {
    const updatedNfts = [...nfts];
    updatedNfts[index].price = newPrice;
    setNfts(updatedNfts);
    setEditIndex(null);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 mt-4">NFT Marketplace</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {nfts.map((nft, index) => (
          <div key={nft.id} className="p-4 flex flex-col items-center bg-slate-700 border border-gray-300 rounded-lg">
            <div className="flex flex-col bg-base-100 px-12 py-12 text-center items-center max-w-lg rounded-3xl">
              <h3 className="text-lg font-semibold">{nft.title}</h3>
              {editIndex === index ? (
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    value={newPrice}
                    onChange={handlePriceChange}
                    className="text-xs font-semibold text-black "
                    style={{ width: '120px' }} // Increased width
                  />
                  <button onClick={() => handleSaveClick(index)} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                </div>
              ) : (
                <p className="text-sm font-semibold">Price: {nft.price}</p>
              )}
              <button onClick={() => handleEditClick(index)} className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded">Edit Price</button>
              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">Buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTCatalog;
