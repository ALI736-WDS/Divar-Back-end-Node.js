import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";
import "./global.css";

const MINUTE = 1000 * 60;
const queryClient = new QueryClient({
  // cacheTime: 10 * MINUTE,  //in taghire name dade be gcTime
  gcTime: 10 * MINUTE,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  // <BrowserRouter>
  <QueryClientProvider client={queryClient}>
    {/* <ReactQueryDevtools /> */}
    <App />
  </QueryClientProvider>
  // </BrowserRouter>
  // </React.StrictMode>
);
