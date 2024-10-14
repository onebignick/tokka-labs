import { getTransactionDataByHash } from "@/lib/transaction";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const transactionHash = searchParams.get("transactionHash")!;
    const transactionResult = await getTransactionDataByHash(transactionHash);
    console.log(transactionResult)
    return Response.json(transactionResult);
}