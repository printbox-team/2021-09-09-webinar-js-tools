export class DebugSetupUtil {
	private static alreadySetupIds = new Set<string>();

	public static oneTime(uniqueId: string) {
		if (DebugSetupUtil.alreadySetupIds.has(uniqueId)) {
			return false;
		} else {
			DebugSetupUtil.alreadySetupIds.add(uniqueId);
			return true;
		}
	}

	public static clear() {
		DebugSetupUtil.alreadySetupIds.clear();
	}
}