// src/websocket.ts
import WebSocket from 'ws'

type ResultValue = {
  fsid?: string
  status?: string
  data?: any
  subscription?: string
}

/**
 * Subscribes to the result of a transaction using WebSocket.
 * @param tx The transaction ID to subscribe to.
 * @param wsUrl The WebSocket URL to connect to.
 * @param onResult Callback function to handle the result.
 * @param onError Optional callback function to handle errors.
 * @param onClose Optional callback function to handle WebSocket closure.
 */
export function subscribeResult (
  tx: string,
  wsUrl: string,
  onResult: (value: ResultValue) => void,
  onError?: (err: any) => void,
  onClose?: () => void
): void {
  const ws = new WebSocket(wsUrl)

  ws.addEventListener('open', () => {
    const subscriptionMessage = {
      jsonrpc: '2.0',
      id: 1,
      method: 'xandeumResultSubscribe',
      params: [tx, { commitment: 'finalized' }]
    }
    ws.send(JSON.stringify(subscriptionMessage))
  })

  ws.addEventListener('message', event => {
    const d = JSON.parse(String(event.data).replace(/:\s*(\d{16,})/g, ': "$1"'))

    const value = d?.params?.result?.value
    if (value?.fsid || value?.status || value?.data || d?.params?.subscription) {
      onResult({
        fsid: value.fsid,
        status: value.status,
        data: value.message,
        subscription: d.params.subscription
      })
    }
  })

  ws.addEventListener('error', error => {
    if (onError) onError(error)
  })

  ws.addEventListener('close', () => {
    if (onClose) onClose()
  })
}

/**
 * Unsubscribes from the result of a transaction using the given subscription ID.
 * @param subscriptionId The ID of the subscription to unsubscribe from.
 * @param wsUrl The WebSocket URL to connect to.
 */
export function unsubscribeResult (subscriptionId: string, wsUrl: string): void {
  const ws = new WebSocket(wsUrl)
  ws.addEventListener('open', () => {
    const unsubscribeMessage = {
      jsonrpc: '2.0',
      id: 2,
      method: 'xandeumResultUnscribe', // ✅ fixed typo
      params: [subscriptionId]
    }

    ws.send(JSON.stringify(unsubscribeMessage))
    console.log(
      `Sent xandeumResultUnsubscribe for subscription ID: ${subscriptionId}`
    )

    // Optionally close the WebSocket after sending
    ws.close()
  })

  ws.addEventListener('error', err => {
    console.error('WebSocket error during unsubscribe:', err)
  })
}
