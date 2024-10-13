
import { calculateGasCostInEther } from "@/lib/transaction";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Props {
    totalGasUsed: bigint | undefined;
    averageGasPrice: bigint | undefined;
}

export default function TotalTransactionFeeInUsdt({
    totalGasUsed,
    averageGasPrice,
} : Props) {
    if (!totalGasUsed || !averageGasPrice) {
        return (
            <Card>
            <CardHeader>
                <CardTitle>
                Total Ether transaction fee
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
                Total Ether transaction fee
                </CardTitle>
            </CardHeader>
            <CardContent>
                {calculateGasCostInEther(totalGasUsed, averageGasPrice)}
            </CardContent>
            </Card>
        )
    }
}