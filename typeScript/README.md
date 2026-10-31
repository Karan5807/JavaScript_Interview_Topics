# 🟦 TypeScript Interview Preparation

A practical guide to TypeScript concepts commonly covered in JavaScript and Node.js developer interviews. It moves from fundamentals to advanced type-system features and includes frequently asked interview questions with concise answers and examples.

> **Important:** TypeScript is a statically checked superset of JavaScript. Its types are checked during development/build time and are erased when JavaScript is emitted. TypeScript does not introduce a separate runtime or change how the JavaScript event loop works.

## Table of Contents

- [1. TypeScript Fundamentals](#1-typescript-fundamentals)
- [2. Types and Type Composition](#2-types-and-type-composition)
- [3. Functions, Objects, and Classes](#3-functions-objects-and-classes)
- [4. Generics](#4-generics)
- [5. Type Narrowing and Type Guards](#5-type-narrowing-and-type-guards)
- [6. Advanced TypeScript](#6-advanced-typescript)
- [7. Modules, Configuration, and Tooling](#7-modules-configuration-and-tooling)
- [8. TypeScript for Node.js Backend Development](#8-typescript-for-nodejs-backend-development)
- [9. Important TypeScript Interview Questions and Answers](#9-important-typescript-interview-questions-and-answers)
- [10. Coding Questions to Practise](#10-coding-questions-to-practise)
- [11. Quick Revision Checklist](#11-quick-revision-checklist)

---

## 1. TypeScript Fundamentals

### What is TypeScript?

TypeScript is an open-source programming language developed by Microsoft. It adds a static type system and other development-time features to JavaScript. TypeScript code is compiled or transpiled into JavaScript, which runs in a JavaScript runtime such as Node.js or a browser.

### Why use TypeScript?

- Detect many type-related mistakes before running the application.
- Improve editor autocomplete, navigation, and refactoring.
- Make function contracts and data structures easier to understand.
- Make large codebases easier to maintain.
- Improve collaboration by documenting expected inputs and outputs in code.

### JavaScript vs TypeScript

| JavaScript | TypeScript |
|---|---|
| Dynamically typed | Adds static type checking |
| Type errors often appear at runtime | Many type errors can be caught before runtime |
| Types are not part of the language syntax | Supports annotations, interfaces, generics, and more |
| Runs directly in supported JS runtimes | Usually needs compilation/transpilation or a TypeScript-aware runtime/tool |
| Flexible for quick scripting | Helpful for maintainable, larger applications |

### A first example

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

const message = greet("Karan");
// greet(42); // Type error
```

The `string` annotation tells TypeScript what type of value the function accepts and returns.

### Type inference

TypeScript can infer a type from an initial value, so annotations are not required everywhere.

```ts
let count = 10;       // inferred as number
const username = "Karan"; // inferred as the literal type "Karan"

count = 20;
// count = "twenty"; // Type error
```

### Basic types

```ts
let title: string = "TypeScript";
let age: number = 25;
let isActive: boolean = true;
let ids: number[] = [1, 2, 3];
let names: Array<string> = ["Asha", "Ravi"];
let details: [string, number] = ["Karan", 25]; // tuple
let value: unknown = "hello";
let nothing: null = null;
let notAssigned: undefined = undefined;
```

Common types include `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`, arrays, tuples, objects, unions, intersections, and function types.

### `any`, `unknown`, and `never`

```ts
let flexible: any = "hello";
flexible.toUpperCase(); // allowed, but may fail at runtime

let safeValue: unknown = "hello";
if (typeof safeValue === "string") {
  safeValue.toUpperCase(); // safe after narrowing
}

function fail(message: string): never {
  throw new Error(message);
}
```

- `any`: disables most type checking for that value. Avoid it unless you have a good reason.
- `unknown`: accepts any value, but requires checking or narrowing before use.
- `never`: represents a value that cannot occur, such as a function that never returns or an impossible branch.

---

## 2. Types and Type Composition

### Type aliases

Use `type` to give a name to a type. It can describe primitives, unions, intersections, object shapes, tuples, and more.

```ts
type UserId = string;
type Status = "pending" | "active" | "blocked";

type User = {
  id: UserId;
  name: string;
  status: Status;
};
```

### Interfaces

An interface describes the shape of an object and can be extended or implemented by classes.

```ts
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
}
```

### `interface` vs `type`

| `interface` | `type` |
|---|---|
| Commonly used to describe object contracts | Can describe objects and almost any other type expression |
| Can be extended with `extends` | Can combine types with intersections (`&`) |
| Supports declaration merging | Does not support interface-style declaration merging |
| Often a natural choice for public object APIs | Often useful for unions, tuples, and utility compositions |

Both are valid for many object shapes. Choose consistently; there is no universal rule that one is always better.

### Union types (`|`)

A value can be one of several types.

```ts
type Id = string | number;

function printId(id: Id): void {
  console.log(id);
}
```

### Intersection types (`&`)

An intersection combines requirements from multiple types.

```ts
type HasName = { name: string };
type HasEmail = { email: string };
type Contact = HasName & HasEmail;

const contact: Contact = {
  name: "Karan",
  email: "karan@example.com",
};
```

### Literal types

Literal types restrict a value to specific known values.

```ts
type Direction = "north" | "south" | "east" | "west";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
```

### Optional and readonly properties

```ts
interface Product {
  readonly id: string;
  name: string;
  description?: string;
}

const product: Product = { id: "p-1", name: "Keyboard" };
// product.id = "p-2"; // Error: readonly property
```

`readonly` prevents reassignment through that typed reference. It does not automatically deep-freeze nested objects at runtime.

---

## 3. Functions, Objects, and Classes

### Function parameter and return types

```ts
function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;
```

### Optional and default parameters

```ts
function welcome(name: string, greeting = "Hello", punctuation?: string): string {
  return `${greeting}, ${name}${punctuation ?? "!"}`;
}

welcome("Karan");
welcome("Karan", "Welcome", ".");
```

An optional parameter must be supplied after required parameters. A default parameter can be omitted because it has a default value.

### Function types

```ts
type Calculator = (a: number, b: number) => number;

const subtract: Calculator = (a, b) => a - b;
```

### Classes, access modifiers, and inheritance

```ts
class UserAccount {
  constructor(
    public readonly id: string,
    private passwordHash: string,
    protected role: string,
  ) {}

  public getRole(): string {
    return this.role;
  }
}

class AdminAccount extends UserAccount {
  canManageUsers(): boolean {
    return this.role === "admin";
  }
}
```

- `public`: accessible from anywhere (the default for class members).
- `private`: accessible only within the declaring class under TypeScript's type checking.
- `protected`: accessible within the declaring class and subclasses.
- `readonly`: prevents reassignment after initialization.

TypeScript's `private` is primarily a compile-time restriction. JavaScript's `#private` fields provide runtime-enforced private fields.

### Abstract classes and interfaces

```ts
interface Repository<T> {
  findById(id: string): Promise<T | null>;
}

abstract class BaseService {
  abstract getName(): string;

  log(message: string): void {
    console.log(`[${this.getName()}] ${message}`);
  }
}
```

An interface defines a contract. An abstract class can define both required methods and shared implementation/state.

### Enums

```ts
enum OrderStatus {
  Pending = "PENDING",
  Paid = "PAID",
  Cancelled = "CANCELLED",
}
```

String literal unions are also a common alternative when a runtime enum object is unnecessary:

```ts
type OrderStatusValue = "PENDING" | "PAID" | "CANCELLED";
```

---

## 4. Generics

Generics allow reusable code to preserve information about the types passed into it.

### Generic function

```ts
function identity<T>(value: T): T {
  return value;
}

const result = identity<string>("hello");
const numberResult = identity(123); // T inferred as number
```

### Generic interface

```ts
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

type UserResponse = ApiResponse<{ id: string; name: string }>;
```

### Generic constraints

Use `extends` to limit the types a generic can accept.

```ts
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength("TypeScript");
getLength([1, 2, 3]);
// getLength(123); // Error: number has no length property
```

### Generic classes

```ts
class Store<T> {
  constructor(private items: T[] = []) {}

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return [...this.items];
  }
}

const userStore = new Store<{ id: string; name: string }>();
```

---

## 5. Type Narrowing and Type Guards

Type narrowing means reducing a broad type to a more specific type using runtime checks.

### `typeof`

```ts
function format(value: string | number): string {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.toUpperCase();
}
```

### `in` operator

```ts
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function makeSound(animal: Cat | Dog): void {
  if ("meow" in animal) animal.meow();
  else animal.bark();
}
```

### `instanceof`

```ts
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "An unknown error occurred";
}
```

### Custom type predicates

```ts
interface User {
  id: string;
  name: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string" &&
    "name" in value &&
    typeof value.name === "string"
  );
}
```

A type predicate (`value is User`) tells the compiler what has been validated. The runtime checks must genuinely establish that shape; the annotation itself does not validate data.

### Discriminated unions

```ts
type ApiResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string };

function handleResult<T>(result: ApiResult<T>): void {
  if (result.status === "success") {
    console.log(result.data);
  } else {
    console.error(result.error);
  }
}
```

Discriminated unions are especially useful for API results, application state, and event types.

---

## 6. Advanced TypeScript

### Type assertions

A type assertion tells the compiler to treat a value as a particular type. It does not convert or validate the value at runtime.

```ts
const input = document.querySelector("input") as HTMLInputElement;
console.log(input.value);
```

Prefer narrowing or validation where possible. Avoid using assertions to silence errors without checking the data.

### `keyof` and `typeof`

```ts
interface User {
  id: string;
  name: string;
}

type UserKey = keyof User; // "id" | "name"
const settings = { retries: 3, enabled: true };
type Settings = typeof settings;
```

- `keyof` produces a union of an object's keys.
- `typeof` in a type position obtains the type of a value.

### Indexed access types

```ts
interface User {
  id: string;
  name: string;
}

type UserName = User["name"]; // string
```

### Utility types

TypeScript provides built-in utility types for common transformations.

```ts
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

type CreateUserInput = Omit<User, "id">;
type UserPreview = Pick<User, "id" | "name">;
type PartialUser = Partial<User>;
type RequiredUser = Required<PartialUser>;
type ReadonlyUser = Readonly<User>;
type UserDictionary = Record<string, User>;
type UserWithoutEmail = Omit<User, "email">;
```

Frequently used utilities:

| Utility | Purpose |
|---|---|
| `Partial<T>` | Makes every property optional |
| `Required<T>` | Makes every property required |
| `Readonly<T>` | Makes properties readonly |
| `Pick<T, K>` | Selects a set of properties |
| `Omit<T, K>` | Excludes a set of properties |
| `Record<K, V>` | Creates an object type with keys `K` and values `V` |
| `Exclude<T, U>` | Removes members assignable to `U` from a union |
| `Extract<T, U>` | Keeps members assignable to `U` |
| `NonNullable<T>` | Removes `null` and `undefined` |
| `ReturnType<F>` | Gets a function's return type |
| `Parameters<F>` | Gets a function's parameter types as a tuple |
| `Awaited<T>` | Recursively unwraps the type produced by `await` |

### Conditional types

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

### Mapped types

```ts
type Optional<T> = {
  [K in keyof T]?: T[K];
};
```

A mapped type iterates over keys of an existing type and transforms its properties.

### Template literal types

```ts
type EventName = "user" | "order";
type EventCreated = `${EventName}:created`;
// "user:created" | "order:created"
```

### `as const`

```ts
const roles = ["admin", "editor", "viewer"] as const;
type Role = (typeof roles)[number];
// "admin" | "editor" | "viewer"
```

`as const` preserves literal values and makes object properties/array elements readonly in the inferred type.

### `satisfies`

```ts
type Config = { port: number; mode: "development" | "production" };

const config = {
  port: 3000,
  mode: "development",
} satisfies Config;
```

`satisfies` checks that an expression conforms to a type while retaining a more specific inferred type than a broad annotation may retain.

### Function overloads

```ts
function parse(value: string): string[];
function parse(value: number): number[];
function parse(value: string | number): string[] | number[] {
  if (typeof value === "string") return value.split("");
  return [value];
}
```

Overloads provide multiple call signatures for one implementation. The implementation signature must support all overload cases.

### Declaration files (`.d.ts`)

Declaration files describe the types of JavaScript code without providing its implementation. They are used by libraries and tools to expose type information.

```ts
declare function createUser(name: string): { id: string; name: string };
```

---

## 7. Modules, Configuration, and Tooling

### Imports and exports

```ts
// user.ts
export interface User {
  id: string;
  name: string;
}

export function getUserName(user: User): string {
  return user.name;
}

// app.ts
import { getUserName, type User } from "./user";
```

`import type` and `export type` make type-only dependencies explicit. Type-only imports are removed from emitted JavaScript when appropriate.

### Important `tsconfig.json` options

A project configuration commonly contains options like these. Adjust module settings to match the Node.js version, package configuration, and build tool used by the project.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

Key options:

- `strict`: enables the strict family of type-checking options.
- `noImplicitAny`: reports values that would otherwise receive an implicit `any` type.
- `strictNullChecks`: treats `null` and `undefined` as distinct types that must be handled.
- `target`: controls the JavaScript language version emitted by the compiler.
- `module` and `moduleResolution`: control module output and how imports are resolved.
- `rootDir` and `outDir`: define source and emitted-code directories.
- `esModuleInterop`: improves compatibility with certain CommonJS module import patterns.
- `skipLibCheck`: skips checking declaration files; it does not skip checking your application code.

### Useful commands

```bash
# Install TypeScript as a development dependency
npm install --save-dev typescript

# Create a tsconfig.json
npx tsc --init

# Type-check a project without emitting JavaScript
npx tsc --noEmit

# Compile using the project configuration
npx tsc

# Watch for changes
npx tsc --watch
```

A development runner or bundler may execute TypeScript through a separate tool. Do not assume that `tsc` is necessarily the tool executing the application.

---

## 8. TypeScript for Node.js Backend Development

TypeScript is commonly used in Node.js APIs to make request/response contracts, service boundaries, and database operations clearer. It does not validate incoming HTTP data automatically; runtime validation is still required.

### Typing an Express handler

```ts
import type { Request, Response, NextFunction } from "express";

interface CreateUserBody {
  name: string;
  email: string;
}

export function createUser(
  req: Request<{}, {}, CreateUserBody>,
  res: Response,
  next: NextFunction,
): void {
  try {
    const { name, email } = req.body;
    res.status(201).json({ message: "User created", user: { name, email } });
  } catch (error) {
    next(error);
  }
}
```

This provides compile-time types for the handler. It does **not** prove that a client actually sent a valid `name` and `email`. Validate untrusted input at runtime with a schema validator or explicit checks.

### Typing an asynchronous service

```ts
interface User {
  id: string;
  name: string;
}

async function findUserById(id: string): Promise<User | null> {
  // Replace this placeholder with a database query.
  return id === "1" ? { id: "1", name: "Karan" } : null;
}
```

### Handling errors as `unknown`

```ts
try {
  await doSomething();
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("Unexpected error", error);
  }
}
```

### Environment variables

Node.js environment variables are strings or undefined. Convert and validate them instead of assuming they already have the desired type.

```ts
const portValue = process.env.PORT ?? "3000";
const port = Number(portValue);

if (!Number.isInteger(port) || port <= 0) {
  throw new Error("PORT must be a positive integer");
}
```

### Backend best practices

- Enable `strict` mode and fix type errors rather than weakening the configuration.
- Keep request DTOs, domain models, and database models conceptually separate when their responsibilities differ.
- Validate request bodies, query parameters, environment variables, and external API responses at runtime.
- Prefer `unknown` over `any` at untrusted boundaries.
- Use `Promise<T>` to describe asynchronous return values.
- Use discriminated unions for predictable success/error outcomes.
- Avoid overusing type assertions and non-null assertions (`!`).
- Keep shared types close to the feature or domain that owns them.

---

## 9. Important TypeScript Interview Questions and Answers

### Fundamentals

**1. What is TypeScript, and why is it used?**

TypeScript is JavaScript with a static type system and additional compile-time language features. It helps detect many mistakes early and improves tooling, readability, and maintainability. It ultimately emits JavaScript for execution.

**2. Is TypeScript a programming language or a framework?**

It is a programming language and a superset of JavaScript, not a framework. It can be used with frameworks such as Express, NestJS, React, and Angular.

**3. Does TypeScript run directly in the browser or Node.js?**

Browsers and Node.js execute JavaScript. TypeScript is generally compiled/transpiled to JavaScript, although some development tools and runtimes can execute TypeScript source through their own support.

**4. What happens to TypeScript types after compilation?**

Most TypeScript-only type annotations and constructs are erased from the emitted JavaScript. Runtime JavaScript values remain; type annotations do not perform runtime validation.

**5. What is type inference?**

Type inference is when TypeScript determines a variable, parameter, or expression type from its context or value, reducing the need for explicit annotations.

**6. What is the difference between `any` and `unknown`?**

Both can hold values of any type. `any` largely disables type checking, while `unknown` requires a type check or assertion before the value can be used as a specific type. Prefer `unknown` for untrusted data.

**7. What is the difference between `void` and `never`?**

`void` usually describes a function that does not return a useful value. `never` describes a function that cannot complete normally or a value that cannot exist in a particular type position.

**8. What is the difference between `null` and `undefined` in TypeScript?**

They are separate values and, with `strictNullChecks` enabled, separate types. A value that may be absent should be declared and handled explicitly, for example `string | null`.

### Types and object modelling

**9. What is the difference between `type` and `interface`?**

Both can describe object shapes. Interfaces support declaration merging and `extends`; type aliases can represent unions, intersections, tuples, primitives, and more. Pick based on the modelling need and team convention.

**10. What is the difference between union and intersection types?**

A union (`A | B`) means a value may satisfy either type. An intersection (`A & B`) means a value must satisfy both types at once.

**11. What are literal types?**

They restrict values to exact literals, such as `"pending" | "success" | "failed"`, rather than allowing every string.

**12. What is structural typing?**

TypeScript generally checks compatibility by comparing the members and shapes of types rather than requiring values to come from a particular named class or declaration.

**13. What are optional and readonly properties?**

An optional property, marked with `?`, may be absent. A `readonly` property cannot be reassigned through the typed reference after initialization. Neither feature automatically adds runtime validation or deep immutability.

**14. What is a tuple?**

A tuple is an array type with a known position and type for each element, for example `[string, number]`.

### Functions and object-oriented TypeScript

**15. What are optional and default parameters?**

Optional parameters use `?` and may be omitted. Default parameters provide a fallback value when the caller passes `undefined` or omits the argument.

**16. What are function overloads?**

Overloads allow one function to expose multiple call signatures for different input patterns. A single implementation must handle all declared overload cases.

**17. Explain `public`, `private`, and `protected`.**

`public` members are accessible everywhere; `private` members are restricted to the declaring class by TypeScript's type checker; `protected` members are accessible in the class and its subclasses. JavaScript `#private` fields provide runtime privacy.

**18. What is the difference between an interface and an abstract class?**

An interface defines a type contract. An abstract class can define a contract and also provide shared implementation, fields, and constructor behavior.

**19. Can an interface extend another interface?**

Yes. For example, `interface Admin extends User { permissions: string[] }` adds members to the base contract.

### Generics and advanced types

**20. What are generics?**

Generics let functions, interfaces, and classes work with multiple types while preserving the relationship between input and output types. A generic function such as `identity<T>(value: T): T` returns the same type it receives.

**21. What is a generic constraint?**

A constraint limits the types accepted by a generic, often using `T extends SomeType`. It lets the implementation safely access the required members.

**22. What is `keyof`?**

`keyof` creates a union of the property keys of a type. For `{ id: string; name: string }`, the result is `"id" | "name"`.

**23. What are utility types?**

Utility types are built-in generic types that transform existing types. Common examples are `Partial`, `Required`, `Pick`, `Omit`, `Record`, `Readonly`, `Exclude`, and `ReturnType`.

**24. What are mapped types?**

Mapped types build a new type by iterating over the keys of an existing type, often changing property modifiers or value types.

**25. What are conditional types?**

Conditional types choose a type based on whether one type extends another, using the form `T extends U ? X : Y`.

**26. What is the `infer` keyword?**

`infer` introduces a type variable inside a conditional type so TypeScript can extract part of another type. For example, `type Unwrap<T> = T extends Promise<infer U> ? U : T` extracts a promise's resolved type.

**27. What is the difference between `as` and `satisfies`?**

`as` is a type assertion: it asks the compiler to treat an expression as a type and does not validate it at runtime. `satisfies` checks compatibility while preserving the expression's more specific inferred type.

**28. What is a discriminated union?**

It is a union whose members share a property with different literal values. Checking that property lets TypeScript narrow the value to the matching member.

### Runtime, async, and backend questions

**29. Does TypeScript change how promises or the event loop work?**

No. Promises, `async`/`await`, and the event loop are JavaScript runtime features. TypeScript can describe their types—for example, `Promise<User>`—but it does not create a different asynchronous execution model.

**30. How do you type an asynchronous function?**

Use `async` and annotate its resolved value through `Promise<T>`, such as `async function getUser(): Promise<User>`. An async function always returns a promise.

**31. How should errors in a `catch` block be typed?**

Treat the caught value as `unknown`, then narrow it with checks such as `error instanceof Error`. Do not assume every thrown value is an `Error` instance.

**32. Does TypeScript validate Express request data at runtime?**

No. Types for `Request` and request bodies help during development, but HTTP input is external data. Validate it at runtime before trusting or using it.

**33. How do you type an API response?**

Define a response shape or generic, such as `interface ApiResponse<T> { data: T; success: boolean }`, and use a concrete type like `ApiResponse<User>`. Validate data received from external systems at runtime.

**34. What is `tsconfig.json`?**

It is the TypeScript project configuration file. It controls compiler behavior, strictness, module resolution, target output, source inclusion, and emitted-file locations.

**35. What does `strict: true` do?**

It enables a group of strict type-checking options, including `noImplicitAny` and `strictNullChecks`. It helps catch more issues but may require more precise annotations and null handling.

**36. What are declaration (`.d.ts`) files?**

They contain type declarations for JavaScript code or libraries. They describe available APIs to the TypeScript compiler without containing the implementation.

**37. What is the difference between compile-time and runtime errors?**

Compile-time errors are reported by tools such as the TypeScript compiler before execution. Runtime errors occur while the JavaScript program is running. TypeScript catches many type mismatches but cannot prevent every runtime failure.

**38. How would you avoid using `any` in a backend project?**

Use domain types, generics, `unknown` at untrusted boundaries, runtime validation, and properly typed library definitions. If a temporary `any` is unavoidable, isolate it and document why.

---

## 10. Coding Questions to Practise

Try writing each solution without looking at the answer first, then explain the type decisions aloud.

### 1. Create a generic API response type

```ts
// Expected shape: { data: T; success: boolean; message?: string }
// Write a reusable ApiResponse<T> type or interface.
```

### 2. Create a safe function for string or number IDs

```ts
function formatId(id: string | number): string {
  // Return strings unchanged and numbers with an "ID-" prefix.
  // Narrow the union before using type-specific behavior.
  return typeof id === "number" ? `ID-${id}` : id;
}
```

### 3. Implement a generic repository contract

```ts
interface Repository<T, ID> {
  findById(id: ID): Promise<T | null>;
  create(value: Omit<T, "id">): Promise<T>;
  delete(id: ID): Promise<boolean>;
}
```

For a real project, adjust the `create` input type to match the entity's actual creation rules rather than assuming every entity has an `id` field.

### 4. Model an API result with a discriminated union

```ts
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; message: string };

function unwrap<T>(result: Result<T>): T {
  if (result.ok) return result.value;
  throw new Error(result.message);
}
```

### 5. Write a custom type guard

Create an `isUser(value: unknown): value is User` function that checks the required `id` and `name` properties at runtime.

### 6. Use utility types for create and update inputs

Given a `User` type, create:

- `CreateUserInput`: all fields except the generated `id`.
- `UpdateUserInput`: all editable fields optional, but keep `id` out.

One possible approach:

```ts
type CreateUserInput = Omit<User, "id">;
type UpdateUserInput = Partial<CreateUserInput>;
```

### 7. Extract a promise's resolved type

```ts
type PromiseValue<T> = T extends Promise<infer U> ? U : T;
```

Explain what `infer U` captures and test the type with `Promise<string>` and `number`.

---

## 11. Quick Revision Checklist

Before an interview, make sure you can explain and code examples for:

- [ ] TypeScript vs JavaScript; compile time vs runtime.
- [ ] Type inference and primitive types.
- [ ] `any`, `unknown`, `never`, `void`, `null`, and `undefined`.
- [ ] `type` vs `interface`; union vs intersection.
- [ ] Optional, readonly, literal, tuple, and function types.
- [ ] Classes, access modifiers, inheritance, and abstract classes.
- [ ] Generics and generic constraints.
- [ ] Type narrowing, type guards, and discriminated unions.
- [ ] `keyof`, `typeof`, indexed access, and utility types.
- [ ] Conditional, mapped, and template literal types.
- [ ] Type assertions, `as const`, and `satisfies`.
- [ ] `Promise<T>`, `async`/`await`, and error handling.
- [ ] `tsconfig.json`, strict mode, modules, and declaration files.
- [ ] Runtime validation of API inputs and environment variables.

## Suggested Study Order

1. Learn the fundamentals, inference, and basic types.
2. Practise object types, unions, interfaces, and functions.
3. Study generics and type narrowing.
4. Learn utility and advanced types after the basics are comfortable.
5. Apply TypeScript to a small Node.js REST API with validation, services, repositories, and tests.
6. Practise answering the questions in Section 9 aloud and solve the exercises in Section 10.

---

**Interview tip:** Do not just memorise definitions. For each concept, prepare a small code example, explain the problem it solves, and mention one practical use case from a Node.js backend application.
