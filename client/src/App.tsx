import { useMemo, useState } from "react";
import "./App.css";
import { useDojo } from "./dojo/useDojo";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { shortString } from "starknet";
import { Has, HasValue } from "@dojoengine/recs";

function Cell({ x, y, color }: { x: number; y: number; color: string }) {
  const {
    setup: {
      clientComponents: { Tile },
      client,
    },
    account: { account },
  } = useDojo();

  const tile = useComponentValue(
    Tile,
    getEntityIdFromKeys([BigInt(x), BigInt(y)]),
    {
      x,
      y,
      color: BigInt(shortString.encodeShortString("white")),
    }
  );

  return (
    <div
      onClick={async () => {
        await client.actions.paint({
          account,
          x,
          y,
          color: BigInt(shortString.encodeShortString(color)),
        });
      }}
      className={`w-12 cursor-pointer duration-300 hover:bg-${color}-100 h-12 border-${color}-100 border-blue-100/10 flex justify-center bg-${shortString.decodeShortString(tile.color.toString())}-100`}
    >
      <span className="self-center text-black/20">
        {x},{y}
      </span>
    </div>
  );
}

function App() {
  const {
    setup: {
      client,
      clientComponents: { Player },
    },
    account: { account },
  } = useDojo();

  // [get] player with recs query
  const playerQuery = useEntityQuery([
    Has(Player),
    HasValue(Player, { address: BigInt(account.address) }),
  ]);

  const player = useComponentValue(Player, playerQuery[0]);

  const [color, setColor] = useState<"red" | "blue">("red");

  const grid = useMemo(() => {
    const tempGrid = [];
    for (let row = 0; row < 15; row++) {
      const cols = [];
      for (let col = 0; col < 15; col++) {
        cols.push(<Cell key={`${row}-${col}`} x={row} y={col} color={color} />);
      }
      tempGrid.push(
        <div key={row} className="flex flex-wrap">
          {cols}
        </div>
      );
    }
    return tempGrid;
  }, [color]);

  console.log(Number(player?.last_action.toString()) || 0);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center">Dojo Paint</h1>
      <div className="flex gap-2 justify-center">
        <button
          className={`px-2 py-1  border border-red-500 ${color === "red" && "bg-red-100"}`}
          onClick={() => setColor("red")}
        >
          red
        </button>
        <button
          className={`px-2 py-1  border border-blue-500 ${color === "blue" && "bg-blue-100"}`}
          onClick={() => setColor("blue")}
        >
          blue
        </button>
      </div>
      <div className="text-xl py-3">
        {player?.address ? (
          <div>Player Registered</div>
        ) : (
          <button
            onClick={async () => {
              await client.actions.spawn({ account });
            }}
          >
            spawn
          </button>
        )}
      </div>
      {player?.address.toString() && <div className="mx-auto p-10">{grid}</div>}
    </div>
  );
}

export default App;
