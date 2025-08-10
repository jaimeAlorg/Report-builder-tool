# An in-depth look into my code

**Jaime Arturo Álvarez Orgaz**

In this document, I will briefly explain some key highlights of the code.

## Components

My code is designed with reusable components that can be leveraged across the entire application. Two key examples are the **dialog** and **table** components.

- The dialog is built with reusability and adaptability in mind, using `ng-content` to project both the body and the buttons. A clear example of this is the create popup component.
- The table component is also highly reusable—it can be used anywhere by simply passing in a report as input. It also builds the table dynamically according to some columns.

## Service

My service has two key points:

1. The use of the browser’s local storage to save and retrieve reports, simulating what a backend would do when storing a report in a database.
2. The use of observables to retrieve data from local storage. You might ask, “Why use an observable for synchronous data?” For this test, my intention was to mimic an HTTP request as closely as possible, since such requests typically return an observable. In a real scenario with local storage, using Observables wouldn’t be necessary.

## RXJS

In addition to using observables for retrieving report data and the reports list, I am also using **subject**, an observable capable of having multiple observers. I use it to facilitate communication between components when creating a report and refreshing the report list.

## Data

In addition to the mock sales data, I created mock filter data to populate the dropdowns in the create popup, as well as mock report data to provide three default reports when the application first loads.

## Reactive forms

The create report form is reactive with custom validations.

- No two titles can be the same.
- A date range can be empty but cannot have open intervals or invalid values. Open intervals automatically converts into the open or end range on submit.

## Directives

I implemented a custom attribute directive to enable a select-all option on the material dropdown. When clicked, it automatically selects/deselects all available options in the parent `mat-select` and syncs its state when individual options are manually selected.

## Styling

The application is fully responsive, ensuring it works seamlessly on any screen size.

- At 1000px, a breakpoint triggers the switch to mobile view.
- Although not ideal, some material UI styles have been overridden using `:host`, `:ng-deep`, and `!important`. While these methods are generally not recommended, with Material there is often no alternative workaround.
- To improve accessibility, I created two color presets, standard contrast and high contrast which can be toggled at any time from the sidebar. The high-contrast mode enhances readability for users who need it.

## Testing

I have implemented six tests in the report service using Karma and Jasmine. I decided not to add more tests, as the goal here is simply to showcase my skills.

## Out of scope

Potential next steps for this application include:

- Adding the ability to edit and delete custom-created reports. I have already included a **my reports** tab in the navigation bar to suggest a more fully developed application.
- Creating a dynamic help popup that adapts its content based on the current route, providing context-specific guidance.
- Enhancing the filters button in the report list to open a filter slide-in for better report searching experience.
- Implementing lazy loading on the list if the application grows and has more users, by loading chunks from the backend or using infinite scroll (similar to social media).
- Adding export functionality. Since the application is already substantial and I had a personal deadline of Sunday, August 10th, I won’t be able to implement this feature now. Properly developing an export function would require more than just a couple of days of work.
