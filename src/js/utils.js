function isFeatureAvailable() {
  return ('scheduler' in window && 'yield' in scheduler)
}

function yieldToMain(useNewFeature) {
  if (isFeatureAvailable() && useNewFeature) {
    return scheduler.yield()
  }

  return new Promise((resolve) => setTimeout(resolve, 0));
}

function threadBlockerFactory(duration) {
  return function () {
    const startTime = Date.now()

    while (Date.now() < startTime + duration);
  }
}

export {
  isFeatureAvailable,
  yieldToMain,
  threadBlockerFactory,
}

