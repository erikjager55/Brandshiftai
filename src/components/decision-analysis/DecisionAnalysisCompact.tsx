import React from 'react';
import { DecisionAnalysis } from '../../types/decision-analysis';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  FileText,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';

interface DecisionAnalysisCompactProps {
  analysis: DecisionAnalysis;
  onGenerateBrief?: () => void;
}

export function DecisionAnalysisCompact({ analysis, onGenerateBrief }: DecisionAnalysisCompactProps) {
  
  // Readiness configuration
  const readinessConfig = {
    ready: {
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    uncertain: {
      icon: AlertCircle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    blocked: {
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
    outdated: {
      icon: Clock,
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
    },
  };

  const config = readinessConfig[analysis.readiness];
  const ReadinessIcon = config.icon;

  // Metric status configuration
  const metricConfig = {
    good: { color: 'text-green-600' },
    warning: { color: 'text-amber-600' },
    critical: { color: 'text-red-600' },
  };

  // Trend icons
  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <TrendingUp className="h-3 w-3" />;
    if (trend === 'down') return <TrendingDown className="h-3 w-3" />;
    return <Minus className="h-3 w-3" />;
  };

  // Count high severity risks
  const highRiskCount = analysis.risks.filter(r => r.severity === 'high').length;

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* Compact Header */}
      <Card className={`border-2 ${config.borderColor} mb-6`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-6">
            
            {/* Left: Question & Status */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-semibold mb-3">
                {analysis.mainQuestion}
              </h1>
              
              <div className="flex items-center gap-4 mb-2">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.bgColor} ${config.color}`}>
                  <ReadinessIcon className="h-4 w-4" />
                  <span className="font-medium text-sm">{config.label}</span>
                </div>
                
                {highRiskCount > 0 && (
                  <span className="text-sm text-slate-600">
                    {highRiskCount} {highRiskCount === 1 ? 'hoog risico' : 'hoge risico\'s'}
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-600">
                {analysis.readinessDescription}
              </p>
            </div>

            {/* Right: Action */}
            <Button
              size="lg"
              onClick={onGenerateBrief}
              className="bg-[#1FD1B2] hover:bg-[#1FD1B2]/90 text-white flex-shrink-0"
            >
              <FileText className="h-4 w-4 mr-2" />
              Genereer brief
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Compact Decision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {analysis.decisionBlocks.map((block) => {
          const metricStyle = block.metric.status ? metricConfig[block.metric.status] : metricConfig.good;
          
          return (
            <Card key={block.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                
                {/* Question */}
                <h3 className="font-semibold text-slate-900 mb-3 text-sm">
                  {block.question}
                </h3>

                {/* Metric - Compact */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-bold ${metricStyle.color}`}>
                      {block.metric.value}
                    </span>
                    <span className="text-sm text-slate-500">
                      {block.metric.label}
                    </span>
                  </div>
                  {block.metric.trend && (
                    <div className={metricStyle.color}>
                      {getTrendIcon(block.metric.trend)}
                    </div>
                  )}
                </div>

                {/* Key Insight - Single line */}
                <p className="text-sm text-slate-700 mb-3 line-clamp-2">
                  {block.keyInsight}
                </p>

                {/* Action - Compact */}
                <div className="flex items-start gap-2 text-sm">
                  <ArrowRight className="h-4 w-4 text-[#1FD1B2] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900 font-medium line-clamp-2">
                    {block.recommendedAction}
                  </span>
                </div>

                {/* Confidence bar - minimal */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#1FD1B2] h-full"
                        style={{ width: `${block.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {block.confidence}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Compact Footer */}
      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-slate-500">Bron: </span>
                <span className="text-slate-900 font-medium">
                  {analysis.dataSource.type === 'ai-analysis' && 'AI Exploratie'}
                  {analysis.dataSource.type === 'workshop' && 'Workshop'}
                  {analysis.dataSource.type === 'interview' && 'Interviews'}
                  {analysis.dataSource.type === 'questionnaire' && 'Questionnaire'}
                </span>
              </div>
              <div>
                <span className="text-slate-500">Datum: </span>
                <span className="text-slate-900">
                  {new Date(analysis.dataSource.date).toLocaleDateString('nl-NL', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              {analysis.dataSource.assumptions && (
                <div>
                  <span className="text-slate-500">Aannames: </span>
                  <span className="text-slate-900">{analysis.dataSource.assumptions.length}</span>
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-900"
            >
              Details weergeven
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}