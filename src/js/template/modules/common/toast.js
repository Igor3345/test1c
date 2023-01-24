export const toast = async () => {
    let {Toast} = await import('bootstrap')
    document.querySelectorAll('.js-toast').forEach(toastNode => {
        let toast = new Toast(toastNode, {
            autohide: false
        })
        toast.show();
    })

}