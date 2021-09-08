export class DebugWatchDecorators {
	public static watchWithCallback(callback?: (newValue: any, oldValue: any) => void) {
		return function (target: any, key: string) {
			DebugWatchDecorators.setterGetterWithSetCallback(target, key, callback);
		};
	}

	public static watchChange(target: any, key: string) {
		const callback = function (newValue: any, oldValue: any) {
			console.log(`${key} changed value to ${newValue} from ${oldValue}`);
		};
		DebugWatchDecorators.setterGetterWithSetCallback(target, key, callback);
	}

	private static setterGetterWithSetCallback(target: any, key: string, callback: Function) {
		Object.defineProperty(target, key, {
			get: function () {
				return this[`_` + key];
			},
			set: function (value) {
				const oldValue = this[`_` + key];
				this[`_` + key] = value;
				callback(value, oldValue);
			},
		});

	}

}