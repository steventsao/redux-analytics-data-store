## Why is data collection difficult?

1.  User interaction is complex. Developers should to remember to add tracking per possible interaction.

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
      /*...*/
    });
  }
  fastForward() {
    // Track the % the user has fast-forwarded
  }
}
```

2.  The frontend is responsible for implementing for multiple vendors

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

3.  Single Page Apps that utilize AJAX have to simulate page load. A page load event can vary depending on the context. ie. Page load event should only fire if a marketing widget is loaded on its own, but not when it is wrapped within a marketing page.

```javascript
class MarketingPage {
  constructor(analytics) {
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
