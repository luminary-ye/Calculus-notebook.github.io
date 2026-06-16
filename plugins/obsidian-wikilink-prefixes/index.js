const wikilinkPattern = /(!?)\[\[([^\]\n]+)\]\]/g
const fencedCodePattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g

const prefixRules = [
  {
    from: "/Users/lmynbl/Vault/Obsidian/Knowledge_DataBase/04-数学/00-微积分/",
    to: "00-微积分/",
  },
  {
    from: "Vault/Obsidian/Knowledge_DataBase/04-数学/00-微积分/",
    to: "00-微积分/",
  },
  {
    from: "Knowledge_DataBase/04-数学/00-微积分/",
    to: "00-微积分/",
  },
  {
    from: "04-数学/00-微积分/",
    to: "00-微积分/",
  },
]

function splitAlias(raw) {
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] !== "|") continue

    if (i > 0 && raw[i - 1] === "\\") {
      return {
        target: raw.slice(0, i - 1),
        aliasSuffix: raw.slice(i - 1),
      }
    }

    return {
      target: raw.slice(0, i),
      aliasSuffix: raw.slice(i),
    }
  }

  return {
    target: raw,
    aliasSuffix: "",
  }
}

function normalizeTarget(target) {
  const trimmed = target.trim()
  const leadingWhitespace = target.slice(0, target.length - target.trimStart().length)
  const trailingWhitespace = target.slice(target.trimEnd().length)
  const slashNormalized = trimmed.replace(/\\/g, "/")

  for (const rule of prefixRules) {
    if (slashNormalized.startsWith(rule.from)) {
      return `${leadingWhitespace}${rule.to}${slashNormalized.slice(rule.from.length)}${trailingWhitespace}`
    }
  }

  return target
}

function normalizeWikilinks(segment) {
  return segment.replace(wikilinkPattern, (_match, embedPrefix, raw) => {
    const { target, aliasSuffix } = splitAlias(raw)
    const normalizedTarget = normalizeTarget(target)

    return `${embedPrefix}[[${normalizedTarget}${aliasSuffix}]]`
  })
}

function transformOutsideFences(src) {
  let result = ""
  let lastIndex = 0
  let match

  while ((match = fencedCodePattern.exec(src)) !== null) {
    result += normalizeWikilinks(src.slice(lastIndex, match.index))
    result += match[0]
    lastIndex = match.index + match[0].length
  }

  result += normalizeWikilinks(src.slice(lastIndex))
  return result
}

const ObsidianWikilinkPrefixes = () => ({
  name: "ObsidianWikilinkPrefixes",
  textTransform(_ctx, src) {
    return transformOutsideFences(src)
  },
})

const manifest = {
  name: "obsidian-wikilink-prefixes",
  displayName: "Obsidian Wikilink Prefixes",
  description: "Normalize Obsidian vault-relative wikilinks to Quartz content-root-relative links.",
  version: "1.0.0",
  category: "transformer",
  defaultOrder: 16,
}

export {
  ObsidianWikilinkPrefixes,
  ObsidianWikilinkPrefixes as ObsidianWikilinkPrefixTransformer,
  manifest,
}
export default ObsidianWikilinkPrefixes
