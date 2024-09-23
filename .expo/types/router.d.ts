/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(home)` | `/(home)/` | `/(home)/profile` | `/(home)/search` | `/_sitemap` | `/auth` | `/auth/onboard` | `/auth/signin` | `/book` | `/book/story` | `/profile` | `/search` | `/settings`;
      DynamicRoutes: `/${string}` | `/book/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/[...unmatched]` | `/book/[synopsis]`;
    }
  }
}
