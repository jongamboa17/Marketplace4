import React from "react";
import { connectWallet } from "../utils/connectWallet";

function ConnectionButton({ connected, setConnected, setWalletAddress }) {
  return (
    <button
      className={`btn px-4 py-2 rounded-lg text-white ${
        connected ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
      } transition duration-300 ease-in-out`}
      onClick={() => connectWallet(connected, setConnected, setWalletAddress)}
    >
      {connected ? "Disconnect Wallet" : "Connect Wallet"}
    </button>
  );
}

export default ConnectionButton;
