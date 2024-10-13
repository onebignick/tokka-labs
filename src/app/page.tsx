"use client"
import TotalTransactionFeeInUsdt from "@/components/TotalTransactionFeeInUsdt";
import TransactionHashForm  from "@/forms/transactionHashForm"
import TimestampForm from "@/forms/timestampForm";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useBinanceWebSocket from "@/hooks/useBinanceWebsocket";
import { calculateGasCostInEther } from "@/lib/transaction";
import { TransactionReceipt } from "ethers";
import { useEffect, useState } from "react";

export default function Home() {
  const [transaction, setTransaction] = useState<TransactionReceipt>();
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [transactionQuery, setTransactionQuery] = useState<string[]>(["20850190", "20893217", "1", "50"])
  const price = useBinanceWebSocket('ethusdt');

  
  useEffect(() => {
    const fetchTransactionByHash = async () => {
      if (!transactionHash) return;

      try {
        const transactionData = await fetch("/api/transaction?" + new URLSearchParams({
          transactionHash: transactionHash
        }).toString());
        const newTransaction = await transactionData.json();
        console.log(newTransaction);
        setTransaction(newTransaction);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTransactionByHash();
  },[transactionHash])

  useEffect(() => {
    const fetchTransactionByRange = async () => {
      try {
        const transaction = await fetch("/api/transaction/time?" + new URLSearchParams({
          startBlock: transactionQuery[0],
          endBlock: transactionQuery[1],
          page: transactionQuery[2],
          offset: transactionQuery[3]
        }).toString())
        const transactionData = await transaction.json();
        console.log(transactionData)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTransactionByRange();
  }, [transactionQuery])

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
      <div className="flex gap-4 justify-evenly">
        <TransactionHashForm setTransactionHash={setTransactionHash}/>
        <TimestampForm transactionQuery={transactionQuery} setTransactionQuery={setTransactionQuery}/>
      </div>
    </div>
  );
}
