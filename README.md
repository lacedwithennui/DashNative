# DashNative

This is a React Native app that replaces the existing DASH Bus app from the Alexandria Transit Company.

Notable features include:
- Favorite bus settings
- A reskin of the existing DASHTracker mobile web interface using CSS and base JS
- A seamless transition between native app views and web views, meaning the user doesn't know they're actually looking at a website

iOS installation instructions:
1. Clone the project and run `npm i` in the root directory.
2. Run `npm run build:ios` to create a new main.jsbundle file
3. Either run the project using expo-cli (step 4) or in Release mode using XCode (step 5)
4. If you'd like to install the app using expo-cli (**RECOMMENDED**), run `npm run prod`. This will install a standalone version of the app to your device (which you can select once the command is run) that does not need a metro bundler server to be active for use.
5. If you'd like to install the app using XCode, open the `DashNative.xcworkspace` (eg **NOT** the `.xcodeproj`) file.
   
5a. Click on the DashNative target in the header:

<img width="407" alt="Screenshot 2023-07-06 at 01 05 59" src="https://github.com/lacedwithennui/DashNative/assets/31376764/a3f7fc56-4a34-48ad-b061-1f362ef01b0e">

5b. Click on Edit Scheme:

<img width="219" alt="Screenshot 2023-07-06 at 01 08 38" src="https://github.com/lacedwithennui/DashNative/assets/31376764/9abb2070-3c48-4a0a-9f6a-a7ae2ec9d519">

5c. Set "Build Configuration" to "Release":

<img width="935" alt="Screenshot 2023-07-06 at 01 11 03" src="https://github.com/lacedwithennui/DashNative/assets/31376764/b1eccd11-6003-4e85-b9e8-b7fa7374c7e7">

5d. Press Run.
