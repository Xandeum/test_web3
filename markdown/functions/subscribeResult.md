[**Xandeum Web3 Library v9.3.0**](../README.md)

***

[Xandeum Web3 Library](../globals.md) / subscribeResult

# Function: subscribeResult()

> **subscribeResult**(`tx`, `wsUrl`, `onResult`, `onError?`, `onClose?`): `void`

Defined in: [webSocket.ts:38](https://github.com/Xandeum/test_web3/blob/main/src/webSocket.ts#L38)

Opens a WebSocket connection and subscribes to the result of a transaction
via the custom `xandeumResultSubscribe` method.

This is useful for receiving asynchronous results tied to an on-chain operation,
such as file creation, modification, or deletion.

The subscription sends a JSON-RPC request with:
- `method`: "xandeumResultSubscribe"
- `params`: [txId, { commitment: "finalized" }]

The WebSocket listens for result messages and invokes the `onResult` callback
if a valid result with `fsid`, `status`, or `data` is received.

## Parameters

### tx

`string`

The transaction ID you want to listen for results from.

### wsUrl

`string`

The full WebSocket endpoint (e.g., `wss://...`) to connect to.

### onResult

(`value`) => `void`

Callback to handle incoming result messages. Triggered when a valid response is received.

### onError?

(`err`) => `void`

(Optional) Callback triggered if a WebSocket error occurs.

### onClose?

() => `void`

(Optional) Callback triggered when the WebSocket connection closes.

## Returns

`void`
