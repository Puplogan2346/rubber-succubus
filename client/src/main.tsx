import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { installGlobalHaptics } from "./lib/haptics";

createRoot(document.getElementById("root")!).render(<App />);

// No-op in browsers; inside the iPhone app it adds haptic feedback to every
// button/link tap (see lib/haptics.ts).
installGlobalHaptics();
