type AlphabetLetters = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l"
	| "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "w" | "x" | "y" | "z";

export class SimpleShortcut {
	constructor(key: AlphabetLetters, callback: Function) {
		window.addEventListener("keydown", (event: KeyboardEvent): void => {
			if (event.key === key) {
				event.preventDefault();
				event.stopImmediatePropagation();
				callback(event);
			}
		});
	}
}

export function simpleShortcut(key: AlphabetLetters, callback: Function) {
	window.addEventListener("keydown", (event: KeyboardEvent): void => {
		if (event.key === key) {
			event.preventDefault();
			event.stopImmediatePropagation();
			callback(event);
		}
	});
}
