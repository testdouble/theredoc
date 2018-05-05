const assert = require('assert')

const theredoc = require('./index')

module.exports = {
  'no indents -> no op' () {
    assert.equal(theredoc``, '')
    assert.equal(theredoc`Hi`, 'Hi')
    assert.equal(theredoc`A
long
hello`, `A
long
hello`)
    assert.equal(theredoc`first
line separate`, `first
line separate`)
  },
  'min indent uniformly stripped' () {
    assert.equal(theredoc`
      Hey, I'm doing my best
        …I know
      Cool
    `, `Hey, I'm doing my best
  …I know
Cool`)
  },
  'strips exactly one leading and one trailing line' () {
    assert.equal(theredoc`\n\n`, '')
    assert.equal(theredoc`\nhi\n`, 'hi')
    assert.equal(theredoc`\n\n\nhi\n\n`, '\n\nhi\n')
    assert.equal(theredoc`    \t  \n\n\nhi\n\n  `, '\n\nhi\n')
    assert.equal(theredoc`

      love too lead

        and also trails

    `, `
love too lead

  and also trails
`)
  },
  'whitespace leading and trailing lines do not count toward indent' () {
    assert.equal(theredoc`  \n    hi\n      bye`, 'hi\n  bye')
  },
  'nested templates get zipped okay' () {
    assert.equal(theredoc`I've ${'just'} got ${3}
  ${'bananas\n'}
you?`, `I've just got 3
  bananas

you?`)
  },
  'nested theredocs (tho trippy) work inside then out' () {
    assert.equal(theredoc`
      what if:
        ${theredoc`
          some other message
            was right here
        `}

    then what
    `, `    what if:
      some other message
was right here

  then what`)
  }
}
