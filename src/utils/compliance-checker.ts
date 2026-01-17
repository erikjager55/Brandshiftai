/**
 * 🎯 DESIGN SYSTEM COMPLIANCE CHECKER
 * =====================================
 * 
 * Automated compliance checking systeem dat codebase scant op
 * design system violations en compliance scores genereert.
 * 
 * FEATURES:
 * - Component usage analysis
 * - Design token compliance scoring
 * - Violation detection & reporting
 * - Compliance trends tracking
 * - Auto-generated compliance reports
 */

import {
  PROTECTED_COMPONENTS,
  PROTECTED_TOKENS,
  ProtectionLevel,
  ComponentCategory,
} from '../constants/protected-components';
import { getViolations, getViolationStatistics } from './component-validation';

// ============================================================================
// COMPLIANCE SCORING
// ============================================================================

export interface ComplianceScore {
  /** Overall compliance percentage (0-100) */
  overall: number;
  /** Component usage compliance */
  componentUsage: number;
  /** Design token compliance */
  tokenUsage: number;
  /** Code quality score */
  codeQuality: number;
  /** Protection adherence */
  protectionAdherence: number;
  /** Grade (A+ to F) */
  grade: string;
  /** Pass/Fail threshold: 95% */
  passed: boolean;
}

/**
 * Calculate compliance score
 */
export function calculateComplianceScore(): ComplianceScore {
  const violations = getViolations();
  const stats = getViolationStatistics();
  
  // Component Usage Score (weight: 30%)
  const totalComponents = Object.keys(PROTECTED_COMPONENTS).length;
  const violatedComponents = Object.keys(stats.byComponent).length;
  const componentUsage = Math.max(0, ((totalComponents - violatedComponents) / totalComponents) * 100);
  
  // Token Usage Score (weight: 25%)
  // This would ideally scan actual usage - for now, we estimate based on violations
  const tokenViolations = violations.filter(v => 
    v.type === 'forbidden-className' && 
    (v.details.violations?.some((c: string) => c.includes('bg-') || c.includes('text-')))
  ).length;
  const tokenUsage = Math.max(0, 100 - (tokenViolations * 5)); // -5% per token violation
  
  // Code Quality Score (weight: 20%)
  // Based on violation severity
  const errorWeight = stats.bySeverity.error * 10;
  const warningWeight = stats.bySeverity.warning * 5;
  const codeQuality = Math.max(0, 100 - errorWeight - warningWeight);
  
  // Protection Adherence Score (weight: 25%)
  // How well LOCKED components are respected
  const lockedViolations = violations.filter(v => {
    const component = PROTECTED_COMPONENTS[v.componentName];
    return component?.protection === ProtectionLevel.LOCKED;
  }).length;
  const protectionAdherence = Math.max(0, 100 - (lockedViolations * 15)); // -15% per locked violation
  
  // Calculate weighted overall score
  const overall = Math.round(
    (componentUsage * 0.30) +
    (tokenUsage * 0.25) +
    (codeQuality * 0.20) +
    (protectionAdherence * 0.25)
  );
  
  // Calculate grade
  const grade = getGrade(overall);
  
  return {
    overall,
    componentUsage: Math.round(componentUsage),
    tokenUsage: Math.round(tokenUsage),
    codeQuality: Math.round(codeQuality),
    protectionAdherence: Math.round(protectionAdherence),
    grade,
    passed: overall >= 95,
  };
}

/**
 * Get letter grade from score
 */
function getGrade(score: number): string {
  if (score >= 97) return 'A+';
  if (score >= 93) return 'A';
  if (score >= 90) return 'A-';
  if (score >= 87) return 'B+';
  if (score >= 83) return 'B';
  if (score >= 80) return 'B-';
  if (score >= 77) return 'C+';
  if (score >= 73) return 'C';
  if (score >= 70) return 'C-';
  if (score >= 67) return 'D+';
  if (score >= 63) return 'D';
  if (score >= 60) return 'D-';
  return 'F';
}

