# An in-depth look into my design

**Jaime Arturo Álvarez Orgaz**

To start the design process, I created the design guidelines—covering colors, typography, and elevation—using the Material theme builder. This tool is extremely convenient when starting a new project, as it generates a complete set of color palettes, elevation scales, and typography rules from a few initial parameters. I then incorporated these guidelines into the Figma draft using a Material template to ensure consistency from the very beginning.

The next step was to create rough sketches to determine the placement of the navigation bar and main container contents. From these sketches, five key design principles emerged:

## 1. Navigation bar

In the desktop view, my priority was to maximize space for displaying reports, as this is the user’s main focus. A side navigation bar provides a clean, unobtrusive layout and leaves more vertical space for the report list and the report itself. On desktop, the navigation bar is always visible, ensuring the user is just one click away from any section.

In mobile view, navigation is split into two bars:

- A top bar with the main functionalities users need at first glance.
- A secondary menu hidden behind a burger icon, which slides in from the left to reveal the remaining functionalities.

## 2. One-click report creation

Whether on desktop or mobile, the **create report button** is always accessible. Clicking it opens a popup regardless of the user’s current location in the app. This design choice allows users—especially those in a hurry—to create a report instantly without navigating away.

## 3. Report viewer container

This section is designed to display both the list and the report within the same container. On desktop, the list occupies 40% of the container’s width, and the report takes 60%, giving the report more space for better readability. On mobile, only one of the two is shown at a time, with a back button at the top left of the report view to return to the list.

## 4. No scroll bars on the main container

To maintain uniform behavior across devices, the only elements that can overflow vertically are the report list card and the table. The table can also overflow horizontally if needed. This approach ensures the main container remains clean and consistent, whether viewed on a phone or a large monitor.

## 5. Accessibility

The application features a permanently visible sidebar for seamless navigation. Button styles follow a clear hierarchy: filled buttons for primary actions and outlined buttons for secondary actions. 99% of the icons and buttons are named. The only two that are not named, have the property title inside an `<a>` tag.

Users can switch between standard contrast and high contrast modes at any time, ensuring better accessibility and readability. This functionality is only available in the code. Color usage is consistent throughout the interface, enhancing the visibility of primary text, secondary text, tables, headers, and other key elements.
