import React from 'react';
import Navbar, { Page } from './components/Navbar';
import Footer from './components/Footer';
import SectionHeader from './components/SectionHeader';

const CookiePage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-navy-900 min-h-screen text-white">
      <Navbar onNavigate={onNavigate} />
      <div className="pt-32 pb-20">
        <SectionHeader title="Cookie Policy" subtitle="Understanding how we use cookies to provide a better experience." />
        <div className="max-w-3xl mx-auto px-6 text-gray-400 space-y-8 leading-relaxed">
          <section className="space-y-4">
            <p>This is the Cookie Policy for ClosePilot, accessible from closepilot.com. We believe in being clear and open about how we collect and use data related to you.</p>
            <p>To provide you with a seamless experience, we use cookies and similar technologies. This policy describes what these technologies are and why we use them.</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">1. What Are Cookies?</h3>
            <p>Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.</p>
            <p>Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your personal computer or mobile device when you go offline, while session cookies are deleted as soon as you close your web browser.</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">2. How ClosePilot Uses Cookies</h3>
            <p>When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-4">
              <li>
                <strong>Essential Cookies:</strong> These are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
              </li>
              <li>
                <strong>Preference Cookies:</strong> We use these to remember your settings and preferences. For example, we may remember your language preferences or the configuration of your dashboard.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> These allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
              </li>
              <li>
                <strong>Marketing Cookies:</strong> These cookies are set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information but are based on uniquely identifying your browser and internet device.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">3. Third-Party Cookies</h3>
            <p>In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on. For example, we use Google Analytics to help us understand how our customers use the site.</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">4. Your Choices Regarding Cookies</h3>
            <p>If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.</p>
            <p>Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>For the Chrome web browser, please visit this page from Google: <a href="https://support.google.com/accounts/answer/32050" className="text-accent-indigo hover:text-accent-mint transition-colors">Clear cache & cookies</a></li>
              <li>For the Internet Explorer web browser, please visit this page from Microsoft: <a href="http://support.microsoft.com/kb/278835" className="text-accent-indigo hover:text-accent-mint transition-colors">Delete and manage cookies</a></li>
              <li>For the Firefox web browser, please visit this page from Mozilla: <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" className="text-accent-indigo hover:text-accent-mint transition-colors">Enable and disable cookies</a></li>
              <li>For the Safari web browser, please visit this page from Apple: <a href="https://support.apple.com/kb/PH21411?viewlocale=en_US&locale=en_US" className="text-accent-indigo hover:text-accent-mint transition-colors">Manage cookies and website data</a></li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">5. More Information</h3>
            <p>We hope that has clarified things for you. As was previously mentioned, if there is something that you aren't sure whether you need or not, it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.</p>
            <p>However, if you are still looking for more information, then you can contact us through our preferred contact methods on the contact page.</p>
          </section>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default CookiePage;