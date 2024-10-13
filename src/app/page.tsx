import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
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
              $1000
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
