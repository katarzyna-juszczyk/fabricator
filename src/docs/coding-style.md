### CSS Guidelines

High-level advice and guidelines for writing sane, manageable, scalable CSS based on http://cssguidelin.es/

#### Contents

*   [Goals](#goals)
*   [Syntax and Formatting](#syntax-and-formatting)
*   [Commenting](#commenting)
*   [Naming Conventions](#naming-conventions)
*   [CSS Selectors](#css-selectors)
*   [Specificity](#specificity)
*   [Architectural Principles](#architectural-principles)

* * *

#### Goals <a id="goals"></a>

This document is intended (among other things) to help:
*   keep stylesheets maintainable;
*   keep code transparent, sane, and readable;
*   keep stylesheets scalable.
*   set the standard for code quality across a codebase;
*   promote consistency across codebases;
*   give developers a feeling of familiarity across codebases;
*   increase productivity.

* * *

#### Syntax and Formatting <a id="syntax-and-formatting"></a>

At a very high-level, we want
*   tab indents;
*   multi-line CSS;
*   meaningful use of whitespace;
*   multiple files concatenated during a build step



##### Table of Contents

An up-to-date table of contents provides a single, canonical catalogue of what is in a CSS project, what it does, and in what order. For example:

```css
    /**
     * CONTENTS
     *
     * SETTINGS
     * Global...............Globally-available variables and config.
     *
     * TOOLS
     * Mixins...............Useful mixins.
     *
     * GENERIC
     * Normalize.css........A level playing field.
     * Box-sizing...........Better default `box-sizing`.
     *
     * BASE
     * Headings.............H1–H6 styles.
     *
     * OBJECTS
     * Wrappers.............Wrapping and constraining elements.
     *
     * COMPONENTS
     * Page-head............The main page header.
     * Page-foot............The main page footer.
     * Buttons..............Button elements.
     *
     * TRUMPS
     * Text.................Text helpers.
     */
```


##### Titling

Begin every new major section of a CSS project with a title:

```css
    /*------------------------------------*\
        #SECTION-TITLE
    \*------------------------------------*/

    .selector {}
```
Leave a carriage return between this title and the next line of code.

If you are working on a project where each section is its own file, this title should appear at the top of each one. If you are working on a project with multiple sections per file, each title should be preceded by five (5) carriage returns.

```css
    /*------------------------------------*\
        #A-SECTION
    \*------------------------------------*/

    .selector {}





    /*------------------------------------*\
        #ANOTHER-SECTION
    \*------------------------------------*/

    /**
     * Comment
     */

    .another-selector {}
```


##### Anatomy of a Ruleset
```css
    .foo, .foo--bar,
    .baz {
        display: block;
        background-color: green;
        color: red;
    }
```
As you can see, we what we have here is:

*   related selectors on the same line; unrelated selectors on new lines;
*   a space before our opening brace (`{`);
*   properties and values on the same line;
*   a space after our property–value delimiting colon (`:`);
*   each declaration on its own new line;
*   the opening brace (`{`) on the same line as our last selector;
*   our first declaration on a new line after our opening brace (`{`);
*   our closing brace (`}`) on its own new line;
*   each declaration indented by tab;
*   a trailing semi-colon (`;`) on our last declaration.


##### Multi-line CSS

CSS should be written across multiple lines, except in very specific circumstances. Exceptions to this rule should be fairly apparent, such as similar rulesets that only carry one declaration each, for example:
```css
    .icon--home     { background-position:   0     0  ; }
    .icon--person   { background-position: -16px   0  ; }
    .icon--files    { background-position:   0   -16px; }
    .icon--settings { background-position: -16px -16px; }

```

##### Indenting Sass

When indenting Sass, we stick to the same one tab, and we also leave a blank line before and after the nested ruleset.

_Nesting in Sass should be avoided wherever possible._

##### Alignment

Attempt to align common and related identical strings in declarations, for example:
```css
    .foo {
        -webkit-border-radius: 3px;
           -moz-border-radius: 3px;
                border-radius: 3px;
    }

    .bar {
        position: absolute;
        top:    0;
        right:  0;
        bottom: 0;
        left:   0;
        margin-right: -10px;
        margin-left:  -10px;
        padding-right: 10px;
        padding-left:  10px;
    }

```
This makes life a little easier for developers whose text editors support column editing, allowing them to change several identical and aligned lines in one go.

##### Meaningful Whitespace

As well as indentation, we can provide a lot of information through liberal and judicious use of whitespace between rulesets. We use:

*   One (1) empty line between closely related rulesets.
*   Two (2) empty lines between loosely related rulesets.
*   Five (5) empty lines between entirely new sections.

##### HTML

Always quote attributes, even if they would work without.
``` html
    <div class="box">
```

As with our rulesets, it is possible to use meaningful whitespace in your HTML. You can denote thematic breaks in content with five (5) empty lines, for example:

``` html
    <header class="page-head">
        ...
    </header>






    <main class="page-content">
        ...
    </main>





    <footer class="page-foot">
        ...
    </footer>
```

Separate independent but loosely related snippets of markup with a single empty line, for example:
``` html
    <ul class="primary-nav">

        <li class="primary-nav__item">
            <a href="/" class="primary-nav__link">Home</a>
        </li>

        <li class="primary-nav__item  primary-nav__trigger">
            <a href="/about" class="primary-nav__link">About</a>

            <ul class="primary-nav__sub-nav">
                <li><a href="/about/products">Products</a></li>
                <li><a href="/about/company">Company</a></li>
            </ul>

        </li>

        <li class="primary-nav__item">
            <a href="/contact" class="primary-nav__link">Contact</a>
        </li>

    </ul>
```



* * *

#### Commenting <a id="commenting"></a>

Comment anything that isn’t immediately obvious from the code alone.

##### High-level

For large comments that document entire sections or components, we use multi-line comment.

```css
   /**
     * The site’s main page-head can have two different states:
     *
     * 1) Regular page-head with no backgrounds or extra treatments; it just
     *    contains the logo and nav.
     * 2) A masthead that has a fluid-height (becoming fixed after a certain point)
     *    which has a large background image, and some supporting text.
     *
     * The regular page-head is incredibly simple, but the masthead version has some
     * slightly intermingled dependency with the wrapper that lives inside it.
     */
```
This level of detail should be the norm for all non-trivial code—descriptions of states, permutations, conditions, and treatments.

##### Low-level

Oftentimes we want to comment on specific declarations (i.e. lines) in a ruleset. To do this we use a kind of reverse footnote. Here is a more complex comment detailing the larger site headers mentioned above:
```css
    /**
     * Large site headers act more like mastheads. They have a faux-fluid-height
     * which is controlled by the wrapping element inside it.
     *
     * 1\. Mastheads will typically have dark backgrounds, so we need to make sure
     *    the contrast is okay. This value is subject to change as the background
     *    image changes.
     * 2\. We need to delegate a lot of the masthead’s layout to its wrapper element
     *    rather than the masthead itself: it is to this wrapper that most things
     *    are positioned.
     * 3\. The wrapper needs positioning context for us to lay our nav and masthead
     *    text in.
     * 4\. Faux-fluid-height technique: simply create the illusion of fluid height by
     *    creating space via a percentage padding, and then position everything over
     *    the top of that. This percentage gives us a 16:9 ratio.
     * 5\. When the viewport is at 758px wide, our 16:9 ratio means that the masthead
     *    is currently rendered at 480px high. Let’s…
     * 6\. …seamlessly snip off the fluid feature at this height, and…
     * 7\. …fix the height at 480px. This means that we should see no jumps in height
     *    as the masthead moves from fluid to fixed. This actual value takes into
     *    account the padding and the top border on the header itself.
     */

    .page-head--masthead {
        margin-bottom: 0;
        background: url(/img/css/masthead.jpg) center center #2e2620;
        @include vendor(background-size, cover);
        color: $color-masthead; /* [1] */
        border-top-color: $color-masthead;
        border-bottom-width: 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) inset;

        @include media-query(lap-and-up) {
            background-image: url(/img/css/masthead-medium.jpg);
        }

        @include media-query(desk) {
            background-image: url(/img/css/masthead-large.jpg);
        }

        > .wrapper { /* [2] */
            position: relative; /* [3] */
            padding-top: 56.25%; /* [4] */

            @media screen and (min-width: 758px) { /* [5] */
                padding-top: 0; /* [6] */
                height: $header-max-height - double($spacing-unit) - $header-border-width; /* [7] */
            }

        }

    }
```


##### Preprocessor Comments

With most—if not all—preprocessors, we have the option to write comments that will not get compiled out into our resulting CSS file. As a rule, use these comments to document code that would not get written out to that CSS file either. If you are documenting code which will get compiled, use comments that will compile also. For example, this is correct:

```css
    // Dimensions of the @2x image sprite:
    $sprite-width:  920px;
    $sprite-height: 212px;

    /**
     * 1\. Default icon size is 16px.
     * 2\. Squash down the retina sprite to display at the correct size.
     */
    .sprite {
        width:  16px; /* [1] */
        height: 16px; /* [1] */
        background-image: url(/img/sprites/main.png);
        background-size: ($sprite-width / 2 ) ($sprite-height / 2); /* [2] */
    }
```

* * *

#### Naming Conventions <a id="naming-conventions"></a>

A good naming convention will tell you and your team

*   what type of thing a class does;
*   where a class can be used;
*   what (else) a class might be related to.

We use: hyphen (`-`) delimited strings, with BEM-like naming for more complex pieces of code.


###### Hyphen Delimited

All strings in classes are delimited with a hyphen (`-`), like so:

    .page-head {}

    .sub-content {}

###### BEM-like Naming

For larger, more interrelated pieces of UI that require a number of classes, we use a BEM-like naming convention.

BEM splits components’ classes into three groups:

*   Block: The sole root of the component.
*   Element: A component part of the Block.
*   Modifier: A variant or extension of the Block.

To take an analogy (note, not an example):
```css
    .person {}
    .person__head {}
    .person--tall {}
```
Elements are delimited with two (2) underscores (`__`), and Modifiers are delimited by two (2) hyphens (`--`).

Here we can see that `.person {}` is the Block; it is the sole root of a discrete entity. `.person__head {}` is an Element; it is a smaller part of the `.person {}` Block. Finally, `.person--tall {}` is a Modifier; it is a specific variant of the `.person {}` Block.

###### Starting Context

Your Block context starts at the most logical, self-contained, discrete location. To continue with our person-based analogy, we’d not have a class like `.room__person {}`, as the room is another, much higher context. We’d probably have separate Blocks.

If we did want to denote a `.person {}` inside a `.room {}`, it is more correct to use a selector like `.room .person {}` which bridges two Blocks than it is to increase the scope of existing Blocks and Elements.


###### More Layers

If we were to add another Element—called, let’s say, `.person__eye {}`—to this `.person {}` component, we would not need to step through every layer of the DOM. That is to say, the correct notation would be `.person__eye {}`, and not `.person__head__eye {}`. Your classes do not reflect the full paper-trail of the DOM.

###### Modifying Elements

You can have variants of Elements, and these can be denoted in a number of ways depending on how and why they are being modified. Carrying on with our person example, a blue eye might look like this:

    .person__eye--blue {}

Here we can see we’re directly modifying the eye Element.

Things can get more complex, however. Please excuse the crude analogy, and let’s imagine we have a face Element that is handsome. The person themselves isn’t that handsome, so we modify the face Element directly—a handsome face on a regular person:

    .person__face--handsome {}

But what if that person _is_ handsome, and we want to style their face because of that fact? A regular face on a handsome person:

    .person--handsome .person__face {}

Here is one of a few occasions where we’d use a descendant selector to modify an Element based on a Modifier on the Block.

If using Sass, we would likely write this like so:

```css
    .person {}

    .person__face {

        .person--handsome & {}

    }

    .person--handsome {}
```
Note that we do not nest a new instance of `.person__face {}` inside of `.person--handsome {}`; instead, we make use of Sass’ parent selectors to prepend `.person--handsome` onto the existing `.person__face {}` selector. This means that all of our `.person__face {}`-related rules exist in once place, and aren’t spread throughout the file. This is general good practice when dealing with nested code: keep all of your context (e.g. all `.person__face {}` code) encapsulated in one location.


###### JavaScript Hooks

Use classes prepended with `js-`, for example:

    <input type="submit" class="btn  js-btn" value="Follow" />

This means that we can have an element elsewhere which can carry with style of `.btn {}`, but without the behaviour of `.js-btn`.


* * *

#### CSS Selectors <a id="css-selectors"></a>

##### Selector Intent

 _your selectors should be as explicit and well reasoned as your reason for wanting to select something._


##### Location Independence

Given the ever-changing nature of most UI projects, and the move to more component-based architectures, it is in our interests not to style things based on where they are, but on _what_ they are. That is to say, our components’ styling should not be reliant upon where we place them—they should remain entirely location independent.

 _A component shouldn’t have to live in a certain place to look a certain way._



##### Quasi-Qualified Selectors

One thing that qualified selectors can be useful for is signalling where a class might be expected or intended to be used, for example:

```css
    ul.nav {}
```
Here we can see that the `.nav` class is meant to be used on a `ul` element, and not on a `nav`. By using _quasi-qualified selectors_ we can still provide that information without actually qualifying the selector:

```css
    /*ul*/.nav {}
```

By commenting out the leading element, we can still leave it to be read, but avoid qualifying and increasing the specificity of the selector.

##### Naming
Pick a name that is sensible, but somewhat ambiguous: aim for high reusability. For example, instead of a class like `.site-nav`, choose something like `.primary-nav`; rather than `.footer-links`, favour a class like `.sub-links`.

_Using a class name to describe content is redundant because content describes itself._

```css
    /**
     * Runs the risk of becoming out of date; not very maintainable.
     */
    .blue {
        color: blue;
    }

    /**
     * Depends on location in order to be rendered properly.
     */
    .header span {
        color: blue;
    }

    /**
     * Too specific; limits our ability to reuse.
     */
    .header-color {
        color: blue;
    }

    /**
     * Nicely abstracted, very portable, doesn’t risk becoming out of date.
     */
    .highlight-color {
        color: blue;
    }
```

It is important to strike a balance between names that do not literally describe the style that the class brings, but also ones that do not explicitly describe specific use cases. Instead of `.home-page-panel`, choose `.masthead`; instead of `.site-nav`, favour `.primary-nav`; instead of `.btn-login`, opt for `.btn-primary`.

##### General Rules

Your selectors are fundamental to writing good CSS. To very briefly sum up the above sections:

*   **Select what you want explicitly**, rather than relying on circumstance or coincidence. Good Selector Intent will rein in the reach and leak of your styles.
*   **Write selectors for reusability**, so that you can work more efficiently and reduce waste and repetition.
*   **Do not nest selectors unnecessarily**, because this will increase specificity and affect where else you can use your styles.
*   **Do not qualify selectors unnecessarily**, as this will impact the number of different elements you can apply styles to.
*   **Keep selectors as short as possible**, in order to keep specificity down and performance up.

* * *

#### Specificity <a id="specificity"></a>

##### Keep It Low at All Times

Simple changes to the way we work include, but are not limited to,

*   not using IDs in your CSS;
*   not nesting selectors when possible;
*   not qualifying classes;
*   not chaining selectors;
*   Only use `!important` proactively, not reactively.

_Specificity can be wrangled and understood, but it is safer just to avoid it entirely._

****

##### Hacking Specificity

In the event that you need to increase the specificity of a class selector use a safe hack that will not impact this component’s portability: we can chain that class with itself:

    .site-nav.site-nav {}

This chaining doubles the specificity of the selector, but does not introduce any dependency on location.

In the event that we do, for whatever reason, have an ID in our markup that we cannot replace with a class, select it via an attribute selector as opposed to an ID selector. For example, let’s imagine we have embedded a third-party widget on our page. We can style the widget via the markup that it outputs, but we have no ability to edit that markup ourselves:

    <div id="third-party-widget">
        ...
    </div>

Even though we know not to use IDs in CSS, what other option do we have? We want to style this HTML but have no access to it, and all it has on it is an ID.

We do this:

    [id="third-party-widget"] {}

Here we are selecting based on an attribute rather than an ID, and attribute selectors have the same specificity as a class. This allows us to style based on an ID, but without introducing its specificity.


* * *

### Architectural Principles <a id="architectural-principles"></a>

At a very high-level, your architecture should help you

*   provide a consistent and sane environment;
*   accommodate change;
*   grow and scale your codebase;
*   promote reuse and efficiency;
*   increase productivity.

Typically, this will mean a class-based and componentised architecture, split up into manageable modules, probably using a preprocessor. Of course, there is far more to an architecture than that, so let’s look at some principles…

#### Object-orientation

_Object-orientation_ is a programming paradigm that breaks larger programs up into smaller, in(ter)dependent objects that all have their own roles and responsibilities. From Wikipedia:

> Object-oriented programming (OOP) is a programming paradigm that represents the concept of ‘objects’ […] which are usually instances of classes, [and] are used to interact with one another to design applications and computer programs.

When applied to CSS, we call it object-oriented CSS, or _OOCSS_.

Structural aspects can be thought of like skeletons; common, recurring frames that provide design-free constructs known as _objects_ and _abstractions_. Objects and abstractions are simple design patterns that are devoid of any cosmetics; we abstract out the shared structural traits from a series of components into a generic object.

Skin is a layer that we (optionally) add to our structure in order to give objects and abstractions a specific look-and-feel. Let’s look at an example:
```css
    /**
     * A simple, design-free button object. Extend this object with a `.btn--*` skin
     * class.
     */
    .btn {
        display: inline-block;
        padding: 1em 2em;
        vertical-align: middle;
    }

    /**
     * Positive buttons’ skin. Extends `.btn`.
     */
    .btn--positive {
        background-color: green;
        color: white;
    }

    /**
     * Negative buttons’ skin. Extends `.btn`.
     */
    .btn--negative {
        background-color: red;
        color: white;
    }
```
Above, we can see how the `.btn {}` class simply provides structural styling to an element, and doesn’t concern itself with any cosmetics. We supplement the `.btn {}` object with a second class, such as `.btn--negative {}` in order to give that DOM node specific cosmetics.

Favour the multiple-class approach over using something like `@extend`: using multiple classes in your markup—as opposed to wrapping the classes up into one using a preprocessor.

Whenever you are building a UI component, try and see if you can break it into two parts: one for structural styles (paddings, layout, etc.) and another for skin (colours, typefaces, etc.).


#### The Single Responsibility Principle

The _single responsibility principle_ is a paradigm that, very loosely, states that all pieces of code (in our case, classes) should focus on doing one thing and one thing only. More formally:

> …the single responsibility principle states that every context (class, function, variable, etc.) should have a single responsibility, and that responsibility should be entirely encapsulated by the context.

Good example:
```css
    .box {
        display: block;
        padding: 10px;
    }

    .message {
        border-style: solid;
        border-width: 1px 0;
        font-weight: bold;
    }

    .message--error {
        background-color: #fee;
        color: #f00;
    }

    .message--success {
        background-color: #efe;
        color: #0f0;
    }
```

#### The Open/Closed Principle

> [s]oftware entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.

Any additions, new functionality, or features we add to our classes should be added via _extension_—we should not modify these classes directly.

Let’s take an example:
```css
    .box {
        display: block;
        padding: 10px;
    }

    .box--large {
        padding: 20px;
    }
```

#### DRY

> [e]very piece of knowledge must have a single, unambiguous, authoritative representation within a system.

The key isn’t to avoid all repetition, but to normalise and abstract _meaningful_ repetition. If two things happen to share the same declarations coincidentally, then we needn’t DRY anything out; that repetition is purely circumstantial and cannot be shared or abstracted.
In short, only DRY code that is actually, thematically related. Do not try to reduce purely coincidental repetition: **duplication is better than the wrong abstraction**.

#### Composition over Inheritance

We created a complete UI component by composing a number of much smaller and unrelated objects.
