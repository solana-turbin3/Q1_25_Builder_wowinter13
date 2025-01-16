# Sol class 1 (14.01.2025)

- VS code extensions: Rust Analyzer, Even Better TOML

- Required: Rust, NodeJS, Yarn, Solana CLI, Anchor (30.1)

## Agenda

- Accounts
- Programs
- Rent
- Compute 
- IDL
- PDA
- SPL Token


### Accounts

- Everything on-chain is an account
- on creation space is allocated and rent is paid
- Space is dynamic, can grow as needed
- Can only be created by the System Program
- Account Flags:
    - Writable - serial access, ie one at a time
    - Read only - parallel access, ie many at once
    - Signer - a signer of the transaction
    - Exectuable - program account

**Structure:**
```
{ 
  key: PublicKey,
  lamports: number,
  data: Uint8Array,
  is_executable: boolean,
  owner: PublicKey,
}
```

### Programs

- Marked as Executable
- Stateless, only holds compiled code
- Owned by loaders
    - By default the Upgradable Loader is used
- Has ability to own other non-exectutable Accounts
- Accessible via their program_id
- Native programs are provided by Solana
- User Programs are written by us

### Rent
- Rent must be paid to create accounts
- Pay 2 years up-front for Rent-Exemption
- Rent-exemption is required on Account creation
- Closing an account allows rent to be reclaimed
- Resizing an Account costs / returns the difference
- Upgradable Programs require 4 years of rent up-front

### Transactions

- Must include all accounts that your transaction will reference
- Made up of one or more instructions
    - Instructions are the interface to solana programs
- Atomic, if one instruction fails to execute, the transaction fails

Structure:
```
{
  message: {
    instructions: Array<Instruction>,
    recent_blockhash: number,
    fee_payer: PublicKey,
  }
  signers: Array<Uint8Array>,
}
```

### Compute

- All on-chain actions require compute units
- Solana has a maximum number of compute units per block
- You can request extra compute units if needed
    - Generally this is not advised unless absolutely necessary
    - Doesn't necessarily require paying a higher fee

### PDA (Program Derived Accounts)

- Made up of seeds and a bump. They don't have private keys. Elliptic curve cryptography. 
- Can be determenistic if seeds are chosen well
     - Associated Token Account is an example of this
- Can't collide with PDAs or Accounts created by other programs
- Can be used as hashmap (key/value)
- PDA account ids look similar to addresses but have no corresponding private key
- Can sign on behalf of a Program


### IDL
- Interface Design Language
- Many on-chain programs have an IDL
- makes interacting with on-chain programs much easier
- public IDLs can be uploaded to the blockchain for accessiblity (we need to upload our IDLs manually)
- Written in JSON
- Anchor creates automatically generated IDLs for our programs


## Part 2

### SPL Token

Used to create fungible and non-fungible tokens

npm install @solana/spl-token

When creating a new SPL token, you must first create the Mint Account
- There are a few arguments that you can provide
    - Mint Authority
    - Freeze Authority
    - Decimals
- The spl-token library provides a function called `createMint` that creates and initializes a mint account

Functions:
- initializeMint -> Creates a mint account
- initializeAccount -> Creates a token account
- transfer -> Sends tokens from a to b accounts
- approve -> Grants access to your token
- revoke -> Removes access that was previously granted
- mintTo -> Mint SPL tokens to a token account
- burn -> destroy a specific amount of tokens that you hold
- freezeAccount -> prevents a token account from acting
- thawAccount -> removes a freeze from account
- syncNative -> wraps native SOL

Once a mint account has been created, we can create token accounts for it.

Properties of **Token Accounts**:
- Keeps track of token balance
- linked to a single mint account

**Associated Token Accounts:**
- One of the most used PDAs on Solana
- Creates a deterministic token account
- Other people can create token accounts for you
- Makes it much easier to tell if someone has an account to accept a particular token

The typescript library provides some helperts to create ATAs (Associated Token Accounts)

- getAssociatedTokenAddress
- createAssociatedTokenAccount
- getOrCreateAssociatedTokenAccount


### Metadata Account

- Keeps track of metadata about the token
- Can be used to store information about the token (uri, token standard, etc)

### Recap

- PDA
    - Mint Account
    - Metadata Account
        - Off chain json metadata (name, description, image, etc)
    - Token Account
        - Associated Token Account (ATA)


