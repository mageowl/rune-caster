class EventEmitter {
	eventList = {};

	constructor(target, eventNames) {
		this.target = target;
		eventNames.forEach((event) => {
			this.eventList[event] = [];
		});
	}

	emit(event, data = null) {
		this.eventList[event].forEach((cb) => {
			cb(data);
		});
	}
}

export default function eventTarget(obj, events) {
	const emitter = new EventEmitter(obj, events);

	obj.onEvent = (event, cb) => {
		if (!events.includes(event)) {
			console.warn(`Unknown event "${event}" for ${obj.constructor.name}`);
			return;
		}

		emitter.eventList[event].push(cb);
	};

	return emitter;
}
