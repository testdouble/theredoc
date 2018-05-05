module.exports = function theredoc (strings, ...values) {
  const lines = withoutLeadingAndTrailingBlankLines(
    zipString(strings, values).split('\n')
  )
  return stripIndent(lines, smallestIndent(lines)).join('\n')
}

function zipString (strings, values) {
  let s = ''
  strings.forEach((string, i) => {
    s += string + (values[i] || '')
  })
  return s
}

function smallestIndent (lines) {
  let smallest = null
  lines.forEach(line => {
    const indent = line.search(/[^ ]/)
    if (indent !== -1 && (smallest === null || indent < smallest)) {
      smallest = indent
    }
  })
  return smallest
}

function stripIndent (lines, spacesToStrip) {
  const findIndent = new RegExp(`^ {${spacesToStrip}}`)
  return lines.map(line => {
    if (findIndent.test(line)) {
      return line.replace(findIndent, '')
    } else {
      return line
    }
  })
}

// Written verbosely to avoid the cost of slice (array copy) if unnecessary
function withoutLeadingAndTrailingBlankLines (lines) {
  const leadingBlankLine = isWhitespace(lines[0])
  const trailingBlankLine = isWhitespace(lines[lines.length - 1])
  if (leadingBlankLine || trailingBlankLine) {
    return lines.slice(
      leadingBlankLine ? 1 : 0,
      trailingBlankLine ? lines.length - 1 : lines.length
    )
  } else {
    return lines
  }
}

function isWhitespace (s) {
  return /^\s*$/.test(s)
}
