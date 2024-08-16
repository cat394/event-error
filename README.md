# Event Error - The Most Graceful Way to Handle Errors in the Frontend

This package provides the most graceful way to handle errors in the frontend.

By centralizing all errors, it enhances the maintainability of your web
application and offers a very smooth error handling experience.

## Usage

1. Define the type for the custom event listener:

   ```ts
   // index.d.ts
   import { AppErrorEvent } from "@kokomi/event-error";

   // AppErrorEvent = Record<'error', Error>;

   import { AppErrorEvent } from "@kokomi/event-error";

   declare global {
     interface DocumentEventMap {
       "appError": CustomEvent<AppErrorDetail>;
     }
   }
   ```

2. Use the `dispatchError` function in the catch block of your asynchronous
   operations.

   Let's assume you have the following logic for a Todo app:

   ```ts
   type APIErrorResponse = {
     type: string;
     message: string;
   };

   class DatabaseError extends Error {
     constructor(public detail: APIErrorResponse) {
       super();
     }
   }

   async function createTodo(todo) {
     try {
       await fetch("https://example.com/todo", {
         method: "POST",
         body: JSON.stringify(todo),
       });
     } catch (error) {
       throw new DatabaseError({ detail: error });
     }
   }
   ```

   Then, when you want to handle the form submission and create a new Todo item,
   you can do it like this:

   ```ts
   const form = document.querySelector("form");
   const titleField = document.querySelector("input");
   const descriptionField = document.querySelector("textarea");

   async function handleCreateTodoSubmit(event) {
     event.preventDefault();

     const title = titleField.value;
     const description = descriptionField.value;

     const newTodo = {
       title,
       description,
       completed: false,
     };

     await createTodo(newTodo);
   }

   form.addEventListener("submit", handleCreateTodoSubmit);
   ```

   Add error handling to the `handleCreateTodoSubmit` function like this:

   ```ts
   import { dispatchError } from "@kokomi/event-error";

   async function handleCreateTodoSubmit(event) {
     event.preventDefault();

     try {
       // ...
       await createTodo(newTodo);
     } catch (err) {
       dispatchError(err);
     }
   }
   ```

   This allows you to catch `DatabaseError` when an error occurs during a
   database operation. The `dispatchError` function triggers the `appError` DOM
   event on the `document`, and you can access the `DatabaseError` class via
   `event.detail.error`.

3. Error Handling

   Catch the `appError` event and handle errors accordingly:

   ```ts
   document.addEventListener("appError", (event) => {
     const { error } = event.detail;

     if (error instanceof DatabaseError) {
       const errorDetail = error.detail;

       const errorMessage = errorDetail.message;

       alert(`Database Error!\nMessage: ${errorMessage}`);
     }
   });
   ```

# License

MIT
