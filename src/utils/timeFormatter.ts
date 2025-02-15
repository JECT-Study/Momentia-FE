const timeFormatter = (timeString: string) => {
  const [dateData, timeData] = timeString.split('T');
  const [year, month, date] = dateData.split('-').map(Number);
  const [hour, minute, second] = timeData.split(':').map(Number);

  const now = new Date();

  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDate = now.getDate();

  const nowHour = now.getUTCHours();
  const nowMinute = now.getUTCMinutes();
  const nowSeconds = now.getUTCSeconds();

  if (nowYear !== year || nowMonth !== month || nowDate !== date)
    return new Date(timeString + 'Z').toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  if (nowHour !== hour) return `${nowHour - hour}시간 전`;

  if (nowMinute !== minute) return `${nowMinute - minute}분 전`;

  const pastSeconds = nowSeconds - second;

  return `${pastSeconds > 0 ? pastSeconds : 0}초 전`;
};

export default timeFormatter;
