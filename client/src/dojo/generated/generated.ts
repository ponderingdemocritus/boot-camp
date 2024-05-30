/* Autogenerated file. Do not edit manually. */

import { AccountInterface } from "starknet";
import { DojoProvider } from "@dojoengine/core";

export type IWorld = Awaited<ReturnType<typeof setupWorld>>;

export async function setupWorld(provider: DojoProvider) {
  function actions() {
    const spawn = async ({ account }: { account: AccountInterface }) => {
      try {
        return await provider.execute(account, {
          contractName: "actions",
          entrypoint: "spawn",
          calldata: [],
        });
      } catch (error) {
        console.error("Error executing spawn:", error);
        throw error;
      }
    };

    const paint = async ({
      account,
      player_id,
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
        return await provider.execute(account, {
          contractName: "actions",
          entrypoint: "paint",
          calldata: [player_id, x, y, color],
        });
      } catch (error) {
        console.error("Error executing move:", error);
        throw error;
      }
    };
    return { spawn, paint };
  }
  return {
    actions: actions(),
  };
}
