// Configuration
const TIME_BETWEEN_ACTIONS: u64 = 120;

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Player {
    #[key]
    player: u32,
    address: starknet::ContractAddress,
    last_action: u64
}

#[generate_trait]
impl PlayerImpl of PlayerTrait {
    fn check_can_place(self: Player) {
        if starknet::get_block_timestamp() - self.last_action < TIME_BETWEEN_ACTIONS {
            panic!("Not enough time has passed since the last action");
        }
    }
}
