export const tooltip = async () => {
    const {Tooltip} = await import('bootstrap')
    let tooltipList = [];
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(tooltipTriggerEl => {
        tooltipList.push(new Tooltip(tooltipTriggerEl, {
            boundary: 'window'
        }))
    })
}
