# ember-babel-transform-classnames-convention
Note this is a proof of concept and not fully tested. Your mileage may vary.

Transforms:
```js
// components/user-component.js
export default Component.extend({
  // properties
});
```
To:
```js
// components/user-component.js
export default Component.extend({
  classNames: ['user-component']
});
```

## Installation
N/A

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
