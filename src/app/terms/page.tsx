import type { Metadata } from "next";

import { LegalPage, type TocEntry } from "@/components/legal/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${SITE.product}`,
  description: `The terms on which ${SITE.product} is provided, including acceptable use, ownership of your content, and the rules that apply when you connect an Instagram Business account.`,
  alternates: { canonical: "/terms" },
  // Must stay crawlable and anonymously reachable for Meta App Review.
  robots: { index: true, follow: true },
};

const TOC: TocEntry[] = [
  { id: "agreement", label: "The agreement" },
  { id: "service", label: "What the service is" },
  { id: "accounts", label: "Accounts and access" },
  { id: "pilot", label: "Pilots and early access" },
  { id: "your-content", label: "Your content" },
  { id: "generated-output", label: "Generated output" },
  { id: "acceptable-use", label: "Acceptable use" },
  { id: "meta", label: "Instagram and Meta" },
  { id: "third-party", label: "Other third-party services" },
  { id: "fees", label: "Fees" },
  { id: "our-ip", label: "Our intellectual property" },
  { id: "confidentiality", label: "Confidentiality" },
  { id: "warranties", label: "Disclaimers" },
  { id: "liability", label: "Limitation of liability" },
  { id: "indemnity", label: "Indemnity" },
  { id: "termination", label: "Term and termination" },
  { id: "governing-law", label: "Governing law" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      summary={`These terms govern your use of ${SITE.product}. They cover what the service does, what you may and may not do with it, who owns what, and the additional rules that apply when you connect an Instagram Business account for publishing.`}
      toc={TOC}
    >
      <h2 id="agreement">1. The agreement</h2>
      <p>
        These terms are between you and <strong>{SITE.legalEntity}</strong>,{" "}
        {SITE.address}, the operator of {SITE.product}. By using {SITE.product}{" "}
        you agree to them. If you are using it for an organisation, you confirm
        you are authorised to accept these terms on its behalf, and
        &ldquo;you&rdquo; means that organisation.
      </p>
      <p>
        If we have signed a separate written agreement with your organisation and
        it conflicts with these terms, that agreement takes precedence.
      </p>
      <p>
        Our <a href="/privacy">Privacy Policy</a> forms part of these terms.
      </p>

      <h2 id="service">2. What the service is</h2>
      <p>
        {SITE.product} is a production workspace for creating marketing assets.
        It holds brand context, scripts and references, coordinates third-party
        AI models to generate prompts, images and video, records every attempt
        and approval, and can publish approved assets to social accounts you
        connect.
      </p>
      <p>
        {SITE.product} produces the individual assets that make up a piece of
        content. It does not assemble finished reels, edit timelines or sync
        audio; that work stays in your own editing software.
      </p>

      <h2 id="accounts">3. Accounts and access</h2>
      <p>
        Accounts are provisioned by us for organisations we work with.{" "}
        {SITE.product} is not open to public self-signup. You are responsible for
        keeping credentials secure, for activity under your accounts, and for
        telling us promptly at{" "}
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> if you
        suspect unauthorised access.
      </p>
      <p>
        You must be at least 18 years old and legally able to enter a contract.
      </p>

      <h2 id="pilot">4. Pilots and early access</h2>
      <p>
        {SITE.product} is offered to some organisations as a pilot or early
        access. Pilot features may change, break or be withdrawn, and we may
        limit usage. Any performance figures we publish describe our own
        production workflows; they are not a promise of the results you will get.
      </p>

      <h2 id="your-content">5. Your content</h2>
      <p>
        You keep ownership of everything you bring into {SITE.product} — brand
        context, scripts, briefs, uploaded files and reference material. You grant
        us a licence to host, process, transmit and display it strictly as needed
        to operate the service for you, including sending it to the AI model
        providers and publishing destinations you choose.
      </p>
      <p>You are responsible for confirming that you hold the rights to:</p>
      <ul>
        <li>
          the material you upload, including photographs, footage, logos, music
          and any likeness appearing in them;
        </li>
        <li>
          the reference images you collect, and their use as inputs to
          generation;
        </li>
        <li>
          the claims made in your client&apos;s content, and its compliance with
          advertising law and platform rules.
        </li>
      </ul>
      <p>
        We do not use your content to train our own models, and we do not use it
        to serve other customers.
      </p>

      <h2 id="generated-output">6. Generated output</h2>
      <p>
        Output produced through {SITE.product} is generated by third-party AI
        models. As between you and us, it is yours to use, subject to the terms of
        the model provider that produced it.
      </p>
      <p>
        AI output can be wrong, derivative of existing work, or unsuitable for
        publication. It may misrepresent a product, a claim or a person.{" "}
        <strong>
          You are responsible for reviewing every asset before it is published or
          delivered to a client.
        </strong>{" "}
        The review checkpoints in the product are there to help you do that; they
        do not transfer that responsibility to us. We do not warrant that output
        is accurate, original, non-infringing or fit for any particular purpose.
      </p>

      <h2 id="acceptable-use">7. Acceptable use</h2>
      <p>You must not use {SITE.product} to:</p>
      <ul>
        <li>
          break the law, infringe intellectual property, or violate anyone&apos;s
          privacy or publicity rights;
        </li>
        <li>
          create sexual content involving minors, or any content that sexualises a
          real person without their consent;
        </li>
        <li>
          create a synthetic likeness or voice of a real person without their
          permission, or content designed to deceive people about who is speaking
          or what happened;
        </li>
        <li>
          produce harassing, hateful, or violent content, or content promoting
          self-harm;
        </li>
        <li>
          make false or unsubstantiated advertising claims, including health,
          medical or financial claims;
        </li>
        <li>
          publish spam, or run engagement or follower manipulation of any kind;
        </li>
        <li>
          probe, scrape, overload, reverse-engineer or circumvent limits on the
          service, or resell it without our written agreement.
        </li>
      </ul>
      <p>
        We may suspend access to investigate a suspected breach, and will tell you
        when we do so unless the law prevents it.
      </p>

      <h2 id="meta">8. Instagram and Meta</h2>
      <p>
        If you connect an Instagram Business account, {SITE.product} publishes to
        it on your instruction using Meta&apos;s official APIs. Additional terms
        apply.
      </p>
      <ul>
        <li>
          You confirm you are authorised to publish to the account you connect,
          and that you have the client&apos;s permission where the account is
          theirs.
        </li>
        <li>
          Your use of Instagram remains governed by Meta&apos;s own terms,
          including the{" "}
          <a
            href="https://help.instagram.com/581066165581870"
            target="_blank"
            rel="noreferrer noopener"
          >
            Instagram Terms of Use
          </a>{" "}
          and{" "}
          <a
            href="https://transparency.meta.com/policies/community-standards/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Community Standards
          </a>
          . Content you publish through {SITE.product} must comply with them.
        </li>
        <li>
          Nothing is published without your explicit approval inside{" "}
          {SITE.product}.
        </li>
        <li>
          You can disconnect at any time in the workspace, or revoke our access
          from Meta directly. Section 8 of our{" "}
          <a href="/privacy">Privacy Policy</a> explains what we delete and when.
        </li>
        <li>
          Meta may change, restrict or withdraw its APIs at any time. If that
          stops publishing from working, we are not liable for the interruption,
          though we will tell you and restore it where we reasonably can.
        </li>
        <li>
          We are not affiliated with, endorsed by, or sponsored by Meta Platforms,
          Inc. Instagram and Facebook are trademarks of Meta Platforms, Inc.
        </li>
      </ul>

      <h2 id="third-party">9. Other third-party services</h2>
      <p>
        {SITE.product} depends on third-party AI model providers and
        infrastructure. Their availability, pricing and terms are outside our
        control, and a change on their side may affect the service. We are not
        responsible for third-party services, and your use of their output may be
        subject to their terms.
      </p>

      <h2 id="fees">10. Fees</h2>
      <p>
        Fees, billing period and any usage limits are those set out in the order
        or pilot agreement with your organisation. Unless that document says
        otherwise, fees exclude taxes, and generation costs charged by model
        providers are passed through. Pilots may be provided at no charge; that
        does not waive any other part of these terms.
      </p>

      <h2 id="our-ip">11. Our intellectual property</h2>
      <p>
        We own {SITE.product} — the software, interface, documentation, branding
        and everything we develop in providing it. These terms grant you a
        limited, non-exclusive, non-transferable right to use the service, and
        nothing more. Feedback you send us may be used freely to improve the
        product, without obligation to you.
      </p>

      <h2 id="confidentiality">12. Confidentiality</h2>
      <p>
        Each of us may receive confidential information from the other. Neither
        will disclose it except to people who need it and are bound by comparable
        obligations, or where the law requires disclosure. Your brand context,
        client material and production data are your confidential information.
      </p>

      <h2 id="warranties">13. Disclaimers</h2>
      <p>
        {SITE.product} is provided &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo;. To the fullest extent the law allows, we exclude all
        implied warranties, including merchantability, fitness for a particular
        purpose and non-infringement.
      </p>
      <p>
        We do not warrant that the service will be uninterrupted or error-free,
        that generated output will meet your expectations, or that using{" "}
        {SITE.product} will improve any campaign&apos;s performance. Campaign
        results depend on media, audience, offer, creative quality and other
        factors outside the product.
      </p>

      <h2 id="liability">14. Limitation of liability</h2>
      <p>
        To the fullest extent the law allows, neither party is liable for
        indirect, incidental, special or consequential loss, or for lost profits,
        revenue, goodwill or data, even if advised such loss was possible.
      </p>
      <p>
        Our total aggregate liability arising out of or relating to these terms is
        limited to the amounts you paid us for the service in the twelve months
        before the event giving rise to the claim.
      </p>
      <p>
        Nothing here excludes liability that cannot lawfully be excluded,
        including for death or personal injury caused by negligence, or for fraud.
      </p>

      <h2 id="indemnity">15. Indemnity</h2>
      <p>
        You will indemnify us against claims, damages and reasonable costs arising
        from your content, from your use of the service in breach of these terms,
        or from content you publish through it — including claims that it
        infringes someone&apos;s rights or breaches advertising law or a
        platform&apos;s rules.
      </p>

      <h2 id="termination">16. Term and termination</h2>
      <p>
        These terms apply while you have access to {SITE.product}. Either party
        may terminate on written notice as set out in the order or pilot
        agreement, or immediately for material breach that is not cured within 30
        days.
      </p>
      <p>
        On termination your access ends. You may export your content before it
        ends, and we will help you do so on request. We delete workspace content
        as described in section 7 of the <a href="/privacy">Privacy Policy</a>.
        Sections 5, 6, 11, 12, 13, 14, 15 and 17 survive termination.
      </p>

      <h2 id="governing-law">17. Governing law</h2>
      <p>
        These terms are governed by the laws of {SITE.jurisdiction}, without
        regard to conflict-of-laws rules. The parties submit to the exclusive
        jurisdiction of {SITE.courts}, except that either party may seek
        injunctive relief in any competent court to protect its intellectual
        property or confidential information.
      </p>

      <h2 id="changes">18. Changes</h2>
      <p>
        We may update these terms. We will change the date at the top of this
        page, and where a change materially affects your rights we will tell
        account holders before it takes effect. Continuing to use {SITE.product}{" "}
        after that means you accept the updated terms.
      </p>

      <h2 id="contact">19. Contact</h2>
      <p>
        {SITE.legalEntity}
        <br />
        {SITE.address}
        <br />
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
      </p>
    </LegalPage>
  );
}
