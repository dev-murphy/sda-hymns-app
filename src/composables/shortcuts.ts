interface ShortcutOptions {
  shortcut: string;
  prevent?: boolean;
  callback: () => void;
  enabledWhen?: () => boolean;
}

function isTypingFieldActive() {
  const tag = document.activeElement?.tagName?.toLowerCase();
  const editable = (document.activeElement as HTMLElement)?.isContentEditable;
  return tag === "input" || tag === "textarea" || editable;
}

export function useShortcuts(map: ShortcutOptions[]) {
  const handler = (event: KeyboardEvent) => {
    if (isTypingFieldActive() && event.key.length === 1) return;

    const combo = [
      event.ctrlKey ? "ctrl" : "",
      event.shiftKey ? "shift" : "",
      event.altKey ? "alt" : "",
      event.key.toLowerCase(),
    ]
      .filter(Boolean)
      .join("+");

    const found = map.find((x) => x.shortcut === combo);
    if (found?.enabledWhen && !found.enabledWhen()) return;

    if (found) {
      if (found.prevent) {
        event.preventDefault();
      }
      found?.callback();
    }
  };

  onMounted(() => window.addEventListener("keydown", handler));
  onUnmounted(() => window.removeEventListener("keydown", handler));
}
