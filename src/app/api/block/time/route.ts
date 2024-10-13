import { blockNumberBinarySearch } from "@/lib/transaction";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const timerange: number[] = [];
    const startTimestamp = searchParams.get("startTimestamp")!;
    timerange.push(await blockNumberBinarySearch(startTimestamp));
    const endTimestamp = searchParams.get("endTimestamp");
    timerange.push(await blockNumberBinarySearch(endTimestamp));
    return Response.json(timerange);
}