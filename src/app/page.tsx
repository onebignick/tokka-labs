"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useBinanceWebSocket from "@/hooks/useBinanceWebsocket";

export default function Home() {
  const price = useBinanceWebSocket('ethusdt');

  return (
    <div>
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
        <Card>
          <CardHeader>
            <CardTitle>
              Total usdt transaction fee
            </CardTitle>
          </CardHeader>
          <CardContent>
              0
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
