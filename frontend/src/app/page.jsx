"use client";
import { useEffect, useState } from "react";
import ConnectionButton from "../components/ConnectionButton";
import ListNFTs from "../components/ListNFT";
import NFTCatalog from "../components/nftCatalog";
import { connectWallet } from "../utils/connectWallet";

function App () {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [listNFTModalOpen, setListNFTModalOpen] = useState(false);

  useEffect(() => {
    const connect = async () => {
      await connectWallet(connected, setConnected, setWalletAddress);
    };
    connect();
  }, []);

  return (
    <>
      <div className="mt-2 ">
        <div className="absolute top-0 right-0 m-4">
          {walletAddress && (
            <h4 className="text-sm text-green-400 font-bold inline-block mr-2">
              Address: {walletAddress}
            </h4>
          )}
          <ConnectionButton
            connected={connected}
            setConnected={setConnected}
            setWalletAddress={setWalletAddress}
          />
          <button
            onClick={() => setListNFTModalOpen(true)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            List NFT
          </button>
        </div>
      </div>
      <div className="mt-20"> 
        {listNFTModalOpen && (
          <ListNFTs
            connected={connected}
            setConnected={setConnected}
            setWalletAddress={setWalletAddress}
            setListNFTModalOpen={setListNFTModalOpen}
          />
        )} 
      </div>
      <div className="mt-20">
        <NFTCatalog connected={connected} setWalletAddress={setWalletAddress} setConnected={setConnected} /> 
      </div>
    </>
  );
}

export default App;