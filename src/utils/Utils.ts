export const formatSlug = (slug) => {
    slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9-]/g, "");
    slug = slug.replace(/-{2,}/g, "-").replace(/^-|-$/g, "");
    return slug.toLowerCase();
}
