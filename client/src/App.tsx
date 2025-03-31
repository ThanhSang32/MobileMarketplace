import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import ProductDetail from "@/pages/ProductDetail";
import CategoryPage from "@/pages/CategoryPage";
import Checkout from "@/pages/Checkout";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Shipping from "@/pages/Shipping";
import Warranty from "@/pages/Warranty";
import Repair from "@/pages/Repair";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/category/:category" component={CategoryPage} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={FAQ} />
      <Route path="/shipping" component={Shipping} />
      <Route path="/warranty" component={Warranty} />
      <Route path="/repair" component={Repair} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