// ============================================================================
// COMPLIANCE REPORT
// ============================================================================

export interface ComplianceReport {
  /** Report timestamp */
  timestamp: Date;
  /** Compliance score */
  score: ComplianceScore;
  /** Violation summary */
  violations: {
    total: number;
    byType: Record<string, number>;
    bySeverity: Record<string, number>;
    byComponent: Record<string, number>;
  };
  /** Component protection summary */
  protection: {
    totalProtected: number;
    byLevel: Record<string, number>;
    byCategory: Record<string, number>;
  };
  /** Recommendations */
  recommendations: string[];
  /** Critical issues (must fix) */
  criticalIssues: string[];
  /** Warnings (should fix) */
  warnings: string[];
}

/**
 * Generate comprehensive compliance report
 */
export function generateComplianceReport(): ComplianceReport {
  const score = calculateComplianceScore();
  const violations = getViolations();
  const stats = getViolationStatistics();
  
  // Generate recommendations
  const recommendations: string[] = [];
  const criticalIssues: string[] = [];
  const warnings: string[] = [];
  
  // Analyze violations for recommendations
  if (stats.bySeverity.error > 0) {
    criticalIssues.push(
      `🚨 ${stats.bySeverity.error} CRITICAL ERROR(S) detected in LOCKED components. Immediate fix required.`
    );
  }
  
  if (stats.byType.forbiddenClassName > 0) {
    const count = stats.byType.forbiddenClassName;
    const severity = count > 5 ? 'critical' : 'warning';
    const message = `${count} forbidden className override(s) detected. Use component variants instead.`;
    
    if (severity === 'critical') {
      criticalIssues.push(`🚨 ${message}`);
    } else {
      warnings.push(`⚠️ ${message}`);
    }
  }
  
  if (stats.byType.invalidVariant > 0) {
    warnings.push(
      `⚠️ ${stats.byType.invalidVariant} invalid variant(s) used. Check allowed variants in documentation.`
    );
  }
  
  // Component-specific recommendations
  const topViolators = Object.entries(stats.byComponent)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  
  if (topViolators.length > 0) {
    recommendations.push(
      `🎯 Focus on fixing violations in: ${topViolators.map(([c, count]) => `${c} (${count})`).join(', ')}`
    );
  }
  
  // Score-based recommendations
  if (score.componentUsage < 90) {
    recommendations.push(
      '📦 Improve component usage: Use consolidated Button/Card/Badge components with variants'
    );
  }
  
  if (score.tokenUsage < 90) {
    recommendations.push(
      '🎨 Improve token usage: Replace custom colors/spacing with design system tokens'
    );
  }
  
  if (score.protectionAdherence < 90) {
    recommendations.push(
      '🔒 Improve protection adherence: Respect LOCKED component restrictions'
    );
  }
  
  // General recommendations
  if (score.overall < 95) {
    recommendations.push(
      '📚 Review consolidated component documentation: /docs/CONSOLIDATED_COMPONENTS.md'
    );
    recommendations.push(
      '🛠️ Use component validation hooks: useComponentValidation(), useClassNameMonitor()'
    );
  }
  
  return {
    timestamp: new Date(),
    score,
    violations: stats,
    protection: {
      totalProtected: Object.keys(PROTECTED_COMPONENTS).length,
      byLevel: {
        LOCKED: Object.values(PROTECTED_COMPONENTS).filter(c => c.protection === ProtectionLevel.LOCKED).length,
        RESTRICTED: Object.values(PROTECTED_COMPONENTS).filter(c => c.protection === ProtectionLevel.RESTRICTED).length,
        MONITORED: Object.values(PROTECTED_COMPONENTS).filter(c => c.protection === ProtectionLevel.MONITORED).length,
        FLEXIBLE: Object.values(PROTECTED_COMPONENTS).filter(c => c.protection === ProtectionLevel.FLEXIBLE).length,
      },
      byCategory: {
        CORE: Object.values(PROTECTED_COMPONENTS).filter(c => c.category === ComponentCategory.CORE).length,
        LAYOUT: Object.values(PROTECTED_COMPONENTS).filter(c => c.category === ComponentCategory.LAYOUT).length,
        UTILITY: Object.values(PROTECTED_COMPONENTS).filter(c => c.category === ComponentCategory.UTILITY).length,
        FEEDBACK: Object.values(PROTECTED_COMPONENTS).filter(c => c.category === ComponentCategory.FEEDBACK).length,
      },
    },
    recommendations,
    criticalIssues,
    warnings,
  };
}

