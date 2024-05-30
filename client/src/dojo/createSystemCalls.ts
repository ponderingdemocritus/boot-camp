import { AccountInterface } from "starknet";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import {
  getEntityIdFromKeys,
  getEvents,
  setComponentsFromEvents,
} from "@dojoengine/utils";
import { ContractComponents } from "./generated/contractComponents";
import type { IWorld } from "./generated/generated";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { client }: { client: IWorld },
  _contractComponents: ContractComponents,
  {}: ClientComponents
) {
  const spawn = async (account: AccountInterface) => {
    try {
      const { transaction_hash } = await client.actions.spawn({
        account,
      });

      await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      console.log(
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (e) {
      console.log(e);
    }
  };

  const move = async ({
    account,
    x,
    y,
    color,
  }: {
    account: AccountInterface;
    player_id: number;
    x: number;
    y: number;
    color: bigint;
  }) => {
    try {
      const { transaction_hash } = await client.actions.paint({
        account,
        x,
        y,
        color,
      });

      await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      console.log(
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (e) {
      console.log(e);
    }
  };

  return {
    spawn,
    move,
  };
}
