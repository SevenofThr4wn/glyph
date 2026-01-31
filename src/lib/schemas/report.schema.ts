import z, { date } from "zod";

const reportReasons = z.enum([
    "Spam",
    "Harassment",
    "Hate Speech",
    "Scam or Fraud",
    "Impersonation",
    "Privacy Violation",
    "Illegal Conduct",
    "Other",
]);

export const submitReportUserSchema = z.object({
    complaintant: z.string().min(1, "Complaintant name is required"),
    reportedUser: z.string().min(1, "Reported user name is required"),
    reason: reportReasons,
    details: z.string().min(1, "Details are required").max(5000, "Details are too long"),
    dateOfIncident: date().optional(),
    evidenceUrls: z.array(z.string().url("Invalid URL")).optional(),
});

export const submitReportResponseSchema = z.object({
    reportId: z.string(),
    status: z.enum(["Recieved", "Pending Review", "Under Review", "Resolved", "Dismissed", "Closed", "Law Enforcement Notified"]).optional().default("Recieved"),
    assignedModerator: z.string().optional().default("Currently Unassigned"),
    resolutionDetails: z.string().optional().default("No resolution details provided"),
    appealStatus: z.enum(["No Appeal", "Appeal Submitted", "Appeal Under Review", "Appeal Granted", "Appeal Denied"]).optional().default("No Appeal"),
    dateResolved: date().optional(),
})

