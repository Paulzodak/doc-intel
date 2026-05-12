import { UserMemojiOne } from "@/assets/svg/UserMemojiOne";
import { UserMemojiTwo } from "@/assets/svg/UserMemojiTwo";

const staticData = {
  memoji: [null, UserMemojiOne, UserMemojiTwo],
  excludedRedirectPages: [
    "/auth",
    "/auth/login",
    "/auth/register",
    "/auth/magic-link",
    "/auth/check-inbox",
    "/auth/verify-email",
    "/",
    "/landing",
    "/use-cases",
    "pricing",
    "contact",
    "about",
    "blog",
    "terms",
    "privacy",
    "cookies",
    "security",
    "imprint",
    "legal-notice",
    "cookie-policy",
    "data-protection",
    "gdpr",
    "ccpa",
    "hipaa",
    "gdpr-compliance",
    "ccpa-compliance",
  ],
};

export default staticData;
