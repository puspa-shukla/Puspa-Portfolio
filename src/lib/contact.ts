// Shared by the contact form (client) and /api/contact (server).

// Public address shown on the /contact page and used for the email fallback.
// The home page and resume keep DATA.contact.email.
export const CONTACT_EMAIL = "palabishukla@gmail.com";

export const INQUIRY_TYPES = [
  "Project Idea",
  "Feedback",
  "Collaboration",
  "Career Opportunity",
  "General Conversation",
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

export type ContactPayload = {
  name: string;
  email: string;
  inquiry: InquiryType;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  messageMin: 10,
  message: 5000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isInquiryType(value: unknown): value is InquiryType {
  return INQUIRY_TYPES.includes(value as InquiryType);
}

export function validateContact(input: {
  name?: unknown;
  email?: unknown;
  inquiry?: unknown;
  message?: unknown;
}): { data?: ContactPayload; errors: ContactErrors } {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const errors: ContactErrors = {};

  if (!name) errors.name = "Please tell me your name.";
  else if (name.length > CONTACT_LIMITS.name)
    errors.name = `Please keep your name under ${CONTACT_LIMITS.name} characters.`;

  if (!email) errors.email = "Please add your email so I can reply.";
  else if (email.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(email))
    errors.email = "That email doesn't look right. Try something like name@example.com.";

  if (!isInquiryType(input.inquiry))
    errors.inquiry = "Please choose what your message is about.";

  if (!message) errors.message = "Please write a short message.";
  else if (message.length < CONTACT_LIMITS.messageMin)
    errors.message = `A little more, please. At least ${CONTACT_LIMITS.messageMin} characters.`;
  else if (message.length > CONTACT_LIMITS.message)
    errors.message = `Please keep your message under ${CONTACT_LIMITS.message} characters.`;

  if (Object.keys(errors).length > 0) return { errors };
  return {
    data: { name, email, inquiry: input.inquiry as InquiryType, message },
    errors,
  };
}
