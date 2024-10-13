import { EtherscanProvider, formatEther } from "ethers";

const etherscanApiKey = process.env.ETHERSCAN_API_KEY!
const provider = new EtherscanProvider("homestead", etherscanApiKey);

export async function getTransactionDataByHash(hash: string) {
    const transaction = await provider.getTransactionReceipt(hash);
    return transaction;
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