/* eslint-env mocha */
const chai = require('chai')
const expect = chai.expect
const Joi = require('joi')
const postalJoi = Joi.extend(require('./index.js'))

describe('joi-postalcode', () => {
  it('returns value for valid postal codes', () => {
    const result = postalJoi.string().postalCode('CA').validate('A1A 1A1')
    expect(result.error).to.equal(undefined)
    expect(result.value).to.equal('A1A 1A1')
  })
  it('returns error for invalid postal codes', () => {
    const result = postalJoi.string().postalCode('CA').validate('A1A 111')
    expect(result.error).to.be.instanceof(Error)
    expect(result.error.message).to.be.a('string')
  })
  it('validates all values from the postal-codes-js README', () => {
    expect(postalJoi.string().postalCode('bg').validate('1003').error).to.equal(undefined)
    expect(postalJoi.string().postalCode('gb').validate('EC1A 1BB').error).to.equal(undefined)
    expect(postalJoi.string().postalCode('gb').validate('EC1A1BB').error).to.equal(undefined)
    expect(postalJoi.string().postalCode('gb').validate('EC1A-1BB').error).to.equal(undefined)
    expect(postalJoi.string().postalCode('tr').validate('33150').error).to.equal(undefined)
    expect(postalJoi.string().postalCode('us').validate('22313').error).to.equal(undefined)
  })
  it('throws if country code is not 2-letter ISO', () => {
    expect(() => {
      postalJoi.string().postalCode('Canada').validate('A1A 1A1')
    }).to.throw('ISO 3166-1')
  })
  it('defaults to ISO country code US', () => {
    const result = postalJoi.string().postalCode().validate('90210')
    expect(result.error).to.equal(undefined)
    expect(result.value).to.equal('90210')
  })
})
