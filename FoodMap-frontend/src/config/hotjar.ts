const SCRIPT_ID = import.meta.env.VITE_HOTJAR_SCRIPT_ID as string | undefined;

let initialized = false;

export const isHotjarEnabled = () => initialized;

export function initHotjar() {
    if (initialized || !SCRIPT_ID?.trim()) return;

    const script = document.createElement('script');
    script.src = `https://t.contentsquare.net/uxa/${SCRIPT_ID.trim()}.js`;
    script.async = true;
    document.head.appendChild(script);
    initialized = true;
}
