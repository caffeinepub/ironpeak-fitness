import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Programs } from "./pages/Programs";
import { Trainers } from "./pages/Trainers";

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-iron-900 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
});

// Routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const programsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/programs",
  component: Programs,
});

const trainersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/trainers",
  component: Trainers,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

// Router
const routeTree = rootRoute.addChildren([
  homeRoute,
  programsRoute,
  trainersRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
