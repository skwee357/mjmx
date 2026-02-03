# mjmx

<p align="center">
    <code>mjmx</code> is a JSX runtime to generate <a href="https://mjml.io/" target="_blank">mjml</a> strings.
    <br/><br/>
    <b>No dependency on react</b>
</p>

<div align="center">
    <a href="https://codecov.io/gh/skwee357/mjmx">
        <img src="https://codecov.io/gh/skwee357/mjmx/branch/main/graph/badge.svg" alt="codecov">
    </a>
</div>

> This project was developed with the help of [Claude Code](https://claude.ai/).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [`render(mjml, options?)`](#rendermjml-options)
  - [`serialize(node)`](#serializenode)
  - [Render Options](#render-options)
- [Note on `mj-include`](#note-on-mj-include)
- [Strict Types](#strict-types)
- [Motivation](#motivation)
- [Why there is no preview server?](#why-there-is-no-preview-server)
- [License](#license)

## Installation

```bash
npm install @mjmx/core
```

## Usage

Configure your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@mjmx/core"
  }
}
```

Or use the pragma comment:

```tsx
/** @jsxImportSource @mjmx/core */
```

### Example

```tsx
import { render } from '@mjmx/core';

const Email = ({ name }: { name: string }) => (
  <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-text font-size="20px" color="#333">
            Hello {name}!
          </mj-text>
          <mj-button href="https://example.com">Click me</mj-button>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
);

const { html, errors } = render(<Email name="World" />);
```

## API

### `render(mjml, options?)`

Renders an MJML node or string to HTML.

```tsx
const { html, errors } = render(<mjml>...</mjml>);
```

### `serialize(node)`

Converts an MJML AST node to an MJML XML string.

```tsx
const mjmlString = serialize(<mjml>...</mjml>);
```

### Render Options

Options are passed directly to `mjml2html`:

```tsx
render(email, {
  validationLevel: 'strict' | 'soft' | 'skip',
  // ...
});
```

## Note on `mj-include`

The `mj-include` tag is supported, but is often redundant when using JSX since you can compose components directly:

```tsx
// Instead of mj-include, just use JSX composition
const Header = () => <mj-section>...</mj-section>;
const Email = () => (
  <mjml>
    <mj-body>
      <Header />
    </mj-body>
  </mjml>
);
```

If you do use `mj-include`, ensure the `path` attribute points to a valid file path that will be resolvable when `mjml2html` processes the output. Paths are relative to the working directory where the MJML renderer is invoked, not relative to your source files.

## Strict Types

Attributes use template literal types for better autocomplete:

```tsx
// CSS units
<mj-text font-size="16px" padding="10px 20px">

// Colors
<mj-section background-color="#f4f4f4">

// Percentages for widths
<mj-column width="50%">
```

## Motivation

There is [react.email](https://react.email/) and [mjml-react](https://github.com/Faire/mjml-react).
The first one, reimplement email HTML logic from scratch, rather than relying on a battle tested `mjml` library.
But more importantly, both `react.email` and `mjml-react` depend on `react` and `react-dom` for no obvious reason.

`mjmx` takes a different approach, no dependency on React at all, instead implementing its own AST and JSX Runtime.
It's a perfect companion library for someone who uses server rendered templates with something like [@kitajs/html](https://github.com/kitajs/html).
And in fact, `mjmx` was inspired by `@kitajs/html`.

Under the hood, it's pure string manipulation.
So a code like this:

```jsx
const node = <mj-text font-size="16px">Hello</mj-text>;
console.log(serialize(node));
```

Will simply output

```text
<mj-text font-size="16px">Hello</mj-text>
```

The alternative is to use `mjml` directly, with something like `handlebars` for light templating.
With the `mjml` CLI you will be able to compile `.hbs.mjml` MJML files into `.hbs` HTML files during CI/CD, hence saving the runtime evaluation and parsing of MJML.
Then, you will load the compiled HTML + handlebars template, and compile it into a JS function.
Handlebars templates are pretty fast.
This setup will eliminate the need to depend on mjml, or evaluating mjml template in runtime.
However, you will lose:

1. Fast iteration - you will have to compile templates ahead of time, or setup a watch process to make sure your backend is reloaded when templates change
2. Type safety - while `mjml` is able to compile and validate templates, there is no way to generate type-safe handlebars calls, so if you mistype a variable, handlebars will either throw an error if running in strict mode, or will simply render an empty string
3. Complex logic - writing complex handlebars logic inside mjml files is... cumbersome

It's up to you to decide what trade-offs you want.

I used to roll with mjml+handlebars for years, but as I value type-safety and faster iteration, I decided to build this library to complement my usage of `@kitajs/html` with a similar tool, without pulling react dependencies.

## Why there is no preview server?

Being able to preview your emails is a must.
We all hate the `Hello {{valuedCustomer}}` type of emails.
However, making a dev server with preview endpoint that will satisfy everyone, is a complicated task.
For starters, you need to deal with things like subject or what props to pass.
Sure, you could hard-code some preview props, like Ruby on Rails does, but everyone probably have a different setup for that.
And then, you get into territory like `i18n`.

It's impossible to get this right for every use-case, so I think it's better you implement one yourself.
My preview server is about 300 lines of code, and with LLMs, you can generate it with one comprehensive prompt.
So I prefer to keep this library lean, and focus only on generating mjml from JSX, without all other nonsense.

I am, however, open to PRs, and might consider it.

## License

MIT
