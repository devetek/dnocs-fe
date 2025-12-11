# `events` - Event system

The main idea of this is that we have a global "event registry" based on `mitt` and anyone can register themselves through `registerEvents`. Since we only need one instance of it, we uses context to house it and only keep one instance alive, while also generalizes it by erasing its type as we don't need them there. In turn, we uses `registerEvents` for our customers to register their own set of events, and in turn customize their own types there.

To make sure there are no clash of event name, we decided a convention:

```
[path-to-module]/[event-name]
```

For instance, the `toast` module under `core` has the namespace `core-toast`, and thus its convention is `core-toast/[event-name]`.
