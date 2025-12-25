import React from 'react';
import Navbar, { Page } from './components/Navbar';
import Footer from './components/Footer';
import SectionHeader from './components/SectionHeader';

const TermsPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-navy-900 min-h-screen text-white">
      <Navbar onNavigate={onNavigate} />
      <div className="pt-32 pb-20">
        <SectionHeader title="Terms of Service" subtitle="Last updated: October 24, 2025" />
        <div className="max-w-3xl mx-auto px-6 text-gray-400 space-y-8 leading-relaxed">
          <section className="space-y-4">
            <p>Welcome to ClosePilot. By using our website and services, you agree to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern ClosePilot's relationship with you in relation to this website.</p>
            <p>The term 'ClosePilot' or 'us' or 'we' refers to the owner of the website. The term 'you' refers to the user or viewer of our website.</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">1. Acceptance of Terms</h3>
            <p>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">2. Use License and Restrictions</h3>
            <p>Permission is granted to temporarily download one copy of the materials on ClosePilot's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Modify or copy the materials or AI-generated output for resale as a standalone product.</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial) unless explicitly permitted by your subscription plan.</li>
              <li>Attempt to decompile or reverse engineer any software contained on ClosePilot's website.</li>
              <li>Remove any copyright or other proprietary notations from the materials.</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by ClosePilot at any time.</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">3. User Obligations and Content</h3>
            <p>You are responsible for the content you input into the service. ClosePilot uses AI to generate proposals based on your inputs. You acknowledge that AI-generated content may occasionally be inaccurate or inappropriate and you agree to review all output before sending it to clients.</p>
            <p>You must not use our service to generate content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">4. Disclaimer</h3>
            <p>The materials on ClosePilot's website are provided "as is". ClosePilot makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            <p>Further, ClosePilot does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">5. Limitations of Liability</h3>
            <p>In no event shall ClosePilot or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ClosePilot's website, even if ClosePilot or a ClosePilot authorized representative has been notified orally or in writing of the possibility of such damage.</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">6. Intellectual Property</h3>
            <p>The service and its original content (excluding content provided by users), features and functionality are and will remain the exclusive property of ClosePilot and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ClosePilot.</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">7. Termination</h3>
            <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-white font-bold text-xl">8. Governing Law</h3>
            <p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which ClosePilot operates and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
          </section>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default TermsPage;