// Centralized timezone configuration
export const TIMEZONE = "Asia/Karachi"; // UTC+05:00
const PKT_OFFSET_MINUTES = 5 * 60;

const pad = (value: number): string => value.toString().padStart(2, "0");

/**
 * Returns the current time as a PKT Date object.
 */
export const getPKTNow = (): Date => {
    return new Date(new Date().toLocaleString("en-US", { timeZone: TIMEZONE }));
};

/**
 * Returns today's date formatted as YYYY-MM-DD in the configured timezone.
 * Useful for consistent database querying across server and client timezones.
 */
export const getTodayDateString = (): string => {
    return toPKTDateString(new Date());
};

/**
 * Converts a date into YYYY-MM-DD format in the configured timezone (PKT).
 */
export const toPKTDateString = (date: Date | string): string => {
    return new Intl.DateTimeFormat('en-CA', { 
        timeZone: TIMEZONE, 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    }).format(new Date(date));
};

export const getHeaderWeekday = (): string => {
    return new Intl.DateTimeFormat('en-US', { timeZone: TIMEZONE, weekday: 'long' }).format(new Date());
};

export const getHeaderFullDate = (): string => {
    return new Intl.DateTimeFormat('en-US', { timeZone: TIMEZONE, month: 'short', day: 'numeric', year: 'numeric' }).format(new Date());
};

export const formatLongDate = (dateStr: string | Date | null | undefined): string => {
    if (!dateStr) return "-";
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return "-";
        return new Intl.DateTimeFormat('en-US', { 
            timeZone: TIMEZONE, 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        }).format(date);
    } catch {
        return "-";
    }
};

export const formatWeekday = (dateStr: string | Date | null | undefined): string => {
    if (!dateStr) return "-";
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return "-";
        return new Intl.DateTimeFormat('en-US', { 
            timeZone: TIMEZONE, 
            weekday: 'long' 
        }).format(date);
    } catch {
        return "-";
    }
};

/**
 * Formats a date string for <input type="datetime-local" />
 * Format: YYYY-MM-DDTHH:mm
 */
export const formatForDateTimeLocal = (dateStr: string | Date | null | undefined): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    
    // Adjust to local timezone (PKT) for display
    // en-CA gives YYYY-MM-DD
    const datePart = new Intl.DateTimeFormat('en-CA', { 
        timeZone: TIMEZONE, 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    }).format(date);
    
    const timePart = new Intl.DateTimeFormat('en-GB', { 
        timeZone: TIMEZONE, 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    }).format(date);
    
    return `${datePart}T${timePart}`;
};

/**
 * Converts a datetime-local value selected as PKT wall time into a UTC ISO
 * instant. This is independent of the browser's local timezone.
 */
export const dateTimeLocalToPKTISOString = (value: string): string => {
    const [datePart, timePart] = value.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour = 0, minute = 0] = timePart.split(":").map(Number);

    const utcMs = Date.UTC(year, month - 1, day, hour, minute) - (PKT_OFFSET_MINUTES * 60 * 1000);
    return new Date(utcMs).toISOString();
};

export const formatMinutes = (minutes: number): string => {
    const safeMinutes = Math.max(0, Math.floor(minutes));
    const h = Math.floor(safeMinutes / 60);
    const m = safeMinutes % 60;

    return `${h}h ${pad(m)}m`;
};
