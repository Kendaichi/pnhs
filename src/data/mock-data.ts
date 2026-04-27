import type {
  SchoolYear, Student, Guardian, Section, Enrollment, Subject,
  Staff, TeachingLoad, GradeRecord, Announcement, User, AttendanceRecord
} from '@/types';

// ===== SCHOOL YEAR =====
export const schoolYears: SchoolYear[] = [
  { id: 'sy-2025', name: 'S.Y. 2025-2026', startDate: '2025-06-02', endDate: '2026-03-27', isCurrent: true },
];

// ===== GUARDIANS =====
export const guardians: Guardian[] = [
  { id: 'g1', firstName: 'Maria', lastName: 'Santos', relationship: 'Mother', contactNumber: '09171234567', email: 'maria.santos@email.com', address: 'Brgy. San Jose, Quezon City' },
  { id: 'g2', firstName: 'Jose', lastName: 'Reyes', relationship: 'Father', contactNumber: '09181234567', email: 'jose.reyes@email.com', address: 'Brgy. Sta. Cruz, Manila' },
  { id: 'g3', firstName: 'Ana', lastName: 'Cruz', relationship: 'Mother', contactNumber: '09191234567', email: 'ana.cruz@email.com', address: 'Brgy. Poblacion, Makati' },
];

// ===== STAFF =====
export const staff: Staff[] = [
  { id: 'st1', employeeNumber: 'EMP-001', firstName: 'Ricardo', lastName: 'Dela Cruz', position: 'School Administrator', department: 'Administration', employmentStatus: 'Permanent', contactNumber: '09201234567', email: 'rdelacruz@pnhs.edu.ph', dateHired: '2010-06-15' },
  { id: 'st2', employeeNumber: 'EMP-002', firstName: 'Elena', lastName: 'Aquino', position: 'Registrar', department: 'Registrar Office', employmentStatus: 'Permanent', contactNumber: '09211234567', email: 'eaquino@pnhs.edu.ph', dateHired: '2012-06-01' },
  { id: 'st3', employeeNumber: 'EMP-003', firstName: 'Manuel', lastName: 'Garcia', position: 'Teacher III', department: 'Mathematics', employmentStatus: 'Permanent', contactNumber: '09221234567', email: 'mgarcia@pnhs.edu.ph', dateHired: '2015-06-15' },
  { id: 'st4', employeeNumber: 'EMP-004', firstName: 'Liza', lastName: 'Mendoza', position: 'Teacher II', department: 'Science', employmentStatus: 'Permanent', contactNumber: '09231234567', email: 'lmendoza@pnhs.edu.ph', dateHired: '2016-06-15' },
  { id: 'st5', employeeNumber: 'EMP-005', firstName: 'Carlos', lastName: 'Bautista', position: 'Teacher II', department: 'English', employmentStatus: 'Permanent', contactNumber: '09241234567', email: 'cbautista@pnhs.edu.ph', dateHired: '2017-06-15' },
  { id: 'st6', employeeNumber: 'EMP-006', firstName: 'Rosa', lastName: 'Villanueva', position: 'Teacher I', department: 'Filipino', employmentStatus: 'Contractual', contactNumber: '09251234567', email: 'rvillanueva@pnhs.edu.ph', dateHired: '2020-06-15' },
  { id: 'st7', employeeNumber: 'EMP-007', firstName: 'Pedro', lastName: 'Ramos', position: 'Teacher I', department: 'TLE', employmentStatus: 'Permanent', contactNumber: '09261234567', email: 'pramos@pnhs.edu.ph', dateHired: '2019-06-15' },
  { id: 'st8', employeeNumber: 'EMP-008', firstName: 'Grace', lastName: 'Tan', position: 'Teacher I', department: 'MAPEH', employmentStatus: 'Contractual', contactNumber: '09271234567', email: 'gtan@pnhs.edu.ph', dateHired: '2021-06-15' },
];

// ===== SECTIONS =====
export const sections: Section[] = [
  { id: 'sec1', name: 'Rizal', gradeLevel: 7, schoolYearId: 'sy-2025', adviserId: 'st3' },
  { id: 'sec2', name: 'Mabini', gradeLevel: 8, schoolYearId: 'sy-2025', adviserId: 'st4' },
  { id: 'sec3', name: 'Einstein', gradeLevel: 11, strand: 'STEM', schoolYearId: 'sy-2025', adviserId: 'st5' },
  { id: 'sec4', name: 'Keynes', gradeLevel: 11, strand: 'ABM', schoolYearId: 'sy-2025', adviserId: 'st6' },
  { id: 'sec5', name: 'Aristotle', gradeLevel: 12, strand: 'HUMSS', schoolYearId: 'sy-2025', adviserId: 'st7' },
];

