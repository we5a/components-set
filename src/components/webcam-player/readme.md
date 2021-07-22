# webcam-player



<!-- Auto Generated Below -->


## Events

| Event                | Description | Type               |
| -------------------- | ----------- | ------------------ |
| `personsUpdated`     |             | `CustomEvent<any>` |
| `screenshotReceived` |             | `CustomEvent<any>` |


## Methods

### `getPersons() => Promise<Person[]>`



#### Returns

Type: `Promise<Person[]>`




## Dependencies

### Depends on

- [player-output](../player-output)
- [main-modal](../main-modal)

### Graph
```mermaid
graph TD;
  webcam-player --> player-output
  webcam-player --> main-modal
  style webcam-player fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
