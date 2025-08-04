import { Temporal } from '@js-temporal/polyfill';

 const bidDateValidation = (bidDate, duration) => {
  const bidStart = Temporal.Instant.from(bidDate);
  const bidEnd = bidStart.add({ minutes: duration });
  const now = Temporal.Now.instant();
  console.log('now: ',now, 'start',bidStart,'end:', bidEnd);

  const started = Temporal.Instant.compare(now, bidStart) >= 0;
  const notEnded = Temporal.Instant.compare(now, bidEnd) < 0;
  console.log(started, notEnded);

  return started && notEnded;
 }

 export default bidDateValidation;

