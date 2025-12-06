export const toggleDialog = (id: string) => {
	const dialog = document.getElementById(id) as HTMLDialogElement | null
	if (dialog) {
		if (!dialog.open) {
			dialog.showModal()
			return
		}
		dialog.close()
	}
}
