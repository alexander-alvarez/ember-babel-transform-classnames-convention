import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component Babel ClassName preprocessor', function(hooks) {
  setupRenderingTest(hooks);

  test('my-component gets class called my-component added to it', async function(assert) {
    await render(hbs`{{my-component}}`);

    assert.dom('.my-component').exists();

  });

  test('my-classnames-component gets class called my-classnames-component appended', async function(assert) {
    await render(hbs`{{my-classnames-component}}`);

    // check other classes still there too
    assert.dom('.hello').hasClass('my-classnames-component');

  });

  test('my-convention-component only has one instance of the class name', async function(assert) {
    await render(hbs`{{my-convention-component}}`);

    assert.dom('.my-convention-component').exists();
  });
});
