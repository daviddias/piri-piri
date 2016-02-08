/* globals describe, it */

const expect = require('chai').expect
const pp = require('../src')

describe('piri-piri', () => {
  it('start piri-piri', (done) => {
    pp.start((err) => {
      expect(err).to.not.exist
      done()
    })
  })

  it('connect one and exit', (done) => {
    expect(Object.keys(pp.clients).length).to.equal(0)
    pp.browser.spawn('./tests/scripts/simple.js', 1, (err) => {
      expect(err).to.not.exist
      done()
    })
    setTimeout(() => {
      var id = Object.keys(pp.clients)[0]
      pp.browser.send(id, 'exit')
    }, 800)
  })

  it('connect two and exit', (done) => {
    expect(Object.keys(pp.clients).length).to.equal(0)
    pp.browser.spawn('./tests/scripts/simple.js', 2, (err) => {
      expect(err).to.not.exist
      done()
    })
    setTimeout(() => {
      Object.keys(pp.clients).forEach((id) => {
        pp.browser.send(id, 'exit')
      })
    }, 800)
  })

  it('connect one, call a method and exit', (done) => {
    expect(Object.keys(pp.clients).length).to.equal(0)
    pp.browser.spawn('./tests/scripts/method.js', 1, (err) => {
      expect(err).to.not.exist
      done()
    })
    setTimeout(() => {
      var id = Object.keys(pp.clients)[0] // should be 0, electron is not being properly closed
      pp.browser.send(id, 'sum', 2, 2)
      setTimeout(() => {
        expect(pp.clients[id].msgs.length).to.equal(1)
        expect(pp.clients[id].msgs[0]).to.equal(4)
        pp.browser.send(id, 'exit')
      }, 1000)
    }, 800)
  })

  it.skip('connect two, call a p2p method chain and exit', (done) => {})
})
