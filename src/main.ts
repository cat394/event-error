/**
 * Dispatches an error as a custom `appError` event.
 * This function triggers a custom event named `appError` with the error details.
 *
 * @param {Error} error - The error object to be dispatched.
 *
 * @example
 * import { dispatchError } from "@kokomi/event-error";
 *
 * async function createTodo(todo) {
 *     try {
 *         await fetch('https://example.com/todo', {
 *             method: "POST",
 *             body: JSON.stringify(todo)
 *         });
 *     } catch(err) {
 *         throw new DatabaseError(err);
 *     }
 * }
 *
 * async function handleCreateTodoSubmit(event) {
 *     event.preventDefault();
 *
 *     try {
 *         await createTodo(todo);
 *     } catch(err) {
 *         dispatchError(err);
 *     }
 * }
 *
 * // Error Handling
 * document.addEventListener('appError', (event) => {
 *     const { error } = event.detail;
 *
 *     if (error instanceof DatabaseError) {
 *         alert('An error occurred during a database operation.');
 *     }
 * });
 */
export function dispatchError(error: Error): void {
	const event = new CustomEvent('appError', { detail: { error } });
	document.dispatchEvent(event);
}
