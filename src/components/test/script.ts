export default function test(): void {
    const btn = document.querySelector('.test');
    if (btn) {
        btn.addEventListener('click', () => {
            btn.innerHTML = 'Come back next time';
        })
    }
}
