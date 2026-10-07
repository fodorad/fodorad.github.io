/* Shared ordering for project tiles: newest year first; inside a year the
   optional "priority" field decides (lower comes first). Projects without a
   priority follow in file order, because Array.prototype.sort is stable. */
function compareProjects(a, b) {
    const priority = item => item.priority ?? Infinity;
    return b.year - a.year || priority(a) - priority(b);
}
