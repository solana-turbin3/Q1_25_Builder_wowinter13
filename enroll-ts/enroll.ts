import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, Turbin3Prereq } from "./programs/Turbin3_prereq";
import wallet from "./Turbin3-wallet.json";

// Program address from the deployed contract
const PROGRAM_ID = new PublicKey("WBAQSygkwMox2VuWKU133NxFrpDZUBdvSBeaBEue2Jq");

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a devnet connection
const connection = new Connection("https://api.devnet.solana.com");

// Github account
const github = Buffer.from("wowinter13", "utf8");

// Create our anchor provider
const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed"
});

// Create our program
const program = new Program<Turbin3Prereq>(IDL, provider);


// Create the PDA for our enrollment account
const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
  enrollment_seeds,
  program.programId
);

// Execute our enrollment transaction
(async () => {
  try {
    const txhash = await program.methods
      .complete(github)
      .accountsPartial({
        signer: keypair.publicKey,
        prereq: enrollment_key,
        system_program: SystemProgram.programId
      })
      .signers([keypair])
      .rpc();

    console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch(e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();