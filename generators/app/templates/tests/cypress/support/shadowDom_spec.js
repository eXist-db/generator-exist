import $ from 'jquery';

const createShadowDom = (host, dom) => {
  const shadow = host.attachShadow({ mode: 'open' });
  shadow.innerHTML = dom;
}

const final = 5;

const createOrderTest = (host, count) => {
  const elem = host.shadowRoot.querySelector('.order-test');
  count++;
  createShadowDom(elem, `<div class="order-test ${count}">`);
  if (count < final) {
    createOrderTest(elem, count);
  }
}


describe('shadowDom', () => {
  before(() => {
    cy.visit('/fixtures/index.html');
    cy.get('cypress-spec')
      .then($el => {
        createShadowDom($el.get(0), `
          <div id="test">Test Div
            <span>1</span>
            <span>2</span>
          </div>
          <select id="select">
           <option value="a">Option A</option>
           <option value="b">Option B</option>
          </select>
          <div class="order-test 0">
          </div>
          <div class="timeout-test">
          </div>   
        `)
        createOrderTest($el.get(0), 0);
      })
  })
  context('shadowCommands', () => {
    it('in general these commands work. this is good enough for now.', () => {
      cy.shadowGet('#test')
        .shadowFind('span')
        .shadowShould('have.length', 2)
        .shadowEq(1)
        .should($el => {
          assert($el, 'shadowGet is able to retrieve the shadow element');
          assert($el, 'shadowFind span is able to get the elements');
          assert($el, 'shadowShould was able to make the assertion');
        })
    });

    it('shadowGet returns elements in correct order', () => {
      [...Array(6)].forEach((_, i) => {
        cy.shadowGet('.order-test')
          .shadowEq(i)
          .shadowShould('have.class', i)
      })
    })
  });

  context('retryability', () => {
    it('retries the starter element until all chained commands pass', () => {
      let count = 0;

      // add another option into the select after 2 seconds
      // to ensure that the shadowGet will not resolve immediately
      // with the correct state
      cy.shadowGet('select option')
        .then($el => {
          setTimeout(() => {
            $el.parent().append('<option>');
          }, 2000);
        })

      // retries getting the elements until `should` passes
      // this allows us to pass only once the element state is correct
      // rather than fail immediately because it wasn't correct quickly enough
      cy.shadowGet('select option')
        .should((el) => {
          expect(el.length).to.be.above(2);
        })
    })
  })

  context('timeout', () => {
    it('actually waits until the timeout passes before failing the test', () => {
      cy.shadowGet('.timeout-test')
        .then($el => {
          setTimeout(() => {
            $el.append('<div class="pass-timeout-test">');
          }, 10000);
        })

      cy.shadowGet('.pass-timeout-test', { timeout: 30000})
    });
  })
})