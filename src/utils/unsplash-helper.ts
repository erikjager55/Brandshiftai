/**
 * Unsplash Helper
 * 
 * Client-side helper for fetching Unsplash images via API
 */

const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // In productie via env variable

/**
 * Fetch image from Unsplash based on search query
 */
export async function fetchUnsplashImage(query: string): Promise<string> {
  try {
    // Voor development gebruiken we een mock/fallback systeem
    // In productie zou dit een echte Unsplash API call zijn
    
    // Mock implementation: generate a deterministic image URL
    const mockImageUrl = generateMockPersonaImage(query);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return mockImageUrl;
    
    /* 
    // Real Unsplash API implementation (for production):
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=portrait`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    
    const data = await response.json();
    return data.urls.regular;
    */
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    throw error;
  }
}

/**
 * Generates a mock persona image URL based on query
 * Uses Unsplash's public source URL with query parameters
 */
function generateMockPersonaImage(query: string): string {
  // Parse query to extract key characteristics
  const isWoman = query.toLowerCase().includes('woman');
  const isMan = query.toLowerCase().includes('man');
  const isProfessional = query.toLowerCase().includes('professional') || 
                         query.toLowerCase().includes('business');
  const isCreative = query.toLowerCase().includes('creative') || 
                     query.toLowerCase().includes('designer');
  const isYoung = query.toLowerCase().includes('young');
  
  // Curated Unsplash photo IDs for different persona types
  const photoIds: Record<string, string[]> = {
    youngWoman: [
      'rDEOVtE7vOs', // young professional woman
      'mEZ3PoFGs_k', // young woman portrait
      'Zz5LQe-VSMY', // professional young woman
    ],
    youngMan: [
      'WNoLnJo7tS8', // young professional man
      'd2MSDujJl2g', // young man portrait
      'hpjSkU2UYSU', // professional young man
    ],
    professionalWoman: [
      'QXevDflbl8A', // business woman
      '5yEiCUynJ8o', // professional woman
      'IF9TK5Uy-KI', // executive woman
    ],
    professionalMan: [
      'ILip77SbmOE', // business man
      'QXevDflbl8A', // professional man
      '8YG31Xn4dSw', // executive man
    ],
    creativeWoman: [
      'nR-rzu8--5M', // creative woman
      '7YVZYZeITc8', // designer woman
      'h5cd51KXmRQ', // artistic woman
    ],
    creativeMan: [
      'xEY1_e99kOs', // creative man
      'Wr3comVZJxU', // designer man
      '0RhOvPZOGq4', // artistic man
    ],
    default: [
      'WNoLnJo7tS8', // neutral professional
      'rDEOVtE7vOs', // neutral professional 2
    ]
  };
  
  // Select appropriate category
  let category = 'default';
  if (isWoman) {
    if (isYoung) category = 'youngWoman';
    else if (isCreative) category = 'creativeWoman';
    else if (isProfessional) category = 'professionalWoman';
  } else if (isMan) {
    if (isYoung) category = 'youngMan';
    else if (isCreative) category = 'creativeMan';
    else if (isProfessional) category = 'professionalMan';
  }
  
  // Get random photo from category
  const photos = photoIds[category] || photoIds.default;
  const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
  
  // Return Unsplash photo URL
  return `https://images.unsplash.com/photo-${randomPhoto}?w=800&h=800&fit=crop&crop=faces`;
}

/**
 * Build intelligent search query from persona data
 */
export function buildPersonaImageQuery(
  age?: string,
  gender?: string,
  occupation?: string
): string {
  const parts: string[] = [];
  
  // Age range
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
  if (gender) {
    const g = gender.toLowerCase();
    if (g.includes('female') || g.includes('woman')) {
      parts.push('woman');
    } else if (g.includes('male') || g.includes('man')) {
      parts.push('man');
    } else {
      parts.push('person');
    }
  } else {
    parts.push('person');
  }
  
  // Occupation context
  if (occupation) {
    const occ = occupation.toLowerCase();
    if (occ.includes('engineer') || occ.includes('developer') || occ.includes('tech')) {
      parts.push('working laptop');
    } else if (occ.includes('designer') || occ.includes('creative')) {
      parts.push('creative workspace');
    } else if (occ.includes('manager') || occ.includes('executive') || occ.includes('director')) {
      parts.push('business professional');
    } else if (occ.includes('teacher') || occ.includes('educator')) {
      parts.push('professional educator');
    } else if (occ.includes('doctor') || occ.includes('nurse') || occ.includes('healthcare')) {
      parts.push('healthcare professional');
    } else if (occ.includes('entrepreneur') || occ.includes('founder')) {
      parts.push('entrepreneur');
    } else {
      parts.push('professional');
    }
  } else {
    parts.push('professional');
  }
  
  parts.push('portrait');
  
  return parts.slice(0, 4).join(' ');
}
