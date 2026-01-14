import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Register from "@/pages/register";
import RegisterHub from "@/pages/register-hub";
import EventRegistrationPage from "@/pages/event-registration";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import Credits from "@/pages/credits";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/register" component={RegisterHub} />
      <Route path="/register/:slug" component={EventRegistrationPage} />
      <Route path="/register-old" component={Register} /> {/* Kept as backup */}
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/credits" component={Credits} />
      <Route component={NotFound} />
    </Switch>
  );
}

import { ScrollToTop } from "@/components/scroll-to-top";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ScrollToTop />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
