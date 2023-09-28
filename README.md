# React + TypeScript + Vite

```js
   To get started

   cd into the this enclosing directory
   npm i (or npm install / yarn install)
   npm run dev

   ...bob's your father's brother
```

Notes

- I'd have componetized more items given more time - rather than bundle everything into one app.js and one index.css file

- There's a couple of quick fixes in the css for some simple alignment - not exactly production ready

- Given the simplicity of the task I decided not to go down the SCSS/SASS route

- I would've added a modal where the two browser 'alerts' apppear had I had more time. TBH the whole styling could look a lot better with that time...

- I've commented out the 'Allowed Type' filter as I couldn't figure what was actually needed here - the brief had a couple of things I wasn't sure about - such as the registrations (not mentioned in the Vehicle class/model but is a filter?)

- I've added comments on the main parts of the hook functions as well as a few areas that I needed to highlight for myself.

- I'd prefer the 'App.tsx' to be much cleaner and import more components (as I did with the Inspections.tsx component) - but even breaking down every interactive element into a FC function component/splitting out the data as an import - I simply ran out of time.

- There is one glitch I'm aware of (but going round in circles here) - by default when the page loads there are two items that have inspections - one car with one insp and a lorry with two insps. If you double click the car and remove the inspection is behaves as is expected. If you double click the lorry with the two inspections and try to remove one - the count stay the same - double click it again and you'll see that it partially worked - there's only one inspection listed but it's still labelled with 2 items. Delete the remaining and it's fine. It's beaten me so far and I'm beat ¯\_(ツ)_/¯

- lastly - sorry for the essay!

