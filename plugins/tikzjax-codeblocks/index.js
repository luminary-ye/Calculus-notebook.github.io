const tikzFencePattern =
  /(^|\n)(`{3,}|~{3,})[ \t]*(tikz|tikzjax|latex-tikz)[^\n]*\n([\s\S]*?)\n\2[ \t]*(?=\n|$)/gi

const TikZJaxCodeBlocks = () => ({
  name: "TikZJaxCodeBlocks",
  textTransform(_ctx, src) {
    return src.replace(tikzFencePattern, (_match, prefix, _fence, _lang, body) => {
      const safeBody = String(body).trim().replace(/<\/script>/gi, "<\\/script>")

      return `${prefix}<script type="text/tikz">\n${safeBody}\n</script>`
    })
  },
})

const manifest = {
  name: "tikzjax-codeblocks",
  displayName: "TikZJax Code Blocks",
  description: "Convert fenced TikZ code blocks into TikZJax script tags before Markdown rendering.",
  version: "1.0.0",
  category: "transformer",
  defaultOrder: 15,
}

export { TikZJaxCodeBlocks, TikZJaxCodeBlocks as TikzjaxCodeblocks, TikZJaxCodeBlocks as TikzjaxCodeBlocks, manifest }
export default TikZJaxCodeBlocks
