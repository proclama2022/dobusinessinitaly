import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import './lib/i18n';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './lib/fontawesome';

createRoot(document.getElementById("root")!).render(<App />);
