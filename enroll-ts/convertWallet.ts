import bs58 from 'bs58';
import promptSync from 'prompt-sync';

// Initialize prompt
const prompt = promptSync();

// Convert a Base58 private key to a wallet byte array
function base58ToWallet() {
    const base58 = prompt("Enter your Base58 private key: ");
    try {
        const wallet = bs58.decode(base58);
        console.log("Wallet Byte Array:", wallet);
    } catch (error) {
        // console.error("Error decoding Base58:", error.message);
    }
}

// Convert a wallet byte array to a Base58 private key
function walletToBase58() {
    const walletString = prompt("Enter your wallet byte array (comma-separated): ");
    try {
        const walletArray = walletString.split(',').map((num) => parseInt(num.trim(), 10));
        const base58 = bs58.encode(Buffer.from(walletArray));
        console.log("Base58 Private Key:", base58);
    } catch (error) {
        // console.error("Error encoding to Base58:", error.message);
    }
}

// CLI to choose the conversion direction
function main() {
    console.log("Choose an option:");
    console.log("1. Convert Base58 to Wallet Byte Array");
    console.log("2. Convert Wallet Byte Array to Base58");
    const choice = prompt("Enter your choice (1 or 2): ");
    if (choice === '1') {
        base58ToWallet();
    } else if (choice === '2') {
        walletToBase58();
    } else {
        console.error("Invalid choice. Please choose 1 or 2.");
    }
}

// Run the CLI
main();
