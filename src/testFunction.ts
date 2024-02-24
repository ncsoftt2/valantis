export const testFunction = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const keys = searchParams.keys();

    let initialKey = keys.next().value;
    while (initialKey === 'action') {
        initialKey = keys.next().value;
    }
    const action = searchParams.get('action') || 'get_ids';
    const param2 = searchParams.get('product') || Number(searchParams.get('price')) || searchParams.get('brand') || '';
    return {action,param2, initialKey}
}