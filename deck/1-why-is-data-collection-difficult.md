## Why is data collection difficult?

1.  User interaction is complex. Developers are expected to track as many interactions as possible.

```javascript
class VideoManager {
  play() {
    // ...
    analytics.eventTrack("play video in marketing page", {
      category: "Videos",
      action: "play",
      label: "marketing page"
    });
  }
  pause() {
    analytics.eventTrack("...", {
      // ...
    });
  }
  fastForward() {
    // Track the % the user has fast-forwarded
  }
}
```

ie. SPAs that utilize AJAX have to simulate page load.

```javascript
class MarketingPage {
  constructor(analytics) {
    // The definition of a page load event vary. What if a load event should not fire if a server call fails?
    analytics.eventTrack("loaded marketing page");
  }
}

class DiscountWidget {
  constructor(analytics, mediaQuery) {
    // Using Angular Element, widgets can be embedded without an iframe, making this if condition fragile.
    if (mediaQuery.isIframe) {
      analytics.eventTrack("loaded discount widget");
    }
  }
}
```

2.  The frontend is responsible for implementing for multiple vendors and their format

```javascript
class Analytics {
  eventTrack(name, { category, action, label }) {
    // vendor 1
    snowplow.track({
      sc: category,
      sa: label,
      a: name
    });

    // vendor 2
    googleAnalytics("send", {
      hitType: "event",
      eventCategory: category,
      eventAction: action,
      eventLabel: label
    });
  }
}
```

Besides web analytics, the frontend also have to implement campaign analytics, audience measurement, personalization and A/B testing.
