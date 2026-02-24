Answers to Questions
1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer: getElementById, getElementsByClassName, and querySelector / querySelectorAll are all used to select elements in the DOM usine JavaScript. But there's littl ediference betwen them. They are:
  1) By using getElementById, we can access a single element with a unique ID. It works first for IDs. It returns 1 element.
  2) By using getElementsByClassName, we can select elements by class name.It returns a live HTMLCollection adnd returns multiple elements.
  3) By using querySelector, we can select single element using a complex CSS selector such as .class, #id, or any valid CSS selector. It is flexible enough to selects the first element that matches a CSS selector. It returns 1 element.
  4) By using querySelectorAll, we can selects all elements that matches a CSS selector. It is a array like object that returns a static NodeList.


2. How do you create and insert a new element into the DOM?

Answer: First we need to create a new HTML element by using- document.createElement(). Then use setAttribute(), textContent, or innerHTML to add attributes or content to the new element. After that, use appendChild(), insertBefore(), or similar methods to insert the new element into an existing element in the DOM.


3. What is Event Bubbling? And how does it work?

Answer: Basically when you click on a button the event goes from the clicked item up to its parent. you can use bubbling to handle event for many elements by listening on a parent insted of every single elements.

How it work:
1) First, the event is fired on the most specific target element (child).
2) The event "bubbles up" from the target element to the root of the document.
3) Event listeners attached to parent elements get triggered as the event bubbles up.


4. What is Event Delegation in JavaScript? Why is it useful?

Answer: Event Delegation is a technique where we can add a single event listener to a parent element instead of attaching an event listener to every individual element like buttons, list items, etc. When an event occurs, the event bubbles up to the parent element, and you can handle the event on the parent by checking which child element was clicked., which it's called delegation. 

How It Works:
When an event is triggered on a child element, it bubbles up to its parent elements (this is called Event Bubbling).
The parent element listens for that event and can act on it, using information from the event like which child element was clicked.

Why is it useful:
1) it is efficient enough educes memory usage, especially when we have many elements.
2) It makes our code cleaner and more maintainable.
3) It is especially useful when you're dynamically generating elements
4) It is flexible for complex scenarios. We can easily check the target of the event and handle it accordingly.


5. What is the difference between preventDefault() and stopPropagation() methods?

Answer: The methods preventDefault() and stopPropagation() are both used to control event behavior in JavaScript, but they are bit diffenret from each other as they serve different purposes.

1. Using preventDefault() prevents the default behavior of an event from occurring. It is commonly used to prevent things like form submission, link navigation, or any other default action associated with an event.

2. Using stopPropagation() stops the event from propagating (bubbling up) to the parent elements in the DOM. It is used to stop an event from reaching other event listeners higher in the DOM (prevents event bubbling or capturing).

You can use both together if you want to prevent the default behavior and stop the event from bubbling up the DOM.

<!-- The End -->