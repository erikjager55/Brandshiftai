import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Persona } from '../types/persona';
import { 
  Sparkles, 
  RefreshCw, 
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { fetchUnsplashImage, buildPersonaImageQuery } from '../utils/unsplash-helper';

interface PersonaImageGeneratorProps {
  persona: Partial<Persona>;
  onImageGenerated: (imageUrl: string) => void;
  currentImage?: string;
}

/**
 * PersonaImageGenerator
 * 
 * Genereert een realistische foto/afbeelding van een persona op basis van
 * demographics, occupation, age, gender, en location.
 * 
 * Gebruikt intelligente Unsplash queries om passende stock photos te vinden.
 */
export function PersonaImageGenerator({ 
  persona, 
  onImageGenerated, 
  currentImage 
}: PersonaImageGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Bouwt een intelligente Unsplash query op basis van persona data
   */
  const buildPersonaQuery = (): string => {
    const parts: string[] = [];
    
    // Age range bepalen voor betere resultaten
    const age = persona.demographics?.age;
    if (age) {
      const ageNum = parseInt(age);
      if (ageNum < 25) {
        parts.push('young');
      } else if (ageNum >= 25 && ageNum < 40) {
        parts.push('professional');
      } else if (ageNum >= 40 && ageNum < 60) {
        parts.push('mature professional');
      } else {
        parts.push('senior');
      }
    }

    // Gender
    const gender = persona.demographics?.gender?.toLowerCase();
    if (gender) {
      if (gender.includes('female') || gender.includes('woman')) {
        parts.push('woman');
      } else if (gender.includes('male') || gender.includes('man')) {
        parts.push('man');
      } else {
        parts.push('person');
      }
    } else {
      parts.push('person');
    }

    // Occupation context
    const occupation = persona.demographics?.occupation?.toLowerCase();
    if (occupation) {
      // Vertaal occupation naar visuele context
      if (occupation.includes('engineer') || occupation.includes('developer') || occupation.includes('tech')) {
        parts.push('working laptop');
      } else if (occupation.includes('designer') || occupation.includes('creative')) {
        parts.push('creative workspace');
      } else if (occupation.includes('manager') || occupation.includes('executive') || occupation.includes('director')) {
        parts.push('business professional');
      } else if (occupation.includes('teacher') || occupation.includes('educator')) {
        parts.push('professional educator');
      } else if (occupation.includes('doctor') || occupation.includes('nurse') || occupation.includes('healthcare')) {
        parts.push('healthcare professional');
      } else if (occupation.includes('entrepreneur') || occupation.includes('founder')) {
        parts.push('entrepreneur');
      } else {
        parts.push('professional');
      }
    } else {
      parts.push('professional');
    }

    // Altijd eindigen met portrait voor een goede compositie
    parts.push('portrait');

    // Max 3-4 keywords voor beste resultaten
    return parts.slice(0, 4).join(' ');
  };

  /**
   * Genereert persona afbeelding
   */
  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Bouw query op basis van persona eigenschappen
      const query = buildPersonaQuery();
      
      console.log('Generating persona image with query:', query);
      
      // Gebruik Unsplash tool om relevante foto te vinden
      const imageUrl = await fetchUnsplashImage(query);
      
      if (imageUrl) {
        setGeneratedImage(imageUrl);
        onImageGenerated(imageUrl);
      } else {
        throw new Error('No image found');
      }
    } catch (err) {
      console.error('Image generation error:', err);
      setError('Could not generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Regenereert een nieuwe afbeelding met dezelfde query
   */
  const regenerateImage = async () => {
    // Reset current image en genereer opnieuw
    setGeneratedImage(null);
    await generateImage();
  };

  // Check of we genoeg data hebben voor een goede query
  const hasEnoughData = !!(
    persona.demographics?.gender || 
    persona.demographics?.age || 
    persona.demographics?.occupation
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Persona Image
        </CardTitle>
        <CardDescription>
          Generate a realistic photo based on persona demographics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Preview Area */}
        <div className="relative aspect-square rounded-xl bg-muted overflow-hidden border-2 border-border">
          {generatedImage ? (
            <img
              src={generatedImage}
              alt={persona.name || 'Persona'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
              <ImageIcon className="h-12 w-12 mb-3 opacity-30" />
              <p className="text-sm">No image generated yet</p>
            </div>
          )}
          
          {/* Status Badge Overlay */}
          {generatedImage && (
            <div className="absolute top-3 right-3">
              <Badge variant="outline" className="bg-background/90 backdrop-blur-sm">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Generated
              </Badge>
            </div>
          )}
        </div>

        {/* Warning if not enough data */}
        {!hasEnoughData && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <div className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Tip:</strong> Add age, gender, or occupation for better results
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
            <div className="text-sm text-red-800 dark:text-red-200">
              {error}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {!generatedImage ? (
            <Button
              onClick={generateImage}
              disabled={isGenerating || !hasEnoughData}
              className="flex-1 gap-2"
              variant="default"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Image
                </>
              )}
            </Button>
          ) : (
            <>
              <Button
                onClick={regenerateImage}
                disabled={isGenerating}
                variant="outline"
                className="flex-1 gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Regenerating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Try Another
                  </>
                )}
              </Button>
              <Button
                onClick={() => {
                  setGeneratedImage(null);
                  onImageGenerated('');
                }}
                variant="outline"
                className="gap-2"
              >
                Clear
              </Button>
            </>
          )}
        </div>

        {/* Generation Details */}
        {hasEnoughData && (
          <div className="pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              Image based on:
            </p>
            <div className="flex flex-wrap gap-2">
              {persona.demographics?.age && (
                <Badge variant="outline" className="text-xs">
                  Age: {persona.demographics.age}
                </Badge>
              )}
              {persona.demographics?.gender && (
                <Badge variant="outline" className="text-xs">
                  {persona.demographics.gender}
                </Badge>
              )}
              {persona.demographics?.occupation && (
                <Badge variant="outline" className="text-xs">
                  {persona.demographics.occupation}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}