// ===== SUBJECTS =====
export const subjects: Subject[] = [
  // Grade 7
  { id: 'sub1', name: 'English 7', code: 'ENG7', type: 'core', gradeLevel: 7 },
  { id: 'sub2', name: 'Math 7', code: 'MATH7', type: 'core', gradeLevel: 7 },
  { id: 'sub3', name: 'Science 7', code: 'SCI7', type: 'core', gradeLevel: 7 },
  { id: 'sub4', name: 'Filipino 7', code: 'FIL7', type: 'core', gradeLevel: 7 },
  { id: 'sub5', name: 'AP 7', code: 'AP7', type: 'core', gradeLevel: 7 },
  { id: 'sub6', name: 'ESP 7', code: 'ESP7', type: 'core', gradeLevel: 7 },
  { id: 'sub7', name: 'MAPEH 7', code: 'MAPEH7', type: 'core', gradeLevel: 7 },
  { id: 'sub8', name: 'TLE 7', code: 'TLE7', type: 'applied', gradeLevel: 7 },
  // Grade 8
  { id: 'sub9', name: 'English 8', code: 'ENG8', type: 'core', gradeLevel: 8 },
  { id: 'sub10', name: 'Math 8', code: 'MATH8', type: 'core', gradeLevel: 8 },
  { id: 'sub11', name: 'Science 8', code: 'SCI8', type: 'core', gradeLevel: 8 },
  { id: 'sub12', name: 'Filipino 8', code: 'FIL8', type: 'core', gradeLevel: 8 },
  { id: 'sub13', name: 'TLE 8', code: 'TLE8', type: 'applied', gradeLevel: 8 },
  // Grade 11 STEM
  { id: 'sub14', name: 'General Mathematics', code: 'GENMATH', type: 'core', gradeLevel: 11, strand: 'STEM' },
  { id: 'sub15', name: 'Earth and Life Science', code: 'EALS', type: 'core', gradeLevel: 11, strand: 'STEM' },
  { id: 'sub16', name: 'Pre-Calculus', code: 'PRECAL', type: 'applied', gradeLevel: 11, strand: 'STEM' },
  // Grade 11 ABM
  { id: 'sub17', name: 'General Mathematics', code: 'GENMATH-ABM', type: 'core', gradeLevel: 11, strand: 'ABM' },
  { id: 'sub18', name: 'Business Mathematics', code: 'BUSMATH', type: 'applied', gradeLevel: 11, strand: 'ABM' },
  // Grade 12 HUMSS
  { id: 'sub19', name: 'Philippine Politics', code: 'PHILPOL', type: 'applied', gradeLevel: 12, strand: 'HUMSS' },
  { id: 'sub20', name: 'Creative Writing', code: 'CREATW', type: 'applied', gradeLevel: 12, strand: 'HUMSS' },
];

// ===== STUDENTS (10 per section, 50 total) =====
const firstNames = ['Juan', 'Maria', 'Pedro', 'Ana', 'Miguel', 'Sofia', 'Carlos', 'Isabella', 'Diego', 'Camille'];
const lastNames = ['Santos', 'Reyes', 'Cruz', 'Bautista', 'Garcia', 'Mendoza', 'Rivera', 'Torres', 'Flores', 'Gonzales'];

function generateStudents(): Student[] {
  const students: Student[] = [];
  const sectionIds = ['sec1', 'sec2', 'sec3', 'sec4', 'sec5'];
  const guardianIds = ['g1', 'g2', 'g3'];
  let counter = 1;
  for (const secId of sectionIds) {
    for (let i = 0; i < 10; i++) {
      const fn = firstNames[i];
      const ln = lastNames[(counter - 1) % lastNames.length];
      students.push({
        id: `stu${counter}`,
        lrn: `${100000000000 + counter}`,
        firstName: fn,
        lastName: ln,
        birthDate: `200${8 + Math.floor(i / 3)}-0${(i % 9) + 1}-${10 + i}`,
        gender: i % 2 === 0 ? 'Male' : 'Female',
        address: 'Quezon City, Metro Manila',
        contactNumber: `0917${String(counter).padStart(7, '0')}`,
        guardianId: guardianIds[counter % 3],
      });
      counter++;
    }
  }
  return students;
}

export const students: Student[] = generateStudents();

