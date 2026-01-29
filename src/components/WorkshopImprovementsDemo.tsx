import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  CheckCircle2, 
  Calendar,
  ArrowLeft,
  Video,
  FileText
} from 'lucide-react';
import { formatDate } from '../utils/date-format';

export function WorkshopImprovementsDemo() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-semibold">Workshop Improvements Demo</h1>
          <p className="text-muted-foreground">
            Alle 7 verbeteringen zijn geïmplementeerd en zichtbaar hieronder
          </p>
        </div>

        <Tabs defaultValue="status" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="dates">Dates</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
          </TabsList>

          {/* TAAK 1: Status Dropdown */}
          <TabsContent value="status" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>✅ TAAK 1: Status Dropdown Consistentie</CardTitle>
                <CardDescription>
                  "Approved" vervangen door "Completed" met CheckCircle2 icon
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm text-muted-foreground">VOOR (Fout):</h3>
                    <div className="border-2 border-red-200 dark:border-red-900 rounded-xl p-4 bg-red-50 dark:bg-red-950/20">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium">Approved</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        ❌ Inconsistent met andere methods
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm text-muted-foreground">NA (Correct):</h3>
                    <div className="border-2 border-green-200 dark:border-green-900 rounded-xl p-4 bg-green-50 dark:bg-green-950/20">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium">Completed</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        ✅ Consistent met design system
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl p-4">
                  <p className="text-sm">
                    <strong>Geüpdatet:</strong> 9 locaties in CanvasWorkshopManager_INTEGRATED.tsx
                  </p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4">
                    <li>• State type: 'approved' → 'completed'</li>
                    <li>• getStatusLabel() functie</li>
                    <li>• getStatusIcon() functie (CheckCircle2)</li>
                    <li>• Dropdown menu item</li>
                    <li>• Alle callbacks en conditionals</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAAK 3: Date Format */}
          <TabsContent value="dates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>✅ TAAK 3: Date Format Verbetering</CardTitle>
                <CardDescription>
                  ISO format (YYYY-MM-DD) naar human-readable (Mon DD, YYYY)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm text-muted-foreground">VOOR (Fout):</h3>
                    <div className="border-2 border-red-200 dark:border-red-900 rounded-xl p-4 bg-red-50 dark:bg-red-950/20">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono">2025-01-15</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        ❌ Moeilijk leesbaar, technisch format
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm text-muted-foreground">NA (Correct):</h3>
                    <div className="border-2 border-green-200 dark:border-green-900 rounded-xl p-4 bg-green-50 dark:bg-green-950/20">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span className="font-medium">{formatDate('2025-01-15')}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        ✅ Human-readable, professional
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Meer voorbeelden:</h3>
                  <div className="grid gap-2">
                    {[
                      '2025-01-15',
                      '2025-03-22', 
                      '2025-12-31',
                      '2026-01-20'
                    ].map(date => (
                      <div key={date} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-mono text-sm text-muted-foreground">{date}</span>
                        <span className="text-sm">→</span>
                        <span className="font-medium">{formatDate(date)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl p-4">
                  <p className="text-sm">
                    <strong>Implementatie:</strong> Nieuwe utility functie + 7 locaties geüpdatet
                  </p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4">
                    <li>• /utils/date-format.ts (NIEUW)</li>
                    <li>• CanvasWorkshopApproved.tsx (2x)</li>
                    <li>• CanvasWorkshopManager_INTEGRATED.tsx (5x)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAAK 5 & 6: Badges en Buttons */}
          <TabsContent value="badges" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>✅ TAAK 5 & 6: Badges en Button Verbeteringen</CardTitle>
                <CardDescription>
                  Duidelijkere labels en consistente navigatie
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* TAAK 5: Locked Badge */}
                <div className="space-y-3">
                  <h3 className="font-semibold">TAAK 5: "Locked" Badge Verduidelijking</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">VOOR (Verwarrend):</p>
                      <Button variant="default" className="w-full bg-[#1FD1B2] hover:bg-[#1FD1B2]/90">
                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        Locked
                      </Button>
                      <p className="text-xs text-red-600">❌ Suggereert dat content niet toegankelijk is</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">NA (Duidelijk):</p>
                      <Button className="w-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Completed
                      </Button>
                      <p className="text-xs text-green-600">✅ Duidelijke status indicator</p>
                    </div>
                  </div>
                </div>

                {/* TAAK 6: Footer Buttons */}
                <div className="space-y-3">
                  <h3 className="font-semibold">TAAK 6: Footer Button Verduidelijking</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">VOOR (Verwarrend):</p>
                      <div className="flex justify-between border rounded-xl p-4 bg-red-50 dark:bg-red-950/20">
                        <Button variant="outline">
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Return to In Progress
                        </Button>
                        <Button className="bg-[#1FD1B2]">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Done
                        </Button>
                      </div>
                      <p className="text-xs text-red-600">❌ Onduidelijke actie, mogelijk destructief</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">NA (Duidelijk):</p>
                      <div className="flex justify-between border rounded-xl p-4 bg-green-50 dark:bg-green-950/20">
                        <Button variant="outline">
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back to Asset
                        </Button>
                        <Button className="bg-[#1FD1B2]">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Done
                        </Button>
                      </div>
                      <p className="text-xs text-green-600">✅ Consistente navigatie terug naar asset</p>
                    </div>
                  </div>
                </div>

                {/* TAAK 2: Back Links */}
                <div className="space-y-3">
                  <h3 className="font-semibold">TAAK 2: Back Link Consistentie</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Alle "Back to Dashboard" links vervangen door "Back to Asset"
                    </p>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                        <span className="text-sm">CanvasWorkshopApproved.tsx</span>
                        <Badge className="bg-green-600 text-white">✓ Updated</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                        <span className="text-sm">CanvasWorkshopInProgress.tsx</span>
                        <Badge className="bg-green-600 text-white">✓ Updated</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                        <span className="text-sm">QuestionnaireReport.tsx</span>
                        <Badge className="bg-green-600 text-white">✓ Updated</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAAK 7: Video Placeholder */}
          <TabsContent value="video" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>✅ TAAK 7: Placeholder Video Vervangen</CardTitle>
                <CardDescription>
                  Rick Astley video vervangen door professional placeholder
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm text-muted-foreground">VOOR (Niet professioneel):</h3>
                    <div className="border-2 border-red-200 dark:border-red-900 rounded-xl overflow-hidden bg-slate-900 aspect-video flex items-center justify-center">
                      <div className="text-center text-white p-6">
                        <p className="text-sm mb-2">🎵 Rick Astley Video</p>
                        <p className="text-xs text-red-400">❌ Niet geschikt voor demo/investors</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm text-muted-foreground">NA (Professional):</h3>
                    <div className="border-dashed border-2 border-border rounded-xl bg-muted/30 aspect-video flex flex-col items-center justify-center text-center p-8">
                      <Video className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-lg font-semibold mb-2">Workshop presentation will appear here</p>
                      <p className="text-sm text-muted-foreground">Share your screen or upload slides</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl p-4">
                  <p className="text-sm">
                    <strong>Styling Details:</strong>
                  </p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4">
                    <li>• Container: border-dashed border-2 border-border</li>
                    <li>• Background: bg-muted/30 (dark mode compliant)</li>
                    <li>• Icon: Video (h-12 w-12 text-muted-foreground)</li>
                    <li>• Typography: text-lg font-semibold, text-sm</li>
                    <li>• Spacing: p-12, mb-4, mb-2</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* TAAK 4: Rapport Taal */}
            <Card>
              <CardHeader>
                <CardTitle>✅ TAAK 4: Rapport Taal</CardTitle>
                <CardDescription>
                  Executive Summary volledig vertaald naar Engels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-red-600">VOOR (Nederlands):</h3>
                  <div className="border-2 border-red-200 dark:border-red-900 rounded-xl p-4 bg-red-50 dark:bg-red-950/20">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="h-4 w-4" />
                      <span className="font-semibold">Executive Summary</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      De workshop resulteerde in een helder gedefinieerd Golden Circle framework dat de kern van de organisatie vastlegt...
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-green-600">NA (Engels):</h3>
                  <div className="border-2 border-green-200 dark:border-green-900 rounded-xl p-4 bg-green-50 dark:bg-green-950/20">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span className="font-semibold">Executive Summary</span>
                    </div>
                    <p className="text-sm">
                      The workshop resulted in a clearly defined Golden Circle framework that establishes the core of the organization. The team of 8 stakeholders reached consensus on the purpose (WHY), the approach (HOW), and the offering (WHAT). The collaboration led to valuable insights about human-centered technology as a key differentiator and empowerment as the primary goal.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Summary Card */}
        <Card className="border-[#1FD1B2]/50 bg-gradient-to-br from-[#1FD1B2]/5 to-emerald-50/50 dark:from-[#1FD1B2]/10 dark:to-emerald-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Alle 7 Taken Voltooid
            </CardTitle>
            <CardDescription>
              Workshop Detail pagina is nu volledig geüpdatet en design system compliant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {[
                { num: 1, title: 'Status Dropdown', desc: '"Approved" → "Completed"' },
                { num: 2, title: 'Back Links', desc: '"Back to Dashboard" → "Back to Asset"' },
                { num: 3, title: 'Date Format', desc: '"2025-01-15" → "Jan 15, 2025"' },
                { num: 4, title: 'Rapport Taal', desc: 'Nederlands → Engels' },
                { num: 5, title: 'Locked Badge', desc: '"Locked" → "Completed"' },
                { num: 6, title: 'Footer Buttons', desc: 'Duidelijkere navigatie' },
                { num: 7, title: 'Video Placeholder', desc: 'Rick Astley → Professional' }
              ].map(task => (
                <div key={task.num} className="flex items-center gap-3 p-3 bg-white/80 dark:bg-slate-900/80 rounded-lg">
                  <Badge className="bg-green-600 text-white">{task.num}</Badge>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.desc}</p>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
