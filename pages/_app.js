import '../styles/global.css'
import Layout from '../layouts/layout'
import fetchCategories from '../utils/categoryProvider'

import { FC } from "react"
import { clusterApiUrl } from "@solana/web3.js"
import type { AppProps } from "next/app"
import type { Adapter } from "@solana/wallet-adapter-base"

import {
  WalletAdapter,
  WalletAdapterNetwork,
} from "@solana/wallet-adapter-base"
// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react"
// import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"

import {
  BitKeepWalletAdapter,
  BitpieWalletAdapter,
  BloctoWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  CoinhubWalletAdapter,
  LedgerWalletAdapter,
  MathWalletAdapter,
  PhantomWalletAdapter,
  SafePalWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  SolongWalletAdapter,
  TokenPocketWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets"
// import { ConfigProvider } from "../providers/ConfigProvider"

const network: WalletAdapterNetwork =
  process.env.NEXT_PUBLIC_SOLANA_NETWORK === "mainnet"
    ? WalletAdapterNetwork.Mainnet
    : process.env.NEXT_PUBLIC_SOLANA_NETWORK === "testnet"
    ? WalletAdapterNetwork.Testnet
    : WalletAdapterNetwork.Devnet

const endpoint: string =
  process.env.NEXT_PUBLIC_SOLANA_RPC ?? clusterApiUrl(network)

const wallets: WalletAdapter[] = [
  new PhantomWalletAdapter(),
  new SlopeWalletAdapter(),
  new SolflareWalletAdapter({ network }),
  new SolletExtensionWalletAdapter({ network }),
  new BitKeepWalletAdapter(),
  new BitpieWalletAdapter(),
  new CloverWalletAdapter(),
  new Coin98WalletAdapter(),
  new CoinhubWalletAdapter(),
  new MathWalletAdapter(),
  new SafePalWalletAdapter(),
  new SolongWalletAdapter(),
  new TokenPocketWalletAdapter(),
  new TorusWalletAdapter(),
  new LedgerWalletAdapter(),
  new SolletWalletAdapter({ network }),
  new BloctoWalletAdapter({ network }),
]

function Ecommerce({ Component, pageProps, categories }) {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Layout categories={categories}>
            <Component {...pageProps} />
          </Layout>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

Ecommerce.getInitialProps = async () => {
  const categories = await fetchCategories()
  return {
    categories
  }
}

export default Ecommerce