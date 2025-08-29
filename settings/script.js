// ====== GIBBERISH LOGIC ======
function applyGibberish() {
  if (!tmdbLanguage) return; // Only run if dropdown exists

  const language = getTmdbLanguage();

  // Helper: generate a gibberish word
  function makeGibberishWord(length) {
    const consonants = "bcdfghjklmnpqrstvwxyz";
    const vowels = "aeiou";
    let word = "";
    for (let i = 0; i < length; i++) {
      // Alternate consonant/vowel for more word-like structure
      if (i % 2 === 0) {
        word += consonants[Math.floor(Math.random() * consonants.length)];
      } else {
        word += vowels[Math.floor(Math.random() * vowels.length)];
      }
    }
    return word;
  }

  // Helper: convert a text to reversed gibberish words
  function textToGibberish(text) {
    return text
      .split(" ")
      .map(word => makeGibberishWord(Math.max(2, Math.min(word.length, 8))))
      .map(word => word.split("").reverse().join("")) // reverse each word
      .join(" ");
  }

  if (language === "gb-FZ") {
    document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a").forEach(el => {
      if (!el.dataset.originalText) el.dataset.originalText = el.textContent;
      el.textContent = textToGibberish(el.dataset.originalText);
    });
  } else {
    // Restore original text
    document.querySelectorAll("[data-original-text]").forEach(el => {
      el.textContent = el.dataset.originalText;
    });
  }
}
