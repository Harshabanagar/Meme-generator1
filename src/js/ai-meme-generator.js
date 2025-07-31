/**
 * AI Meme Generator Module
 * Handles AI-powered meme generation and template matching
 */

import { generateGeminiText } from './gemini-api.js';
// Meme template database with keywords for AI matching
/**
 * Uses Gemini API to generate meme text suggestions from a prompt
 * @param {string} prompt - User's meme description
 * @returns {Promise<string>} - The generated meme text from Gemini
 */
export async function generateGeminiMemeText(prompt) {
  try {
    const geminiText = await generateGeminiText(
      `Generate a funny meme caption for this prompt: "${prompt}". Return only the meme text, no explanations.`
    );
    return geminiText;
  } catch (err) {
    return 'Could not generate meme text.';
  }
}
const MEME_TEMPLATES = [
  {
    id: 'matrix-morpheus',
    name: 'Matrix Morpheus',
    image: 'assets/meme-templates/matrix-morpheus.jpg',
    keywords: ['what if', 'told you', 'morpheus', 'matrix', 'red pill', 'blue pill'],
    defaultTexts: ['What if I told you', 'This is AI generated']
  },
  {
    id: 'distracted-boyfriend',
    name: 'Distracted Boyfriend',
    image: 'assets/meme-templates/distracted-boyfriend.jpg',
    keywords: ['distracted', 'boyfriend', 'girlfriend', 'looking', 'choice', 'temptation'],
    defaultTexts: ['Me', 'AI Memes', 'Manual Memes']
  },
  {
    id: 'drake-hotline-bling',
    name: 'Drake Pointing',
    image: 'assets/meme-templates/drake-hotline-bling.jpg',
    keywords: ['drake', 'pointing', 'no', 'yes', 'prefer', 'choice', 'better'],
    defaultTexts: ['Manual meme creation', 'AI meme generation']
  },
  {
    id: 'success-kid',
    name: 'Success Kid',
    image: 'assets/meme-templates/success-kid.jpg',
    keywords: ['success', 'kid', 'fist', 'victory', 'win', 'achievement', 'happy'],
    defaultTexts: ['Successfully implemented', 'AI meme generator']
  },
  {
    id: 'disaster-girl',
    name: 'Disaster Girl',
    image: 'assets/meme-templates/disaster-girl.jpg',
    keywords: ['disaster', 'girl', 'fire', 'evil', 'smiling', 'chaos', 'destruction'],
    defaultTexts: ['Me watching AI', 'Replace human creativity']
  },
  {
    id: 'this-is-fine',
    name: 'This is Fine',
    image: 'assets/meme-templates/this-is-fine.jpg',
    keywords: ['fine', 'fire', 'dog', 'everything', 'okay', 'chaos', 'calm'],
    defaultTexts: ['This is fine', 'Everything is under control']
  },
  {
    id: 'nervous',
    name: 'Nervous/Sweating',
    image: 'assets/meme-templates/nervous.jpg',
    keywords: ['nervous', 'sweating', 'anxious', 'worried', 'scared', 'frightened', 'panic'],
    defaultTexts: ['When AI starts', 'Making better memes than you']
  },
  {
    id: 'hide-the-pain-harold',
    name: 'Hide the Pain Harold',
    image: 'assets/meme-templates/hide-the-pain-harold.jpg',
    keywords: ['harold', 'pain', 'smile', 'fake', 'hiding', 'uncomfortable', 'awkward'],
    defaultTexts: ['When you realize AI', 'Is better at memes than you']
  },
  {
    id: 'two-buttons',
    name: 'Two Buttons',
    image: 'assets/meme-templates/two-buttons.jpg',
    keywords: ['buttons', 'choice', 'decision', 'dilemma', 'sweating', 'difficult'],
    defaultTexts: ['Use manual mode', 'Use AI mode', 'Confused user']
  },
  {
    id: 'change-my-mind',
    name: 'Change My Mind',
    image: 'assets/meme-templates/change-my-mind.jpg',
    keywords: ['change', 'mind', 'opinion', 'debate', 'convince', 'argument'],
    defaultTexts: ['AI memes are better', 'Change my mind']
  },
  {
    id: 'one-does-not-simply',
    name: 'One Does Not Simply',
    image: 'assets/meme-templates/one-does-not-simply.jpg',
    keywords: ['one does not simply', 'boromir', 'lord of the rings', 'simply', 'difficult'],
    defaultTexts: ['One does not simply', 'Create memes without AI']
  },
  {
    id: 'i-dont-always',
    name: 'Most Interesting Man',
    image: 'assets/meme-templates/i-dont-always.jpg',
    keywords: ['most interesting', 'man', 'dont always', 'but when', 'beer', 'rarely'],
    defaultTexts: ["I don't always use AI", 'But when I do, memes are better']
  },
  {
    id: 'bad-luck-brian',
    name: 'Bad Luck Brian',
    image: 'assets/meme-templates/bad-luck-brian.jpg',
    keywords: ['bad luck', 'brian', 'unlucky', 'unfortunate', 'fails', 'disaster'],
    defaultTexts: ['Tries to make meme manually', 'AI does it better in seconds']
  },
  {
    id: 'laughing-leo',
    name: 'Laughing Leonardo DiCaprio',
    image: 'assets/meme-templates/laughing-leo.jpg',
    keywords: ['laughing', 'leonardo', 'dicaprio', 'funny', 'hilarious', 'lol'],
    defaultTexts: ['When AI generates', 'The perfect meme']
  }
];

