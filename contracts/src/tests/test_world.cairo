#[cfg(test)]
mod tests {
    // import world dispatcher
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

    // import test utils
    use dojo::test_utils::{spawn_test_world, deploy_contract};

    // import test utils
    use boot_camp_paint::{
        systems::{actions::{actions, IActionsDispatcher, IActionsDispatcherTrait}},
        models::{player::{Player, player}, tile::{Tile, tile}}
    };

    const PLAYER_ONE: u32 = 1;

    fn player_one_address() -> starknet::ContractAddress {
        starknet::contract_address_const::<0x0>()
    }

    fn setup() -> (IWorldDispatcher, IActionsDispatcher) {
        // [deploy models]
        let mut models = array![player::TEST_CLASS_HASH, tile::TEST_CLASS_HASH];

        // [deploy world passing in models]
        let world = spawn_test_world(models);

        // [deploy actions]
        let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap(), array![].span());

        let actions_system = IActionsDispatcher { contract_address };

        (world, actions_system)
    }

    fn spawn() -> (IWorldDispatcher, IActionsDispatcher) {
        // [set caller address]
        starknet::testing::set_contract_address(player_one_address());

        // [setup world]
        let (world, actions_system) = setup();

        // [spawn]
        actions_system.spawn();

        (world, actions_system)
    }

    const TILE_X: u16 = 1;
    const TILE_Y: u16 = 1;
    const TILE_COLOR: felt252 = 'red';

    fn place() -> (IWorldDispatcher, IActionsDispatcher) {
        starknet::testing::set_contract_address(player_one_address());
        // [setup world]
        let (world, actions_system) = spawn();

        // [act] x=1, y=1, red=encoded
        actions_system.paint(TILE_X, TILE_Y, TILE_COLOR);

        (world, actions_system)
    }

    #[test]
    #[available_gas(30000000)]
    fn test_spawn() {
        // [setup world]
        let (world, _) = spawn();

        // [assert]
        let player = get!(world, (player_one_address()), Player);
        assert(player.address == player_one_address(), 'address is wrong');
    }

    #[test]
    #[available_gas(30000000)]
    fn test_place() {
        // [setup world]
        let (world, _) = place();

        // [assert]
        let tile = get!(world, (TILE_X, TILE_Y), Tile);
        assert(tile.color == TILE_COLOR, 'tile not red');
    }
}
