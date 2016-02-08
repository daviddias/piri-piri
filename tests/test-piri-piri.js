/* globals describe, it */

const expect = require('chai').expect
const pp = require('../src')

describe('piri-piri', () => {
  it('connect one and exit', (done) => {
    pp.start((err, api) => {
      expect(err).to.not.exist
      pp.browser.spawn('./tests/scripts/simple.js', 1, (err) => {
        expect(err).to.not.exist
        done()
      })
      setTimeout(() => {
        var id = Object.keys(pp.clients)[0]
        api.send(id, 'exit', {})
      }, 500)
    })
  })
  it.skip('connect two and exit', (done) => {})
  it.skip('connect one, call a method and exit', (done) => {})
  it.skip('connect two, call a method chain and exit', (done) => {})
  it.skip('connect two, call a p2p method chain and exit', (done) => {})
})