// ===== ENROLLMENTS =====
function generateEnrollments(): Enrollment[] {
  const enrollments: Enrollment[] = [];
  const sectionIds = ['sec1', 'sec2', 'sec3', 'sec4', 'sec5'];
  let stuIdx = 0;
  for (const secId of sectionIds) {
    for (let i = 0; i < 10; i++) {
      enrollments.push({
        id: `enr${stuIdx + 1}`,
        studentId: students[stuIdx].id,
        sectionId: secId,
        schoolYearId: 'sy-2025',
        status: 'Active',
        dateEnrolled: '2025-06-02',
      });
      stuIdx++;
    }
  }
  return enrollments;
}

export const enrollments: Enrollment[] = generateEnrollments();

// ===== TEACHING LOADS =====
export const teachingLoads: TeachingLoad[] = [
  { id: 'tl1', staffId: 'st3', subjectId: 'sub2', sectionId: 'sec1', schoolYearId: 'sy-2025', schedule: 'MWF 7:30-8:30 AM' },
  { id: 'tl2', staffId: 'st4', subjectId: 'sub3', sectionId: 'sec1', schoolYearId: 'sy-2025', schedule: 'MWF 8:30-9:30 AM' },
  { id: 'tl3', staffId: 'st5', subjectId: 'sub1', sectionId: 'sec1', schoolYearId: 'sy-2025', schedule: 'TTh 7:30-9:00 AM' },
  { id: 'tl4', staffId: 'st6', subjectId: 'sub4', sectionId: 'sec1', schoolYearId: 'sy-2025', schedule: 'TTh 9:00-10:30 AM' },
  { id: 'tl5', staffId: 'st3', subjectId: 'sub10', sectionId: 'sec2', schoolYearId: 'sy-2025', schedule: 'MWF 9:30-10:30 AM' },
  { id: 'tl6', staffId: 'st4', subjectId: 'sub11', sectionId: 'sec2', schoolYearId: 'sy-2025', schedule: 'MWF 10:30-11:30 AM' },
  { id: 'tl7', staffId: 'st5', subjectId: 'sub14', sectionId: 'sec3', schoolYearId: 'sy-2025', schedule: 'MWF 7:30-8:30 AM' },
  { id: 'tl8', staffId: 'st7', subjectId: 'sub8', sectionId: 'sec1', schoolYearId: 'sy-2025', schedule: 'TTh 1:00-2:30 PM' },
  { id: 'tl9', staffId: 'st8', subjectId: 'sub7', sectionId: 'sec1', schoolYearId: 'sy-2025', schedule: 'MWF 1:00-2:00 PM' },
];

// ===== GRADE RECORDS (Q1 & Q2 for sec1 students in sub1-sub4) =====
function generateGrades(): GradeRecord[] {
  const grades: GradeRecord[] = [];
  let counter = 1;
  // Grades for section 1 students in 4 subjects, Q1 and Q2
  for (let si = 0; si < 10; si++) {
    const enrollmentId = `enr${si + 1}`;
    const subjectIds = ['sub1', 'sub2', 'sub3', 'sub4'];
    for (const subId of subjectIds) {
      for (const q of [1, 2] as const) {
        const base = 60 + Math.floor(Math.random() * 35);
        grades.push({
          id: `gr${counter}`,
          enrollmentId,
          subjectId: subId,
          quarter: q,
          wwRawScore: Math.floor(base * 0.8 + Math.random() * 20),
          wwHighestPossible: 100,
          ptRawScore: Math.floor(base * 0.85 + Math.random() * 15),
          ptHighestPossible: 100,
          qaRawScore: Math.floor(base * 0.75 + Math.random() * 25),
          qaHighestPossible: 100,
        });
        counter++;
      }
    }
  }
  return grades;
}

export const gradeRecords: GradeRecord[] = generateGrades();

// ===== ATTENDANCE (sample for first 3 students, first week of June) =====
function generateAttendance(): AttendanceRecord[] {
  const records: AttendanceRecord[] = [];
  let counter = 1;
  const dates = ['2025-06-02', '2025-06-03', '2025-06-04', '2025-06-05', '2025-06-06'];
  const statuses: AttendanceRecord['status'][] = ['Present', 'Present', 'Present', 'Late', 'Absent'];
  for (let si = 0; si < 10; si++) {
    for (const date of dates) {
      records.push({
        id: `att${counter}`,
        enrollmentId: `enr${si + 1}`,
        subjectId: 'sub1',
        date,
        status: statuses[Math.floor(Math.random() * 5)] || 'Present',
      });
      counter++;
    }
  }
  return records;
}

export const attendanceRecords: AttendanceRecord[] = generateAttendance();

// ===== ANNOUNCEMENTS =====
import welcomeImg from '@/assets/news/welcome-sy.webp';
import examsImg from '@/assets/news/exams-schedule.webp';
import gradeImg from '@/assets/news/grade-submission.webp';
import ptcImg from '@/assets/news/ptc-conference.webp';

