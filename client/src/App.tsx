/** Public Record design: route only the crafted civic reading-room homepage and preserve clear escape paths. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ContentManager from "./pages/ContentManager";
import DailyLogPage from "./pages/DailyLogPage";
import { GuideDetailPage, RecordDetailPage, ResourceDetailPage, ToolkitDetailPage } from "./pages/DetailPages";
import Home from "./pages/Home";
import LearnPage from "./pages/LearnPage";
import PortalsPage from "./pages/PortalsPage";
import RecordPage from "./pages/RecordPage";
import ResourcesPage from "./pages/ResourcesPage";
import ToolkitPage from "./pages/ToolkitPage";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portals" component={PortalsPage} />
      <Route path="/record/:slug" component={RecordDetailPage} />
      <Route path="/record" component={RecordPage} />
      <Route path="/resources/:slug" component={ResourceDetailPage} />
      <Route path="/resources" component={ResourcesPage} />
      <Route path="/toolkit/:slug" component={ToolkitDetailPage} />
      <Route path="/toolkit" component={ToolkitPage} />
      <Route path="/learn/:slug" component={GuideDetailPage} />
      <Route path="/learn" component={LearnPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/daily-log" component={DailyLogPage} />
      <Route path="/manage" component={ContentManager} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
