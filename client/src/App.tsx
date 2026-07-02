import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import BackgroundImage from "./components/BackgroundImage";
import AgeGate from "./components/AgeGate";
import ScrollToTop from "./components/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Gallery = lazy(() => import("./pages/Gallery"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Connect = lazy(() => import("./pages/Connect"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Events = lazy(() => import("./pages/Events"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Full-screen black fallback: invisible against the site's black background,
// so route chunks load without a visible flash.
function RouteFallback() {
  return <div className="min-h-screen bg-black" aria-busy="true" />;
}

function Router() {
  return (
    <Suspense fallback={<RouteFallback />}>
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
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BackgroundImage />
      <ThemeProvider
        defaultTheme="dark"
      >
        <MotionConfig reducedMotion="user">
          <ScrollToTop />
          <AgeGate>
            <Router />
          </AgeGate>
        </MotionConfig>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
