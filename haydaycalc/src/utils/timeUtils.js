const secPerDay = 60 * 60 * 24
const secPerHour = 60 * 60
const secPerMinute = 60

export const formatTimeFromSeconds = secs => {
    if (secs === 0) return "Instant";

    const d = Math.floor(secs / secPerDay) 
    const h = Math.floor(secs % secPerDay / secPerHour) 
    const m = Math.floor(secs % secPerHour / secPerMinute) 
    const s = secs % secPerMinute 

    return [
        d !== 0 && d + 'd',
        h !== 0 && h + 'h',
        m !== 0 && m + 'm',
        s !== 0 && s + 's'
    ].filter(x => x).join(' ');
}