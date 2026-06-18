const fencedCodePattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g

function isEscaped(src, index) {
  let slashCount = 0

  for (let i = index - 1; i >= 0 && src[i] === "\\"; i--) {
    slashCount++
  }

  return slashCount % 2 === 1
}

function normalizeMathLine(line) {
  const marker = line.match(/^(\s*(?:>\s*)+)/)
  const prefix = marker?.[0] ?? ""
  const body = line.slice(prefix.length)
  let out = ""

  for (let i = 0; i < body.length; i++) {
    const char = body[i]

    if (char === "\\" && i + 1 < body.length) {
      out += char + body[i + 1]
      i++
      continue
    }

    if (char === "<") {
      if (body[i + 1] === "=") {
        out += "\\le "
        i++
      } else {
        out += "\\lt "
      }
      continue
    }

    if (char === ">") {
      if (body[i + 1] === "=") {
        out += "\\ge "
        i++
      } else {
        out += "\\gt "
      }
      continue
    }

    out += char
  }

  return prefix + out
}

function normalizeMathContent(content) {
  return content.split("\n").map(normalizeMathLine).join("\n")
}

function findClosingDollar(src, start, delimiter) {
  let index = start

  while (index < src.length) {
    const found = src.indexOf(delimiter, index)

    if (found === -1) return -1
    if (!isEscaped(src, found)) return found

    index = found + delimiter.length
  }

  return -1
}

function normalizeMath(segment) {
  let out = ""
  let index = 0

  while (index < segment.length) {
    if (segment.startsWith("$$", index) && !isEscaped(segment, index)) {
      const close = findClosingDollar(segment, index + 2, "$$")

      if (close === -1) {
        out += segment.slice(index)
        break
      }

      out += "$$"
      out += normalizeMathContent(segment.slice(index + 2, close))
      out += "$$"
      index = close + 2
      continue
    }

    if (segment[index] === "$" && !isEscaped(segment, index)) {
      const close = findClosingDollar(segment, index + 1, "$")

      if (close === -1) {
        out += segment.slice(index)
        break
      }

      out += "$"
      out += normalizeMathContent(segment.slice(index + 1, close))
      out += "$"
      index = close + 1
      continue
    }

    out += segment[index]
    index++
  }

  return out
}

function transformOutsideFences(src) {
  let result = ""
  let lastIndex = 0
  let match

  while ((match = fencedCodePattern.exec(src)) !== null) {
    result += normalizeMath(src.slice(lastIndex, match.index))
    result += match[0]
    lastIndex = match.index + match[0].length
  }

  result += normalizeMath(src.slice(lastIndex))
  return result
}

const MathInequalityNormalizer = () => ({
  name: "MathInequalityNormalizer",
  textTransform(_ctx, src) {
    return transformOutsideFences(src)
  },
})

const manifest = {
  name: "math-inequality-normalizer",
  displayName: "Math Inequality Normalizer",
  description: "Normalize raw inequality symbols inside Markdown math before Quartz renders KaTeX.",
  version: "1.0.0",
  category: "transformer",
  defaultOrder: 17,
}

export { MathInequalityNormalizer, manifest }
export default MathInequalityNormalizer
