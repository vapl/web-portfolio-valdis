export function isValidSlug(slug: string) {
    // Only lowercase letters, numbers and hyphens allowed
    return /^[a-z0-9-]+$/.test(slug);
}