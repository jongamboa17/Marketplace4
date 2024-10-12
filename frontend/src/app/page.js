"use client";
import { useState } from "react";
import ConnectionButton from "../components/ConnectionButton"; // Import the component
import ListNFTs from "../components/ListNFT";
import NFTCatalog from "../components/nftCatalog";

function App() {
  // State variables for wallet connection status and address
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
      {/* Separar las secciones para evitar traslape */}
      <div className="mt-20"> {/* Aumentar el margen superior para separar las secciones */}
        <ListNFTs />
      </div>
      <div className="mt-20">
        <NFTCatalog />
      </div>
    </>
  );
}

export default App;
