import React from 'react';
import Navbar, { Page } from './components/Navbar';
import Footer from './components/Footer';
import SectionHeader from './components/SectionHeader';

const PrivacyPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-navy-900 min-h-screen text-white">
      <Navbar onNavigate={onNavigate} />
      <div className="pt-32 pb-20">
        <SectionHeader title="Privacy Policy" subtitle="Last updated: October 24, 2025" />
        <div className="max-w-3xl mx-auto px-6 text-gray-400 space-y-8 leading-relaxed">
          <section className="space-y-4">
            <p>At ClosePilot, accessible from closepilot.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ClosePilot and how we use it.</p>
            <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through our contact page.</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">1. Information We Collect</h3>
            <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account Information:</strong> When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</li>
              <li><strong>Communication Data:</strong> If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</li>
              <li><strong>Usage Data:</strong> We automatically collect certain information when you visit, use, or navigate the Website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, and other technical information.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">2. How We Use Your Information</h3>
            <p>We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide, operate, and maintain our website and proposal services.</li>
              <li>Improve, personalize, and expand our website features and AI models.</li>
              <li>Understand and analyze how you use our website to optimize the user experience.</li>
              <li>Develop new products, services, features, and functionality.</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
              <li>Process your transactions and manage your subscriptions.</li>
              <li>Find and prevent fraud and ensure platform security.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">3. Log Files and Cookies</h3>
            <p>ClosePilot follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>
            <p>Like any other website, ClosePilot uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">4. Data Sharing and Disclosure</h3>
            <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>
            <p>We may also release information when its release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property or safety.</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">5. Security of Your Data</h3>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">6. Your Data Protection Rights</h3>
            <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li><strong>The right to data portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default PrivacyPage;