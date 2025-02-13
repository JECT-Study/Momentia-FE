const copyClipboard = async (text: string) => {
  try {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);

      return true;
    } else {
      throw new Error('Clipboard API not available');
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default copyClipboard;
