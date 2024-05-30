module 0x1::UserRegistry {

    struct User has store, key {
        address: address,
        sid: u64,
    }

    struct UserRegistry has store, key {
        users: vector<User>,
        next_sid: u64,
    }

    public fun initialize(account: &signer): &mut Self {
        assert!(exists<Self>(address_of(account)), 0);
        let instance = move_to(address_of(account), Self {
            users: vector::empty(),
            next_sid: 1,
        });
        &mut instance
    }

    public fun register_user(admin: &signer, user_address: address, referral: option::Option<address>): u64 {
        let instance = borrow_global_mut<Self>(address_of(admin));
        let sid = instance.next_sid;
        instance.next_sid = sid + 1;
        vector::push_back(&mut instance.users, User {
            address: user_address,
            sid: sid,
        });

        match referral {
            option::Option::Some(referral_address) => {
                DEOS::mint(admin, user_address, 5);
                DEOS::mint(admin, referral_address, 5);
            },
            option::Option::None => {
                DEOS::mint(admin, user_address, 10);
            }
        };

        sid
    }

    public fun get_user_sid(admin: &signer, user_address: address): u64 {
        let instance = borrow_global<Self>(address_of(admin));
        let len = vector::length(&instance.users);
        let mut i = 0;
        while (i < len) {
            let user = &instance.users[i];
            if (user.address == user_address) {
                return user.sid;
            }
            i = i + 1;
        }
        assert!(false, 2);
        0
    }

    public fun create_event(admin: &signer, user_address: address) {
        Self::register_user(admin, user_address, option::Option::None);
    }

}
