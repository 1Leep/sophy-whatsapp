module.exports = (lang) => {
  let days, hours, minutes, seconds;
  const uptime = [];

  if (lang === 'en') {
    days = 'days';
    hours = 'hours';
    minutes = 'minutes';
    seconds = 'seconds';
  } else {
    days = 'dias';
    hours = 'horas';
    minutes = 'minutos';
    seconds = 'segundos';
  }

  const time = new Date(process.uptime() * 1000);
  const upDays = time.getDate() - 1;
  const upHours = time.getHours();
  const upMinutes = time.getMinutes();
  const upSeconds = time.getSeconds();

  if (upDays > 0) uptime.push(`${upDays} ${days}`);
  if (upHours > 0) uptime.push(`${upHours} ${hours}`);
  if (upMinutes > 0) uptime.push(`${upMinutes} ${minutes}`);
  if (upSeconds > 0) uptime.push(`${upSeconds} ${seconds}`);

  return uptime.join(' ') + ' online';
}
