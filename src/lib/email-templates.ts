/**
 * Email template for sending quotes to customers.
 */
export function quoteEmailTemplate({
  businessName,
  customerName,
  vehicleInfo,
  total,
  quoteUrl,
  validUntil,
}: {
  businessName: string;
  customerName: string;
  vehicleInfo: string;
  total: string;
  quoteUrl: string;
  validUntil?: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Quote from ${businessName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px;">

          <!-- Logo/Header -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <span style="font-size: 28px; font-weight: 700; color: #c9a66b; letter-spacing: -0.5px;">
                ${businessName}
              </span>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background: linear-gradient(145deg, rgba(30, 30, 30, 0.9) 0%, rgba(20, 20, 20, 0.95) 100%); border-radius: 20px; border: 1px solid rgba(201, 166, 107, 0.15); padding: 40px 32px;">

              <!-- Greeting -->
              <p style="margin: 0 0 24px 0; color: #f5f0e8; font-size: 18px; line-height: 1.5;">
                Hi ${customerName || "there"},
              </p>

              <p style="margin: 0 0 32px 0; color: rgba(245, 240, 232, 0.7); font-size: 15px; line-height: 1.6;">
                Thank you for your interest! Here's your personalized detailing quote for your vehicle.
              </p>

              <!-- Quote Summary Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: rgba(201, 166, 107, 0.08); border-radius: 12px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 8px 0; color: rgba(245, 240, 232, 0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                      Vehicle
                    </p>
                    <p style="margin: 0 0 20px 0; color: #f5f0e8; font-size: 16px; font-weight: 500;">
                      ${vehicleInfo}
                    </p>
                    <p style="margin: 0 0 8px 0; color: rgba(245, 240, 232, 0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                      Quote Total
                    </p>
                    <p style="margin: 0; color: #c9a66b; font-size: 36px; font-weight: 700;">
                      ${total}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${quoteUrl}"
                       style="display: inline-block; background: linear-gradient(135deg, #c9a66b 0%, #b8956a 100%); color: #0a0a0a; font-size: 15px; font-weight: 600; text-decoration: none; padding: 16px 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(201, 166, 107, 0.3);">
                      View Full Quote
                    </a>
                  </td>
                </tr>
              </table>

              ${validUntil ? `
              <p style="margin: 24px 0 0 0; text-align: center; color: rgba(245, 240, 232, 0.5); font-size: 13px;">
                This quote is valid until ${validUntil}
              </p>
              ` : ""}

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 20px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: rgba(245, 240, 232, 0.4); font-size: 13px;">
                Questions? Simply reply to this email.
              </p>
              <p style="margin: 0; color: rgba(245, 240, 232, 0.3); font-size: 12px;">
                Powered by <span style="color: #c9a66b;">DetailQuote</span>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

/**
 * Plain text version of the quote email.
 */
export function quoteEmailPlainText({
  businessName,
  customerName,
  vehicleInfo,
  total,
  quoteUrl,
}: {
  businessName: string;
  customerName: string;
  vehicleInfo: string;
  total: string;
  quoteUrl: string;
}): string {
  return `
Hi ${customerName || "there"},

Thank you for your interest! Here's your personalized detailing quote.

VEHICLE: ${vehicleInfo}
QUOTE TOTAL: ${total}

View your full quote here:
${quoteUrl}

Questions? Simply reply to this email.

---
${businessName}
Powered by DetailQuote
`.trim();
}
