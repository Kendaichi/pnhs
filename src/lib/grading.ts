import type { GradeRecord, SubjectType } from '@/types';

// DepEd Transmutation Table (DO No. 8, s.2015)
const TRANSMUTATION_TABLE: [number, number][] = [
  [100, 100], [98.40, 99], [96.80, 98], [95.20, 97], [93.60, 96],
  [92, 95], [90.40, 94], [88.80, 93], [87.20, 92], [85.60, 91],
  [84, 90], [82.40, 89], [80.80, 88], [79.20, 87], [77.60, 86],
  [76, 85], [74.40, 84], [72.80, 83], [71.20, 82], [69.60, 81],
  [68, 80], [66.40, 79], [64.80, 78], [63.20, 77], [61.60, 76],
  [60, 75], [56, 74], [52, 73], [48, 72], [44, 71], [40, 70],
  [36, 69], [32, 68], [28, 67], [24, 66], [20, 65],
];

/**
 * Transmute initial grade to quarterly grade using DepEd table.
 * Uses linear interpolation between table entries.
 */
export function transmute(initialGrade: number): number {
  if (initialGrade >= 100) return 100;
  if (initialGrade <= 0) return 60;

  for (let i = 0; i < TRANSMUTATION_TABLE.length - 1; i++) {
    const [upperIG, upperQG] = TRANSMUTATION_TABLE[i];
    const [lowerIG, lowerQG] = TRANSMUTATION_TABLE[i + 1];
    if (initialGrade >= lowerIG && initialGrade <= upperIG) {
      // Linear interpolation
      const ratio = (initialGrade - lowerIG) / (upperIG - lowerIG);
      return Math.round((lowerQG + ratio * (upperQG - lowerQG)) * 100) / 100;
    }
  }
  return 65;
}

/**
 * Get component weights based on subject type.
 * Core: WW 25%, PT 50%, QA 25%
 * Applied/TLE/SHS: WW 20%, PT 60%, QA 20%
 */
export function getWeights(subjectType: SubjectType) {
  if (subjectType === 'core') {
    return { ww: 0.25, pt: 0.50, qa: 0.25 };
  }
  return { ww: 0.20, pt: 0.60, qa: 0.20 };
}

/**
 * Compute percentage score from raw score and highest possible.
 */
export function percentageScore(rawScore: number, highestPossible: number): number {
  if (highestPossible <= 0) return 0;
  return (rawScore / highestPossible) * 100;
}

/**
 * Full grade computation for a single quarter.
 */
export function computeQuarterlyGrade(grade: GradeRecord, subjectType: SubjectType) {
  const weights = getWeights(subjectType);

  const wwPS = percentageScore(grade.wwRawScore, grade.wwHighestPossible);
  const ptPS = percentageScore(grade.ptRawScore, grade.ptHighestPossible);
  const qaPS = percentageScore(grade.qaRawScore, grade.qaHighestPossible);

  const wwWeighted = wwPS * weights.ww;
  const ptWeighted = ptPS * weights.pt;
  const qaWeighted = qaPS * weights.qa;

  const initialGrade = wwWeighted + ptWeighted + qaWeighted;
  const quarterlyGrade = transmute(initialGrade);

  return {
    wwPS: Math.round(wwPS * 100) / 100,
    ptPS: Math.round(ptPS * 100) / 100,
    qaPS: Math.round(qaPS * 100) / 100,
    wwWeighted: Math.round(wwWeighted * 100) / 100,
    ptWeighted: Math.round(ptWeighted * 100) / 100,
    qaWeighted: Math.round(qaWeighted * 100) / 100,
    initialGrade: Math.round(initialGrade * 100) / 100,
    quarterlyGrade,
  };
}

/**
 * Compute final grade from quarterly grades.
 */
export function computeFinalGrade(quarterlyGrades: (number | undefined)[]): number | undefined {
  const valid = quarterlyGrades.filter((g): g is number => g !== undefined);
  if (valid.length === 0) return undefined;
  return Math.round((valid.reduce((a, b) => a + b, 0) / valid.length) * 100) / 100;
}

/**
 * Determine academic standing.
 */
export function getAcademicStanding(finalGrade: number): 'Passed' | 'Failed' {
  return finalGrade >= 75 ? 'Passed' : 'Failed';
}
