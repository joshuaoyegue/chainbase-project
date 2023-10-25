// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  polygon: string,
  base: string,
  optimism: string
}


const user_wallet = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
const network_ids = {
  polygon: 137,
  ethereum: 1,
  optimism: 42161
}

async function getValue(network_id: number) {
  try {
    const response = await axios.get(
      `https://api.chainbase.online/v1/account/balance?chain_id=${network_id}&address=${user_wallet}`,
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_CHAINBASE_API_KEY,
          'accept': "application/json",
          'Access-Control-Allow-Origin': '*'
        },
      }
    )
    return parseInt(response.data.data, 16)/1e18
  } catch (error) {
    console.log(error)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const polygon = await getValue(network_ids.polygon)
  const ethereum = await getValue(network_ids.ethereum)
  const optimism = await getValue(network_ids.optimism)
  const data = { polygon: polygon, ethereum: ethereum, optimism: optimism }
  res.status(200).json(data)
}
