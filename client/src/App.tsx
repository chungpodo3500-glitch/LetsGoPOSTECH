import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteLayout } from "./components/SiteLayout";
import Home from "./pages/Home";
import Issues from "./pages/Issues";
import IssueDetail from "./pages/IssueDetail";
import ArticleDetail from "./pages/ArticleDetail";
import PuzzlePage from "./pages/Puzzle";
import DirectoryPage from "./pages/Directory";
import About from "./pages/About";
import SearchPage from "./pages/Search";

function Router() {
  return <SiteLayout><Switch>
    <Route path="/" component={Home} />
    <Route path="/issues" component={Issues} />
    <Route path="/issue/:id" component={IssueDetail} />
    <Route path="/article/:id" component={ArticleDetail} />
    <Route path="/puzzle" component={PuzzlePage} />
    <Route path="/directory" component={DirectoryPage} />
    <Route path="/about" component={About} />
    <Route path="/search" component={SearchPage} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch></SiteLayout>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light" switchable><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
