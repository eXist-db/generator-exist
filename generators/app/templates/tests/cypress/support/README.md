<!-- GENERATED WITH UPDOC. DO NOT EDIT DIRECTLY -->
# ShadowDom

* [Quick Start](#quick-start)
* [About](#about)
* [API](#api)

## Quick Start

In the **index.js** or the root file of your cypress/support folder,
import and register cypress commands

```js
import { registerShadowCommands } from '@updater/cypress-helpers';

registerShadowCommands();
```

Example

```js
    cy
      .get('#homeServicesContainer')
      .shadowGet('upd-home-services-landing-page-route')
      .shadowFind('#title')
      .shadowShould('have.text', 'Connect TV & Internet');
```

## About

Cypress does not have native support for `shadowDom`.
This module gives us the ability to run similar commands in shadow DOM.
These commands are not as fully developed as the native ones,
but resemble native Cypress commands in usage.

> Only use these commands on elements *within* a `shadowRoot`,
not on elements which may have a `shadowRoot`.

What to Expect
* Commands should feel familiar as Cypress ones and behave in similar ways
* There is automatic retrying for certain commands (e.g. `shadowGet` and `shadowShould`)
* Non-Dom results can be yielded into regular Cypress commands.
For example:

```js
cy.shadowGet('some-shadow-element')
  .then($el => $el.text())
  .should('match', /*.?/g); // no need to build non-DOM interactors!
```

The main differences are
* Limited API use / less supported features
* Retrying is on a per command (not per chain) basis (except for `shadowGet`,
which does support retrying upcoming assertions)
* No extra visibility/attachment/covered/disabled checks on `click` and `trigger`
* Potentially others...TBD

 ## API

* [`registerShadowCommands`](#registershadowcommands)
* [`shadowGet`](#shadowget)
* [`shadowFind`](#shadowfind)
* [`shadowShould`](#shadowshould)
* [`shadowEq`](#shadoweq)
* [`shadowClick`](#shadowclick)
* [`shadowSelect`](#shadowselect)
* [`shadowTrigger`](#shadowtrigger)
* [`shadowContains`](#shadowcontains)



***

## registerShadowCommands

Register shadow commands on the `cy` namespace, 
such as `shadowGet`, `shadowShould`, etc.

***

## shadowGet

**Retryable / Async**

* deeply searches DOM for all elements which have a `shadowRoot`
* queries (with jquery) each `shadowRoot` with provided selector
* Returns all matching results
* Subject is optional


| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | jquery selector used to find matching elements |
| [options] | <code>object</code> | the options to modify behaviour of the command |
| [options.timeout] | <code>number</code> | number of ms to retry the query until  marking the command as failed. Defaults to 4s or the `defaultCommandTimeout` in cypress.config. |

**Example**  
### Syntax

```js
.shadowGet(selector)
.shadowGet(selector, options)
```

### Usage

```js
// searches entire DOM
cy.shadowGet('custom-el-in-shadow')

// searches only within container-el
cy.get('container-el')
  .shadowGet('custom-el-in-shadow')

// waits up to 30s (resolve immediately when found)
cy.shadowGet('custom-el-in-shadow', { timeout: 30000 })

```
***

## shadowFind

**Retryable / Async**

* must be chained from another command (e.g. `shadowGet` or `get`)
* queries (via jquery) the yielded element and the yielded element's `shadowRoot` for matches
* **Only** searches within the `shadowRoot` of the yielded element (as well as just the regular DOM children)
* **Note** it is a **shallow** search within the yielded elements shadowRoot. It will **not**
do a deep search through shadowRoots for the matching element. For deep search, use `shadowGet`

> You may wonder why a shallow search is needed. That's because in shadowDom
> Unique selectors like `id`s can be repeated. Sometimes we just want to search
> in the immediate root without worrying about coliding with things further down
> the DOM tree.


| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | jquery selector used to find matching elements |
| [options] | <code>object</code> | the options to modify behaviour of the command |
| [options.timeout] | <code>number</code> | number of ms to retry the query until  marking the command as failed. Defaults to 4s or the `defaultCommandTimeout` in cypress.config. |

**Example**  
### Syntax

```js
.shadowFind(selector)
.shadowFind(selector, options)
```

### Usage

```js
// shadowFind queries against the subjects' children and shadowRoot
cy.get('container-el')
  .shadowFind('button.action') 

// shadowGet matches from all shadowRoots
// shadowFind queries against the subjects' children and shadowRoot
cy.shadowGet('custom-el-in-shadow')
  .shadowFind('button.action') // will query against the subject's children and shadowRoot
```
***

## shadowShould

**Retryable / Async**
(Up to 4s, timeout not customizable)

This Utility is most useful when needing to run 
assertions against shadowDom elements and it does so by leveraging `jquery-chai`. `Cypress` also does this, but it does not work in shadowDom.
* it accepts the `string` syntax like Cypress' `should`
* it does not accept the `function` syntax 
(but you can still use `should` with shadow elements as long as you run non `jquery-chai` assertions)
* This smooths over the issues with Cypress' `jquery-chai`,
which does explicit checks that are incompatible with shadowDom.
* It uses a clean version of jquery and chai to run assertions against shadowDom elements.
* In general, you can use `should` as long as you do not need to assert against the shadow DOM.

> **When should I use `shadowShould` and when should I use `should`?**
> 
> Use `shadowShould` whenever you need to run assertions
 against elements within the `shadowDom`.
> Lite DOM and regular DOM can be used with `should`.
> Also, any non-DOM values can be used with `should`. 
> You can do something like, 
>
>`.should(($el) => expect($el.text()).to.match(/.?/))`
> 
> Or even,
>
> `.then(($el) => $el.text()).should('match', /.?/))`.
>
> These are examples of taking non-DOM values from the shadowDom elements and using
> regular Cypress commands and assertions on them.


| Param | Type | Description |
| --- | --- | --- |
| chainer | <code>string</code> | the string |
| value | <code>any</code> | the value to be checked |
| method | <code>string</code> | the sub-chainer to check (see example) |

**Example**  
### Syntax

```js
.shadowShould(chainers)
.shadowShould(chainers, value)
.shadowShould(chainers, method, value)
```

### Usage

```js
cy.get('@dateLabel')
  .should('have.text', '2017-11-22');

cy.get('@datepicker')
  .shadowFind('button[value="2017-11-22"]')
  .shadowShould('have.attr', 'tabindex', '0');
```
***

## shadowEq

**No-Retry / Sync**

Yields a subject at the index from a given subject.

For example, if this is chained from a `shadowGet` 
which yields multiple elements, `shadowEq` will return
the element at the specified index.

It will *not* retry and yields whatever is passed
into it synchronously.


| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | specifies the index of  the element to yield from the subject |

**Example**  
### Syntax

```js
.shadowEq(selector)
```

### Usage

```js
cy.get('container-el')
  .shadowFind('button.action') 
  .shadowEq(2)

cy.shadowGet('custom-el-in-shadow')
  .shadowEq(4)
```
***

## shadowClick

**No-Retry / Sync**

* Allows you to click on an element within a shadowRoot.
* Can be chained from `shadowGet`, `shadowFind`, or `shadowEq`
* Clicks on the first element (index 0) from the 
yielded elements of previous command
* Cypress' `click` does not work in shadowDom for multiple reasons
* Uses native or jquery .click functionality,
but does not do additional checks Cypress' click does 
such as checking the component is visible, 
not covered, and not disabled. 
* Would need to put in more work to ensure component clicks cannot pass 
through when the component is not in an actual interactive state.

**Example**  
### Syntax

```js
.shadowClick()
```

### Usage

```js
cy.get('container-el')
  .shadowGet('custom-element-within-shadow-dom')
  .shadowFind('button.action')
  .shadowClick()
```
***

## shadowSelect

**No-Retry / Sync**

* Allows you to select an option from a `select` element within a shadowRoot.
* Can be chained from `shadowGet`, `shadowFind`, or `shadowEq`
* Expects an actual `select` element to be the subject
* Selects the provided `option` from the first element (index 0) from the 
yielded elements of previous command
* Option can be by `value` or by `text`, but must be strictly equal
* Cypress' `select` does not work in shadowDom for multiple reasons
* Does not do additional checks Cypress' select does 
such as checking the component is visible, 
not covered, and not disabled. 
* Would need to put in more work to ensure component selects cannot pass 
through when the component is not in an actual interactive state.


| Param | Type | Description |
| --- | --- | --- |
| option | <code>String</code> \| <code>Number</code> | The option from the `select` to select, by `value` or by `text` |

**Example**  
### Syntax

```js
.shadowSelect(option)
```

### Usage

```js
  cy
    .shadowGet('upd-select[name="state"]')
    .shadowFind('select')
    .shadowSelect('AL'); // by value

  cy
    .shadowGet('upd-select[name="bedrooms"]')
    .shadowFind('select')
    .shadowSelect('3 Bedroooms'); // by text
``` 
***

## shadowTrigger

**No Retry / Sync**

* allows to trigger an event similarly to how Cypress' `trigger` works. 
* This works with elements on the shadow DOM since they pose problems with 
almost all of Cypress' commands. 
* Currently only supports these events:
  * `keydown`
  * `keypress`
  * `keyup`
  * `change`
  * `input`
* Options can also be provided per event
  * `key` events supports keyboard event options i.e. `keyCode` or `bubbles`
  * `change` and `input` events support the `value` for the update


| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The event from the above list which will be triggered |
| options | <code>object</code> \| <code>value</code> | Options which depend on the kind of event and  modify the event's behaviour |

**Example**  
```js
.shadowTrigger(event)
.shadowTrigger(event, options)
```

### Usage

```js
// Changing an input
cy
  .shadowGet('upd-input[name="postalCode"]')
  .shadowFind('input')
  .shadowTrigger('input', '99511');

// changing value of a custom element
cy
  .shadowGet('upd-datepicker')
  .shadowTrigger('change', '2019-01-02');

// triggering a key event
cy.get('@datepicker')
  .shadowFind('button[aria-selected="true"]')
  .shadowTrigger('keydown', { keyCode: 39, bubbles: true });
```
***

## shadowContains

**No-Retry / Sync**

Convenience function to assert partial match between the `textContent` of
an element and the passed in value.

This does not work like `cy.contains`.

Literally just runs this assertion:
```js
  expect(subject[0].textContent).to.contain(text)
```


| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | the text to match against |

**Example**  
```js
.shadowContains(text)
```

### Usage

```js
  cy
    .shadowGet('some-custom-elem')
    .shadowContains('Should contain this text...')
``` 
*File located at [/src/shadowDom/shadowCommands.js](/src/shadowDom/shadowCommands.js)*
