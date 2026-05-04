// Attendance rules
// frontend and backend both follow these rules

export const ATTENDANCE_LIFECYCLE = {
    CREATED: "CHECK_IN",
    UPDATED: "CHECK_OUT",
    CORRECTED: "CORRECTED",
} as const;

export const ATTENDANCE_RULES = {
    ONE_CHECK_IN_PER_DAY: true,
    CHECKOUT_REQUIRES_CHECKIN: true,
    ONLY_ADMIN_CAN_EDIT: true,
    CORRECTION_IS_UPDATE: true,

    STATUS_TYPES: ["Present", "Late", "Absent", "OnLeave"] as const,
} as const;