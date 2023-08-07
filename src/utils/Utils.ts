export const formatSlug = (slug) => {
    slug = slug.replace(/[^a-zA-Z0-9 ]/g, "");
    slug = slug.replace(/\s+/g, "-");
    return slug.toLowerCase();
}
