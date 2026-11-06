export function speakText(text: string, lang = 'en-US', onEnd?: () => void): SpeechSynthesisUtterance | null {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported by this browser.');
    return null;
  }

  // Stop any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9; // slightly slower, peaceful cadence
  utterance.pitch = 1.0;

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
