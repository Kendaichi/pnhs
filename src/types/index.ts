// ===== USER & AUTH =====
export type UserRole = 'admin' | 'teacher' | 'registrar' | 'parent' | 'student';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  refId: string; // staff.id, guardian.id, or student.id
  name: string;
  avatarUrl?: string;
  mustChangePassword?: boolean;
}

// ===== SCHOOL =====
export interface SchoolYear {
  id: string;
  name: string; // e.g. "S.Y. 2025-2026"
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

// ===== STUDENTS =====
export type EnrollmentStatus = 'Active' | 'Dropped' | 'Retained' | 'Graduated';
export type GradeLevel = 7 | 8 | 9 | 10 | 11 | 12;
export type SHSStrand = 'STEM' | 'ABM' | 'HUMSS' | 'TVL';

export interface Student {
  id: string;
  lrn: string; // Learner Reference Number (12 digits)
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  birthDate: string;
  gender: 'Male' | 'Female';
  address: string;
  contactNumber?: string;
  guardianId: string;
  photoUrl?: string;
}

export interface Guardian {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  contactNumber: string;
  email?: string;
  address: string;
}

export interface Section {
  id: string;
  name: string;
  gradeLevel: GradeLevel;
  strand?: SHSStrand;
  schoolYearId: string;
  adviserId?: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  sectionId: string;
  schoolYearId: string;
  status: EnrollmentStatus;
  dateEnrolled: string;
}

// ===== SUBJECTS & GRADES =====
export type SubjectType = 'core' | 'applied';
export type Quarter = 1 | 2 | 3 | 4;
export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused';

export interface Subject {
  id: string;
  name: string;
  code: string;
  type: SubjectType; // core = WW25/PT50/QA25, applied = WW20/PT60/QA20
  gradeLevel: GradeLevel;
  strand?: SHSStrand;
}

export interface TeachingLoad {
  id: string;
  staffId: string;
  subjectId: string;
  sectionId: string;
  schoolYearId: string;
  schedule?: string;
}

export interface GradeRecord {
  id: string;
  enrollmentId: string;
  subjectId: string;
  quarter: Quarter;
  wwRawScore: number;
  wwHighestPossible: number;
  ptRawScore: number;
  ptHighestPossible: number;
  qaRawScore: number;
  qaHighestPossible: number;
  // Computed
  initialGrade?: number;
  quarterlyGrade?: number;
}

export interface AttendanceRecord {
  id: string;
  enrollmentId: string;
  subjectId: string;
  date: string;
  status: AttendanceStatus;
}

// ===== STAFF =====
export type EmploymentStatus = 'Permanent' | 'Contractual' | 'Part-time';

export interface Staff {
  id: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  position: string;
  department?: string;
  employmentStatus: EmploymentStatus;
  contactNumber: string;
  email: string;
  dateHired: string;
  photoUrl?: string;
}

// ===== ANNOUNCEMENTS =====
export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  targetRoles: UserRole[];
  createdAt: string;
  isPublished: boolean;
  imageUrl?: string;
}

// ===== COMPUTED TYPES =====
export interface StudentWithDetails extends Student {
  guardian?: Guardian;
  enrollment?: Enrollment;
  section?: Section;
}

export interface GradeComputationResult {
  percentageScore: number;
  weightedScore: number;
  initialGrade: number;
  quarterlyGrade: number;
}

export interface SubjectGradeSummary {
  subject: Subject;
  quarters: { [key in Quarter]?: number }; // quarterly grades
  finalGrade?: number;
  status?: 'Passed' | 'Failed';
}
