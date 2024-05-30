# Dojo Bootcamp - Paint me

This is a very basic app showing a basic dojo world connected to a react vite application.

Players can paint locations on a grid.

### Client

The client uses the RECS library for state management and syncing, and react with tailwind for the UI.

### Run each command in an individual CLI window

```bash
cd client && pnpm i && pnpm dev
```

```bash
cd contracts
katana --disable-fee --allowed-origins "*"
```

```bash
cd contracts

sozo build

sozo migrate apply

torii --world 0x6457e5a40e8d0faf6996d8d0213d6ba2f44760606e110e03e3d239c5f769e87 --allowed-origins "*"
```
