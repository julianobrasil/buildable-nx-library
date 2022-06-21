# Description

Here we have 3 projects: 1 app and 2 libaries

## app1

This is a `Next.js` application. A custom server was added to make it possible
for us to add imports to the node.JS part. So you're going to find a
`next-custom-server.ts` file in the root of this app.

In the aforementioned file, we're importing something from the buildable 
library, a content that contains jsx:

```typescript
import {obj} from '@my-org/buildable-lib'
```

## buildable-lib

This is a react libray project. It's doing nothing important, but exporting
a component and an object containing a jsx.

As its name suggests, it's a buildable library, configured to export things
in `CommonJs` format (so we can import it in `Next.js`)

## not-buildable-lib

It has the same content as `buildable-library` and it's here only for testing purpose.

## How to test the project

- Build the buildable library: `yarn nx build buildable-lib`
- Try to serve the Nx application: `yarn nx server app1`
- Acess the page served

The above steps should go just fine. Now replace the import on
`next-custom-server.ts` file from:

```typescript
import {obj} from '@my-org/buildable-lib'
```
to

```typescript
import {obj} from '@my-org/not-buildable-lib'
```
And try to serve the app again. It should fail this time due to the presence
of jsx and esm modules config. For the buildable case we are able to, in the
build process, turn the jsx into functions and to output it in commonjs format
so we can import it from the `Next.js` application on the `node.JS` part.

## What changed

If you want to check the changes made for the buildable library to work
correctly, compare the current state (git tag: `tag2-make-buildable`) 
with the last commit (git tag: `tag1-add-libraries`)