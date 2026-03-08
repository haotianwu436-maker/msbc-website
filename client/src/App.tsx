import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Speakers from "./pages/Speakers";
import Agenda from "./pages/Agenda";
import Hackathon from "./pages/Hackathon";
import Sponsors from "./pages/Sponsors";
import BecomeSponsor from "./pages/BecomeSponsor";
import Tickets from "./pages/Tickets";
import Universities from "./pages/Universities";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";

function Router() {
  return (
    <Switch>
      {/* Root redirects to current edition */}
      <Route path="/">
        <Redirect to="/2026" />
      </Route>

      {/* 2026 Edition Routes */}
      <Route path="/2026" component={Home} />
      <Route path="/2026/speakers" component={Speakers} />
      <Route path="/2026/agenda" component={Agenda} />
      <Route path="/2026/hackathon" component={Hackathon} />
      <Route path="/2026/sponsors" component={Sponsors} />
      <Route path="/2026/become-a-sponsor" component={BecomeSponsor} />
      <Route path="/2026/tickets" component={Tickets} />
      <Route path="/2026/universities" component={Universities} />
      <Route path="/2026/faq" component={Faq} />
      <Route path="/2026/contact" component={Contact} />

      {/* Fallback */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