export const announcements: Announcement[] = [
  { id: 'ann1', title: 'Welcome to S.Y. 2025-2026!', content: 'PNHS (Pigdaulan National High School) welcomes all students, parents, and staff to a new and exciting school year. Let us work together for a productive academic year ahead.', authorId: 'st1', targetRoles: ['admin', 'teacher', 'registrar', 'parent', 'student'], createdAt: '2025-06-02T08:00:00Z', isPublished: true, imageUrl: welcomeImg },
  { id: 'ann2', title: 'First Quarter Examinations Schedule', content: 'The first quarterly examinations will be held from August 18-22, 2025. Please ensure all students are prepared. Review materials will be provided by respective teachers.', authorId: 'st1', targetRoles: ['admin', 'teacher', 'parent', 'student'], createdAt: '2025-07-15T08:00:00Z', isPublished: true, imageUrl: examsImg },
  { id: 'ann3', title: 'Grade Submission Deadline', content: 'All teachers are reminded to submit Q1 grades by September 5, 2025. Please use the grade encoding module for timely submission.', authorId: 'st2', targetRoles: ['admin', 'teacher'], createdAt: '2025-08-25T08:00:00Z', isPublished: true, imageUrl: gradeImg },
  { id: 'ann4', title: 'Parent-Teacher Conference', content: 'The Q1 Parent-Teacher Conference is scheduled for September 13, 2025. Parents are encouraged to attend and discuss their child\'s progress with their teachers.', authorId: 'st1', targetRoles: ['admin', 'teacher', 'parent', 'student'], createdAt: '2025-09-01T08:00:00Z', isPublished: true, imageUrl: ptcImg },
];

// ===== USERS =====
function generateStudentUsers(): User[] {
  return students.map((stu, idx) => ({
    id: `u-stu${idx + 1}`,
    username: stu.lrn,
    role: 'student' as const,
    refId: stu.id,
    name: `${stu.firstName} ${stu.lastName}`,
    mustChangePassword: true,
  }));
}

export const users: User[] = [
  { id: 'u1', username: 'admin', role: 'admin', refId: 'st1', name: 'Ricardo Dela Cruz' },
  { id: 'u2', username: 'registrar', role: 'registrar', refId: 'st2', name: 'Elena Aquino' },
  { id: 'u3', username: 'teacher1', role: 'teacher', refId: 'st3', name: 'Manuel Garcia' },
  { id: 'u4', username: 'teacher2', role: 'teacher', refId: 'st4', name: 'Liza Mendoza' },
  { id: 'u5', username: 'parent1', role: 'parent', refId: 'g1', name: 'Maria Santos' },
  { id: 'u6', username: 'parent2', role: 'parent', refId: 'g2', name: 'Jose Reyes' },
  { id: 'u7', username: 'parent3', role: 'parent', refId: 'g3', name: 'Ana Cruz' },
  ...generateStudentUsers(),
];

// ===== HELPER LOOKUPS =====
export function getStudentsBySection(sectionId: string): Student[] {
  const enrollmentIds = enrollments.filter(e => e.sectionId === sectionId).map(e => e.studentId);
  return students.filter(s => enrollmentIds.includes(s.id));
}

export function getStudentsByGuardian(guardianId: string): Student[] {
  return students.filter(s => s.guardianId === guardianId);
}

export function getSubjectsByGradeLevel(gradeLevel: number, strand?: string): Subject[] {
  return subjects.filter(s => s.gradeLevel === gradeLevel && (!strand || !s.strand || s.strand === strand));
}

export function getTeachingLoadsByStaff(staffId: string): TeachingLoad[] {
  return teachingLoads.filter(tl => tl.staffId === staffId);
}

export function getGradesByEnrollment(enrollmentId: string): GradeRecord[] {
  return gradeRecords.filter(g => g.enrollmentId === enrollmentId);
}

export function getEnrollmentByStudent(studentId: string): Enrollment | undefined {
  return enrollments.find(e => e.studentId === studentId && e.schoolYearId === 'sy-2025');
}

export function getSectionById(sectionId: string): Section | undefined {
  return sections.find(s => s.id === sectionId);
}

export function getStaffById(staffId: string): Staff | undefined {
  return staff.find(s => s.id === staffId);
}

export function getSubjectById(subjectId: string): Subject | undefined {
  return subjects.find(s => s.id === subjectId);
}

export function getGuardianById(guardianId: string): Guardian | undefined {
  return guardians.find(g => g.id === guardianId);
}

export function getStudentById(studentId: string): Student | undefined {
  return students.find(s => s.id === studentId);
}
