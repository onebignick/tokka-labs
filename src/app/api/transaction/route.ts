import { getTransactionDataByHash } from "@/lib/transaction";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const transactionHash = searchParams.get("transactionHash")!;
    const result = await getTransactionDataByHash(transactionHash);
    return Response.json(result);
}