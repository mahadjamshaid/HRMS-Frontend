// Centralized timezone configuration
export const TIMEZONE = "Asia/Karachi"; // UTC+05:00

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
    return toPKTDateString(getPKTNow());
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

/**
 * Formats a Date object or string into a standard format based on the configured timezone.
 */
export const formatTimeInTimezone = (dateStr: string | Date): string => {
    return new Date(dateStr).toLocaleTimeString("en-US", {
        timeZone: TIMEZONE,
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const getHeaderWeekday = (): string => {
    return new Intl.DateTimeFormat('en-US', { timeZone: TIMEZONE, weekday: 'long' }).format(new Date());
};

export const getHeaderFullDate = (): string => {
    return new Intl.DateTimeFormat('en-US', { timeZone: TIMEZONE, month: 'short', day: 'numeric', year: 'numeric' }).format(new Date());
};

export const formatLongDate = (dateStr: string | Date): string => {
    return new Intl.DateTimeFormat('en-US', { 
        timeZone: TIMEZONE, 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    }).format(new Date(dateStr));
};

export const formatWeekday = (dateStr: string | Date): string => {
    return new Intl.DateTimeFormat('en-US', { 
        timeZone: TIMEZONE, 
        weekday: 'long' 
    }).format(new Date(dateStr));
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

