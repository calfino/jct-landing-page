export const articles = [
  {
    slug: "javascript-scope-block-vs-function",
    title: "JavaScript Scope: Block vs Function Scope Explained",
    date: "May 10, 2026",
    readTime: "6 min read",
    category: "JavaScript",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    excerpt: "Scope determines where a variable is accessible in your code. Understanding the difference between block scope and function scope — and why it matters — is foundational to writing predictable JavaScript.",
    content: `
Scope is one of those concepts that feels obvious until it bites you. I want to be precise about it here, because the difference between block and function scope has real consequences in production code.

### What is Scope?

Scope is the region of code where a variable is accessible. JavaScript has three kinds: global scope, function scope, and block scope. The distinction between the last two is where most confusion lives.

### Function Scope with var

var is scoped to the nearest enclosing **function**, not to the block it's declared in. This means it leaks out of if statements, for loops, and any other block structure.

\`\`\`javascript
function example() {
  if (true) {
    var x = 10; // scoped to example(), NOT the if-block
  }
  console.log(x); // 10 — accessible here
}
example();
\`\`\`

var is also hoisted — the declaration is lifted to the top of its function with an initial value of undefined. The assignment stays in place.

\`\`\`javascript
function hoistDemo() {
  console.log(msg); // undefined — hoisted, not ReferenceError
  var msg = "hello";
  console.log(msg); // "hello"
}
\`\`\`

This is a frequent source of bugs: you reference a variable before it's assigned and get undefined instead of an error, so the problem silently propagates.

### Block Scope with let and const

let and const are scoped to the nearest enclosing **block** — any pair of curly braces, whether that's an if, for, while, or a plain {} block.

\`\`\`javascript
function example() {
  if (true) {
    let y = 10;
    const z = 20;
  }
  console.log(y); // ReferenceError: y is not defined
  console.log(z); // ReferenceError: z is not defined
}
\`\`\`

let and const are also hoisted, but they're placed in a "temporal dead zone" — accessing them before their declaration throws a ReferenceError rather than returning undefined.

\`\`\`javascript
function tdzDemo() {
  console.log(msg); // ReferenceError — temporal dead zone
  let msg = "hello";
}
\`\`\`

### The Classic Loop Bug

This is the clearest real-world illustration of why the difference matters:

\`\`\`javascript
// With var — all callbacks close over the same i
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3
// By the time the callbacks run, the loop has finished and i is 3
\`\`\`

\`\`\`javascript
// With let — each iteration creates a new binding for i
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2
\`\`\`

The let version works correctly because each iteration of the loop gets its own copy of i in its own block scope. The var version shares one i across all iterations.

### Closures and Scope

Closures are closely related — a function "closes over" variables from its enclosing scope, keeping them alive even after the outer function has returned.

\`\`\`javascript
function makeCounter() {
  let count = 0; // lives in makeCounter's scope
  return function increment() {
    count++;       // closes over count
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
// count is gone from the call stack but kept alive by the closure
\`\`\`

Understanding that closures capture variables by reference — not by value — explains why the var loop bug happens, and why the let version fixes it.

### The Rule of Thumb

Use **const** by default. Use **let** when you need to reassign. Avoid **var** entirely in modern JavaScript — there's no scenario where var is the right choice over let or const.
    `,
  },
  {
    slug: "javascript-cleanup-patterns",
    title: "JavaScript Cleanup Patterns: Listeners, Intervals, and Async",
    date: "May 10, 2026",
    readTime: "7 min read",
    category: "JavaScript",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    excerpt: "Forgetting to clean up event listeners, intervals, and async operations is one of the most common sources of memory leaks and stale callbacks. Here's how to do it right, with concrete examples including React's useEffect.",
    content: `
Cleanup is where production code separates itself from demo code. Forgetting to remove listeners, cancel intervals, or abort fetch requests causes memory leaks, stale state updates, and bugs that are difficult to reproduce. Let me be precise about each case.

### Why Cleanup Matters

When a component unmounts — or when a subscription is no longer needed — any ongoing side effects continue running unless you explicitly stop them. They may try to update state that no longer exists, fire callbacks on removed DOM nodes, or hold references that prevent garbage collection.

### Event Listeners

The critical rule: you can only remove a listener by passing the exact same function reference you used when adding it. Anonymous functions can never be removed.

\`\`\`javascript
// Wrong — this listener can never be removed
window.addEventListener('resize', () => updateLayout());

// Correct — store the reference
function handleResize() {
  updateLayout();
}

window.addEventListener('resize', handleResize);

// Later, when cleanup is needed:
window.removeEventListener('resize', handleResize);
\`\`\`

The same applies to DOM elements:

\`\`\`javascript
const button = document.getElementById('submit');

function handleClick(e) {
  e.preventDefault();
  submitForm();
}

button.addEventListener('click', handleClick);

// Cleanup:
button.removeEventListener('click', handleClick);
\`\`\`

### setInterval and setTimeout

Always capture the return value — it's the ID you need to cancel the timer.

\`\`\`javascript
const intervalId = setInterval(() => {
  pollForUpdates();
}, 3000);

// Stop the interval:
clearInterval(intervalId);

const timeoutId = setTimeout(() => {
  showNotification();
}, 2000);

// Cancel before it fires:
clearTimeout(timeoutId);
\`\`\`

A common mistake is letting an interval run after a modal closes or a component unmounts. The callback keeps firing, may reference stale data, and keeps the surrounding closure alive in memory.

### React useEffect Cleanup

In React, the function returned from useEffect is the cleanup function. It runs before the effect re-executes (when dependencies change) and when the component unmounts.

\`\`\`javascript
useEffect(() => {
  const intervalId = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    clearInterval(intervalId);
    window.removeEventListener('keydown', handleKeyDown);
  };
}, []); // empty deps — runs once on mount, cleans up on unmount
\`\`\`

Without the cleanup return, every time React re-renders and re-runs this effect you'd accumulate a new interval and a new listener on top of the previous ones.

### AbortController for Fetch

Fetch requests don't stop automatically when a component unmounts. If the response arrives after unmount and you try to call setState, React will warn you about a state update on an unmounted component.

\`\`\`javascript
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name === 'AbortError') return; // expected, ignore
      console.error(err);
    });

  return () => controller.abort(); // cancel on unmount
}, []);
\`\`\`

### Observer Cleanup

The same principle applies to IntersectionObserver, MutationObserver, and ResizeObserver:

\`\`\`javascript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setVisible(true);
      });
    },
    { threshold: 0.3 }
  );

  const el = ref.current;
  if (el) observer.observe(el);

  return () => {
    if (el) observer.unobserve(el);
    observer.disconnect();
  };
}, []);
\`\`\`

### The Pattern to Internalize

Every time you add a listener, start a timer, open a connection, or kick off an async operation — ask: where does this end? Write the cleanup at the same time you write the setup. Don't leave it as something to "add later."
    `,
  },
  {
    slug: "state-management-location-rerenders",
    title: "State Management: Where State Lives and How to Control Re-renders",
    date: "May 10, 2026",
    readTime: "8 min read",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    excerpt: "Where you put state matters as much as what's in it. Getting this right prevents unnecessary re-renders, avoids state sync bugs, and keeps your components maintainable. These principles apply across React, Vue, Angular, and Svelte.",
    content: `
State management is one of those topics where the right answer is usually simpler than what people reach for. The core mistake is hoisting state higher than necessary, which causes components to re-render when they have no reason to. Let me walk through the principles precisely.

### Colocate State as Close as Possible

The first principle: **state should live as close to where it's used as possible**. Don't lift state to a parent or global store just because it feels safer or more organized.

\`\`\`javascript
// Unnecessary — isOpen only affects Modal, not Page
function Page() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

// Better — Modal owns its own open state
function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open</button>
      {isOpen && <div className="modal">...</div>}
    </div>
  );
}
\`\`\`

When state is colocated, only the component that owns it re-renders on change. When it's unnecessarily hoisted, every render of the parent re-renders all children, even those that don't read the state.

### Derived State Instead of Synced State

A common anti-pattern is storing derived values as separate state that you keep in sync with a useEffect. This creates a second source of truth and introduces sync bugs.

\`\`\`javascript
// Anti-pattern — filteredItems is derived from items and filter
// but stored as its own state, requiring a sync effect
const [items, setItems] = useState([]);
const [filter, setFilter] = useState('');
const [filteredItems, setFilteredItems] = useState([]);

useEffect(() => {
  setFilteredItems(items.filter(item => item.name.includes(filter)));
}, [items, filter]);

// Better — compute it directly, no state, no sync
const [items, setItems] = useState([]);
const [filter, setFilter] = useState('');

const filteredItems = useMemo(
  () => items.filter(item => item.name.includes(filter)),
  [items, filter]
);
\`\`\`

The rule: **if a value can be computed from existing state or props, don't store it in state.** Compute it during render or memoize it.

### Controlling Re-renders

**Split state into smaller pieces**

One large state object where any field change triggers a full re-render is worse than multiple smaller pieces.

\`\`\`javascript
// Every keystroke in name re-renders everything reading this state
const [form, setForm] = useState({ name: '', email: '', bio: '' });

// Better — independent state for fields that update independently
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [bio, setBio] = useState('');
\`\`\`

**Stabilize function references with useCallback**

When you pass a callback as a prop to a child, a new function reference is created on every render, which can cause the child to re-render even if nothing meaningful changed.

\`\`\`javascript
// handleSubmit is recreated every render — child always re-renders
function Form({ onSubmit }) {
  const handleSubmit = (data) => {
    validate(data);
    onSubmit(data);
  };
  return <ExpensiveChild onSubmit={handleSubmit} />;
}

// Stable reference — only recreates when onSubmit changes
function Form({ onSubmit }) {
  const handleSubmit = useCallback((data) => {
    validate(data);
    onSubmit(data);
  }, [onSubmit]);
  return <ExpensiveChild onSubmit={handleSubmit} />;
}
\`\`\`

**Memoize expensive computations with useMemo**

\`\`\`javascript
// Recomputed on every render, even unrelated ones
const sortedList = items.sort((a, b) => a.score - b.score);

// Only recomputed when items changes
const sortedList = useMemo(
  () => [...items].sort((a, b) => a.score - b.score),
  [items]
);
\`\`\`

### Where State Should Live: A Framework-Agnostic Model

These categories apply whether you're in React, Vue, Angular, or Svelte:

- **Local component state** — UI state that only affects one component: open/closed, hover, active tab, form inputs. Keep it local.

- **Shared component state** — state used by a few sibling or cousin components. Lift to the nearest common ancestor, no further.

- **Server/async state** — data fetched from an API. This has its own lifecycle: loading, error, stale, refetch. Use a dedicated tool for it (React Query, SWR, TanStack Query, Pinia) rather than putting it in your general state store.

- **Global application state** — auth session, theme preference, shopping cart, notifications. Put this in a global store or context, but only once you've confirmed it truly needs to be global.

\`\`\`javascript
// A clean separation using React Query for server state
// and local state for UI state

function ProductPage({ productId }) {
  // Server state — React Query handles caching, refetch, loading
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
  });

  // UI state — local, no global store needed
  const [activeTab, setActiveTab] = useState('details');

  if (isLoading) return <Spinner />;
  return (
    <div>
      <Tabs active={activeTab} onChange={setActiveTab} />
      <TabContent tab={activeTab} product={product} />
    </div>
  );
}
\`\`\`

### The Mental Model

Before adding state, ask: does this value need to trigger a re-render? If not, use a ref. Does it need to be shared? If not, keep it local. Can it be derived? If so, don't store it. Getting these three questions right handles the majority of state-related bugs.
    `,
  },
  {
    slug: "code-quality-interview-production",
    title: "Writing Code That Meets Interview and Production Standards",
    date: "May 10, 2026",
    readTime: "6 min read",
    category: "Best Practices",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    excerpt: "A technically correct solution that logs debug output, ignores edge cases, or mismatches the expected output format misses the standard that actually matters. Three concrete things that elevate code quality in both interviews and production.",
    content: `
A working solution and a good solution are not the same thing. I've seen — and written — code that produces the right answer for the happy path but falls apart under real conditions. Here are three specific areas that make the difference.

### 1. Strict Adherence to Input/Output Requirements

Read the spec twice. If a function is expected to return an array, it must always return an array — not undefined, not null, not a string when the input is empty. Inconsistent return types are a downstream bug waiting to happen.

\`\`\`javascript
// Bad — returns undefined when input is empty
function getInitials(fullName) {
  if (!fullName) return;
  return fullName
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('');
}

// Good — consistent return type, contract is clear
function getInitials(fullName) {
  if (typeof fullName !== 'string' || !fullName.trim()) return '';
  return fullName
    .trim()
    .split(/\s+/)
    .map(word => word[0].toUpperCase())
    .join('');
}
\`\`\`

The improved version handles null, undefined, empty strings, and extra whitespace — all real inputs that will appear in production even if they're not in the test cases.

**Check edge cases explicitly:**

\`\`\`javascript
// What does your function do with:
getInitials(null)        // should not throw
getInitials('')          // should return ''
getInitials('  ')        // should return '' not ' '
getInitials('Johannes Calvin Tjahaja') // should return 'JCT'
\`\`\`

### 2. Remove Debug Logs Before Submitting

console.log statements in submitted or production code signal incomplete work. They expose internal state to the browser console, can leak sensitive data, and slow down performance at scale.

\`\`\`javascript
// Bad — debug logs left in
function calculateTotal(items) {
  console.log('items:', items);
  const total = items.reduce((sum, item) => {
    console.log('processing:', item);
    return sum + item.price * item.quantity;
  }, 0);
  console.log('total:', total);
  return total;
}

// Good — clean output
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
\`\`\`

Use a proper debugger during development. In the browser: DevTools breakpoints. In Node: the --inspect flag with your IDE's debugger. These give you full variable inspection without leaving artifacts in the code.

### 3. Basic Input Validation at System Boundaries

The key word is **boundaries** — function inputs from external sources, API responses, user-submitted data. You shouldn't defensively validate every internal function call (that becomes noise), but you must protect the edges.

\`\`\`javascript
// Bad — crashes with an unclear error when called with bad input
function processOrder(order) {
  const total = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { orderId: order.id, total };
}

// processOrder(null)      → TypeError: Cannot read properties of null
// processOrder({})        → TypeError: Cannot read properties of undefined (items)
// processOrder({items:[]}) → returns { orderId: undefined, total: 0 }
\`\`\`

\`\`\`javascript
// Good — validates at the boundary, fails loudly and clearly
function processOrder(order) {
  if (!order || typeof order !== 'object') {
    throw new TypeError('processOrder: order must be an object');
  }
  if (typeof order.id !== 'string' || !order.id) {
    throw new Error('processOrder: order.id must be a non-empty string');
  }
  if (!Array.isArray(order.items) || order.items.length === 0) {
    throw new Error('processOrder: order.items must be a non-empty array');
  }

  const total = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { orderId: order.id, total };
}
\`\`\`

The error messages tell you exactly what's wrong and where. That's hours saved in debugging.

**API response validation example:**

\`\`\`javascript
async function fetchUser(userId) {
  if (!userId) throw new Error('fetchUser: userId is required');

  const res = await fetch(\`/api/users/\${userId}\`);

  if (!res.ok) {
    throw new Error(\`fetchUser: request failed with status \${res.status}\`);
  }

  const data = await res.json();

  if (!data || !data.id || !data.email) {
    throw new Error('fetchUser: unexpected response shape');
  }

  return data;
}
\`\`\`

### Putting It Together

A solution that handles edge cases, produces a consistent output type, and has no debug noise is immediately distinguishable from one that doesn't — in both interviews and code review. These aren't special techniques, they're habits. The difference is whether you've internalized them as defaults.
    `,
  },
  {
    slug: "future-of-frontend",
    title: "The Future of Frontend: Server Components in React 19",
    date: "April 5, 2026",
    readTime: "8 min read",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    excerpt: "React 19 brings a paradigm shift with React Server Components (RSC). In this article, we dive deep into how RSCs work under the hood and why they drastically improve loading speeds and SEO.",
    content: `
React Server Components (RSCs) introduce an entirely new mental model for building React applications. In traditional React architectures, rendering primarily happens entirely on the client-side or is server-side rendered (SSR) once and then hydrated. RSCs allow you to stream components directly from the server to the client without sending the corresponding JavaScript bundle.

### Why is this a game changer?

1. **Zero Bundle Size Impact**: Server components never get shipped to the browser, significantly reducing the amount of JavaScript your application requires to become interactive.
2. **Direct Backend Access**: You can query databases or access file systems directly from your React components without setting up API endpoints or using tools like getServerSideProps.
3. **Automatic Code Splitting**: RSCs handle code splitting natively by only sending the client components the browser actually needs to render.

### Implementation Example

Wait until you see how simple data fetching looks now:

\`\`\`tsx
import db from './database';

// Note: This only runs on the Server!
export default async function UserList() {
  const users = await db.query('SELECT * FROM users');

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

The industry is moving rapidly toward this pattern. If you want to keep your React skills razor-sharp, mastering Server Components isn't just an option anymore—it's a requirement.
    `,
  },
  {
    slug: "migrating-legacy-systems",
    title: "Migrating Legacy Systems to the Cloud: A Network Engineer's Perspective",
    date: "March 22, 2026",
    readTime: "12 min read",
    category: "Cloud Architecture",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    excerpt: "Moving massive data center environments into AWS and GCP poses unique routing and load balancing challenges. Here are the key microservice strategies I've learned working at the enterprise level.",
    content: `
Migrating from on-premise hardware to the cloud is a colossal undertaking. While developers focus on application code, network engineers have the heavy burden of ensuring the migration doesn't cripple the organization's routing infrastructure.

### The Problem With Lift and Shift

A common mistake is "lifting and shifting," which essentially means taking a VM from the physical server and dropping it into an EC2 instance without redesigning the architecture. This generally leads to enormous costs and sub-optimal network routing because cloud platforms operate differently underneath the hood than physical hypervisors.

### Load Balancing at Scale

In a traditional data center, hardware load balancers rule the roost. In AWS or GCP, you have to embrace Application Load Balancers (ALBs) or Network Load Balancers (NLBs) depending on OSI layers.

- Use **ALB** for Layer 7 web traffic (HTTP/HTTPS) where you need path-based routing.
- Use **NLB** for Layer 4 protocols (TCP/UDP) when low latency and high throughput are absolutely required.

### Incorporating Service Meshes

At the enterprise level, migrating monolithic structures into microservices causes exponential increases in inter-service communication. Utilizing a Service Mesh like **Istio** paired with Kubernetes clusters provides intelligent routing, security policies, and observability features right out of the box.

The migration process is a marathon, not a sprint. Setting up the virtual networking layer (VPCs, Subnets, Transit Gateways) correctly the first time will save countless hours of headaches later.
    `,
  },
  {
    slug: "typescript-generics",
    title: "Demystifying TypeScript Generics for Better Type Safety",
    date: "February 15, 2026",
    readTime: "6 min read",
    category: "TypeScript",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    excerpt: "Generics can seem intimidating at first, but they are the secret to writing scalable, reusable TypeScript. Let's break down practical, real-world generic patterns you can use today.",
    content: `
Generics are one of the most powerful—but often misunderstood—features of TypeScript. They allow you to write reusable and highly flexible code while preserving strict type validation.

### Understanding the Basics

Think of generics as "variables for types." Just like functions take variables as arguments, types and interfaces can take types as arguments.

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

// x is inferred as a number
const x = identity(10);
// y is inferred as a string
const y = identity("hello");
\`\`\`

### Practical Use Case: API Responses

If you are dealing with API responses, you shouldn't create a completely different type for every single API endpoint. Instead, create a generic wrapper response type.

\`\`\`typescript
interface ApiResponse<Data> {
  status: number;
  success: boolean;
  message?: string;
  data: Data;
}

interface User {
  id: string;
  username: string;
}

// Fetch user data
function fetchUser(): Promise<ApiResponse<User>> { ... }
\`\`\`

By mastering these generic constraints, your codebase will become immensely more robust, predicting edge cases efficiently at compile time.
    `,
  },
];
