"use client";
import React, { useState, useEffect } from "react";
import { getActiveListings, buyNFT, editPrice } from "../utils/functions";

const NFTCatalog = ({connected,
  setConnected,
  setWalletAddress}) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    getActiveListings(connected, setConnected, setWalletAddress, setNfts);
  }, []);

  const handleBuyClick = async (nft) => {
    await buyNFT(nft[0], nft[2], nft[3], connected, setConnected, setWalletAddress);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 mt-4">NFT Marketplace</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {nfts.map((nft, index) => (
          <div key={index} className="p-4 flex flex-col items-center bg-slate-700 border border-gray-300 rounded-lg">
            <div className="flex flex-col bg-base-100 px-12 py-12 text-center items-center max-w-lg rounded-3xl">
              <p className="text-sm font-semibold">Price: {nft[3].toString()}</p>
              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded" onClick={() => handleBuyClick(nft)}>Buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTCatalog;
