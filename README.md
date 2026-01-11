## Getting Started

This project uses HTTPS on local. First make sure you've added this line to your `/etc/hosts` file (and clear your DNS cache afterwards):

```
127.0.0.1       cloud-dev.terpusat.com
```

Then, make sure you've installed `node` version `24` and `pnpm` at least version `10`.

```sh
nvm install 24
nvm use 24
npm install -g pnpm@10
pnpm --version
```

Make sure you have caddy installed:

```sh
brew install caddy
```

Run the installation on the project directory:

```sh
pnpm i
```

Run `caddy` by executing `caddy run`. Finally, run the development server:

```bash
export BASE_PATH=/v2
pnpm dev
```

Open [https://cloud-dev.terpusat.com/v2](https://cloud-dev.terpusat.com/v2) with your browser to see the result.

## Troubleshoot

### Your connection is not private (HSTS)

For Google Chrome, you can type `thisisunsafe` anywhere on the warning page and it will load it without warning.
