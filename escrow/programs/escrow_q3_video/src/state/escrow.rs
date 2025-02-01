use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)] // in this case we can't use Vec<> and other dynamic data types
                     //  because we need to know the size of the account
pub struct Escrow {
    pub seed: u64,
    pub maker: Pubkey,
    pub mint_a: Pubkey,
    pub mint_b: Pubkey,
    pub receive: u64, // amount of tokens to receive
    pub bump: u8,
}
