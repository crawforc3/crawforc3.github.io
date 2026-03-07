import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      mapFn: (node) => {
        if (node.slugSegment === "misc") node.displayName = "Misc"
      },
      sortFn: (a, b) => {
        const order = ["rover"]
        const pinBottom = ["misc"]
        const aBottom = pinBottom.includes(a.slugSegment)
        const bBottom = pinBottom.includes(b.slugSegment)
        if (aBottom !== bBottom) return aBottom ? 1 : -1
        const aTop = order.indexOf(a.slugSegment)
        const bTop = order.indexOf(b.slugSegment)
        if (aTop !== -1 || bTop !== -1) return (aTop === -1 ? 999 : aTop) - (bTop === -1 ? 999 : bTop)
        return a.displayName.localeCompare(b.displayName, undefined, { numeric: true, sensitivity: "base" })
      },
    }),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      mapFn: (node) => {
        if (node.slugSegment === "misc") node.displayName = "Misc"
      },
      sortFn: (a, b) => {
        const order = ["rover"]
        const pinBottom = ["misc"]
        const aBottom = pinBottom.includes(a.slugSegment)
        const bBottom = pinBottom.includes(b.slugSegment)
        if (aBottom !== bBottom) return aBottom ? 1 : -1
        const aTop = order.indexOf(a.slugSegment)
        const bTop = order.indexOf(b.slugSegment)
        if (aTop !== -1 || bTop !== -1) return (aTop === -1 ? 999 : aTop) - (bTop === -1 ? 999 : bTop)
        return a.displayName.localeCompare(b.displayName, undefined, { numeric: true, sensitivity: "base" })
      },
    }),
  ],
  right: [],
}
