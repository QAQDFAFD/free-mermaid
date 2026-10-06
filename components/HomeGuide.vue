<template>
  <div lang="en" class="border-t border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section id="graph-td-guide" aria-labelledby="graph-td-heading" class="grid gap-8 md:grid-cols-2">
        <div>
          <h2 id="graph-td-heading" class="text-2xl font-bold text-gray-900 dark:text-white">Create a Graph TD diagram online</h2>
          <p class="mt-4 leading-relaxed">
            Mermaid turns text into diagrams. Start with <code>graph TD</code> to arrange a flowchart from top to bottom,
            then describe the steps and the arrows between them. This editor shows a live preview as you edit,
            with no account required.
          </p>
          <ol class="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
            <li>Paste your Mermaid code into the editor, or try the example alongside this guide.</li>
            <li>Change the labels, connect the nodes, and check the preview for syntax errors.</li>
            <li>Choose Export Drawing to download a PNG image or an SVG for your documentation.</li>
          </ol>
          <p class="mt-4 text-sm">
            Need another diagram type?
            <NuxtLink to="/docs" class="text-blue-700 underline dark:text-blue-400">Browse the Mermaid syntax examples</NuxtLink>.
          </p>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white">A decision flowchart you can edit</h3>
          <pre id="graph-td-example" class="mt-3 overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm leading-7 text-gray-900 dark:bg-gray-800 dark:text-gray-100"><code>{{ example }}</code></pre>
          <button type="button" class="mt-4 min-h-[44px] rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" @click="$emit('load-example', example)">
            Try this Graph TD example
          </button>
          <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">Replaces the code currently in the editor.</p>
        </div>
      </section>

      <section aria-labelledby="syntax-heading" class="mt-10 border-t border-gray-200 pt-8 dark:border-gray-700">
        <h2 id="syntax-heading" class="text-xl font-bold text-gray-900 dark:text-white">Graph TD and flowchart TD: what is the difference?</h2>
        <p class="mt-3 leading-relaxed">
          Both <code>graph TD</code> and <code>flowchart TD</code> declare a top-down Mermaid flowchart. Use
          <code>LR</code> instead of <code>TD</code> for a left-to-right layout. In the example above,
          <code>A[Start]</code> creates a rectangular node, <code>B{Ready?}</code> creates a decision diamond,
          and <code>--&gt;|Yes|</code> adds a labeled arrow.
        </p>
        <p class="mt-3 leading-relaxed">
          Paste plain Mermaid source into the editor without Markdown code fences. If a label contains parentheses
          or punctuation, wrap it in quotes, for example <code>A["Review (draft)"]</code>.
          Read the <NuxtLink to="/docs#flowchart" class="text-blue-700 underline dark:text-blue-400">flowchart syntax guide</NuxtLink>
          for more examples.
        </p>
      </section>

      <section aria-labelledby="diagram-guides-heading" class="mt-8">
        <h2 id="diagram-guides-heading" class="text-xl font-bold text-gray-900 dark:text-white">More diagrams and export options</h2>
        <p class="mt-3 leading-relaxed">
          Use sequence diagrams to document messages between services, class diagrams for object relationships,
          and ER diagrams for database models. Export PNG for slides or SVG when you need a scalable image.
          Diagram editing, previewing, and export are available without registration.
        </p>
        <nav aria-label="Diagram examples" class="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-blue-700 underline dark:text-blue-400">
          <NuxtLink v-for="guide in guides" :key="guide.id" :to="`/docs#${guide.id}`" class="py-2">{{ guide.label }}</NuxtLink>
        </nav>
      </section>

      <footer class="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
        <nav aria-label="Footer navigation" class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <button type="button" class="min-h-[44px] text-blue-700 underline dark:text-blue-400" @click="$emit('start-tour')">Start Tutorial</button>
          <NuxtLink v-for="page in pages" :key="page.path" :to="page.path" class="py-3 hover:underline">{{ page.label }}</NuxtLink>
        </nav>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  'load-example': [code: string]
  'start-tour': []
}>()

const example = `graph TD
    A[Start] --> B{Ready?}
    B -->|Yes| C[Create diagram]
    B -->|No| D[Review requirements]
    D --> B
    C --> E[Export SVG or PNG]`

const guides = [
  { id: 'flowchart', label: 'Flowcharts' },
  { id: 'sequence', label: 'Sequence diagrams' },
  { id: 'class', label: 'Class diagrams' },
  { id: 'state', label: 'State diagrams' },
  { id: 'entity', label: 'ER diagrams' },
  { id: 'gantt', label: 'Gantt charts' },
  { id: 'pie', label: 'Pie charts' }
]
const pages = [
  { path: '/about', label: 'About' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact' },
  { path: '/privacy', label: 'Privacy' },
  { path: '/terms', label: 'Terms' }
]
</script>
