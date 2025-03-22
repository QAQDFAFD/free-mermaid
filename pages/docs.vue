<template>
	<div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
		<div class="container mx-auto px-4 py-8 flex-grow">
			<div class="mb-8">
				<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ $t('docs.title') }}</h1>
				<p class="text-gray-600 dark:text-gray-300">
					{{ $t('docs.subtitle') }}
				</p>
				<div class="mt-4">
					<NuxtLink to="/" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 mr-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
						{{ $t('docs.backToEditor') }}
					</NuxtLink>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<!-- Flowchart -->
				<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
					<div class="p-6">
						<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
							{{ $t('tools.flowchart') }}
						</h2>
						<div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
							<pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
graph TD
    A[Start] --> B{Logged in?}
    B -->|Yes| C[Show Homepage]
    B -->|No| D[Show Login Page]
    C --> E[End]
    D --> E</pre
							>
						</div>
						<div class="text-sm text-gray-700 dark:text-gray-300">
							<p class="mb-2">
								<strong>{{ $t('docs.basicSyntax') }}:</strong>
							</p>
							<ul class="list-disc pl-5 space-y-1">
								<li><code>graph TD</code> defines a top-down graph (TD = Top Down)</li>
								<li><code>A[Text]</code> creates a rectangular node</li>
								<li><code>B{Text}</code> creates a diamond node (condition)</li>
								<li><code>--></code> creates an arrow connection</li>
								<li><code>-->|Text|</code> creates a labeled arrow</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Sequence Diagram -->
				<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
					<div class="p-6">
						<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Sequence Diagram</h2>
						<div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
							<pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
sequenceDiagram
    participant User
    participant System
    participant Database
    
    User->>System: Login Request
    System->>Database: Verify Credentials
    Database-->>System: Verification Result
    System-->>User: Login Response</pre
							>
						</div>
						<div class="text-sm text-gray-700 dark:text-gray-300">
							<p class="mb-2"><strong>Basic Syntax:</strong></p>
							<ul class="list-disc pl-5 space-y-1">
								<li><code>sequenceDiagram</code> defines a sequence diagram</li>
								<li><code>participant Name</code> defines a participant</li>
								<li><code>A->>B: Text</code> creates a solid arrow for synchronous messages</li>
								<li>
									<code>A-->>B: Text</code> creates a dashed arrow for return/asynchronous messages
								</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Class Diagram -->
				<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
					<div class="p-6">
						<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Class Diagram</h2>
						<div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
							<pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
classDiagram
    class Animal {
      +String name
      +makeSound()
    }
    class Dog {
      +fetch()
    }
    class Cat {
      +scratch()
    }
    Animal <|-- Dog
    Animal <|-- Cat</pre
							>
						</div>
						<div class="text-sm text-gray-700 dark:text-gray-300">
							<p class="mb-2"><strong>Basic Syntax:</strong></p>
							<ul class="list-disc pl-5 space-y-1">
								<li><code>classDiagram</code> defines a class diagram</li>
								<li><code>class ClassName {}</code> defines a class with properties/methods</li>
								<li><code>+</code> indicates public properties/methods</li>
								<li><code>-</code> indicates private properties/methods</li>
								<li><code>A <|-- B</code> indicates B inherits from A</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- State Diagram -->
				<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
					<div class="p-6">
						<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">State Diagram</h2>
						<div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
							<pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
