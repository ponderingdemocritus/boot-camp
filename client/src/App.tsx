import { useMemo } from "react";
import "./App.css";
import { useDojo } from "./dojo/useDojo";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { shortString } from "starknet";
import { Has, HasValue, getComponentValue } from "@dojoengine/recs";

function Cell({
  x,
  y,
  player_id,
}: {
  x: number;
  y: number;
  player_id: number | null;
}) {
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
        if (player_id === null) {
          return;
        }
        await client.actions.paint({
          account,
          player_id,
          x,
          y,
          color: BigInt(shortString.encodeShortString("red")),
        });
      }}
      className={`w-12 hover:bg-red-100 h-12 border border-blue-100/10 flex justify-center bg-${shortString.decodeShortString(tile.color.toString())}-100`}
    >
      <span className="self-center">
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

  const player = useEntityQuery([
    Has(Player),
    HasValue(Player, { address: BigInt(account.address) }),
  ]);
  console.log(player);

  const player_id = useMemo(() => {
    return player.length ? getComponentValue(Player, player[0])?.player : null;
  }, [player]);

  const grid = useMemo(() => {
    const tempGrid = [];
    for (let row = 0; row < 10; row++) {
      const cols = [];
      for (let col = 0; col < 10; col++) {
        cols.push(
          <Cell
            key={`${row}-${col}`}
            x={row}
            y={col}
            player_id={player_id || null}
          />
        );
      }
      tempGrid.push(
        <div key={row} className="flex flex-wrap">
          {cols}
        </div>
      );
    }
    return tempGrid;
  }, []);

  return (
    <div className="container mx-auto">
      <div>
        <button
          onClick={async () => {
            await client.actions.spawn({ account });
          }}
        >
          spawn
        </button>
      </div>
      <div>{grid}</div>
    </div>
  );
}

export default App;
