import { Transaction } from "@/types/transaction";

const mockTransaction: Transaction = {
    blockNumber: "20893212",
    timeStamp: "1728057563",
    hash: "0x31d02e4347322ca07fe5d40f4e96d59517c918f7223bf8ddf11270148f0c22f1",
    nonce: "112373",
    blockHash: "0xedd34922aa0be7ec7ff044b322bb78f1895b908ecb03308e6fdf0eb2f70f51eb",
    from: "0xf5213a6a2f0890321712520b8048d9886c1a9900",
    contractAddress: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
    to: "0xe8c6c9227491c0a8156a0106a0204d881bb7e531",
    value: "9832600000000000000",
    tokenName: "Maker",
    tokenSymbol: "MKR",
    tokenDecimal: "18",
    transactionIndex: "37",
    gas: "501651",
    gasPrice: "22462592241",
    gasUsed: "116494",
    cumulativeGasUsed: "3613205",
    input: "deprecated",
    confirmations: "63974",
};

describe('Transaction Tests', () => {
    test('Transaction object has the correct structure', () => {
        expect(mockTransaction).toHaveProperty('blockNumber');
        expect(mockTransaction).toHaveProperty('timeStamp');
        expect(mockTransaction).toHaveProperty('hash');
        expect(mockTransaction).toHaveProperty('nonce');
        expect(mockTransaction).toHaveProperty('blockHash');
        expect(mockTransaction).toHaveProperty('from');
        expect(mockTransaction).toHaveProperty('contractAddress');
        expect(mockTransaction).toHaveProperty('to');
        expect(mockTransaction).toHaveProperty('value');
        expect(mockTransaction).toHaveProperty('tokenName');
        expect(mockTransaction).toHaveProperty('tokenSymbol');
        expect(mockTransaction).toHaveProperty('tokenDecimal');
        expect(mockTransaction).toHaveProperty('transactionIndex');
        expect(mockTransaction).toHaveProperty('gas');
        expect(mockTransaction).toHaveProperty('gasPrice');
        expect(mockTransaction).toHaveProperty('gasUsed');
        expect(mockTransaction).toHaveProperty('cumulativeGasUsed');
        expect(mockTransaction).toHaveProperty('input');
        expect(mockTransaction).toHaveProperty('confirmations');
    });

    test('Transaction value is a valid string representation of a number', () => {
        expect(() => {
            parseFloat(mockTransaction.value);
        }).not.toThrow();
        expect(parseFloat(mockTransaction.value)).toBeGreaterThan(0);
    });

    test('Transaction hash is a valid Ethereum address', () => {
        expect(mockTransaction.hash).toMatch(/^0x[a-fA-F0-9]{64}$/);
    });

    test('Transaction has correct gas values', () => {
        expect(parseInt(mockTransaction.gas)).toBeGreaterThan(0);
        expect(parseInt(mockTransaction.gasUsed)).toBeLessThanOrEqual(parseInt(mockTransaction.gas));
    });

    test('Transaction confirmations are a valid number', () => {
        expect(parseInt(mockTransaction.confirmations)).toBeGreaterThan(0);
    });
});
