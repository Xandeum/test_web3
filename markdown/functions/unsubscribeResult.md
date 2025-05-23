[**Xandeum Web3 Library v9.2.0**](../README.md)

***

[Xandeum Web3 Library](../globals.md) / unsubscribeResult

# Function: unsubscribeResult()

> **unsubscribeResult**(`subscriptionId`, `wsUrl`): `void`

Defined in: [webSocket.ts:93](https://github.com/Xandeum/test_web3/blob/main/src/webSocket.ts#L93)

Sends a WebSocket JSON-RPC message to unsubscribe from a previously subscribed transaction result
using the `xandeumResultUnsubscribed` method (note: custom method, ensure server-side implementation matches).

This function automatically closes the WebSocket connection after sending the unsubscribe request.

## Parameters

### subscriptionId

`string`

The ID of the active subscription you want to cancel.

### wsUrl

`string`

The WebSocket endpoint (e.g., `wss://...`) to connect to for unsubscribing.

## Returns

`void`