// ============================================================================
// COMPLIANCE MONITORING
// ============================================================================

export interface ComplianceTrend {
  date: Date;
  score: number;
  violations: number;
}

const complianceTrends: ComplianceTrend[] = [];

/**
 * Record compliance snapshot for trend tracking
 */
export function recordComplianceSnapshot() {
  const score = calculateComplianceScore();
  const stats = getViolationStatistics();
  
  complianceTrends.push({
    date: new Date(),
    score: score.overall,
    violations: stats.total,
  });
  
  // Keep only last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const filtered = complianceTrends.filter(t => t.date >= thirtyDaysAgo);
  complianceTrends.length = 0;
  complianceTrends.push(...filtered);
}

/**
 * Get compliance trends
 */
export function getComplianceTrends(): ComplianceTrend[] {
  return [...complianceTrends];
}

/**
 * Get compliance trend summary
 */
export function getComplianceTrendSummary() {
  if (complianceTrends.length < 2) {
    return {
      trend: 'stable' as const,
      change: 0,
      message: 'Not enough data for trend analysis',
    };
  }
  
  const latest = complianceTrends[complianceTrends.length - 1];
  const previous = complianceTrends[complianceTrends.length - 2];
  
  const change = latest.score - previous.score;
  
  let trend: 'improving' | 'declining' | 'stable';
  if (change > 2) trend = 'improving';
  else if (change < -2) trend = 'declining';
  else trend = 'stable';
  
  const message = 
    trend === 'improving' ? `Compliance improving (+${change.toFixed(1)}%)` :
    trend === 'declining' ? `Compliance declining (${change.toFixed(1)}%)` :
    'Compliance stable';
  
  return { trend, change, message };
}

// ============================================================================
// REPORT FORMATTING
// ============================================================================

/**
 * Format compliance report as markdown
 */
