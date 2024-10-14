"use client"
import TotalTransactionFeeInUsdt from "@/components/TotalTransactionFeeInUsdt";
import TotalTransactionFeeInEther from "@/components/TotalTransactionFeeInEther";
import TransactionHashForm  from "@/forms/transactionHashForm"
import TimestampForm from "@/forms/timestampForm";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useBinanceWebSocket from "@/hooks/useBinanceWebsocket";
import { useEffect, useState } from "react";
import { DataTable } from "@/datatable/DataTable";
import { columns } from "@/datatable/transactionResults/DataTableColumns";
import { Transaction } from "@/types/transaction";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [totalGasUsed, setTotalGasUsed] = useState<bigint>();
  const [averageGasPrice, setAverageGasPrice] = useState<bigint>();
  const [transactionQuery, setTransactionQuery] = useState<string[]>(["", "", "1", "50"])
  const [transactionData, setTransactionData] = useState<Transaction[]>([])
  const price = useBinanceWebSocket('ethusdt');

  
  useEffect(() => {
    const fetchTransactionByHash = async () => {
      if (!transactionHash) return;

      try {
        const transactionData = await fetch("/api/transaction?" + new URLSearchParams({
          transactionHash: transactionHash
        }).toString());
        const newTransaction = await transactionData.json();

        console.log("newTransaction")
        console.log(newTransaction)
        setTransactionData(newTransaction);
        console.log("transactionData" + transactionData)

      } catch (err) {
        console.error(err);
      }
    };

    fetchTransactionByHash();
  },[transactionHash])

  useEffect(() => {
    const fetchTransactionByRange = async () => {
      console.log("transaction Query " + transactionQuery)
      if (!transactionQuery[0] || !transactionQuery[1]) {return;}
      console.log("pulling transaction");
      try {
        const transaction = await fetch("/api/transaction/time?" + new URLSearchParams({
          startBlock: transactionQuery[0],
          endBlock: transactionQuery[1],
          page: transactionQuery[2],
          offset: transactionQuery[3]
        }).toString())
        const transactionData = await transaction.json();
        setTransactionData(transactionData.result);
      } catch (error) {
        console.log(error)
      }
    }
    
    fetchTransactionByRange();
    console.log(transactionQuery);

  }, [transactionQuery])
  
  useEffect(() => {
    if (transactionData.length > 0) {
      let gasUsed: bigint = BigInt(0);
      let gasPrice: bigint = BigInt(0);
      for (let i=0;i<transactionData.length;i++) {
        gasUsed += BigInt(transactionData[i].gasUsed);
        gasPrice += BigInt(transactionData[i].gasPrice);
      }

      setAverageGasPrice(gasPrice/BigInt(transactionData.length))
      setTotalGasUsed(gasUsed);
    }
  }, [transactionData])

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
        <TotalTransactionFeeInUsdt totalGasUsed={totalGasUsed} averageGasPrice={averageGasPrice} currentUsdtEthPrice={price}/>
        <TotalTransactionFeeInEther totalGasUsed={totalGasUsed} averageGasPrice={averageGasPrice}/>
      </div>
      <div className="flex gap-4 justify-evenly">
        <TransactionHashForm setTransactionHash={setTransactionHash}/>
        <TimestampForm transactionQuery={transactionQuery} setTransactionQuery={setTransactionQuery}/>
      </div>
      <div>
        <DataTable columns={columns} data={transactionData}/>
      </div>
    </div>
  );
}
