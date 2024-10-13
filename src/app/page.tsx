"use client"
import TotalTransactionFeeInUsdt from "@/components/TotalTransactionFeeInUsdt";
import  TransactionHashForm  from "@/forms/transactionHashForm"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useBinanceWebSocket from "@/hooks/useBinanceWebsocket";
import { calculateGasCostInEther } from "@/lib/transaction";
import { TransactionReceipt } from "ethers";
import { useEffect, useState } from "react";

export default function Home() {
  const [transaction, setTransaction] = useState<TransactionReceipt>();
  const [transactionHash, setTransactionHash] = useState<string>("");
  const price = useBinanceWebSocket('ethusdt');
  // const transactionHash = "0xd18fea3de3545393c2b5c572a3495a2664aab00884fd9963f2914b5118c09d36"

  
  useEffect(() => {
    const fetchTransactionByHash = async () => {
      if (!transactionHash) return;

      try {
        const transactionData = await fetch("/api/transaction?" + new URLSearchParams({
          transactionHash: transactionHash
        }).toString());
        const newTransaction = await transactionData.json();
        setTransaction(newTransaction);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTransactionByHash();
  },[transactionHash])

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-5xl">Tokka labs assignment</h1>
      <div className="flex gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              Current usdt/eth price
            </CardTitle>
          </CardHeader>
          <CardContent>
              {price ? (
                <p>${price.toFixed(2)} USDT</p>
              ) : (
                <p>Loading</p>
              )}
          </CardContent>
        </Card>
        <TotalTransactionFeeInUsdt totalGasUsed={transaction?.gasUsed} averageGasPrice={transaction?.gasPrice} currentUsdtEthPrice={price}/>
        <Card>
          <CardHeader>
            <CardTitle>
              Total Ether transaction fee
            </CardTitle>
          </CardHeader>
          <CardContent>
              {transaction? calculateGasCostInEther(transaction.gasUsed, transaction.gasPrice) : <p>Loading...</p>}
          </CardContent>
        </Card>
      </div>
      <div>
        <TransactionHashForm setTransactionHash={setTransactionHash}/>
      </div>
    </div>
  );
}
