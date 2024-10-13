import { calculateGasCostInUsdt } from "@/lib/transaction";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Props {
    totalGasUsed: bigint | undefined;
    averageGasPrice: bigint | undefined;
    currentUsdtEthPrice: number | null;
}

export default function TotalTransactionFeeInUsdt({
    totalGasUsed,
    averageGasPrice,
    currentUsdtEthPrice
} : Props) {
    if (!totalGasUsed || !averageGasPrice || !currentUsdtEthPrice) {
        return (
            <Card>
            <CardHeader>
                <CardTitle>
                Total usdt transaction fee
                </CardTitle>
            </CardHeader>
            <CardContent>
                Pending input...
            </CardContent>
            </Card>
        )
    } else {
    return (
            <Card>
            <CardHeader>
                <CardTitle>
                Total usdt transaction fee
                </CardTitle>
            </CardHeader>
            <CardContent>
                {calculateGasCostInUsdt(totalGasUsed, averageGasPrice, currentUsdtEthPrice)}
            </CardContent>
            </Card>
        )
    }
}