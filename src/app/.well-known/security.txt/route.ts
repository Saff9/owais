import { person } from "@/content";

export const dynamic = "force-static";

export function GET() {
  const base = `https://${person.domain}`;
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  // security.txt — RFC 9116 standard
  // Indexed by security scanners, CVE databases, bug bounty platforms.
  // Shows up in Google as a trust signal. Required for many enterprise clients.
  const text = `Contact: mailto:${person.email}
Contact: https://t.me/Kanferneo
Preferred-Languages: en
Canonical: ${base}/.well-known/security.txt
Expires: ${expires.toISOString()}
Policy: ${base}/privacy
Acknowledgments: ${base}/humans.txt
`;

  return new Response(text, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400",
    },
  });
}
