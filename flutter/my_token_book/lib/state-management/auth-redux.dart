/*
 * Redux requires six parts working together:
 *  actions, states, store, store-provider, store connector, reducers
 *
 *  As a counting example:
 *  - 1) actions: only one action: INCREMENT
 *
 *  - 2) states: only one state variable: int COUNT
 *
 *  - 3) store: 
 *    - store takes two parameters:
 *      - reducer func
 *      - initial state: COUNT = 0
 *    - store should be maintained at parent widget
 *    - store should be passed onto child widget
 *
 *  - 4) store-provider:
 *    - store-provider is a store widget wrapper
 *      - two paramers: store and child -> widget
 *
 *
 */