/**
 * Analyzes user prompt and finds matching meme templates
 * @param {string} prompt - User's meme description
 * @returns {Array} Array of matching templates with scores
 */
function findMatchingTemplates(prompt) {
  const promptLower = prompt.toLowerCase();
  const words = promptLower.split(/\s+/);
  
  const matches = MEME_TEMPLATES.map(template => {
    let score = 0;
    
    // Check for exact keyword matches
    template.keywords.forEach(keyword => {
      if (promptLower.includes(keyword.toLowerCase())) {
        score += 10;
      }
    });
    
    // Check for partial word matches
    words.forEach(word => {
      template.keywords.forEach(keyword => {
        if (keyword.toLowerCase().includes(word) || word.includes(keyword.toLowerCase())) {
          score += 5;
        }
      });
    });
    
    // Bonus for template name matches
    if (promptLower.includes(template.name.toLowerCase())) {
      score += 15;
    }
    
    return { ...template, score };
  });
  
  // Sort by score and return top matches
  return matches
    .filter(match => match.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6); // Return top 6 matches
}

/**
 * Generates AI-powered meme suggestions based on user prompt
 * @param {string} prompt - User's meme description
 * @returns {Promise<Array>} Promise resolving to array of meme suggestions
 */
export async function generateAIMemes(prompt) {
  return new Promise((resolve) => {
    // Simulate AI processing time
    setTimeout(() => {
      const matches = findMatchingTemplates(prompt);
      
      if (matches.length === 0) {
        // If no matches, return some popular templates
        const fallbackTemplates = [
          MEME_TEMPLATES.find(t => t.id === 'drake-hotline-bling'),
          MEME_TEMPLATES.find(t => t.id === 'distracted-boyfriend'),
          MEME_TEMPLATES.find(t => t.id === 'this-is-fine'),
          MEME_TEMPLATES.find(t => t.id === 'success-kid')
        ].filter(Boolean);
        
        resolve(fallbackTemplates.map(template => ({
          id: template.id,
          name: template.name,
          image: template.image,
          texts: generateContextualTexts(prompt, template),
          template: template.name
        })));
      } else {
        resolve(matches.map(template => ({
          id: template.id,
          name: template.name,
          image: template.image,
          texts: generateContextualTexts(prompt, template),
          template: template.name
        })));
      }
    }, 1500); // Simulate 1.5 second processing time
  });
}

/**
 * Generates contextual text based on prompt and template
 * @param {string} prompt - User's prompt
 * @param {Object} template - Meme template
 * @returns {Array} Array of text suggestions
 */
function generateContextualTexts(prompt, template) {
  const promptLower = prompt.toLowerCase();
  
  // Try to generate contextual texts based on the prompt
  if (template.id === 'drake-hotline-bling') {
    if (promptLower.includes('old') || promptLower.includes('new')) {
      return ['Old way', 'New way'];
    }
    if (promptLower.includes('bad') || promptLower.includes('good')) {
      return ['Bad option', 'Good option'];
    }
  }
  
  if (template.id === 'distracted-boyfriend') {
    if (promptLower.includes('technology') || promptLower.includes('ai')) {
      return ['Me', 'AI Technology', 'Old Methods'];
    }
  }
  
  if (template.id === 'success-kid') {
    if (promptLower.includes('success') || promptLower.includes('win')) {
      return ['Successfully', prompt.replace(/success|win/gi, '').trim() || 'achieved goal'];
    }
  }
  
  if (template.id === 'this-is-fine') {
    return ['This is fine', 'Everything is under control'];
  }
  
  if (template.id === 'nervous') {
    return ['When ' + prompt, 'Makes you nervous'];
  }
  
  // Fallback to default texts
  return template.defaultTexts || ['Top text', 'Bottom text'];
}

/**
 * Gets a random selection of popular meme templates
 * @param {number} count - Number of templates to return
 * @returns {Array} Array of random popular templates
 */
export function getPopularTemplates(count = 4) {
  const popular = [
    'drake-hotline-bling',
    'distracted-boyfriend',
    'success-kid',
    'this-is-fine',
    'matrix-morpheus',
    'two-buttons'
  ];
  
  return popular
    .slice(0, count)
    .map(id => MEME_TEMPLATES.find(t => t.id === id))
    .filter(Boolean)
    .map(template => ({
      id: template.id,
      name: template.name,
      image: template.image,
      texts: template.defaultTexts,
      template: template.name
    }));
}