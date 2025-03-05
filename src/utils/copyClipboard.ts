const copyClipboard = async (text: string) => {
  try {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);

      return true;
    } else {
      throw new Error('Clipboard API를 사용할 수 없습니다.');
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default copyClipboard;
