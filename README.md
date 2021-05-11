# theredoc

[![Build Status](https://travis-ci.org/testdouble/theredoc.svg?branch=main)](https://travis-ci.org/testdouble/theredoc)

A little [template tag
function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates)
that strips the leading indent from multi-line ES string templates. It also
strips the first and last lines if they're just whitespace. If you're using template strings to write [heredocs](https://en.wikipedia.org/wiki/Here_document), you should try tagging them with `theredoc` to tidy them up a bit!

## Install

```
$ npm install theredoc
```

## Usage

``` js
const theredoc = require('theredoc')

function some () {
  function deeply () {
    function nested () {
      function code () {
        console.log(theredoc`
          I want to write multipline lines
          but don't want to mess up my indenting.
            Ok?
        `)
      }
    }
  }
}
```

Will look tidy in the code listing but output no superfluous indents:

```
I want to write multipline lines
but don't want to mess up my indenting.
  Ok?
```

## Questions

### Why should I use this?

Because good messages are often long messages, but out-of-the-box, [ES template
strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
don't format multi-line error and console messages gracefully.

If you're familiar with `"""`-style heredocs from CoffeeScript or the
`<<~`-style heredoc from Ruby 2.3, you might appreciate being able to write
multi-line strings with an indentation level that matches the surrounding code
listing _without_ indenting the resulting string itself.

For example, if you want to print a multi-line error message without superfluous
indentation in the following situation, an unadorned template string would have
to be outdented awkwardly:

```js
        //...
      } catch (e) {
        console.error(`
Something bad happened.

  Message: ${e.message}
        `)
      }
      //...
```

Additionally, the newlines added to retain the formatting of the function call
will be retained in the output, which you probably also don't want.

Instead, `theredoc` fixes both those issues by letting you write this:

```js
        //...
      } catch (e) {
        console.error(theredoc`
          Something bad happened.

            Message: ${e.message}
        `)
      }
      //...
```

And the resulting console output will be:

```
Something bad happened.

  Message: LOL errors
```

With the leading 10 spaces stripped from each line and (since they only contain
whitespace) having stripped the first and last lines of the template string.

If you still don't think this is nifty, I don't know what to tell you!

### Why not use common-tags?

The very cool and fancy library
[common-tags](https://github.com/declandewet/common-tags) can accomplish the
same thing with the `stripIndent` function it exports, however there are a few
downsides:

* It will trim all leading and trailing whitespace, which one might want to
  preserve
* It has a runtime dependency on `babel-runtime`, which drastically [increases
  the size of its
  install](https://github.com/declandewet/common-tags/issues/108) and, because
  babel-runtime depends on `core-js`, [sets a global
  object](https://github.com/testdouble/testdouble.js/issues/364) that might be
  more appropriate for an app to set than an intermediate lib
* While common-tags is really spiffy and you should check it out to learn about
  all the cool transforms you can do, 99.9% of the time I really just want
  indent-stripping heredocs

### What about tabs (`\t`)?

Theredoc only deals with space character indentation, sorry!

A pull request to support tabs would be considered if (a) it didn't drastically
increase the module's complexity, and (b) deferred to counting spaces in the
event that the given string had some lines indented with spaces and other with
`\t` tabs.