export function formatComplianceReportMarkdown(report: ComplianceReport): string {
  const { score, violations, protection, recommendations, criticalIssues, warnings } = report;
  
  let md = '# 🎯 Design System Compliance Report\n\n';
  md += `**Generated:** ${report.timestamp.toLocaleString()}\n\n`;
  md += '---\n\n';
  
  // Score Summary
  md += '## 📊 Compliance Score\n\n';
  md += `### Overall: ${score.overall}% (${score.grade}) ${score.passed ? '✅ PASSED' : '❌ FAILED'}\n\n`;
  md += '| Metric | Score | Status |\n';
  md += '|--------|-------|--------|\n';
  md += `| Component Usage | ${score.componentUsage}% | ${score.componentUsage >= 90 ? '✅' : '⚠️'} |\n`;
  md += `| Token Usage | ${score.tokenUsage}% | ${score.tokenUsage >= 90 ? '✅' : '⚠️'} |\n`;
  md += `| Code Quality | ${score.codeQuality}% | ${score.codeQuality >= 90 ? '✅' : '⚠️'} |\n`;
  md += `| Protection Adherence | ${score.protectionAdherence}% | ${score.protectionAdherence >= 90 ? '✅' : '⚠️'} |\n\n`;
  
  // Critical Issues
  if (criticalIssues.length > 0) {
    md += '## 🚨 Critical Issues (Must Fix)\n\n';
    criticalIssues.forEach(issue => md += `- ${issue}\n`);
    md += '\n';
  }
  
  // Warnings
  if (warnings.length > 0) {
    md += '## ⚠️ Warnings (Should Fix)\n\n';
    warnings.forEach(warning => md += `- ${warning}\n`);
    md += '\n';
  }
  
  // Violations Summary
  md += '## 📋 Violations Summary\n\n';
  md += `**Total Violations:** ${violations.total}\n\n`;
  
  if (violations.total > 0) {
    md += '### By Type\n\n';
    md += '| Type | Count |\n';
    md += '|------|-------|\n';
    Object.entries(violations.byType).forEach(([type, count]) => {
      md += `| ${type} | ${count} |\n`;
    });
    md += '\n';
    
    md += '### By Severity\n\n';
    md += '| Severity | Count |\n';
    md += '|----------|-------|\n';
    Object.entries(violations.bySeverity).forEach(([severity, count]) => {
      md += `| ${severity} | ${count} |\n`;
    });
    md += '\n';
    
    if (Object.keys(violations.byComponent).length > 0) {
      md += '### By Component\n\n';
      md += '| Component | Violations |\n';
      md += '|-----------|------------|\n';
      Object.entries(violations.byComponent)
        .sort((a, b) => b[1] - a[1])
        .forEach(([component, count]) => {
          md += `| ${component} | ${count} |\n`;
        });
      md += '\n';
    }
  }
  
  // Protection Summary
  md += '## 🔒 Protected Components\n\n';
  md += `**Total Protected:** ${protection.totalProtected}\n\n`;
  md += '### By Protection Level\n\n';
  md += '| Level | Count |\n';
  md += '|-------|-------|\n';
  Object.entries(protection.byLevel).forEach(([level, count]) => {
    md += `| ${level} | ${count} |\n`;
  });
  md += '\n';
  
  // Recommendations
  if (recommendations.length > 0) {
    md += '## 💡 Recommendations\n\n';
    recommendations.forEach(rec => md += `- ${rec}\n`);
    md += '\n';
  }
  
  // Footer
  md += '---\n\n';
  md += '**Next Steps:**\n';
  md += '1. Fix all critical issues immediately\n';
  md += '2. Address warnings in next sprint\n';
  md += '3. Review documentation: `/docs/CONSOLIDATED_COMPONENTS.md`\n';
  md += '4. Run compliance check again after fixes\n\n';
  md += `**Target:** Maintain ≥95% compliance score for production-ready code.\n`;
  
  return md;
}

/**
 * Format compliance report as JSON
 */
export function formatComplianceReportJSON(report: ComplianceReport): string {
  return JSON.stringify(report, null, 2);
}

/**
 * Format compliance report as console output
 */
export function logComplianceReport(report: ComplianceReport) {
  console.group('🎯 Design System Compliance Report');
  console.log(`Generated: ${report.timestamp.toLocaleString()}`);
  console.log('');
  
  console.group('📊 Compliance Score');
  console.log(`Overall: ${report.score.overall}% (${report.score.grade}) ${report.score.passed ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`  - Component Usage: ${report.score.componentUsage}%`);
  console.log(`  - Token Usage: ${report.score.tokenUsage}%`);
  console.log(`  - Code Quality: ${report.score.codeQuality}%`);
  console.log(`  - Protection Adherence: ${report.score.protectionAdherence}%`);
  console.groupEnd();
  
  if (report.criticalIssues.length > 0) {
    console.group('🚨 Critical Issues');
    report.criticalIssues.forEach(issue => console.error(issue));
    console.groupEnd();
  }
  
  if (report.warnings.length > 0) {
    console.group('⚠️ Warnings');
    report.warnings.forEach(warning => console.warn(warning));
    console.groupEnd();
  }
  
  console.group('📋 Violations');
  console.log(`Total: ${report.violations.total}`);
  console.log('By Type:', report.violations.byType);
  console.log('By Severity:', report.violations.bySeverity);
  console.groupEnd();
  
  if (report.recommendations.length > 0) {
    console.group('💡 Recommendations');
    report.recommendations.forEach(rec => console.log(rec));
    console.groupEnd();
  }
  
  console.groupEnd();
}

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  ComplianceScore,
  ComplianceReport,
  ComplianceTrend,
};
