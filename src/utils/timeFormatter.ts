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
    return [
      year,
      month > 10 ? month : `0${month}`,
      date > 10 ? date : `0${date}`,
    ].join('.');

  if (nowHour !== hour) return `${nowHour - hour}시간 전`;

  if (nowMinute !== minute) return `${nowMinute - minute}분 전`;

  return `${nowSeconds - second}초 전`;
};

export default timeFormatter;
