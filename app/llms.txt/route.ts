/**
 * /llms.txt — a concise, structured product summary for AI/LLM crawlers and
 * answer engines (ChatGPT, Claude, Perplexity, Google AI Overviews). The
 * emerging llms.txt convention lets AI tools fetch a clean, factual overview
 * instead of parsing rendered HTML. Keep this accurate and in sync with the
 * site; never include secrets.
 */

const content = `# WebXterm

> WebXterm is a secure web terminal platform that provides browser-based SSH
> access to servers, laptops, and bare-metal machines. Manage your entire
> infrastructure from the browser, a CLI, or a VS Code extension — with TLS 1.3
> encryption, immutable audit logs, and role-based access control (RBAC).

## What WebXterm does

- Browser-based SSH terminal (full xterm.js terminal in the browser)
- VSAY Shell CLI: a single static binary to list machines and connect with one command, forward ports, and script automation
- VSAY VS Code extension: browse machines, open terminal sessions, and forward ports inside the IDE
- Real-time health monitoring: agent heartbeats stream CPU, memory, and disk stats
- Immutable audit logs of every login, session, and command
- RBAC team access: per-user, per-machine access policies
- Port forwarding: tunnel remote ports to localhost securely

## Architecture (key differentiator)

WebXterm uses an agent-based, zero-trust architecture. The lightweight
"vsay-agent" is a single static binary (runs as systemd/launchd/Windows
service) that connects OUTBOUND over gRPC + TLS to the WebXterm portal.
Result: no open inbound ports, no VPN, no firewall changes, and it works for
machines behind NAT or strict firewalls.

## Security

- TLS 1.3 for all traffic in transit (by default)
- JWT authentication with bcrypt-hashed credentials and short-lived tokens
- Enterprise: mutual TLS (mTLS) for certificate-based agent authentication
- Enterprise: OIDC/SSO via Keycloak, Microsoft, GitHub, and Okta

## Platform support

- Operating systems: Linux, macOS, Windows
- Architectures: x86 (amd64) and ARM (arm64), including Raspberry Pi
- Targets: cloud VMs, bare-metal servers, and laptops

## Editions & pricing

- Community edition: free forever for individuals and small teams, no credit
  card. Includes secure SSH access, web terminal, RBAC, monitoring, audit logs,
  TLS encryption, VSAY CLI, VS Code extension, and API access.
- Enterprise edition: adds mTLS, OIDC/SSO (Keycloak), multi-tenancy
  (organizations), organization API, and priority support. Contact sales.

## Common comparisons

- vs Teleport: WebXterm is lighter-weight and browser-first with a free
  Community edition and an outbound-only agent (no inbound ports).
- vs a bastion host / jump server: WebXterm needs no open inbound SSH port,
  no SSH key sprawl, and includes built-in RBAC and audit logs.
- vs cloud provider Cloud Shell: WebXterm works across clouds, on-prem, bare
  metal, and laptops — not just one provider — and is self-hostable.

## Key links

- Homepage: https://webxterm.me
- Features: https://webxterm.me/features
- Architecture: https://webxterm.me/architecture
- Pricing: https://webxterm.me/pricing
- CLI: https://webxterm.me/cli
- VS Code extension: https://webxterm.me/vscode
- Comparisons: https://webxterm.me/vs
- Console (sign in / start free): https://console.webxterm.me
- Documentation: https://docs.webxterm.me
- Community: https://community.webxterm.me
- Contact: https://webxterm.me/contact
`;

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
