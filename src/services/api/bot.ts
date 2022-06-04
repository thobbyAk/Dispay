const baseUrl = process.env.dispayApi

interface createBot {
  groupAddress: string
}
export async function createBot(
  data: createBot
): Promise<{ result: any; error: any }> {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
    const result = await fetch(`${baseUrl}/bot`, requestOptions)

    return { result: await result.json(), error: null }
  } catch (error) {
    return { result: null, error }
  }
}

export async function sendDepositiLink(
  groupAddress: string,
  redirectUrl: string
): Promise<{ result: any; error: any }> {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupAddress, redirectUrl }),
    }
    const response = await fetch(
      `${process.env.dispayApi}/bot/deposit`,
      requestOptions
    )
    const result = await response.json()
    return { result, error: null }
  } catch (error) {
    return { result: null, error }
  }
}
