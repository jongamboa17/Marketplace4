"use client";
import { useState } from "react";
import ConnectionButton from "../components/ConnectionButton";
import ListNFTs from "../components/ListNFT";
import NFTCatalog from "../components/nftCatalog";

function App() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

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
        </div>
      </div>
      
      <div className="mt-20"> 
        <ListNFTs />
      </div>
      <div className="mt-20">
        <NFTCatalog />
      </div>
    </>
  );
}

export default App;
