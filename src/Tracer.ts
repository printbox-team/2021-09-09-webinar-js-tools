class LogData {
	public counter = 0;
	public logMessage: string;

	constructor(counter: number, logMessage: string) {
		this.counter = counter;
		this.logMessage = logMessage;
	}
}

export class Tracer {
	private static internalErrorGenerationDepth = 2;
	private static allCallStacks = new Map<string, LogData>();

	public static callStack({stackTraceLimit = 10} = {}): string {
		return Tracer.getSplittedCallStack({stackTraceLimit});
	}

	public static collectStackTrace({logMessage = "", stackTraceLimit = 10} = {}): void {
		const callStack = Tracer.getSplittedCallStack({stackTraceLimit});
		if (Tracer.allCallStacks.has(callStack)) {
			Tracer.allCallStacks.get(callStack).counter++;
		} else {
			Tracer.allCallStacks.set(callStack, new LogData(1, logMessage));
		}
	}

	private static getSplittedCallStack({stackTraceLimit = 10} = {}): string {
		const oldLimit = Error.stackTraceLimit;
		Error.stackTraceLimit = stackTraceLimit + Tracer.internalErrorGenerationDepth;
		const stackTrace: string = Tracer.getErrorCallStack(new Error);
		Error.stackTraceLimit = oldLimit;
		if (!stackTrace) {
			return;
		}
		const stackTraceLines = stackTrace.split("\n");
		for (let i = 0; i < Tracer.internalErrorGenerationDepth + 1; i++) {
			stackTraceLines.shift();
		}

		for (let i = 0; i < stackTraceLines.length; i++) {
			stackTraceLines[i] = stackTraceLines[i].replace(/\s*at\s*/, "\t");
		}
		return stackTraceLines.join("\n");
	}

	public static printAllCallStacks(): void {
		for (const callStack of Tracer.allCallStacks.keys()) {
			const data = Tracer.allCallStacks.get(callStack);
			const message: string[] = [];
			message.push(`count: ${data.counter}`);
			if (data.logMessage) {
				message.push(`log: ${data.logMessage}`);
			}
			message.push(`callStack:\n${callStack}`);
			console.log(message.join(`, `));
		}
	}

	public static clearCollectedStackTraces(): void {
		Tracer.allCallStacks.clear();
	}

	private static getErrorCallStack(error: any): string {
		if (!error) {
			return null;
		}
		var stackTrace: string = error["stack"];
		return stackTrace ? stackTrace : error.toString();
	}
}


