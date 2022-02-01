const postalCodes = require('postal-codes-js')

/**
 * Joi extension to the String type for validating postal codes.
 * @see https://www.npmjs.com/package/postal-codes-js
 * @see https://en.wikipedia.org/wiki/List_of_postal_codes
 * @example
 * const joiPostalCode = Joi.extend(require('joi-postalcode'))
 * joiPostalCode.string().postalCode('CA').validate('A1A 1A1')
 * joiPostalCode.string().postalCode('BG').validate('1003')
 * joiPostalCode.string().postalCode('US').validate('22313')
 */
module.exports = joi => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'postalCode.invalid': '{{ #error }}'
  },
  rules: {
    postalCode: {
      method (cc) {
        cc = cc || 'US' // default
        return this.$_addRule({ name: 'postalCode', args: { cc } })
      },
      args: [
        {
          name: 'cc',
          assert: joi.string().length(2).required().error(() => {
            return new Error('cc must be a 2-letter ISO 3166-1 country code')
          })
        }
      ],
      validate (value, helpers, args) {
        const result = postalCodes.validate(args.cc, value)
        if (result === true) return value
        else return helpers.error('postalCode.invalid', { error: result })
      }
    }
  }
})
