import Link from 'next/link';

const TermsOfService = () => {
  return (
    <div className="container mx-auto py-4 px-2">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Terms of Service</h1>
        <p className="mb-4">
          Welcome to PhilaReact! By using our website and services, you agree to comply with and be bound by
          the following terms and conditions of use. Please review the following terms carefully. If you do
          not agree to these terms, you should not use this site or our services.
        </p>

        <h2 className="text-xl font-bold mb-2">1. Acceptance of Agreement</h2>
        <p className="mb-4">
          You agree to the terms and conditions outlined in this Terms of Service Agreement
          (&quot;Agreement&quot;) with respect to our site (the &quot;Site&quot;). This Agreement constitutes
          the entire and only agreement between us and you, and supersedes all prior or contemporaneous
          agreements, representations, warranties, and understandings with respect to the Site, the content,
          products, or services provided by or through the Site, and the subject matter of this Agreement.
          This Agreement may be amended at any time by us from time to time without specific notice to you.
          The latest Agreement will be posted on the Site, and you should review this Agreement prior to using
          the Site.
        </p>

        <h2 className="text-xl font-bold mb-2">2. Privacy Policy</h2>
        <p className="mb-4">
          Our Privacy Policy is considered part of this Agreement. You must review our Privacy Policy by
          clicking on this{' '}
          <Link href="/privacy-policy">
            <span className="underline">link</span>
          </Link>
          . If you do not accept and agree to be bound by all the terms of this Agreement, including the
          PhilaReact Privacy Policy, do not use this Site or our services.
        </p>

        <h2 className="text-xl font-bold mb-2">3. Use of the Site</h2>
        <p className="mb-4">
          You agree to use the Site only for lawful purposes. You agree not to take any action that might
          compromise the security of the Site, render the Site inaccessible to others, or otherwise cause
          damage to the Site or its content. You agree not to add to, subtract from, or otherwise modify the
          Site, or to attempt to access any information that is not intended for you. You agree not to use the
          Site in any manner that might interfere with the rights of third parties.
        </p>

        <h2 className="text-xl font-bold mb-2">4. Intellectual Property</h2>
        <p className="mb-4">
          All content included on this site is and shall continue to be the property of PhilaReact or its
          content suppliers and is protected under applicable copyright, patent, trademark, and other
          proprietary rights. Any copying, redistribution, use, or publication by you of any such content or
          any part of the Site is prohibited, except as expressly permitted in this Agreement. Under no
          circumstances will you acquire any ownership rights or other interest in any content by or through
          your use of this Site.
        </p>

        <h2 className="text-xl font-bold mb-2">5. Limitation of Liability</h2>
        <p className="mb-4">
          PhilaReact SHALL NOT BE LIABLE FOR ANY DAMAGES WHATSOEVER, AND IN PARTICULAR PhilaReact SHALL NOT BE
          LIABLE FOR ANY SPECIAL, INDIRECT, CONSEQUENTIAL, OR INCIDENTAL DAMAGES, OR DAMAGES FOR LOST PROFITS,
          LOSS OF REVENUE, OR LOSS OF USE, ARISING OUT OF OR RELATED TO THIS SITE OR THE INFORMATION CONTAINED
          IN IT, WHETHER SUCH DAMAGES ARISE IN CONTRACT, NEGLIGENCE, TORT, UNDER STATUTE, IN EQUITY, AT LAW,
          OR OTHERWISE, EVEN IF PhilaReact HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>

        <h2 className="text-xl font-bold mb-2">6. Indemnification</h2>
        <p className="mb-4">
          You agree to indemnify, defend, and hold PhilaReact and our partners, employees, and affiliates,
          harmless from any liability, loss, claim, and expense, including reasonable attorney&aposs fees,
          related to your violation of this Agreement or use of the Site.
        </p>

        <h2 className="text-xl font-bold mb-2">7. Miscellaneous</h2>
        <p className="mb-4">
          This Agreement shall be treated as though it were executed and performed in the United States, and
          shall be governed by and construed in accordance with the laws of the United States (without regard
          to conflict of law principles). Any cause of action by you with respect to the Site (and/or any
          information, products, or services related thereto) must be instituted within one (1) year after the
          cause of action arose or be forever waived and barred. All actions shall be subject to the
          limitations set forth in Section 5 and Section 6. The language in this Agreement shall be
          interpreted as to its fair meaning and not strictly for or against any party.
        </p>

        <p className="mb-4">
          If you have any questions about these Terms of Service, please contact us at{' '}
          <a href="mailto:support@philareacy.org" className="hover:underline">
            support@philareact.org
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
