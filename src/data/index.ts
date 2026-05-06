import contentJson from './content.json';
import type { Content } from './types';

// All user-facing copy and data lives in content.json.
// Edit that file to update the site — no component changes required.
export const content: Content = contentJson as Content;

export const { profile, experience, projects, labels } = content;
