import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router";
import { SkipToContent } from "./components/A11yProvider";
import { SEOHead } from "./components/SEOHead";
import { HomePage } from "./components/HomePage";
import { NotFound } from "./components/NotFound";
import { DomainsListingPage, DomainDetailPage } from "./components/DomainsPage";
import { EventsListingPage, EventDetailPage } from "./components/EventsPage";
import { GalleryPage } from "./components/GalleryPage";
import { AboutPage } from "./components/AboutPage";
import { PillarsPage } from "./components/PillarsPage";
import { AchievementsPage } from "./components/AchievementsPage";
import { TeamPage } from "./components/TeamPage";
import { ContactPage } from "./components/ContactPage";
import { JoinUsPage } from "./components/JoinUsPage";
import { AdminPage } from "./components/admin/AdminPage";
import { GlobalErrorBoundary } from "./components/ErrorBoundary";

function RootLayout() {
  return (
    <>
      <SEOHead title="ASPARK SOCIETY — Igniting Innovation" description="Innovation & Technology Society. Empowering the next generation of tech leaders." />
      <SkipToContent />
      <ScrollRestoration />
      <div id="main-content">
        <Outlet />
      </div>
    </>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/about",
        Component: AboutPage,
      },
      {
        path: "/pillars",
        Component: PillarsPage,
      },
      {
        path: "/achievements",
        Component: AchievementsPage,
      },
      {
        path: "/team",
        Component: TeamPage,
      },
      {
        path: "/contact",
        Component: ContactPage,
      },
      {
        path: "/join",
        Component: JoinUsPage,
      },
      {
        path: "/domains",
        Component: DomainsListingPage,
      },
      {
        path: "/domains/:slug",
        Component: DomainDetailPage,
      },
      {
        path: "/events",
        Component: EventsListingPage,
      },
      {
        path: "/events/:slug",
        Component: EventDetailPage,
      },
      {
        path: "/gallery",
        Component: GalleryPage,
      },
      {
        path: "/admin/*",
        Component: AdminPage,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);