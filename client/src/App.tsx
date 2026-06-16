import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import BackgroundImage from "./components/BackgroundImage";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import FAQ from "./pages/FAQ";
import Connect from "./pages/Connect";
import Checkout from "./pages/Checkout";
import Events from "./pages/Events";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/services"} component={Services} />
      <Route path={"/gallery"} component={Gallery} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/connect"} component={Connect} />
      <Route path={"/checkout/:serviceId"} component={Checkout} />
      <Route path={"/events"} component={Events} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BackgroundImage />
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
