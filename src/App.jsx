import { navLinks } from './data/site.js'
import { IconDefs } from './components/Icon.jsx'
import { ToastProvider } from './components/Toast.jsx'
import { PdfPreviewProvider } from './components/PdfPreview.jsx'
import TopBar from './components/TopBar.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Ticker from './components/Ticker.jsx'
import BelowFold from './components/BelowFold.jsx'
import Footer from './components/Footer.jsx'
import Floats from './components/Floats.jsx'
import Brochure from './components/Brochure.jsx'
import { useScrollSpy } from './hooks/useScrollSpy.js'
import { useReveal } from './hooks/useReveal.js'

const sectionIds = navLinks.map((link) => link.href.slice(1))

export default function App() {
  const activeSection = useScrollSpy(sectionIds)
  useReveal()

  return (
    <ToastProvider>
      <PdfPreviewProvider>
        <IconDefs />

        {/* First focusable element on the page — the stylesheet already had a
            .skip-link rule waiting for it. */}
        <a className="skip-link" href="#main">
          Skip to main content
        </a>

        <TopBar />
        <Header activeSection={activeSection} />

        <main id="main">
          <Hero />
          <Ticker />
          <BelowFold />
        </main>

        <Footer />
        <Floats />
        <Brochure />
      </PdfPreviewProvider>
    </ToastProvider>
  )
}
