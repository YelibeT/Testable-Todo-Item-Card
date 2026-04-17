 Todo Card- HNG Frontend Task Stage 1

This project is an accessible and responsive Todo Card component built using HTML, CSS, and JavaScript. It demonstrates core fundamentals core frontend concepts including semantic HTML, DOM manipulation, and interactive UI behavior.

Stage 1a transforms the stage 0 todo card into a dynamic and stateful component.
What changed:
1. Edit functionality: stage 1a introduced a full edit form that replaces the view mode upon interaction.
2. Interactive status: updated the status of the task with dropdown to sync "Done", "Pending" and "In Progress" states.
3. Dynamic logic: Updated the hard coded due date to JavaScript-driven state with real-time calculations for overdue status and time remaining.

Design Decisions
1. Priority visuals: to add color bar on the left.
2. Let user select the due date of the task

Accessibility Notes

The time remaining container has a feature that helps screen readers. It uses something called aria-live so that screen readers can tell users when time is running out or if something is overdue. This happens without interrupting what the user is doing.
There are expansion controls that help users see information. These controls use codes like aria-expanded and aria-controls. This means that when you click a button to see more it will show you the information.

When you go into edit mode the title box is ready for you to type in.
When you save or cancel the computer puts the focus back on the edit button. This is done so you do not get confused and end up at the top of the page.
The overdue status is not a color. It also has text that says "Overdue" so people who have trouble seeing colors can understand it.
