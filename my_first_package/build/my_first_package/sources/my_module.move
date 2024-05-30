module my_first_package::my_module {

    // Part 1: These imports are provided by default
    // use sui::object::{Self, UID};
    // use sui::transfer;
    // use sui::tx_context::{Self, TxContext};

    // Part 2: struct definitions
    public struct Deos has key, store {
        id: UID,
    }

    public struct Forge has key {
        id: UID,
        deos_created: u64,
    }

    // Part 3: Module initializer to be executed when this module is published
    fun init(ctx: &mut TxContext) {
        let admin = Forge {
            id: object::new(ctx),
            deos_created: 0,
        };
        // Transfer the forge object to the module/package publisher
        transfer::transfer(admin, ctx.sender());
    }


    public fun deos_created(self: &Forge): u64 {
        self.deos_created
    }

    #[allow(unused_function)]
    fun test_deos_create() {
        // Create a dummy TxContext for testing
        let mut ctx = tx_context::dummy();

        // Create a sword
        let deo = Deos {
            id: object::new(&mut ctx),
        };

        // Check if accessor functions return correct values
        // assert!(sword.magic() == 42 && sword.strength() == 7, 1);
            // Create a dummy address and transfer the sword
        let dummy_address = @0xCAFE;
        transfer::public_transfer(deo, dummy_address);
    }


    // Part 5: Public/entry functions (introduced later in the tutorial)

    // Part 6: Tests

}