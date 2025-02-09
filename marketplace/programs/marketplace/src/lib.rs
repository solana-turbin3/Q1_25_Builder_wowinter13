use anchor_lang::prelude::*;

declare_id!("3EJhJWM4e3ChGaRKsvLoq74AdYMRgBp7aAUjVeF3EoQA");

mod constants;
mod error;
mod instructions;
mod state;

pub use constants::*;
pub use error::*;
pub use instructions::*;
pub use state::*;

#[program]
pub mod marketplace {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, name: String) -> Result<()> {
        require!(
            name.len() <= NAME_MAX_LEN,
            MarketplaceError::NameExceededMaxLength
        );

        Initialize::initialize(ctx, name)
    }

    pub fn list(ctx: Context<List>, price: u64) -> Result<()> {
        List::list(ctx, price)
    }

    pub fn delist(ctx: Context<Delist>) -> Result<()> {
        Delist::delist(ctx)
    }

    pub fn purchase(ctx: Context<Purchase>) -> Result<()> {
        Purchase::purchase(ctx)
    }
}
