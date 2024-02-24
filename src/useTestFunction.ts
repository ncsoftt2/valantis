export const useTestFunction = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const keys = searchParams.keys();
    console.log('test test test')
    let initialKey = keys.next().value;
    while (initialKey === 'action') {
        initialKey = keys.next().value;
    }
    const action = searchParams.get('action') || 'get_ids'
    const param = searchParams.get('product') || Number(searchParams.get('price')) || searchParams.get('brand') || ''
    return {action,param, initialKey}
}