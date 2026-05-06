import { useMemo } from 'react';
import type { Project } from '@/data/types';

/**
 * Filter projects by a search query against their tags.
 *
 * Empty or whitespace-only queries return the full list.
 * Match is case-insensitive and substring-based, so "type" matches "typescript".
 */
export function useProjectSearch(
  projects: readonly Project[],
  query: string,
): readonly Project[] {
  return useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return projects;

    return projects.filter((project) =>
      project.tags.some((tag) => tag.toLowerCase().includes(trimmed)),
    );
  }, [projects, query]);
}
