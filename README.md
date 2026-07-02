# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Requirements & versions

This app targets **Expo SDK 57** (React Native 0.86). Every machine that runs it
**and every device's Expo Go must also be SDK 57** — mixing SDK versions is the #1
cause of the worklets crash documented below. Confirm your local packages match the
SDK with:

```bash
npx expo install --check
```

No `babel.config.js` is required — `babel-preset-expo` auto-configures the
reanimated / worklets Babel plugin on SDK 57.

## Troubleshooting

### `WorkletsError: Mismatch between JavaScript part and native part of Worklets (x.y.z vs a.b.c)`

Usually accompanied by a flood of `Route "./<screen>.tsx" is missing the required
default export` warnings for almost every screen.

**Cause:** the installed packages are from a *different* Expo SDK than the Expo Go
app (or dev client) running the bundle — e.g. the project is on SDK 54 while Expo Go
is SDK 57. `src/components/RightNavbar.tsx` imports `react-native-reanimated`, which
fails to initialize on the version mismatch; every screen that imports `RightNavbar`
then fails to load, which is what produces all the "missing default export" warnings.
**Those warnings are a symptom, not real bugs** — they disappear once the versions
align.

**Fix — align everything to SDK 57:**

```bash
npx expo install expo@^57.0.0
npx expo install --fix        # bumps reanimated / worklets / RN / etc. to matching versions
rm -rf node_modules package-lock.json
npm install
npx expo start -c             # -c clears the stale Metro cache (important)
```

Then reopen in Expo Go 57. To avoid Expo Go version-matching entirely, build a dev
client instead: `npx expo run:ios` (or `run:android`) — the native worklets version
is compiled from this project's `package.json`, so it can never mismatch.

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
