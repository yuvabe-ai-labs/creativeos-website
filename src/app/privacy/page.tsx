import type { Metadata } from "next";

import { LegalPage, type TocEntry } from "@/components/legal/legal-page";
import { META_PERMISSIONS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE.product}`,
  description: `How ${SITE.product} collects, uses, stores and deletes personal information, including data received from the Meta Platform when you connect an Instagram Business account.`,
  alternates: { canonical: "/privacy" },
  // Must stay crawlable and anonymously reachable for Meta App Review.
  robots: { index: true, follow: true },
};

const TOC: TocEntry[] = [
  { id: "who-we-are", label: "Who we are" },
  { id: "what-we-collect", label: "What we collect" },
  { id: "meta-platform-data", label: "Meta Platform Data" },
  { id: "how-we-use", label: "How we use information" },
  { id: "ai-processing", label: "AI model processing" },
  { id: "sharing", label: "Sharing and disclosure" },
  { id: "retention", label: "Retention" },
  { id: "deletion", label: "Deleting your data" },
  { id: "security", label: "Security" },
  { id: "your-rights", label: "Your rights" },
  { id: "transfers", label: "International transfers" },
  { id: "children", label: "Children" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      summary={`This policy explains what information ${SITE.product} collects, why we collect it, who we share it with, and how you can have it deleted. It covers data we receive from the Meta Platform when you connect an Instagram Business account for publishing.`}
      toc={TOC}
    >
      <h2 id="who-we-are">1. Who we are</h2>
      <p>
        {SITE.product} is a creative production workspace operated by{" "}
        <strong>{SITE.legalEntity}</strong>, {SITE.address}. In this policy,
        &ldquo;{SITE.product}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; and
        &ldquo;our&rdquo; refer to {SITE.legalEntity} as the operator of the{" "}
        {SITE.product} service.
      </p>
      <p>
        {SITE.product} is a business tool used by creative and marketing agencies
        to produce reels and static posts for their clients. Most information we
        hold is business information belonging to an agency and its clients,
        rather than information about consumers.
      </p>
      <p>
        For any privacy question, or to make a request about your data, contact{" "}
        <a href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a>.
      </p>

      <h2 id="what-we-collect">2. What we collect</h2>

      <h3>Account information</h3>
      <p>
        The name, work email address and organisation of each person we create a{" "}
        {SITE.product} account for, together with their role in the workspace.
        Accounts are provisioned for agencies we work with; {SITE.product} is not
        open to public self-signup.
      </p>

      <h3>Content you put into the workspace</h3>
      <p>
        {SITE.product} stores the material you create and upload while producing
        an asset. This includes:
      </p>
      <ul>
        <li>
          Brand context for your clients — tone of voice, product details,
          claims, and similar reference material.
        </li>
        <li>
          Scripts, briefs and text you write or paste into a canvas, and the
          structured fields extracted from them.
        </li>
        <li>
          Files you upload, and reference images you collect, including the
          source URL a reference image came from.
        </li>
        <li>
          Prompts, generation settings, every generated image and video attempt,
          and the edits, corrections and approvals recorded against them.
        </li>
      </ul>
      <p>
        Retaining attempts and approvals is a core function of the product, not
        an incidental log: it is what lets later work start from what already
        worked. If material you upload contains personal information — a
        person&apos;s likeness in a photograph, for example — we process it on
        your behalf as described in this policy.
      </p>

      <h3>Technical information</h3>
      <p>
        Standard service data: IP address, browser and device type, pages
        requested, timestamps, and error diagnostics. We use this to keep the
        service running, secure and debuggable.
      </p>

      <h2 id="meta-platform-data">3. Meta Platform Data</h2>
      <p>
        {SITE.product} can publish approved content directly to an Instagram
        Business account. This is optional. It applies only if you choose to
        connect an account, and only for as long as that connection remains
        active.
      </p>
      <p>
        When you connect, you authorise us through Meta&apos;s standard login
        flow. We never see or store your Facebook or Instagram password. Meta
        issues us an access token, which we store in encrypted form and use only
        to carry out the actions below.
      </p>

      <h3>Permissions we request, and why</h3>
      <dl>
        {META_PERMISSIONS.map((permission) => (
          <div key={permission.name}>
            <dt>{permission.name}</dt>
            <dd>{permission.use}</dd>
          </div>
        ))}
      </dl>

      <h3>What we store</h3>
      <ul>
        <li>
          The connected Instagram Business account&apos;s ID, username, account
          type and profile picture, so the workspace can show you which account
          you are publishing to.
        </li>
        <li>
          The IDs and names of Facebook Pages you manage, so you can pick the one
          linked to that Instagram account.
        </li>
        <li>
          A record of what {SITE.product} published, when, and to which account,
          together with the identifier Instagram returns for the published post.
        </li>
        <li>The encrypted access token, and its expiry.</li>
      </ul>

      <h3>What we do not do with it</h3>
      <ul>
        <li>
          We do not sell Meta Platform Data, and we never will.
        </li>
        <li>
          We do not use it for advertising, ad targeting, audience building or
          profiling.
        </li>
        <li>
          We do not use it to train machine-learning models, ours or anyone
          else&apos;s.
        </li>
        <li>
          We do not transfer it to data brokers, information-resale services or
          any party not listed in section 6.
        </li>
        <li>
          We do not read your direct messages, and we do not request permission
          to.
        </li>
        <li>
          We do not publish anything you have not explicitly approved inside{" "}
          {SITE.product}.
        </li>
      </ul>
      <p>
        Our handling of this data is governed by the{" "}
        <a
          href="https://developers.facebook.com/terms/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Meta Platform Terms
        </a>{" "}
        and{" "}
        <a
          href="https://developers.facebook.com/devpolicy/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Developer Policies
        </a>
        , in addition to this policy.
      </p>

      <h3>Disconnecting</h3>
      <p>
        You can disconnect an Instagram account from {SITE.product} at any time
        in the workspace settings. You can also revoke our access from Meta
        directly, under Settings → Apps and Websites on Facebook or Instagram.
        On disconnection we delete the stored access token immediately and delete
        the associated account metadata within 30 days. See section 8 for full
        deletion.
      </p>

      <h2 id="how-we-use">4. How we use information</h2>
      <ul>
        <li>To provide the workspace and produce the assets you ask it for.</li>
        <li>
          To carry forward approved prompts, references and settings into your
          later work, which is the product&apos;s central purpose.
        </li>
        <li>
          To publish approved content to accounts you have connected, at your
          instruction.
        </li>
        <li>To secure the service, prevent abuse and diagnose faults.</li>
        <li>To support you, and to bill the agency we contract with.</li>
        <li>To meet legal and regulatory obligations.</li>
      </ul>
      <p>
        We do not sell personal information. We do not serve advertising in{" "}
        {SITE.product}.
      </p>

      <h2 id="ai-processing">5. AI model processing</h2>
      <p>
        {SITE.product} coordinates third-party AI models to generate text, images
        and video. When you run a generation, the relevant prompt, context and
        input images are sent to the provider of the model you are using in order
        to produce the output you requested.
      </p>
      <p>
        We select providers that offer business or enterprise terms under which
        submitted content is not used to train their models. Providers change,
        so we do not name them in this policy; we will tell you which providers
        are in use for your workspace on request to{" "}
        <a href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a>.
      </p>
      <p>
        <strong>
          Content received from the Meta Platform is never sent to an AI model
          provider.
        </strong>{" "}
        The publishing integration is one-directional: {SITE.product} sends
        approved assets to Instagram, and does not draw Instagram content into
        generation.
      </p>

      <h2 id="sharing">6. Sharing and disclosure</h2>
      <p>We share information only with:</p>
      <ul>
        <li>
          <strong>Infrastructure providers</strong> — cloud hosting, databases
          and object storage that run the service, acting on our instructions
          under contract.
        </li>
        <li>
          <strong>AI model providers</strong> — as described in section 5, and
          only the content needed for the generation you requested.
        </li>
        <li>
          <strong>Meta</strong> — the content and metadata required to publish a
          post you approved, sent to the account you connected.
        </li>
        <li>
          <strong>Professional advisers and authorities</strong> — where we are
          legally required to disclose, or need to establish or defend a legal
          claim.
        </li>
        <li>
          <strong>A successor</strong> — if the business is acquired or
          reorganised, under terms no less protective than this policy.
        </li>
      </ul>
      <p>
        Each agency&apos;s workspace is a separate context boundary. We do not
        expose one agency&apos;s brand context, references or generations to
        another.
      </p>

      <h2 id="retention">7. Retention</h2>
      <ul>
        <li>
          <strong>Workspace content</strong> — kept for as long as your agency
          holds an account with us, because its value is cumulative. Deleted
          within 90 days of the account closing, unless you ask us to delete it
          sooner.
        </li>
        <li>
          <strong>Meta Platform Data</strong> — kept only while the connection is
          active. Access tokens are deleted on disconnection; account metadata
          and publishing records within 30 days.
        </li>
        <li>
          <strong>Technical logs</strong> — kept for a limited operational
          period, then deleted or aggregated so they no longer identify anyone.
        </li>
        <li>
          <strong>Billing and tax records</strong> — kept as long as applicable
          law requires.
        </li>
      </ul>

      <h2 id="deletion">8. Deleting your data</h2>
      <p>
        You can ask us to delete your data at any time, and you do not need an
        account to make the request.
      </p>
      <p>
        Email <a href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a>{" "}
        with the subject line <strong>Data deletion request</strong>, telling us
        the workspace or Instagram account concerned. We will confirm receipt
        within 5 working days and complete the deletion within 30 days, then
        confirm in writing when it is done.
      </p>
      <p>
        To remove only the Instagram connection, disconnect it in the workspace
        settings, or revoke {SITE.product} from Settings → Apps and Websites on
        Facebook or Instagram. Revoking from Meta stops all further access
        immediately; email us as above if you also want the stored account
        metadata and publishing history erased ahead of the 30-day window.
      </p>
      <p>
        We may retain the minimum needed to meet a legal obligation or resolve a
        dispute. Where we do, we will tell you what and why.
      </p>

      <h2 id="security">9. Security</h2>
      <p>
        We encrypt data in transit and at rest, store access tokens encrypted,
        restrict internal access to staff who need it, and separate each
        agency&apos;s workspace.
      </p>
      <p>
        We describe the controls we actually operate, and we will not claim a
        certification we do not hold. {SITE.product} is an early-stage product;
        as the security programme develops we will state publicly what has been
        implemented. No system is perfectly secure, and we cannot guarantee
        absolute security.
      </p>

      <h2 id="your-rights">10. Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access a copy of
        your personal information, correct it, delete it, object to or restrict
        how we use it, ask for it in a portable format, and complain to your
        data protection regulator.
      </p>
      <p>
        Exercise any of these by emailing{" "}
        <a href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a>. We do
        not charge for a reasonable request, and we will not treat you
        differently for making one.
      </p>
      <p>
        Where we hold information on behalf of an agency using {SITE.product},
        that agency directs how it is handled. We will refer your request to them
        and support them in answering it.
      </p>

      <h2 id="transfers">11. International transfers</h2>
      <p>
        We operate from {SITE.jurisdiction}, and our providers may process data
        in other countries. Where information moves across borders we rely on
        appropriate safeguards, such as standard contractual clauses, so it
        remains protected to the standard described here.
      </p>

      <h2 id="children">12. Children</h2>
      <p>
        {SITE.product} is a business tool and is not directed at children. We do
        not knowingly create accounts for anyone under 18. If you believe a child
        has provided us with personal information, contact us and we will delete
        it.
      </p>

      <h2 id="changes">13. Changes</h2>
      <p>
        If we change this policy we will update the date at the top of this page.
        Where a change materially affects how we handle your information, we will
        tell account holders directly before it takes effect.
      </p>

      <h2 id="contact">14. Contact</h2>
      <p>
        {SITE.legalEntity}
        <br />
        {SITE.address}
        <br />
        <a href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a>
      </p>
    </LegalPage>
  );
}
