# Pattern - Error panel

## Overview

User perception of the reliability and correctness of the API is largely determined by the FE. A reliable API that is accessed by a poorly-built FE can still lead to very unhappy users.

Error-handling is essential.

- Developers should dedicate time in every feature to properly handle errors
- Developers should research APIs for expected error cases
- QA should test with high latency
- QA should simulate API failures
  - see Chrome developers tools => Network => Block network calls

## Types of errors

1. Refresh tokens
  Authentication should detect expiration, place all API calls in a waiting state, and fetch the refresh token. Once the token is valid, API calls should resume
1. Data-handling errors (unexpected edge cases)
  FE should validate data received from other systems. Unexpected / incorrect data should be logged so that developers are aware of the unexpected data. Developers should examine logs and provide fixes.
1. Network errors
  Developers should assume that users have poor internet connections (unstable or with high latency)
    1. This can be simulated using Chrome developer tools
    1. API calls should perform multiple retries before raising a connection error
    1. Error messaging should tell users that the connection is the problem, not the application. Ex message can include the phrase "Unstable network connection"
    1. Provide spinners when network action is occurring
    1. Block users from triggering multiple identical network calls
1. Validate forms before submission
    1. Primitives (strings, numbers) should always have minimum and maximum length /amount
    1. Booleans must have a default value
    1. Decide if business validation logic is performed only by BE
        1. Regardless of decision, FE should handle all expected BE validation errors
1. Handle expected errors with business logic and error-specific friendly messages
    1. Do not directly display the error message from the API. Convert this to a friendly, localizable error string. Ex. API returns `400 Invalid parameter` should display a string that is specific to the error
    1. Consider multiple users
        1. It is possible for other users to change state. Users may be looking at stale data
        1. This is a complex topic that requires more discussion
1. Component logic errors (React)
    1. White screen of death. The React "White Screen of Death" (WSOD) is a frustrating issue where an application renders a blank white screen instead of the expected content.
        1. This occurs when javascript throws an exception due to a logic or data error
        1. Implement ErrorBoundarys to prevent the entire application from being unusable
        1. Carefully consider which props are required or optional. The component should display correctly when optional props are not present.
1. Applications should assume that servers can become overloaded
    1. Applications should retry remote calls with an exponential backoff
        1. This will help servers recover from unexected brief load
        1. Exponential backoff should include randomness to improve the situation where all users attempt to reconnect at the same time after a brief outage
    1. Some APIs will return the response `429 Too many requests`
        1. Application should wait until the retry interval before retrying

## Best practices

1. Assume user has poor internet connection
1. Fatal errors
    1. Unrecoverable errors which place the UI into an unusable state should redirect the user to a fatal error screen that allows the user to refresh (see example)
1. Localize errors
    1. Only fatal errors should redirect to fatal error screen
    1. Where possible, only disable the portion of the screen that is unusable. It is common in micro-service based applications (or applications that have complex 3rd party integrations) for a portion of the application to be unusable for a brief time (see example)
        1. Allowing the user to continue with other tasks until the outage is resolved is very helpful
        1. This can also help reduce unexpected data entry loss if a form is unexpectedly unloaded
1. Automatically retry API calls
1. Messaging - avoid technical jargon and provide simple friendly error messages
    1. Examples
        1. Unexpected error - "Something went wrong"
        1. Poor connectivity / network offline - "Unstable connection"
    1. Optionally the message can include a code that users can provide to technical support
    1. Optionally the screen can provide an action the user can perform to see if a temporary problem has been resolved. This is generally "try again".
    1. <https://uxwritinghub.com/error-message-examples/>
    1. <https://www.smashingmagazine.com/2022/08/error-messages-ux-design/>
1. Avoid error toasts. Instead use a contextual inline error summary
    1. https://www.smashingmagazine.com/2022/08/error-messages-ux-design/#don-t-rely-on-toast-error-messages
1. Validation error messages in forms are not enough
    1. Never rely on the color of the error message alone, and use icons, borders, and section highlights to indicate erroneous input.
1. Guard against multi-clicking buttons and links. Generally DOM click handlers will do this for you but it is also necessary to block user clicks when actions are occurring
1. Security
    1. React applications should avoid `dangerouslySetInnerHTML`
        1. if dangerous strings must be shown, sanitize the string before display (dompurify library)
    1. Guard against unsafe user input (optional). Sanitize strings before sending to API
        1.API must sanitize but FE could also do this for multiple layers of protection

## Tasks

1. Provide ErrorBoundary components in appropriate places
1. Review all API calls and handle expected error codes
1. Review all hooks and components which perform API calls and add error handling
1. Include error-handling in unit tests
1. Replace technical error messages with friendly error messages
1. Error screens should provide an action for users to perform (retry, reload, etc)
