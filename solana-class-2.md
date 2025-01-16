# Solana Class 2 (15.01.2025)

## Agenda

- Metaplex
  - Metadata
  - Master Edition
  - Collections

- Find PDA
- Transfer SPL Tokens


## Metaplex

- Solana Labs initiative
- Open NFT protocol and tools to support it
  - Metaplex Metadata Standard
  - CandyMachine
  - Compressed NFTs



### Metaplex Token Standard

- NonFungible: non-fungible token with a master edition
- FungibleAsset: A token with metadata that can also have attributes, sometimes called Semi-Fungible
- Fungible: a token with simple metadata
- NonFungibleEdition: a non-fungible token with an edition account (printed from a Master Edition)
- ProgrammableNonFungible: a special non fungible token that is frozen at all times to enforce custom authorization rules

The token Standart is set automatically by the token metadata program.
(18min)
- If the token has a Master Edition account, it is a NonFungible
- If the token has a Master Edition account, it is a NonFungibleEdition
- If the token has no (Master) Edition account ensuring its supply can be > 1 and uses zero decimals places, it is a FungibleAsset


There are different json standards for the metadata.

### Metadata Account
- Can be set to Mutable
- Creators array can be to obtain royalties
   - Marketplaces
   - Creators must sign to be one verified
- Collection NFTs can be used to group NFTs
- JSON standard follows  closely with other chains

(@metaplex-foundation/mpl-token-metadata)


### Metadata

- Data
   - name
   - symbol
   - uri
   - seller_fee_basis_points
   - creators
   - collection
   - uses

- Other arguments
  - isMutable
  - collectionDetails

- PDA seeds
  - metadata
  - metadata program ID
  - Mint ID


### Metadata Accounts

- metadata: PublicKey,
- mint: PublicKey,
- mintAuthority: PublicKey,
- payer: PublicKey,
- updateAuthority: PublicKey,
- systemProgram: PublicKey

### Master Edition

- Proof that a token is non-fungible
   - Verifies mint account has Zero Decimals
   - Verifies that only 1 Token has been minted

- Transfers the mint authority to the master edition
- You can set the max supply
- If set > 1 you can use the master edition to mint sub editions of an NFT.
(30 min)

Data:
  - supply
  - maxSupply

PDA seeds:
  - metadata
  - metadata program ID
  - mint ID
  - edition



### Master Edition Accounts
- edition: PublicKey,
- metadata: PublicKey,
- mint: PublicKey,
- mintAuthority: PublicKey,
- payer: PublicKey,
- updateAuthority: PublicKey,
- tokenProgram?: PublicKey,
- systemProgram?: PublicKey


### Collections

- Collection are just NFTs
   - You create a Collection NFT by setting the CollectionDetails object
- To add a NFT to a collection set the Collection field on the Metadata account
- A Collection allows a authority to verify or unverify
- Can be nested
- Collections should now be SIZED
  - Sized collections allow you to set the number of NFTs in the collection once, and from then on it grows on-chain


### Finding a PDA in TS

```ts
  const metadata_seeds = [
    Buffer.from("metadata"),
    new PublicKey(TOKEN_METADATA_PROGRAM_ID).toBuffer(),
    mint.toBuffer(),  
  ];

  PublicKey.findProgramAddressSync(
    metadata_seeds,
    TOKEN_METADATA_PROGRAM_ID
  )
```

### UMI Deepdive

Modular framework that can be used for creating javascript clients for solana programs.
