import { QuartzComponentConstructor } from "../../../quartz/components/types"
import Header from "./components/Header"
import SidebarNav from "./components/SidebarNav"
import TableOfContents from "./components/TableOfContents"
import SiteFooter from "./components/SiteFooter"

export const manifest = {
  name: "llm-wiki-components",
  displayName: "LLM Wiki Custom Components",
  description: "Custom components for LLM Wiki: Header, SidebarNav, TableOfContents, SiteFooter",
  version: "1.0.0",
  category: "component" as const,
  components: {
    Header: {
      name: "Header",
      displayName: "Header",
      description: "Modern header with logo, navigation tabs, search, and toolbar",
      version: "1.0.0",
    },
    SidebarNav: {
      name: "SidebarNav",
      displayName: "SidebarNav",
      description: "Collapsible sidebar navigation with icons",
      version: "1.0.0",
    },
    TableOfContents: {
      name: "TableOfContents",
      displayName: "TableOfContents",
      description: "Scroll-spy table of contents with mobile bottom sheet",
      version: "1.0.0",
    },
    SiteFooter: {
      name: "SiteFooter",
      displayName: "SiteFooter",
      description: "Multi-column footer with brand, navigation, and copyright",
      version: "1.0.0",
    },
  },
}

// Export components as named exports for componentLoader to find them
export { Header, SidebarNav, TableOfContents, SiteFooter }