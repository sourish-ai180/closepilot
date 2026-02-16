import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import LandingPage from './LandingPage';
import Dashboard from './components/Dashboard';
import FeaturesPage from './FeaturesPage';
import PricingPage from './PricingPage';
import TemplatesPage from './TemplatesPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import AboutPage from './AboutPage';
import BlogPage from './BlogPage';
import CareersPage from './CareersPage';
import ContactPage from './ContactPage';
import PrivacyPage from './PrivacyPage';
import TermsPage from './TermsPage';
import CookiePage from './CookiePage';
import ShowcasePage from './ShowcasePage';



// Define the root route (can act as a layout if needed, but for now just renders Outlet)
const rootRoute = createRootRoute({
  component: () => <Outlet />, // Render the Outlet so child routes can be shown
});



const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

const featuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/features',
  component: FeaturesPage,
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pricing',
  component: PricingPage,
});

const templatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/templates',
  component: TemplatesPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: SignupPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogPage,
});

const careersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/careers',
  component: CareersPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: PrivacyPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: TermsPage,
});

const cookieRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cookie',
  component: CookiePage,
});

const showcaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/showcase',
  component: ShowcasePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  featuresRoute,
  pricingRoute,
  templatesRoute,
  loginRoute,
  signupRoute,
  aboutRoute,
  blogRoute,
  careersRoute,
  contactRoute,
  privacyRoute,
  termsRoute,
  cookieRoute,
  showcaseRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
