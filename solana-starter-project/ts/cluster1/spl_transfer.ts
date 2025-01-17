import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../wba-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("7g5hmiZUHLAN7Lp1XCct6VuU1aQv3FBTdcSiCBLsitDL");

// Recipient address
const to = new PublicKey("2CquYcQoBGv8MiiMfP3Lgut79oLCtDbCTrB6fnQm1WeG");

(async () => {
    try {
        const fromWallet = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        const toWallet = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to);

        const tx = await transfer(connection, keypair, fromWallet.address, toWallet.address, keypair,  100);

        console.log(`Your transfer txid: ${tx}`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();