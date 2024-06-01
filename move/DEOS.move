module 0x1::DEOS {

    struct DEOS has store, key {
        total_supply: u64,
        balances: table::Table<address, u64>,
    }

    public fun initialize(account: &signer): &mut Self {
        assert!(exists<Self>(address_of(account)), 0);
        let instance = move_to(address_of(account), Self {
            total_supply: 0,
            balances: table::new(),
        });
        &mut instance
    }

    public fun mint(admin: &signer, recipient: address, amount: u64) {
        let instance = borrow_global_mut<Self>(address_of(admin));
        let recipient_balance = table::lookup_or_default(&instance.balances, recipient, 0);
        table::add(&mut instance.balances, recipient, recipient_balance + amount);
        instance.total_supply = instance.total_supply + amount;
    }

    public fun balance_of(account: address): u64 {
        let instance = borrow_global<Self>(address_of(&account));
        table::lookup_or_default(&instance.balances, account, 0)
    }

    public fun transfer(sender: &signer, recipient: address, amount: u64) {
        let instance = borrow_global_mut<Self>(address_of(sender));
        let sender_balance = table::lookup(&instance.balances, address_of(sender));
        assert!(sender_balance >= amount, 1);
        table::add(&mut instance.balances, recipient, amount);
        table::add(&mut instance.balances, address_of(sender), sender_balance - amount);
    }

}
