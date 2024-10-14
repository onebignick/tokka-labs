import { EtherscanProvider, formatEther } from "ethers";
import { Transaction } from "@/types/transaction";

const etherscanApiKey = process.env.ETHERSCAN_API_KEY!
const uniswapUsdcEthContractAddress = "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2";
const provider = new EtherscanProvider("homestead", etherscanApiKey);

export async function getTransactionDataByHash(hash: string) {
    const transaction = await provider.getTransactionReceipt(hash);
    const result: Transaction[] = []
    if (transaction) {
        const curBlock = await provider.getBlock(transaction.blockNumber)
        const temp = {
            blockNumber: transaction.blockNumber.toString(),
            timeStamp: curBlock?.timestamp.toString(),
            hash: transaction.hash.toString(),
            nonce: curBlock?.nonce.toString(),
            blockHash: curBlock?.hash?.toString(),
            from: transaction.from.toString(),
            contractAddress: transaction.contractAddress?.toString(),
            to: transaction.to?.toString(),
            value: "",
            tokenName: "",
            tokenSymbol: "",
            tokenDecimal: "",
            transactionIndex: transaction.index.toString(),
            gas: "".toString(),
            gasPrice: transaction.gasPrice.toString(),
            gasUsed: transaction.gasUsed.toString(),
            cumulativeGasUsed: transaction.cumulativeGasUsed.toString(),
            input: "",
            confirmations: "",
        } as Transaction
        result.push(temp)
    }
    return result;
}

export function calculateGasCostInUsdt(gasUsed: bigint, gasPriceWei: bigint, usdtEthRate: number) {
    const totalCostEther = calculateGasCostInEther(gasUsed, gasPriceWei);
    const totalCostUsdt = totalCostEther * usdtEthRate;
    return totalCostUsdt;
}

export function calculateGasCostInEther(gasUsed: bigint, gasPriceWei: bigint) {
    const gasPriceEther = formatEther(gasPriceWei);
    const totalCostEther = Number(gasUsed) * parseFloat(gasPriceEther);
    return totalCostEther
}

export async function getUniswapTransactionsBetweenBlockNumber(startBlock: string, endBlock: string, page: string, offset: string) {
    const response = await fetch("https://api.etherscan.io/api?" + new URLSearchParams({
        module: "account",
        action: "tokentx",
        contractaddress: uniswapUsdcEthContractAddress,
        page: page,
        offset: offset,
        startblock: startBlock,
        endblock: endBlock,
        sort: "desc",
        apiKey: etherscanApiKey
    }))
    return await response.json();
    
}

export async function blockNumberBinarySearch(timestampString: string, isEnd: boolean) {
    const timestamp = Number(timestampString);
    let low = 0;
    let high = await provider.getBlockNumber(); // current latest block number
    let mid;

    while (low < high) {
        mid = (low+high)/2 >> 0;
        if (timestamp < (await provider.getBlock(mid))!.timestamp) {
            high = mid;
        } else {
            low = mid+1;
        }
    }
    
    if (isEnd) return high;
    return high+1;
}