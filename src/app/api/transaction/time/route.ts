import { getUniswapTransactionsBetweenBlockNumber } from "@/lib/transaction";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    
    const startBlock = searchParams.get("startBlock");
    const endBlock = searchParams.get("endBlock");
    const page = searchParams.get("page");
    const offset = searchParams.get("offset");

    const response = await getUniswapTransactionsBetweenBlockNumber(startBlock, endBlock, page, offset)
    return Response.json(response);
}