stateDiagram-v2
    [*] --> Pending
    Pending --> Processing: Start Processing
    Processing --> Completed: Complete Processing
    Processing --> Cancelled: Cancel
    Completed --> [*]
    Cancelled --> [*]</pre
							>
						</div>
						<div class="text-sm text-gray-700 dark:text-gray-300">
							<p class="mb-2"><strong>Basic Syntax:</strong></p>
							<ul class="list-disc pl-5 space-y-1">
								<li><code>stateDiagram-v2</code> defines a state diagram</li>
								<li><code>[*]</code> represents the start or end state</li>
								<li><code>A --> B</code> creates a transition from A to B</li>
								<li><code>A --> B: Text</code> creates a labeled transition</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Entity Relationship Diagram -->
				<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
					<div class="p-6">
						<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
							Entity Relationship Diagram
						</h2>
						<div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
							<pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses</pre
							>
						</div>
						<div class="text-sm text-gray-700 dark:text-gray-300">
							<p class="mb-2"><strong>Basic Syntax:</strong></p>
							<ul class="list-disc pl-5 space-y-1">
								<li><code>erDiagram</code> defines an entity relationship diagram</li>
								<li><code>||--o{</code> represents a one-to-many relationship</li>
								<li><code>||--|{</code> represents a one-to-many (mandatory) relationship</li>
								<li><code>}|..|{</code> represents a many-to-many relationship (dashed line)</li>
								<li><code>: Text</code> defines the relationship description</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Gantt Chart -->
				<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
					<div class="p-6">
						<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Gantt Chart</h2>
						<div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
							<pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
gantt
    title Project Development Plan
    dateFormat YYYY-MM-DD
    section Design Phase
    Requirements Analysis     :done, des1, 2023-01-01, 2023-01-05
    Prototype Design     :active, des2, 2023-01-06, 3d
    section Development Phase
    Coding        :dev1, after des2, 20d
    Testing        :dev2, after dev1, 10d</pre
							>
						</div>
						<div class="text-sm text-gray-700 dark:text-gray-300">
							<p class="mb-2"><strong>Basic Syntax:</strong></p>
							<ul class="list-disc pl-5 space-y-1">
								<li><code>gantt</code> defines a Gantt chart</li>
								<li><code>title Title</code> sets the chart title</li>
								<li><code>dateFormat Format</code> sets the date format</li>
								<li><code>section Name</code> defines a project section</li>
								<li><code>Task Name: ID, Start Date, Duration/End Date</code></li>
								<li><code>done/active</code> indicates task status</li>
								<li><code>after ID</code> indicates after another task</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Pie Chart -->
				<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
					<div class="p-6">
						<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Pie Chart</h2>
						<div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
							<pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
pie title Traffic Sources
    "Search Engines" : 42.7
    "Direct Access" : 25.5
    "Social Media" : 18.3
    "Other Channels" : 13.5</pre
							>
						</div>
						<div class="text-sm text-gray-700 dark:text-gray-300">
							<p class="mb-2"><strong>Basic Syntax:</strong></p>
							<ul class="list-disc pl-5 space-y-1">
								<li><code>pie</code> defines a pie chart</li>
								<li><code>title Title</code> sets the pie chart title</li>
								<li><code>"Label" : Value</code> defines a slice of the pie chart</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-10 mb-6">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
					{{ $t('docs.additionalResources') }}
				</h2>
				<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
					<p class="text-gray-700 dark:text-gray-300 mb-4">
						{{ $t('docs.resourcesDesc') }}
					</p>
					<ul class="space-y-2">
						<li>
							<a
								href="https://mermaid.js.org/syntax/flowchart.html"
								target="_blank"
								class="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4 mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
								</svg>
								{{ $t('docs.officialDocs') }}
							</a>
						</li>
						<li>
							<a
								href="https://mermaid.live/"
								target="_blank"
								class="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4 mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
								</svg>
								{{ $t('docs.liveEditor') }}
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- 底部信息 -->
		<footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-1.5 px-4 text-center">
			<h1 class="text-sm font-bold text-gray-800 dark:text-gray-200">{{ $t('footer.title') }}</h1>
			<p class="text-xs text-gray-600 dark:text-gray-400 leading-tight">
				{{ $t('footer.desc') }}
				<a href="https://mermaid-drawing.com" class="text-blue-600 dark:text-blue-400 hover:underline"
					>mermaid-drawing.com</a
				>
			</p>
		</footer>
	</div>
</template>

<script setup>
	import { useI18n } from 'vue-i18n'

	const { t } = useI18n()

	// Add meta for SEO
	useHead({
		title: 'Mermaid Chart Documentation - Quick Learning Guide',
		meta: [
			{
				name: 'description',
				content:
					'Quickly learn Mermaid syntax, including tutorials and examples for flowcharts, sequence diagrams, class diagrams, state diagrams, ER diagrams, Gantt charts, and pie charts.'
			},
			{
				name: 'keywords',
				content:
					'mermaid documentation, mermaid tutorial, flowchart tutorial, sequence diagram tutorial, learn mermaid'
			}
		]
	})
</script>
