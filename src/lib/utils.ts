export function prefixKeys(obj: Record<string, any> | undefined, prefix: string) {
    if (!obj) return {};
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [`${prefix}${key}`, value])
    );
}