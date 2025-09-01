
export interface PayPalOrderData {
  amount: string
  currency?: string
  description?: string
}

export interface PayPalAccessToken {
  access_token: string
  token_type: string
  expires_in: number
}

const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL || 'https://api.sandbox.paypal.com'
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET

export async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials'
  })

  if (!response.ok) {
    throw new Error('Failed to get PayPal access token')
  }

  const data: PayPalAccessToken = await response.json()
  return data.access_token
}

export async function createPayPalOrder(orderData: PayPalOrderData) {
  const accessToken = await getPayPalAccessToken()
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: orderData.currency || 'USD',
          value: orderData.amount
        },
        description: orderData.description || 'Doação para projeto social'
      }]
    })
  })

  if (!response.ok) {
    throw new Error('Failed to create PayPal order')
  }

  return response.json()
}

export async function capturePayPalOrder(orderId: string) {
  const accessToken = await getPayPalAccessToken()
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  })

  if (!response.ok) {
    throw new Error('Failed to capture PayPal order')
  }

  return response.json()
}
