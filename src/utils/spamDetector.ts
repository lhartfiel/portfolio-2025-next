/**
 * Frontend spam detection utility
 */

export function isGibberish(text: string): boolean {
  if (!text || text.trim().length < 3) {
    return false;
  }

  // Remove spaces and convert to lowercase
  const cleanText = text.toLowerCase().replace(/\s/g, "");

  // Count consonant clusters (4+ consonants in a row)
  const consonantClusters = (
    cleanText.match(/[bcdfghjklmnpqrstvwxyz]{4,}/g) || []
  ).length;

  // Count total words
  const words = text.split(/\s+/);
  if (words.length === 0) {
    return true;
  }

  // Check for excessive consonant clusters
  if (consonantClusters > words.length * 0.3) {
    return true;
  }

  // Check for repeated characters (like "aaaaaaa")
  const repeatedChars = (cleanText.match(/(.)\1{4,}/g) || []).length;
  if (repeatedChars > 2) {
    return true;
  }

  // Check vowel ratio - real text has ~40% vowels
  const vowels = (cleanText.match(/[aeiou]/g) || []).length;
  if (cleanText.length > 10) {
    const vowelRatio = vowels / cleanText.length;
    if (vowelRatio < 0.15 || vowelRatio > 0.7) {
      return true;
    }
  }

  return false;
}

export function containsSpamPatterns(text: string): boolean {
  if (!text) {
    return false;
  }

  const textLower = text.toLowerCase();

  // Common spam keywords
  const spamKeywords = [
    "viagra",
    "cialis",
    "casino",
    "lottery",
    "bitcoin",
    "crypto",
    "investment opportunity",
    "click here",
    "buy now",
    "limited time",
    "act now",
    "free money",
  ];

  for (const keyword of spamKeywords) {
    if (textLower.includes(keyword)) {
      return true;
    }
  }

  // Check for excessive URLs
  const urls = text.match(
    /https?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/g
  );
  if (urls && urls.length > 2) {
    return true;
  }

  return false;
}

export function isSpamMessage(
  name: string,
  _email: string,
  message: string
): { isSpam: boolean; reason: string } {
  // Check name for gibberish
  if (isGibberish(name)) {
    return {
      isSpam: true,
      reason: "Name appears to contain random characters",
    };
  }

  // Check message for gibberish
  if (isGibberish(message)) {
    return {
      isSpam: true,
      reason: "Message appears to contain random characters",
    };
  }

  // Check for spam patterns
  if (containsSpamPatterns(message)) {
    return { isSpam: true, reason: "Message contains spam patterns" };
  }

  // Check message length - too short or suspiciously long
  if (message.trim().length < 10) {
    return { isSpam: true, reason: "Message is too short" };
  }

  if (message.length > 5000) {
    return { isSpam: true, reason: "Message is too long" };
  }

  return { isSpam: false, reason: "" };
}
